import express from "express";
import { conexion } from "../conexion.js";

const router = express.Router();

// Listar todos los integrantes (personas vinculadas)
router.get("/", async (req, res) => {
  try {
    const [rows] = await conexion.promise().query(
      `SELECT p.ID_PERSONA, p.NOMBRE, p.APELLIDO, p.NUMERO_IDENTIFICACION, 
              COUNT(v.ID_VINCULACION) as vinculaciones
       FROM persona p
       LEFT JOIN vinculacion v ON p.ID_PERSONA = v.ID_PERSONA
       GROUP BY p.ID_PERSONA
       ORDER BY p.NOMBRE ASC`
    );
    res.json(rows);
  } catch (err) {
    console.error('Error listing integrantes:', err);
    res.status(500).json({ error: err.message });
  }
});

export default router;
