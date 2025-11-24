# 📋 ACASGI 2.0 - Defensa de Proyecto

**Proyecto:** Automatización de Certificados de Adscripción de Semilleros y Grupos de Investigación  
**Versión:** 2.0  
**Estado:** En desarrollo  
**Rama:** Gabriel  
**Fecha:** 24 de noviembre de 2025

---

## 📑 Tabla de Contenidos

1. [Descripción del Proyecto](#descripción-del-proyecto)
2. [Arquitectura Técnica](#arquitectura-técnica)
3. [Funcionalidades Implementadas](#funcionalidades-implementadas)
4. [Cambios Realizados](#cambios-realizados)
5. [Cómo Ejecutar](#cómo-ejecutar)
6. [Estructura de Carpetas](#estructura-de-carpetas)
7. [Funcionalidades Pendientes](#funcionalidades-pendientes)
8. [Integración de Base de Datos](#integración-de-base-de-datos)
9. [Campos de Almacenamiento Necesarios](#campos-de-almacenamiento-necesarios)

---

## 🎯 Descripción del Proyecto

### ¿Qué es ACASGI 2.0?

**ACASGI** (Automatización de Certificados de Adscripción de Semilleros y Grupos de Investigación) es un sistema web integral diseñado para:

- ✅ **Gestionar Grupos de Investigación:** Crear, editar, activar/inactivar grupos de investigación con categorización por facultad
- ✅ **Gestionar Semilleros:** Organizar semilleros de investigación asociados a grupos con estados dinámicos
- ✅ **Gestionar Integrantes:** Administrar miembros de grupos con roles diferenciados (Líder, Coordinador, Investigador, Estudiante)
- ✅ **Emitir Certificados:** Generar certificados de adscripción y por productos de investigación
- ✅ **Generar Reportes:** Visualizar análisis y estadísticas en tiempo real
- ✅ **Gestionar Perfil de Usuario:** Mantener información centralizada del personal administrativo

### Objetivo Principal

Automatizar y centralizar la gestión de certificación de adscripción para investigadores, coordinadores y estudiantes que participan en semilleros y grupos de investigación, proporcionando una plataforma moderna, segura y eficiente.

---

## 🏗️ Arquitectura Técnica

### Stack Tecnológico

```
Frontend:
├── React 18.3.1 (Interfaz de usuario)
├── TypeScript (Tipado estático)
├── Tailwind CSS (Estilos)
├── Vite (Empaquetador)
└── React Router DOM (Navegación)

Backend (Por integrar):
├── Node.js / Express (Servidor)
├── TypeScript
├── Base de Datos SQL (PostgreSQL/MySQL recomendado)
├── Autenticación JWT
└── API RESTful

Herramientas:
├── npm (Gestor de paquetes)
├── Git (Control de versiones)
├── VS Code (IDE)
└── Remixicon (Iconografía)
```

### Diagrama de Arquitectura

```
┌─────────────────────────────────────────────┐
│           CLIENTE (React/TypeScript)        │
│  ┌──────────────────────────────────────┐  │
│  │   Landing Page (Home)                │  │
│  │   - Información del sistema          │  │
│  │   - Autenticación                    │  │
│  └──────────────────────────────────────┘  │
│  ┌──────────────────────────────────────┐  │
│  │   Dashboard Principal                │  │
│  │   - Gestión de Grupos                │  │
│  │   - Gestión de Semilleros            │  │
│  │   - Gestión de Integrantes           │  │
│  │   - Emisión de Certificados          │  │
│  │   - Reportes y Estadísticas          │  │
│  │   - Perfil de Usuario                │  │
│  └──────────────────────────────────────┘  │
└─────────────────────────────────────────────┘
         ↕ (HTTP/HTTPS)
┌─────────────────────────────────────────────┐
│      API Backend (Por implementar)          │
│  ┌──────────────────────────────────────┐  │
│  │   Autenticación                      │  │
│  │   - Login/Logout                     │  │
│  │   - JWT Tokens                       │  │
│  └──────────────────────────────────────┘  │
│  ┌──────────────────────────────────────┐  │
│  │   Endpoints CRUD                     │  │
│  │   - /api/grupos                      │  │
│  │   - /api/semilleros                  │  │
│  │   - /api/integrantes                 │  │
│  │   - /api/certificados                │  │
│  │   - /api/reportes                    │  │
│  │   - /api/usuarios/perfil             │  │
│  └──────────────────────────────────────┘  │
└─────────────────────────────────────────────┘
         ↕
┌─────────────────────────────────────────────┐
│      Base de Datos (Por integrar)           │
│  ┌──────────────────────────────────────┐  │
│  │   Tablas                             │  │
│  │   - usuarios                         │  │
│  │   - grupos_investigacion             │  │
│  │   - semilleros                       │  │
│  │   - integrantes                      │  │
│  │   - certificados                     │  │
│  │   - cambios_estado                   │  │
│  └──────────────────────────────────────┘  │
└─────────────────────────────────────────────┘
```

---

## ✨ Funcionalidades Implementadas

### 1. 🏠 Landing Page (Home)

**Archivo:** `src/pages/home/page.tsx`

**Características:**
- ✅ Header sticky con navegación
- ✅ Hero section con branding de ACASGI
- ✅ Sección de características principales
- ✅ Estadísticas en tiempo real
- ✅ Newsletter subscription
- ✅ Información sobre ACASGI actualizada (nueva definición)
- ✅ Footer con redes sociales
- ✅ Tema claro/oscuro responsive

**Definición actual:**
```
ACASGI (Automatización de Certificados de Adscripción de Semilleros 
y Grupos de Investigación) es un sistema especializado en la gestión 
integral y certificación de adscripción para semilleros y grupos de 
investigación.
```

---

### 2. 🔐 Sistema de Autenticación

**Archivo:** `src/router/AuthContext.tsx`

**Credenciales de prueba:**
- Email: `admin@acasgi.org`
- Contraseña: `admin123`

**Características:**
- ✅ Context API para gestión de estado global
- ✅ Autenticación simulada (requiere backend real)
- ✅ Persistencia en localStorage
- ✅ Rutas protegidas

---

### 3. 📊 Dashboard Principal

**Archivo:** `src/pages/dashboard/page.tsx`

**Secciones disponibles:**

#### a) **Mi Perfil** 
**Archivo:** `src/pages/dashboard/components/PerfilSection.tsx`

**Datos actualizados:**
- Email: `investigaciones@admon.uniajc.edu.co`
- Teléfono: `6652828 Ext: 3301`
- Departamento: `Decanato Asociado de Investigaciones`
- Función: Modo edición/lectura
- Campo "Profesión": ❌ Eliminado

**Funcionalidad:**
- ✅ Edición de perfil
- ✅ Guardado en localStorage
- ✅ Validación de campos
- ✅ Modo oscuro/claro

---

#### b) **Gestión de Grupos de Investigación**
**Archivo:** `src/pages/dashboard/components/GruposSection.tsx`

**Funcionalidades:**
- ✅ Listar grupos (8 grupos de ejemplo)
- ✅ Filtrar por:
  - 🏷️ **Facultad** (antes "Categoría")
  - 📌 Estado (Activo/Inactivo)
  - 🔍 Búsqueda por nombre
- ✅ Crear nuevo grupo
- ✅ Ver detalles del grupo
- ✅ ✏️ **Editar grupo**
- ✅ 👁️ **Cambiar estado (Activar/Inactivar) con modal**
  - Solicita motivo del cambio
  - Validación antes de confirmar
  - Auditoría del cambio

**Datos de ejemplo:**
```typescript
- GIDIS (Tecnología, 24 integrantes, 5 semilleros)
- GISSIC (Tecnología, 18 integrantes, 3 semilleros)
- GIMU (Tecnología, 15 integrantes, 2 semilleros)
- GIT (Ciencias Naturales, 12 integrantes, 4 semilleros)
```

**Estados:**
- Activo (verde)
- Inactivo (gris)

---

#### c) **Gestión de Semilleros**
**Archivo:** `src/pages/dashboard/components/SemillerosSection.tsx`

**Funcionalidades:**
- ✅ Listar semilleros (15 semilleros de ejemplo)
- ✅ Filtrar por:
  - 🏷️ Facultad
  - 📌 Estado (Activo/Inactivo)
  - 🔍 Búsqueda por nombre
- ✅ Ver detalles del semillero
- ✅ ✏️ **Editar semillero**
- ✅ 👁️ **Cambiar estado (Activar/Inactivar) con modal**
  - Solicita motivo del cambio
  - Validación antes de confirmar
  - Auditoría del cambio
- ✅ Logo: Mismo que Grupos (`ri-team-fill`)

**Campos mostrados:**
- Nombre, descripción
- Grupo padre
- Coordinador
- Número de integrantes
- Fecha de creación
- Estado actual

---

#### d) **Gestión de Integrantes**
**Archivo:** `src/pages/dashboard/components/IntegrantesSection.tsx`

**Funcionalidades:**
- ✅ Listar integrantes (127+ ejemplos)
- ✅ Filtrar por:
  - 👤 Rol (Líder, Coordinador, Investigador, Estudiante)
  - 👥 Grupo
  - 🔍 Búsqueda por nombre o cédula
- ✅ Ver perfil del integrante
- ✅ Crear nuevo integrante
- ✅ Editar integrante (funcionalidad base)
- ✅ Eliminar integrante (funcionalidad base)

**Roles soportados:**
- 🔴 Líder (Azul)
- 🟡 Coordinador (Púrpura)
- 🟢 Investigador (Verde)
- 🔵 Estudiante (Amarillo)

---

#### e) **Emisión de Certificados**
**Archivo:** `src/pages/dashboard/components/CertificadosSection.tsx`

**Funcionalidades:**
- ✅ Listar certificados (13 certificados de ejemplo)
- ✅ Filtrar por:
  - 🏷️ Tipo (Adscripción, Producto)
  - 📌 Estado (Vigente, Vencido, Revocado)
  - 🔍 Búsqueda por cédula o nombre
- ✅ **Certificado de Adscripción**
  - Buscar integrante por cédula
  - Mostrar datos del integrante
  - Generar certificado con código único
  - Establecer vigencia
- ✅ **Certificado por Producto** (Proximamente)
- ✅ Ver detalles del certificado

**Tipos de certificados:**
- Adscripción (Azul/Cyan)
- Producto (Púrpura/Rosa)

**Estados:**
- Vigente ✅ (Verde)
- Vencido ⚠️ (Rojo)
- Revocado ❌ (Gris)

---

#### f) **Reportes y Estadísticas**
**Archivo:** `src/pages/dashboard/components/ReportesSection.tsx`

**Funcionalidades:**
- ✅ Filtros por:
  - 📅 Rango de fechas (Semana, Mes, Trimestre, Año)
  - 🏷️ Categoría
- ✅ KPIs principales:
  - Productividad General (87%)
  - Proyectos Activos (24)
  - Publicaciones (156)
  - Impacto Social (92%)
- ✅ Gráficos:
  - Actividad mensual (barras)
  - Distribución por facultad (barras horizontales)
- ✅ Tabla resumen de grupos
- ✅ Insights y recomendaciones

---

#### g) **Sobre Nosotros**
**Archivo:** `src/pages/dashboard/components/SobreNosotrosSection.tsx`

**Contenido:**
- Información sobre ACASGI
- Misión del sistema

---

### 4. 🎨 Componentes Auxiliares

**Sidebar:** `src/pages/dashboard/components/Sidebar.tsx`
- Navegación entre secciones
- Estados activos
- Ícono de usuario

**Header:** `src/pages/dashboard/components/Header.tsx`
- Título de sección
- Breadcrumbs (opcional)

---

## 🔄 Cambios Realizados (Iteración Final)

### Actualización 1: Definición de ACASGI

| Archivo | Cambio |
|---------|--------|
| `src/pages/home/page.tsx` (3 cambios) | Actualizar subtítulo, párrafo "Sobre" y footer |
| `README.md` | Actualizar descripción del proyecto |

**De:**
```
Asociación Colombiana de Semilleros y Grupos de Investigación
```

**A:**
```
Automatización de Certificados de Adscripción de Semilleros y Grupos de Investigación
```

---

### Actualización 2: Datos de Perfil

**Archivo:** `src/pages/dashboard/components/PerfilSection.tsx`

| Campo | Anterior | Actual |
|-------|----------|--------|
| Email | `admin@acasgi.org` | `investigaciones@admon.uniajc.edu.co` |
| Teléfono | `+57 300 123 4567` | `6652828 Ext: 3301` |
| Departamento | `Dirección General` | `Decanato Asociado de Investigaciones` |
| Profesión | `Ingeniero(a) de Sistemas` | ❌ ELIMINADO |

---

### Actualización 3: Cambio de Estado en Semilleros

**Archivo:** `src/pages/dashboard/components/SemillerosSection.tsx`

**Cambios:**
- ✅ Logo actualizado a `ri-team-fill` (mismo que Grupos)
- ✅ Botón "Editar" habilitado
- ✅ Botón "Inactivar/Activar" completamente funcional
  - Modal solicitando motivo
  - Validación de campo obligatorio
  - Cambio de icono: `ri-eye-off-line` ↔ `ri-eye-line`
  - Color dinámico (rojo para inactivar, verde para activar)

---

### Actualización 4: Cambio de Estado en Grupos

**Archivo:** `src/pages/dashboard/components/GruposSection.tsx`

**Cambios:**
- ✅ Botón "Editar" habilitado
- ✅ Botón "Inactivar/Activar" completamente funcional (igual a Semilleros)
- ✅ Label de filtro actualizado:
  - De: "Categoría"
  - A: "Facultad"

---

### Actualización 5: Correcciones TypeScript

**Archivos corregidos:**
- ✅ `GruposSection.tsx`: Tipado correcto en onChange
- ✅ `IntegrantesSection.tsx`: Tipado correcto en onChange
- ✅ `CertificadosSection.tsx`: Eliminada referencia inválida a `selectedGroup`
- ✅ `SemillerosSection.tsx`: Eliminadas variables no utilizadas

**Compilación final:** ✅ SIN ERRORES

---

## 🚀 Cómo Ejecutar

### Requisitos Previos

```bash
Node.js >= 16.0.0
npm >= 8.0.0
Git
```

### Instalación

```bash
# 1. Clonar el repositorio
git clone https://github.com/luckyPatcher542/ACASGI-2.0.git
cd ACASGI-2.0

# 2. Cambiar a la rama Gabriel
git checkout Gabriel

# 3. Instalar dependencias
npm install

# 4. Iniciar el servidor de desarrollo
npm run dev

# 5. Abrir en el navegador
# http://localhost:5173
```

### Modo Producción

```bash
# Build para producción
npm run build

# Vista previa del build
npm run preview

# Los archivos compilados estarán en ./dist
```

### Credenciales de Prueba

**Login Page:**
- Email: `admin@acasgi.org`
- Contraseña: `admin123`

---

## 📁 Estructura de Carpetas

```
PROYECTO/
├── src/
│   ├── main.tsx                    # Punto de entrada
│   ├── index.css                   # Estilos globales
│   ├── App.tsx                     # Componente raíz
│   │
│   ├── pages/
│   │   ├── home/
│   │   │   └── page.tsx           # Landing page
│   │   ├── login/
│   │   │   └── page.tsx           # Página de autenticación
│   │   ├── dashboard/
│   │   │   ├── page.tsx           # Layout principal del dashboard
│   │   │   └── components/
│   │   │       ├── Sidebar.tsx
│   │   │       ├── Header.tsx
│   │   │       ├── DashboardHome.tsx
│   │   │       ├── PerfilSection.tsx
│   │   │       ├── GruposSection.tsx
│   │   │       ├── SemillerosSection.tsx
│   │   │       ├── IntegrantesSection.tsx
│   │   │       ├── CertificadosSection.tsx
│   │   │       ├── ReportesSection.tsx
│   │   │       ├── ConfiguracionSection.tsx
│   │   │       └── SobreNosotrosSection.tsx
│   │   └── NotFound.tsx
│   │
│   ├── router/
│   │   ├── AuthContext.tsx         # Context de autenticación
│   │   ├── config.tsx              # Configuración de rutas
│   │   └── index.ts                # Exportaciones
│   │
│   ├── mocks/                      # Datos de ejemplo
│   │   ├── grupos.ts               # Datos de grupos (8 grupos)
│   │   ├── semilleros.ts           # Datos de semilleros (15)
│   │   ├── integrantes.ts          # Datos de integrantes (127+)
│   │   ├── certificados.ts         # Datos de certificados (13)
│   │   └── equipo.ts               # Datos del equipo
│   │
│   └── i18n/
│       └── index.ts                # Internacionalización (base)
│
├── public/
│   └── vite.svg
│
├── Defensa.md                      # Documentación del proyecto (este archivo)
├── README.md                       # Documentación general
├── package.json                    # Dependencias
├── tsconfig.json                   # Config TypeScript
├── vite.config.ts                  # Config Vite
├── tailwind.config.js              # Config Tailwind CSS
└── index.html                      # HTML principal
```

---

## ⚠️ Funcionalidades Pendientes

### 1. **Backend API** (CRÍTICO)

**Necesario implementar:**

```
Server: Node.js + Express
Lenguaje: TypeScript
Base de datos: PostgreSQL/MySQL
Autenticación: JWT

Endpoints a crear:
├── POST   /api/auth/login           → Autenticar usuario
├── POST   /api/auth/logout          → Cerrar sesión
├── GET    /api/auth/verify          → Verificar token
│
├── GET    /api/grupos               → Listar grupos
├── POST   /api/grupos               → Crear grupo
├── GET    /api/grupos/:id           → Obtener grupo
├── PUT    /api/grupos/:id           → Editar grupo
├── PATCH  /api/grupos/:id/estado    → Cambiar estado (con motivo)
├── DELETE /api/grupos/:id           → Eliminar grupo
│
├── GET    /api/semilleros           → Listar semilleros
├── POST   /api/semilleros           → Crear semillero
├── GET    /api/semilleros/:id       → Obtener semillero
├── PUT    /api/semilleros/:id       → Editar semillero
├── PATCH  /api/semilleros/:id/estado → Cambiar estado (con motivo)
├── DELETE /api/semilleros/:id       → Eliminar semillero
│
├── GET    /api/integrantes          → Listar integrantes
├── POST   /api/integrantes          → Crear integrante
├── GET    /api/integrantes/:id      → Obtener integrante
├── PUT    /api/integrantes/:id      → Editar integrante
├── DELETE /api/integrantes/:id      → Eliminar integrante
│
├── GET    /api/certificados         → Listar certificados
├── POST   /api/certificados/ads     → Generar certificado adscripción
├── POST   /api/certificados/prod    → Generar certificado producto
├── GET    /api/certificados/:id     → Obtener certificado
├── PATCH  /api/certificados/:id/estado → Cambiar estado certificado
│
├── GET    /api/reportes             → Obtener reportes
├── GET    /api/reportes/:tipo       → Reportes específicos
│
├── GET    /api/usuarios/perfil      → Obtener perfil de usuario
├── PUT    /api/usuarios/perfil      → Actualizar perfil
└── PATCH  /api/usuarios/password    → Cambiar contraseña
```

---

### 2. **Base de Datos** (CRÍTICO)

**Tablas necesarias:**

```sql
-- Tabla: usuarios
CREATE TABLE usuarios (
  id UUID PRIMARY KEY,
  email VARCHAR(255) UNIQUE NOT NULL,
  contrasena_hash VARCHAR(255) NOT NULL,
  nombre VARCHAR(255) NOT NULL,
  rol VARCHAR(50) DEFAULT 'admin',
  telefono VARCHAR(20),
  departamento VARCHAR(255),
  fecha_ingreso DATE,
  fecha_creacion TIMESTAMP DEFAULT NOW(),
  activo BOOLEAN DEFAULT TRUE
);

-- Tabla: grupos_investigacion
CREATE TABLE grupos_investigacion (
  id UUID PRIMARY KEY,
  nombre VARCHAR(255) NOT NULL,
  descripcion TEXT,
  categoria VARCHAR(100) NOT NULL,
  lider VARCHAR(255) NOT NULL,
  integrantes INT DEFAULT 0,
  semilleros INT DEFAULT 0,
  estado VARCHAR(20) DEFAULT 'Activo',
  fecha_creacion TIMESTAMP DEFAULT NOW(),
  fecha_actualizacion TIMESTAMP DEFAULT NOW(),
  usuario_id UUID REFERENCES usuarios(id)
);

-- Tabla: semilleros
CREATE TABLE semilleros (
  id UUID PRIMARY KEY,
  nombre VARCHAR(255) NOT NULL,
  descripcion TEXT,
  grupo_padre UUID NOT NULL REFERENCES grupos_investigacion(id),
  coordinador VARCHAR(255) NOT NULL,
  integrantes INT DEFAULT 0,
  estado VARCHAR(20) DEFAULT 'Activo',
  fecha_creacion TIMESTAMP DEFAULT NOW(),
  fecha_actualizacion TIMESTAMP DEFAULT NOW()
);

-- Tabla: integrantes
CREATE TABLE integrantes (
  id UUID PRIMARY KEY,
  nombre VARCHAR(255) NOT NULL,
  cedula VARCHAR(20) UNIQUE NOT NULL,
  email VARCHAR(255) NOT NULL,
  telefono VARCHAR(20),
  especialidad VARCHAR(255),
  rol VARCHAR(50) NOT NULL,
  grupo UUID NOT NULL REFERENCES grupos_investigacion(id),
  semillero UUID REFERENCES semilleros(id),
  fecha_vinculacion DATE NOT NULL,
  iniciales VARCHAR(5),
  fecha_creacion TIMESTAMP DEFAULT NOW(),
  activo BOOLEAN DEFAULT TRUE
);

-- Tabla: certificados
CREATE TABLE certificados (
  id UUID PRIMARY KEY,
  tipo VARCHAR(50) NOT NULL,
  beneficiario VARCHAR(255) NOT NULL,
  cedula VARCHAR(20) NOT NULL,
  estado VARCHAR(20) DEFAULT 'Vigente',
  fecha_emision DATE NOT NULL,
  fecha_vencimiento DATE,
  codigo VARCHAR(50) UNIQUE NOT NULL,
  descripcion TEXT,
  grupo_semillero VARCHAR(255),
  producto_info JSONB,
  usuario_id UUID REFERENCES usuarios(id),
  fecha_creacion TIMESTAMP DEFAULT NOW()
);

-- Tabla: cambios_estado (para auditoría)
CREATE TABLE cambios_estado (
  id UUID PRIMARY KEY,
  tabla_referencia VARCHAR(100) NOT NULL,
  registro_id UUID NOT NULL,
  estado_anterior VARCHAR(20) NOT NULL,
  estado_nuevo VARCHAR(20) NOT NULL,
  motivo TEXT NOT NULL,
  usuario_id UUID REFERENCES usuarios(id),
  fecha_cambio TIMESTAMP DEFAULT NOW()
);

-- Índices para optimización
CREATE INDEX idx_grupos_estado ON grupos_investigacion(estado);
CREATE INDEX idx_semilleros_estado ON semilleros(estado);
CREATE INDEX idx_integrantes_cedula ON integrantes(cedula);
CREATE INDEX idx_certificados_cedula ON certificados(cedula);
CREATE INDEX idx_usuarios_email ON usuarios(email);
```

---

## 📊 Campos de Almacenamiento Necesarios

### 1. **Tabla: usuarios**

| Campo | Tipo | Validación | Obligatorio |
|-------|------|-----------|------------|
| id | UUID | Generado automáticamente | ✅ |
| email | VARCHAR(255) | Email válido | ✅ |
| contrasena_hash | VARCHAR(255) | Bcrypt hasheada | ✅ |
| nombre | VARCHAR(255) | Min 3 caracteres | ✅ |
| rol | VARCHAR(50) | admin, coordinador, etc | ✅ |
| telefono | VARCHAR(20) | Formato válido | ❌ |
| departamento | VARCHAR(255) | - | ❌ |
| fecha_ingreso | DATE | - | ❌ |
| fecha_creacion | TIMESTAMP | Auto NOW() | ✅ |
| activo | BOOLEAN | true/false | ✅ |

---

### 2. **Tabla: grupos_investigacion**

| Campo | Tipo | Validación | Obligatorio |
|-------|------|-----------|------------|
| id | UUID | Generado automáticamente | ✅ |
| nombre | VARCHAR(255) | Min 5 caracteres | ✅ |
| descripcion | TEXT | - | ❌ |
| categoria | VARCHAR(100) | Tecnología, Ciencias Sociales, etc | ✅ |
| lider | VARCHAR(255) | Min 3 caracteres | ✅ |
| integrantes | INT | >= 0 | ✅ |
| semilleros | INT | >= 0 | ✅ |
| estado | VARCHAR(20) | Activo/Inactivo | ✅ |
| fecha_creacion | TIMESTAMP | Auto NOW() | ✅ |
| fecha_actualizacion | TIMESTAMP | Auto NOW() | ✅ |
| usuario_id | UUID | FK usuarios | ✅ |

---

### 3. **Tabla: semilleros**

| Campo | Tipo | Validación | Obligatorio |
|-------|------|-----------|------------|
| id | UUID | Generado automáticamente | ✅ |
| nombre | VARCHAR(255) | Min 5 caracteres | ✅ |
| descripcion | TEXT | - | ❌ |
| grupo_padre | UUID | FK grupos_investigacion | ✅ |
| coordinador | VARCHAR(255) | Min 3 caracteres | ✅ |
| integrantes | INT | >= 0 | ✅ |
| estado | VARCHAR(20) | Activo/Inactivo | ✅ |
| fecha_creacion | TIMESTAMP | Auto NOW() | ✅ |
| fecha_actualizacion | TIMESTAMP | Auto NOW() | ✅ |

---

### 4. **Tabla: integrantes**

| Campo | Tipo | Validación | Obligatorio |
|-------|------|-----------|------------|
| id | UUID | Generado automáticamente | ✅ |
| nombre | VARCHAR(255) | Min 3 caracteres | ✅ |
| cedula | VARCHAR(20) | Único, numérico | ✅ |
| email | VARCHAR(255) | Email válido | ✅ |
| telefono | VARCHAR(20) | Formato válido | ❌ |
| especialidad | VARCHAR(255) | - | ❌ |
| rol | VARCHAR(50) | Líder, Coordinador, Investigador, Estudiante | ✅ |
| grupo | UUID | FK grupos_investigacion | ✅ |
| semillero | UUID | FK semilleros | ❌ |
| fecha_vinculacion | DATE | - | ✅ |
| iniciales | VARCHAR(5) | Generadas del nombre | ✅ |
| fecha_creacion | TIMESTAMP | Auto NOW() | ✅ |
| activo | BOOLEAN | true/false | ✅ |

---

### 5. **Tabla: certificados**

| Campo | Tipo | Validación | Obligatorio |
|-------|------|-----------|------------|
| id | UUID | Generado automáticamente | ✅ |
| tipo | VARCHAR(50) | Adscripción/Producto | ✅ |
| beneficiario | VARCHAR(255) | Min 3 caracteres | ✅ |
| cedula | VARCHAR(20) | FK integrantes | ✅ |
| estado | VARCHAR(20) | Vigente/Vencido/Revocado | ✅ |
| fecha_emision | DATE | - | ✅ |
| fecha_vencimiento | DATE | >= fecha_emision | ❌ |
| codigo | VARCHAR(50) | Único, formato CERT-XXXXXX | ✅ |
| descripcion | TEXT | - | ❌ |
| grupo_semillero | VARCHAR(255) | - | ❌ |
| producto_info | JSONB | {tipoProducto, nombreProducto, etc} | ❌ |
| usuario_id | UUID | FK usuarios | ✅ |
| fecha_creacion | TIMESTAMP | Auto NOW() | ✅ |

---

### 6. **Tabla: cambios_estado (Auditoría)**

| Campo | Tipo | Validación | Obligatorio |
|-------|------|-----------|------------|
| id | UUID | Generado automáticamente | ✅ |
| tabla_referencia | VARCHAR(100) | grupos_investigacion, semilleros | ✅ |
| registro_id | UUID | ID del registro | ✅ |
| estado_anterior | VARCHAR(20) | Activo/Inactivo | ✅ |
| estado_nuevo | VARCHAR(20) | Activo/Inactivo | ✅ |
| motivo | TEXT | Min 10 caracteres | ✅ |
| usuario_id | UUID | FK usuarios | ✅ |
| fecha_cambio | TIMESTAMP | Auto NOW() | ✅ |

---

## 🔌 Conexión del Frontend a Backend

### Ejemplo de Integración (Cliente)

```typescript
// Archivo: src/services/api.ts
import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:3000/api';

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptor para agregar token
apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem('authToken');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Servicios
export const GruposService = {
  listar: () => apiClient.get('/grupos'),
  obtener: (id: string) => apiClient.get(`/grupos/${id}`),
  crear: (datos: any) => apiClient.post('/grupos', datos),
  actualizar: (id: string, datos: any) => apiClient.put(`/grupos/${id}`, datos),
  cambiarEstado: (id: string, estado: string, motivo: string) =>
    apiClient.patch(`/grupos/${id}/estado`, { estado, motivo }),
  eliminar: (id: string) => apiClient.delete(`/grupos/${id}`),
};

export const SemillerosService = {
  listar: () => apiClient.get('/semilleros'),
  obtener: (id: string) => apiClient.get(`/semilleros/${id}`),
  crear: (datos: any) => apiClient.post('/semilleros', datos),
  actualizar: (id: string, datos: any) => apiClient.put(`/semilleros/${id}`, datos),
  cambiarEstado: (id: string, estado: string, motivo: string) =>
    apiClient.patch(`/semilleros/${id}/estado`, { estado, motivo }),
  eliminar: (id: string) => apiClient.delete(`/semilleros/${id}`),
};

// Más servicios...
```

### Integración en Componente

```typescript
// En GruposSection.tsx
useEffect(() => {
  const cargarGrupos = async () => {
    try {
      const respuesta = await GruposService.listar();
      setGrupos(respuesta.data);
    } catch (error) {
      console.error('Error cargando grupos:', error);
    }
  };
  cargarGrupos();
}, []);

const handleConfirmStatusChange = async () => {
  if (statusChangeGroup && statusChangeReason.trim()) {
    try {
      await GruposService.cambiarEstado(
        statusChangeGroup.id,
        statusChangeGroup.estado === 'Activo' ? 'Inactivo' : 'Activo',
        statusChangeReason
      );
      // Recargar grupos
      const respuesta = await GruposService.listar();
      setGrupos(respuesta.data);
      alert('Grupo actualizado correctamente');
    } catch (error) {
      alert('Error al actualizar grupo');
    }
  }
};
```

---

## 🛠️ Tareas Próximas (Prioridad)

### 🔴 **CRÍTICO**
1. **Crear Backend API** con Node.js + Express + TypeScript
2. **Diseñar Base de Datos** (PostgreSQL/MySQL)
3. **Implementar autenticación JWT** real
4. **Conectar frontend con backend**

### 🟠 **IMPORTANTE**
5. Implementar validaciones de datos en servidor
6. Agregar manejo de errores robusto
7. Implementar logging y auditoría
8. Crear documentación de API (Swagger/OpenAPI)

### 🟡 **MEDIO**
9. Agregar tests unitarios
10. Implementar paginación
11. Agregar exportación de reportes (PDF/Excel)
12. Mejorar performance

### 🟢 **BAJO**
13. Internacionalización completa
14. Agregar más temas visuales
15. Optimización de imágenes
16. PWA (Progressive Web App)

---

## 📝 Notas Finales

### Estado Actual

✅ **Frontend 100% funcional** con datos mockados
❌ **Backend No implementado** (requiere desarrollo urgente)
❌ **Base de datos No conectada** (requiere setup)
⚠️ **Autenticación simulada** (requiere JWT real)

### Archivos Críticos por Revisar

1. `src/pages/dashboard/components/GruposSection.tsx` - Modal de cambio de estado
2. `src/pages/dashboard/components/SemillerosSection.tsx` - Modal de cambio de estado
3. `src/pages/dashboard/components/PerfilSection.tsx` - Datos actualizados
4. `src/pages/home/page.tsx` - Definición de ACASGI actualizada

### Credenciales de Prueba

```
Email: admin@acasgi.org
Password: admin123
```

### Rutas Disponibles

```
/ o /home              → Landing page
/login                 → Página de autenticación
/dashboard/            → Dashboard principal
/dashboard/perfil      → Mi perfil
/dashboard/grupos      → Grupos de investigación
/dashboard/semilleros  → Semilleros
/dashboard/integrantes → Integrantes
/dashboard/certificados → Certificados
/dashboard/reportes    → Reportes
/dashboard/sobre       → Sobre nosotros
/404                   → Página no encontrada
```

---

## 📞 Contacto y Soporte

**Repositorio:** https://github.com/luckyPatcher542/ACASGI-2.0  
**Rama Actual:** Gabriel  
**Stack:** React 18.3.1 + TypeScript + Tailwind CSS + Vite

---

**Documento generado:** 24 de noviembre de 2025  
**Estado:** Listo para defensa y desarrollo de backend
