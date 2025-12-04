import { conexion } from './conexion.js';

(async () => {
  try {
    const [[g]] = await conexion.promise().query('SELECT COUNT(*) AS c FROM grupo');
    const [[s]] = await conexion.promise().query('SELECT COUNT(*) AS c FROM semillero');
    const [[c]] = await conexion.promise().query('SELECT COUNT(*) AS c FROM certificado');
    console.log('grupos:', g.c);
    console.log('semilleros:', s.c);
    console.log('certificados:', c.c);
    process.exit(0);
  } catch (err) {
    console.error('Error consultando DB:', err.message || err);
    process.exit(1);
  }
})();
