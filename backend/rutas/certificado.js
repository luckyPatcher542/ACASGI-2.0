import express from "express";
import fs from "fs";
import path from "path";
import PDFDocument from "pdfkit";
import { fileURLToPath } from "url";
import { conexion } from "../conexion.js";

const router = express.Router();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// =====================
// Registrar fuentes Cambria
// =====================
const fonts = {
    Cambria: {
        normal: path.join(__dirname, "../fonts/Cambria-01.ttf"),
        bold: path.join(__dirname, "../fonts/cambriab.ttf")
    }
};

// =====================
// Generar TRD consecutivo
// =====================
async function generarTRD() {
   // Obtiene el último TRD que tenga el patrón 1.111-XXX/YY
  const [rows] = await conexion.promise().query(`
    SELECT TRD 
    FROM certificado 
    WHERE TRD REGEXP '^1\\.111-[0-9]+/[0-9]{2}$'
    ORDER BY ID_CERTIFICADO DESC 
    LIMIT 1
  `);

  // Valor inicial
  let consecutivo = 250;

  if (rows.length > 0 && rows[0].TRD) {
      // Extraer número entre "-" y "/"
      const match = rows[0].TRD.match(/1\.111-(\d+)\//);
      if (match) consecutivo = parseInt(match[1], 10) + 1;
  } else {
      // Si no hay TRD válidos, arrancamos en 250 + 1 = 251
      consecutivo = consecutivo + 1;
  }

  const yearShort = new Date().getFullYear().toString().slice(-2);
  return `1.111-${consecutivo}/${yearShort}`;
}


// =====================
// BUSCAR PERSONA POR CÉDULA - AGREGADO (ubicado correctamente)
// =====================
// CORRECCIÓN: Endpoint para obtener datos de persona por cédula desde la BD
router.get('/buscar-persona/:cedula', async (req, res) => {
    try {
        const { cedula } = req.params;
        
        const [rows] = await conexion.promise().query(
            'SELECT p.ID_PERSONA, p.NOMBRE, p.APELLIDO, p.NUMERO_IDENTIFICACION, v.ID_VINCULACION FROM persona p LEFT JOIN vinculacion v ON p.ID_PERSONA = v.ID_PERSONA WHERE p.NUMERO_IDENTIFICACION = ? LIMIT 1',
            [cedula]
        );
        
        if (rows.length === 0) {
            return res.status(404).json({ error: 'Persona no encontrada' });
        }
        
        const persona = rows[0];
        res.json({
            id: persona.ID_PERSONA,
            nombre: persona.NOMBRE,
            apellido: persona.APELLIDO,
            cedula: persona.NUMERO_IDENTIFICACION,
            idVinculacion: persona.ID_VINCULACION
        });
    } catch (err) {
        console.error('Error buscando persona:', err);
        res.status(500).json({ error: 'Error buscando persona' });
    }
});



// =====================
// Ruta principal
// =====================
router.get("/generar/:idVinculacion", async (req, res) => {
    try {
        const idVinc = req.params.idVinculacion;

        const [rows] = await conexion.promise().query(
            `SELECT v.*, p.NOMBRE, p.APELLIDO, p.NUMERO_IDENTIFICACION, 
                    p.FACULTAD_ACADEMICA, v.SEMESTRE,
                    s.NOMBRE AS SEMILLERO_NOMBRE, 
                    g.NOMBRE AS GRUPO_NOMBRE
             FROM vinculacion v
             JOIN persona p ON p.ID_PERSONA = v.ID_PERSONA
             LEFT JOIN semillero s ON s.ID_SEMILLERO = v.ID_SEMILLERO
             LEFT JOIN grupo g ON g.ID_GRUPO = v.ID_GRUPO
             WHERE v.ID_VINCULACION = ?`,
            [idVinc]
        );

        if (rows.length === 0) 
            return res.status(404).json({ error: "Vinculación no encontrada." });

        const vinc = rows[0];
        const tipo = vinc.SEMILLERO_NOMBRE ? "Semillero de Investigación" : "Grupo de Investigación";
        const entidad = vinc.SEMILLERO_NOMBRE || vinc.GRUPO_NOMBRE;

        const TRD = await generarTRD();

        // Insertar certificado en BD
        await conexion.promise().query(
            `INSERT INTO certificado (FECHA_SOLICITUD, TIPO_CERTIFICADO, ID_VINCULACION, TRD)
             VALUES (NOW(), 'ADSCRIPCION', ?, ?)`,
            [idVinc, TRD]
        );

                // Obtener últimos 2 dígitos del año
          const yearShort = new Date().getFullYear().toString().slice(-2);

          // Extraer consecutivo desde TRD   --> TRD = "1.111-252/25"
          const consecutivo = TRD.match(/1\.111-(\d+)\//)[1]; // obtiene 252

          // Crear nombre del PDF --> Nombre_Apellido_252-25.pdf
          const filename = `${vinc.NOMBRE}_${vinc.APELLIDO}_${consecutivo}-${yearShort}.pdf`
            .replace(/ /g, "_");

          // Crear carpeta si no existe
          const dir = path.join(__dirname, "../certificados");
          if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });

          // Ruta completa del PDF
          const rutaPDF = path.join(dir, filename);

        // =====================
        // Crear PDF
        // =====================
        const pdf = new PDFDocument({ size: "A4", margin: 70 });
        const stream = fs.createWriteStream(rutaPDF);
        pdf.pipe(stream);

        // Registrar fuentes
        pdf.registerFont("Cambria", fonts.Cambria.normal);
        pdf.registerFont("Cambria-Bold", fonts.Cambria.bold);

        // Plantilla opcional
        const plantilla = path.join(__dirname, "../img/plantilla.png");
        if (fs.existsSync(plantilla)) pdf.image(plantilla, 0, 0, { width: 595 });

        // =====================
        // CONTENIDO
        // =====================
        pdf.font("Cambria").fontSize(10).text(TRD, 70, 90);

        pdf.moveDown(2);
        pdf.font("Cambria-Bold").fontSize(14).text("EL DECANATO", { align: "center" });
        pdf.font("Cambria").text("ASOCIADO DE INVESTIGACIONES DE LA INSTITUCIÓN", { align: "center" });
        pdf.text("UNIVERSITARIA ANTONIO JOSÉ CAMACHO", { align: "center" });

        pdf.moveDown(2);
        pdf.font("Cambria-Bold").fontSize(14).text("CERTIFICA", { align: "center" });

        pdf.moveDown(2);
        pdf.font("Cambria").fontSize(12).text(
`Que ${vinc.NOMBRE} ${vinc.APELLIDO}, identificado(a) con CC N° ${vinc.NUMERO_IDENTIFICACION}, se encuentra inscrito(a) como ${vinc.ROL} del ${tipo} ${entidad}, adscrito(a) a la facultad de ${vinc.FACULTAD_ACADEMICA}, durante el periodo ${vinc.SEMESTRE}.`,
            { align: "justify", lineGap: 6 }
        );

        const hoy = new Date();
        pdf.moveDown(3).text(
`Se expide el presente certificado a los ${hoy.getDate()} días del mes de 
${hoy.toLocaleString("es-ES",{month:"long"})} de ${hoy.getFullYear()}.`,
            { align: "justify" }
        );

        pdf.moveDown(5).text("Atentamente:");
        pdf.moveDown(2);
        pdf.text("Ing. JUAN CARLOS CRUZ ARDILA, Mg");
        pdf.text("Decano Asociado de Investigaciones");
        pdf.text("Institución Universitaria Antonio José Camacho");

        pdf.end();

        stream.on("finish", () => res.download(rutaPDF, filename));

    } catch (err) {
        console.log("⚠ Error:", err);
        if (!res.headersSent) res.status(500).json({error:"Error generando PDF"});
    }
});

