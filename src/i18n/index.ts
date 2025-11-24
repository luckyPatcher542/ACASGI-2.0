export const translations = {
  es: {
    // General
    dashboard: 'Dashboard',
    grupos: 'Grupos de Investigación',
    semilleros: 'Semilleros',
    integrantes: 'Integrantes',
    certificados: 'Certificados',
    reportes: 'Reportes',
    sobreNosotros: 'Sobre Nosotros',
    logout: 'Cerrar Sesión',
    perfil: 'Mi Perfil',
    configuracion: 'Configuración',
    buscar: 'Buscar…',
    nuevo: 'Nuevo',
    editar: 'Editar',
    eliminar: 'Eliminar',
    verDetalles: 'Ver Detalles',
    cerrar: 'Cerrar',
    guardar: 'Guardar',
    cancelar: 'Cancelar',
    
    // Login
    iniciarSesion: 'Iniciar Sesión',
    email: 'Correo Electrónico',
    contrasena: 'Contraseña',
    ingresa: 'Ingresa tus credenciales',
    credencialesIncorrectas: 'Credenciales incorrectas',
    
    // Home
    bienvenido: 'Bienvenido a ACASGI',
    acasgiDescripcion: 'Automatización de certificados de adscripción de Semilleros y Grupos de Investigación',
    mision: 'Fomentamos la investigación científica y el desarrollo de talento en Colombia',
    conocerMas: 'Conocer Más',
    caracteristicas: 'Características Principales',
    estadisticas: 'Estadísticas',
    
    // Dashboard Stats
    totalGrupos: 'Total Grupos',
    semijerosActivos: 'Semilleros Activos',
    totalIntegrantes: 'Integrantes',
    certificadosEmitidos: 'Certificados Emitidos',
    actividadReciente: 'Actividad Reciente',
    gruposDestacados: 'Grupos Destacados',
  },
  en: {
    // General
    dashboard: 'Dashboard',
    grupos: 'Research Groups',
    semilleros: 'Research Seedbeds',
    integrantes: 'Members',
    certificados: 'Certificates',
    reportes: 'Reports',
    sobreNosotros: 'About Us',
    logout: 'Logout',
    perfil: 'My Profile',
    configuracion: 'Settings',
    buscar: 'Search…',
    nuevo: 'New',
    editar: 'Edit',
    eliminar: 'Delete',
    verDetalles: 'View Details',
    cerrar: 'Close',
    guardar: 'Save',
    cancelar: 'Cancel',
    
    // Login
    iniciarSesion: 'Sign In',
    email: 'Email',
    contrasena: 'Password',
    ingresa: 'Enter your credentials',
    credencialesIncorrectas: 'Incorrect credentials',
    
    // Home
    bienvenido: 'Welcome to ACASGI',
    acasgiDescripcion: 'Colombian Association of Research Seedbeds and Groups',
    mision: 'We promote scientific research and talent development in Colombia',
    conocerMas: 'Learn More',
    caracteristicas: 'Main Features',
    estadisticas: 'Statistics',
    
    // Dashboard Stats
    totalGrupos: 'Total Groups',
    semijerosActivos: 'Active Seedbeds',
    totalIntegrantes: 'Members',
    certificadosEmitidos: 'Certificates Issued',
    actividadReciente: 'Recent Activity',
    gruposDestacados: 'Featured Groups',
  }
};

export function setLanguage(lang: 'es' | 'en') {
  localStorage.setItem('language', lang);
}

export function getLanguage(): 'es' | 'en' {
  return (localStorage.getItem('language') as 'es' | 'en') || 'es';
}

export function t(key: string): string {
  const lang = getLanguage();
  const keys = key.split('.');
  let value: any = translations[lang];
  
  for (const k of keys) {
    value = value?.[k];
  }
  
  return value || key;
}
