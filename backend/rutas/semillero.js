import express from "express";
import { conexion } from "../conexion.js"; // <-- Cambiado de db.js a conexion.js

const router = express.Router();

/* ==========================================================================
   1. LISTAR SEMILLEROS CON FILTROS (nombre, facultad, estado)
   ========================================================================== */
router.get("/", (req, res) => {
  const { nombre, facultad, estado } = req.query;

  let sql = "SELECT * FROM semillero WHERE 1=1";
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
   2. CREAR SEMILLERO
   ====================== */
router.post("/", (req, res) => {
  conexion.query("INSERT INTO semillero SET ?", req.body, (err, result) => {
    if (err) return res.status(500).json(err);
    res.json({ message: "Semillero creado", id: result.insertId });
  });
});

/* ======================
   3. EDITAR SEMILLERO
   ====================== */
router.put("/:id", (req, res) => {
  conexion.query(
    "UPDATE semillero SET ? WHERE ID_SEMILLERO = ?",
    [req.body, req.params.id],
    (err) => {
      if (err) return res.status(500).json(err);
      res.json({ message: "Semillero actualizado" });
    }
  );
});

/* ======================
   4. INACTIVAR SEMILLERO
   ====================== */
router.put("/inactivar/:id", (req, res) => {
  const { motivo } = req.body;

  conexion.query(
    `
      UPDATE semillero 
      SET ESTADO = 0, MOTIVO_INACTIVACION = ?
      WHERE ID_SEMILLERO = ?
    `,
    [motivo, req.params.id],
    (err) => {
      if (err) return res.status(500).json(err);
      res.json({ message: "Semillero inactivado" });
    }
  );
});

/* ======================
   5. ACTIVAR SEMILLERO
   ====================== */
router.put("/activar/:id", (req, res) => {
  conexion.query(
    `
      UPDATE semillero
      SET ESTADO = 1, MOTIVO_INACTIVACION = NULL
      WHERE ID_SEMILLERO = ?
    `,
    [req.params.id],
    (err) => {
      if (err) return res.status(500).json(err);
      res.json({ message: "Semillero activado" });
    }
  );
});

/* ======================
   6. DESACTIVAR SEMILLERO (antes eliminar)
   ====================== */
router.put("/desactivar/:id", (req, res) => {
  const { motivo } = req.body;

  conexion.query(
    `
      UPDATE semillero
      SET ESTADO = 0, MOTIVO_INACTIVACION = ?
      WHERE ID_SEMILLERO = ?
    `,
    [motivo, req.params.id],
    (err) => {
      if (err) return res.status(500).json(err);
      res.json({ message: "Semillero desactivado" });
    }
  );
});

export default router;
