import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { conexion } from "./conexion.js"; 
import certificadoRoutes from "./rutas/certificado.js";
import semilleroRoutes from "./rutas/semillero.js";
import grupoRoutes from "./rutas/grupo.js";

dotenv.config();

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// ---------------------------------------------
// 🔌 Verificar conexión a la base de datos
// ---------------------------------------------
conexion.getConnection((err, connection) => {
  if (err) {
    console.error("❌ Error al conectar a la base de datos:", err);
    process.exit(1); // Sale si falla la conexión
  }

  console.log("✅ Base de datos conectada correctamente.");
  if (connection) connection.release();

  // ---------------------------------------------
  // 📌 Rutas del API
  // ---------------------------------------------
  app.use("/api/certificado", certificadoRoutes);
  app.use("/api/semillero", semilleroRoutes);
  app.use("/api/grupo", grupoRoutes);

  // ---------------------------------------------
  // 🧪 Ruta de prueba rápida
  // ---------------------------------------------
  app.get("/api/test", async (req, res) => {
    try {
      const [rows] = await conexion.promise().query("SELECT 1 AS resultado");
      res.json({ success: true, resultado: rows[0].resultado });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });

  // ---------------------------------------------
  // 🚀 Iniciar servidor
  // ---------------------------------------------
  const PORT = process.env.PORT || 4000;
  app.listen(PORT, () => {
    console.log(`⚡ Servidor backend funcionando en http://localhost:${PORT}`);
  });
});
