# Instrucciones para Probar Funciones de Activar/Inactivar

## Cambios Realizados

He reordenado las rutas del backend para que las rutas específicas (activar, inactivar) se evalúen **ANTES** que las rutas genéricas. También he mejorado el manejo de errores en el frontend para mostrar exactamente qué está fallando.

### Archivos Modificados:

**Backend:**
- `backend/rutas/grupo.js` - Rutas reordenadas, logging agregado
- `backend/rutas/semillero.js` - Rutas reordenadas, logging agregado  
- `backend/rutas/certificado.js` - Rutas reordenadas, logging agregado

**Frontend:**
- `src/pages/dashboard/components/GruposSection.tsx` - Mejor error handling
- `src/pages/dashboard/components/SemillerosSection.tsx` - Mejor error handling

## Pasos para Probar

### 1. Detener procesos existentes
```powershell
taskkill /F /IM node.exe 2>nul
```

### 2. Iniciar el backend
```powershell
cd c:\Users\yeyoP\Desktop\ACASGI-2.0\backend
node server.js
```

Deberías ver:
```
✅ Base de datos conectada correctamente.
⚡ Servidor backend funcionando en http://localhost:4000
```

### 3. En otra terminal, iniciar el frontend
```powershell
cd c:\Users\yeyoP\Desktop\ACASGI-2.0
npm run dev
```

### 4. Probar en la UI

1. Abre http://localhost:5174 (o el puerto que muestre Vite)
2. Ve a la sección **Grupos**
3. Haz clic en el botón **Inactivar** (el ícono "ojo tachado") en un grupo Activo
4. Completa el modal con el motivo y haz clic en **Confirmar**

### 5. Revisar Consola

Si hay error, abre **DevTools** en el navegador (F12 → Consola) y pega aquí el error exacto que aparece.

También revisa la terminal del backend para ver si aparecen los logs:
```
📍 PUT /inactivar/:id called with id: 1, body: {...}
```

## Posibles Errores y Soluciones

### Error: "Cannot GET /api/grupo/inactivar/1"
**Causa:** Probablemente está haciendo GET en lugar de PUT. El navegador está tratándolo como una URL normal.
**Solución:** Verifica que en el navegador se envíe con método PUT (DevTools → Network → observa el método de la petición).

### Error: "Connect ECONNREFUSED 127.0.0.1:4000"
**Causa:** El servidor backend no está corriendo en puerto 4000.
**Solución:** Asegúrate de que `node server.js` está en ejecución en otra terminal.

### Error: "ERR_HTTP_HEADERS_SENT"
**Causa:** El servidor intenta enviar headers/response dos veces.
**Solución:** Esto está controlado en el código ahora con `console.error` y checks, pero si persiste dime para revisar la query de BD.

## Siguiente Paso

Una vez confirmes que:
1. ✅ Las peticiones se envían (ves los logs en backend)
2. ✅ La BD se actualiza (el estado cambia en la UI)
3. ✅ No hay errores en consola

Podemos considerar agregar **proxy en Vite** para evitar las URLs absolutas `http://localhost:4000/api/...` y usar simplemente `/api/...`.