// =====================
// DESCARGAR CERTIFICADO - AGREGADO
// =====================
// CORRECCIÓN: Se agregó nuevo endpoint para descargar certificados PDF generados
// NOTE: use plain :codigo and expect callers to URL-encode '/' as '%2F'
router.get('/descargar/:codigo', async (req, res) => {
    try {
        const { codigo } = req.params;
        
        const dir = path.join(__dirname, "../certificados");
        
        // Verificar que la carpeta existe
        if (!fs.existsSync(dir)) {
            return res.status(404).json({ error: 'Carpeta de certificados no encontrada' });
        }

        // Listar archivos en la carpeta
        const archivos = fs.readdirSync(dir);
        
        // Convertir código de formato "1.111-252/25" a "252-25"
        let codigoNormalizado = codigo;
        const match = codigo.match(/(\d+)\/(\d+)$/); // Busca "252/25"
        if (match) {
            codigoNormalizado = `${match[1]}-${match[2]}`; // Convierte a "252-25"
        }
        
        // Buscar el archivo que contiene el código normalizado
        // El patrón es: Nombre_Apellido_252-25.pdf
        const archivo = archivos.find(f => f.includes(codigoNormalizado) && f.endsWith('.pdf'));

        if (!archivo) {
            console.log('🔍 Archivos disponibles:', archivos.length, 'archivos');
            console.log('🔍 Código buscado:', codigo, '-> normalizado:', codigoNormalizado);
            console.log('🔍 Primeros 5 archivos:', archivos.slice(0, 5));
            return res.status(404).json({ error: 'Archivo de certificado no encontrado' });
        }

        const rutaPDF = path.join(dir, archivo);
        console.log('✅ Descargando:', archivo);
        res.download(rutaPDF, archivo);
    } catch (err) {
        console.error('Error descargando certificado:', err);
        res.status(500).json({ error: 'Error descargando certificado' });
    }
});

