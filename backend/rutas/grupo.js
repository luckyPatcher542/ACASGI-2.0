import express from "express";
import { conexion } from "../conexion.js";

const router = express.Router();

// Middleware: solo aceptar :id como números para prevenir conflictos de rutas
router.param('id', (req, res, next, id) => {
  // Permitir que pasen valores no numéricos (para que `/inactivar/:id` y `/activar/:id` funcionen)
  // pero también permitir numéricos para `/grupo/:id`
  next();
});

/* ===========================================================
   1. LISTAR GRUPOS CON FILTROS (nombre, facultad, estado)
   =========================================================== */
router.get("/", (req, res) => {
  const { nombre, facultad, estado } = req.query;

  let sql = "SELECT * FROM grupo WHERE 1=1";
  const params = [];

  if (nombre) {
    sql += " AND NOMBRE LIKE ?";
    params.push(`%${nombre}%`);
  }

  if (facultad && facultad !== "Todos") {
    sql += " AND FACULTAD = ?";
    params.push(facultad);
  }

  if (estado && estado !== "Todos") {
    sql += " AND ESTADO = ?";
    params.push(estado === "Activo" ? 1 : 0);
  }

  conexion.query(sql, params, (err, results) => {
    if (err) return res.status(500).json(err);
    res.json(results);
  });
});

/* ======================
   2. INACTIVAR GRUPO
   ====================== */
router.put("/inactivar/:id", (req, res) => {
  console.log("📍 PUT /inactivar/:id - ID:", req.params.id, "Body:", req.body);
  const { motivo } = req.body;

  conexion.query(
    "UPDATE grupo SET ESTADO = 0, MOTIVO_INACTIVACION = ? WHERE ID_GRUPO = ?",
    [motivo || "Sin especificar", req.params.id],
    (err) => {
      if (err) {
        console.error("❌ Error inactivando grupo:", err);
        return res.status(500).json(err);
      }
      console.log("✅ Grupo inactivado exitosamente");
      res.json({ message: "Grupo inactivado" });
    }
  );
});

/* ======================
   3. ACTIVAR GRUPO
   ====================== */
router.put("/activar/:id", (req, res) => {
  console.log("📍 PUT /activar/:id - ID:", req.params.id);
  conexion.query(
    "UPDATE grupo SET ESTADO = 1, MOTIVO_INACTIVACION = NULL WHERE ID_GRUPO = ?",
    [req.params.id],
    (err) => {
      if (err) {
        console.error("❌ Error activando grupo:", err);
        return res.status(500).json(err);
      }
      console.log("✅ Grupo activado exitosamente");
      res.json({ message: "Grupo activado" });
    }
  );
});

/* ======================
   4. EDITAR GRUPO
   ====================== */
router.put("/:id", (req, res) => {
  console.log("📍 PUT /:id - ID:", req.params.id, "Body:", req.body);
  conexion.query(
    "UPDATE grupo SET ? WHERE ID_GRUPO = ?",
    [req.body, req.params.id],
    (err) => {
      if (err) {
        console.error("❌ Error editando grupo:", err);
        return res.status(500).json(err);
      }
      console.log("✅ Grupo actualizado exitosamente");
      res.json({ message: "Grupo actualizado" });
    }
  );
});

/* ======================
   5. CREAR GRUPO
   ====================== */
router.post("/", (req, res) => {
  const datos = {
    ...req.body,
    ESTADO: 1 // Activo por defecto
  };

  conexion.query("INSERT INTO grupo SET ?", datos, (err, result) => {
    if (err) return res.status(500).json(err);
    res.json({ message: "Grupo creado", id: result.insertId });
  });
});

/* ======================
   6. (ANTES: ELIMINAR) — AHORA DESACTIVACIÓN PERMANENTE
   ====================== */
router.delete("/:id", (req, res) => {
  conexion.query(
    "UPDATE grupo SET ESTADO = 0, MOTIVO_INACTIVACION = 'Eliminado desde API' WHERE ID_GRUPO = ?",
    [req.params.id],
    (err) => {
      if (err) return res.status(500).json(err);
      res.json({
        message:
          "Grupo marcado como inactivo (ya no se elimina físicamente de la base de datos)"
      });
    }
  );
});

export default router;
