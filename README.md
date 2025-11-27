# ACASGI - Sistema de Gestión

Sistema completo de gestión para ACASGI (Automatización de Certificados de Adscripción de Semilleros y Grupos de Investigación) con interfaz moderna, responsive y tema claro/oscuro.

## 🎯 Características Principales

### 📄 Páginas Incluidas

- **Landing Page (Home)**: Página de inicio con hero section, características, estadísticas y footer
- **Login**: Formulario de autenticación con credenciales de prueba
- **Dashboard Principal**: Área central con múltiples secciones funcionales

### 🔧 Secciones del Dashboard

1. **Dashboard Home**: KPIs, gráficos de crecimiento, distribución de integrantes, actividad reciente y grupos destacados
2. **Grupos de Investigación**: Gestión completa con filtros, búsqueda y modales de detalle
3. **Semilleros**: Administración de semilleros asociados a grupos
4. **Integrantes**: Gestión de miembros con diferentes roles
5. **Certificados**: Emisión de certificados de adscripción y por productos con impresión
6. **Reportes**: Dashboard analítico con gráficos interactivos
7. **Sobre Nosotros**: Información de la organización y equipo directivo

### 🎨 Diseño

- **Tema Claro/Oscuro**: Toggle intercambiable con persistencia en localStorage
- **Colores**: Azul (#3B82F6), Púrpura (#9333EA), Verde (#10B981)
- **Tipografía**: Fuente Pacifico para logo, sistema por defecto para contenido
- **Responsive**: Diseño completamente adaptable a dispositivos móviles
- **Animaciones**: Transiciones suaves y efectos hover

### 💾 Datos Mock

- **8 Grupos** de investigación con información completa
- **15 Semilleros** activos distribuidos entre los grupos
- **127 Integrantes** con diferentes roles y especialidades
- **13 Certificados** con tipos variados
- **Equipo Directivo** con 4 miembros

## 🚀 Tecnologías

- **React 19** + TypeScript
- **Vite** como build tool
- **TailwindCSS** para estilos
- **React Router DOM** para navegación
- **Remix Icons** para iconografía
- **Google Fonts** (Pacifico)

## 📦 Instalación

### Prerrequisitos

- Node.js (v16 o superior)
- npm o yarn

### Pasos

1. **Instalar dependencias**:

```bash
npm install
```

2. **Ejecutar en modo desarrollo**:

```bash
npm run dev
```

El proyecto se abrirá automáticamente en `http://localhost:5173`

3. **Compilar para producción**:

```bash
npm run build
```

## 🔐 Credenciales de Prueba

Sistema de roles con 5 niveles de acceso:

### Administrador (acceso total)
- **Email**: `admin@acasgi.org`
- **Contraseña**: `admin123`
- **Permisos**: Ver todo, sin afiliación específica

### Líder de Grupo (grupo específico)
- **Email**: `lidergrupo@acasgi.org`
- **Contraseña**: `liderg123`
- **Afiliación**: Grupo ID "1"
- **Permisos**: Solo su grupo, sin Semilleros ni Reportes

### Líder de Semillero (semillero específico)
- **Email**: `lidersemillero@acasgi.org`
- **Contraseña**: `liders123`
- **Afiliación**: Semillero ID "s1"
- **Permisos**: Solo su semillero, sin Grupos ni Reportes

### Profesor (grupo o semillero)
- **Email**: `profesor@acasgi.org`
- **Contraseña**: `prof123`
- **Afiliación**: Grupo ID "1"
- **Permisos**: Su grupo/semillero, sin Reportes

### Semillerista (semillero específico)
- **Email**: `semillerista@acasgi.org`
- **Contraseña**: `sem123`
- **Afiliación**: Semillero ID "s1"
- **Permisos**: Solo su semillero

## 📁 Estructura del Proyecto

```
src/
├── pages/
│   ├── home/page.tsx              # Landing page
│   ├── login/page.tsx             # Página de login
│   ├── dashboard/
│   │   ├── page.tsx               # Página principal del dashboard
│   │   └── components/
│   │       ├── Sidebar.tsx        # Navegación lateral
│   │       ├── Header.tsx         # Header con controles
│   │       ├── DashboardHome.tsx  # Home del dashboard
│   │       ├── GruposSection.tsx  # Sección de grupos
│   │       ├── SemillerosSection.tsx
│   │       ├── IntegrantesSection.tsx
│   │       ├── CertificadosSection.tsx
│   │       ├── ReportesSection.tsx
│   │       └── SobreNosotrosSection.tsx
│   └── NotFound.tsx               # Página 404
├── mocks/
│   ├── grupos.ts                  # Datos de grupos
│   ├── semilleros.ts              # Datos de semilleros
│   ├── integrantes.ts             # Datos de integrantes
│   ├── certificados.ts            # Datos de certificados
│   └── equipo.ts                  # Datos del equipo
├── router/
│   └── index.ts                   # Configuración de rutas
├── i18n/
│   └── index.ts                   # Sistema de internacionalización
├── App.tsx                        # Componente principal
├── main.tsx                       # Punto de entrada
└── index.css                      # Estilos globales
```

## 🎮 Funcionalidades Principales

### Autenticación
- Login con validación de credenciales
- Almacenamiento de sesión en localStorage
- Protección de rutas autenticadas

### Gestión de Datos
- Visualización de grupos, semilleros, integrantes y certificados
- Filtros avanzados por categoría, estado, rol, etc.
- Búsqueda en tiempo real
- Modales de detalle para cada entidad

### Reportes
- KPIs interactivos
- Gráficos de línea, barras y dona
- Análisis de productividad y rendimiento
- Distribución por categoría

### Certificados
- Visualización de certificados con múltiples tipos
- Modal de impresión profesional con diseño diploma
- Código de verificación único
- Espacios para firmas

## 🌙 Tema Claro/Oscuro

El tema se controla mediante el toggle en el header. La preferencia se guarda automáticamente en localStorage.

```typescript
// Aplicar tema oscuro
document.documentElement.classList.add('dark');

// Cambiar tema
document.documentElement.classList.toggle('dark');
localStorage.setItem('theme', 'dark');
```

## 🔌 Sistema de Rutas

```
/                           # Home
/login                      # Página de login
/dashboard                  # Dashboard principal
/dashboard/grupos           # Gestión de grupos
/dashboard/semilleros       # Gestión de semilleros
/dashboard/integrantes      # Gestión de integrantes
/dashboard/certificados     # Gestión de certificados
/dashboard/reportes         # Reportes y análisis
/dashboard/nosotros         # Sobre la organización
/404                        # Página no encontrada
```

## 📊 Datos de Ejemplo

El proyecto incluye datos mock realistas:

- **Grupos**: Nombres y descripciones de disciplinas variadas
- **Semilleros**: Distribuidos entre los grupos con coordinadores
- **Integrantes**: 127 miembros con roles variados (Líder, Coordinador, Investigador, Estudiante)
- **Certificados**: Ejemplos de adscripción y por productos

## 🎯 Próximas Mejoras

- [ ] Módulo de creación de certificados
- [ ] Integración con base de datos
- [ ] Sistema de autenticación avanzado
- [ ] Exportación de reportes a PDF
- [ ] Notificaciones en tiempo real
- [ ] Sistema de comentarios
- [ ] Búsqueda global mejorada

## 📝 Notas

- Los datos mostrados son de prueba y se reinician al recargar la página
- La autenticación es local (sin backend)
- Los modales de acción (editar, eliminar) están preparados pero requieren lógica de backend
- El sistema es completamente responsive

## 🤝 Contribución

Para reportar bugs o sugerir mejoras, por favor contacta al equipo de desarrollo.

## 📄 Licencia

© 2024 ACASGI - Todos los derechos reservados.

---

**Desarrollado con ❤️ para ACASGI**