// =====================
// LISTAR CERTIFICADOS - CORREGIDO
// =====================
// CORRECCIÓN: Se agregó JOIN con vinculacion y persona para obtener NOMBRE, CEDULA y CODIGO
router.get('/', async (req, res) => {
    try {
        const [rows] = await conexion.promise().query(`
            SELECT 
                c.ID_CERTIFICADO,
                c.TIPO_CERTIFICADO,
                c.TRD AS CODIGO,
                c.FECHA_SOLICITUD,
                c.ESTADO,
                p.NOMBRE,
                p.NUMERO_IDENTIFICACION AS CEDULA,
                p.APELLIDO
            FROM certificado c
            LEFT JOIN vinculacion v ON c.ID_VINCULACION = v.ID_VINCULACION
            LEFT JOIN persona p ON v.ID_PERSONA = p.ID_PERSONA
            ORDER BY c.FECHA_SOLICITUD DESC
        `);
        res.json(rows);
    } catch (err) {
        console.error('Error listando certificados:', err);
        res.status(500).json({ error: 'Error listando certificados' });
    }
});

// =====================
// CREAR CERTIFICADO (POST desde frontend)
// =====================
// CORRECCIÓN: Endpoint mínimo para aceptar la creación de certificados desde la UI.
// Inserta un registro mínimo en la tabla `certificado` (ID_VINCULACION puede quedar NULL)
router.post('/', async (req, res) => {
    try {
        const { cedula, beneficiario, tipo, estado, fechaEmision, fechaVencimiento, codigo, descripcion } = req.body;

        // CORRECCIÓN: Siempre generar TRD correcto en el backend (formato 1.111-<consecutivo>/<yy>)
        // Ignorar cualquier 'codigo' enviado por el cliente para evitar valores tipo CERT-...
        const trd = await generarTRD();

        // Intentar insertar registro mínimo
        const [result] = await conexion.promise().query(
            'INSERT INTO certificado (FECHA_SOLICITUD, TIPO_CERTIFICADO, ID_VINCULACION, TRD) VALUES (?,?,NULL,?)',
            [fechaEmision ? fechaEmision.split('T')[0] : new Date(), tipo || 'ADSCRIPCION', trd]
        );

        const insertId = result.insertId || null;

        // Devolver id para que el frontend lo use
        res.json({ id: insertId, trd });
    } catch (err) {
        console.error('Error creando certificado:', err);
        res.status(500).json({ error: 'Error creando certificado' });
    }
});

// =====================
// CAMBIAR ESTADO CERTIFICADO
// =====================
// CORRECCI\u00d3N: Reactivado ahora que existe la columna ESTADO en la BD
router.put('/cambiar-estado/:id', async (req, res) => {
    try {
        console.log("📍 PUT /cambiar-estado/:id called with id:", req.params.id, "body:", req.body);
        const { id } = req.params;
        const { estado } = req.body;
        
        // Mapear estado de string a número si es necesario
        const estadoDb = estado === 'Vigente' || estado === 1 ? 1 : 0;
        
        await conexion.promise().query(
            'UPDATE certificado SET ESTADO = ? WHERE ID_CERTIFICADO = ?',
            [estadoDb, id]
        );
        
        res.json({ message: 'Estado del certificado actualizado' });
    } catch (err) {
        console.error('Error cambiando estado del certificado:', err);
        res.status(500).json({ error: 'Error cambiando estado del certificado' });
    }
});

// =====================
// EDITAR CERTIFICADO (GENÉRICO)
// =====================
router.put('/:id', async (req, res) => {
    try {
        console.log("📍 PUT /:id called with id:", req.params.id, "body:", req.body);
        const { id } = req.params;
        const datos = req.body;
        
        await conexion.promise().query(
            'UPDATE certificado SET ? WHERE ID_CERTIFICADO = ?',
            [datos, id]
        );
        
        res.json({ message: 'Certificado actualizado' });
    } catch (err) {
        console.error('Error actualizando certificado:', err);
        res.status(500).json({ error: 'Error actualizando certificado' });
    }
});

export default router;
