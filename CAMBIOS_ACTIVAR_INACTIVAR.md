# RESUMEN DE CAMBIOS - Funciones de Activar/Inactivar

## ¿Cuál era el problema?

Las funciones de **Editar**, **Activar** e **Inactivar** grupos y semilleros no funcionaban. El error "Error al cambiar estado del grupo" sugería que las peticiones PUT no llegaban al backend correctamente.

## Causa Raíz

En Express, cuando tienes rutas como:
```javascript
router.put("/inactivar/:id", ...)  // Específica
router.put("/:id", ...)             // Genérica
```

Express evalúa **de arriba hacia abajo**. Si la genérica está primero, Express la confunde y trata `/inactivar/1` como `/` con `id='inactivar'` en lugar de `/inactivar/` con `id='1'`.

## Cambios Realizados

### 1. Backend - Reorden de Rutas

**Archivos modificados:**
- `backend/rutas/grupo.js`
- `backend/rutas/semillero.js`
- `backend/rutas/certificado.js`

**Patrón aplicado:**
```javascript
// ✅ AHORA LAS RUTAS ESPECÍFICAS VAN PRIMERO
router.put("/inactivar/:id", ...)  // Específica
router.put("/activar/:id", ...)    // Específica
router.put("/:id", ...)             // Genérica al final
```

**Agregué middleware en cada archivo:**
```javascript
router.param('id', (req, res, next, id) => {
  next(); // Permitir cualquier ID
});
```

**Agregué logs detallados:**
```javascript
console.log("📍 PUT /inactivar/:id - ID:", req.params.id, "Body:", req.body);
console.log("✅ Grupo inactivado exitosamente");
console.error("❌ Error inactivando grupo:", err);
```

### 2. Frontend - Mejor Manejo de Errores

**Archivos modificados:**
- `src/pages/dashboard/components/GruposSection.tsx`
- `src/pages/dashboard/components/SemillerosSection.tsx`

**Ahora el error es más informativo:**
```tsx
catch (err: any) {
  console.error('Error completo:', err);
  console.error('Error response:', err.response?.data);
  console.error('Error status:', err.response?.status);
  alert(`Error al cambiar estado: ${err.response?.data?.message || err.message}`);
}
```

### 3. Lógica de Estado Corregida

Ahora diferencia correctamente entre:
- Estado **ACTUAL** = 'Activo' → Endpoint `/inactivar/:id`
- Estado **ACTUAL** = 'Inactivo' → Endpoint `/activar/:id`

```tsx
const isCurrentlyActive = statusChangeGroup.estado === 'Activo';
const endpoint = isCurrentlyActive
  ? `http://localhost:4000/api/grupo/inactivar/${statusChangeGroup.id}`
  : `http://localhost:4000/api/grupo/activar/${statusChangeGroup.id}`;
```

## Próximos Pasos para Probar

### Paso 1: Reiniciar Backend
```powershell
cd c:\Users\yeyoP\Desktop\ACASGI-2.0\backend
node server.js
```

### Paso 2: Reiniciar Frontend (en otra terminal)
```powershell
cd c:\Users\yeyoP\Desktop\ACASGI-2.0
npm run dev
```

### Paso 3: Probar Funcionalidad
1. Abre `http://localhost:5174` (o el puerto que muestre)
2. Ve a sección **Grupos**
3. Haz clic en botón **Inactivar** (ícono ojo tachado) en un grupo Activo
4. Completa el motivo y presiona **Confirmar**

### Paso 4: Revisar Logs

**En la terminal del backend deberías ver:**
```
📍 PUT /inactivar/:id - ID: 1, Body: { motivo: 'Prueba' }
✅ Grupo inactivado exitosamente
```

**En la consola del navegador (F12):**
```
Enviando PUT a: http://localhost:4000/api/grupo/inactivar/1 con motivo: Prueba
Respuesta del backend: { message: "Grupo inactivado" }
```

## Si Sigue Sin Funcionar

Por favor pega:
1. **Error en DevTools Console** (F12 → Console)
2. **Logs del backend** (la terminal donde corre `node server.js`)
3. **URL que se intenta** (visible en DevTools → Network → busca la petición PUT)

## Cambios de Archivos

```
✏️ backend/rutas/grupo.js
✏️ backend/rutas/semillero.js
✏️ backend/rutas/certificado.js
✏️ src/pages/dashboard/components/GruposSection.tsx
✏️ src/pages/dashboard/components/SemillerosSection.tsx
```

## Nota Técnica

Las rutas ahora siguen el patrón correcto de Express:
```
/inactivar/:id  ← Coincide primero
/activar/:id    ← Coincide primero
/:id            ← Fallback genérico
```

Esto garantiza que cuando haces PUT a `/api/grupo/inactivar/1`, Express lo rutea a `router.put("/inactivar/:id")` y no a `router.put("/:id")`.
