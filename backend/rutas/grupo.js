import express from "express";
import { conexion } from "../conexion.js";

const router = express.Router();

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
   2. CREAR GRUPO
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
   3. EDITAR GRUPO
   ====================== */
router.put("/:id", (req, res) => {
  conexion.query(
    "UPDATE grupo SET ? WHERE ID_GRUPO = ?",
    [req.body, req.params.id],
    (err) => {
      if (err) return res.status(500).json(err);
      res.json({ message: "Grupo actualizado" });
    }
  );
});

/* ======================
   4. INACTIVAR GRUPO (equivalente a eliminar)
   ====================== */
router.put("/inactivar/:id", (req, res) => {
  const { motivo } = req.body;

  conexion.query(
    "UPDATE grupo SET ESTADO = 0, MOTIVO_INACTIVACION = ? WHERE ID_GRUPO = ?",
    [motivo || "Sin especificar", req.params.id],
    (err) => {
      if (err) return res.status(500).json(err);
      res.json({ message: "Grupo inactivado" });
    }
  );
});

/* ======================
   5. ACTIVAR GRUPO
   ====================== */
router.put("/activar/:id", (req, res) => {
  conexion.query(
    "UPDATE grupo SET ESTADO = 1, MOTIVO_INACTIVACION = NULL WHERE ID_GRUPO = ?",
    [req.params.id],
    (err) => {
      if (err) return res.status(500).json(err);
      res.json({ message: "Grupo activado" });
    }
  );
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
