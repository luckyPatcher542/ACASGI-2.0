export interface Certificado {
  id: string;
  tipo: 'Adscripción' | 'Producto';
  beneficiario: string;
  cedula: string;
  estado: 'Vigente' | 'Vencido' | 'Revocado';
  fechaEmision: string;
  fechaVencimiento?: string;
  codigo: string;
  descripcion: string;
  grupoSemillero?: string;
  productoInfo?: {
    tipoProducto: 'Artículo' | 'Ponencia' | 'Libro' | 'Patente' | 'Software';
    nombreProducto: string;
    revistaEventoEditorial: string;
  };
}

export const certificadosData: Certificado[] = [
  // Certificados de Adscripción (8)
  {
    id: 'cert1',
    tipo: 'Adscripción',
    beneficiario: 'Dr. Carlos Mendoza',
    cedula: '1001234567',
    estado: 'Vigente',
    fechaEmision: '2023-01-15',
    fechaVencimiento: '2025-01-15',
    codigo: 'CERT-2023-001',
    descripcion: 'Certificado de Adscripción como Líder de Grupo de Investigación',
    grupoSemillero: 'Inteligencia Artificial y Machine Learning'
  },
  {
    id: 'cert2',
    tipo: 'Adscripción',
    beneficiario: 'Ing. Ana García',
    cedula: '1001234568',
    estado: 'Vigente',
    fechaEmision: '2023-02-10',
    fechaVencimiento: '2025-02-10',
    codigo: 'CERT-2023-002',
    descripcion: 'Certificado de Adscripción como Líder de Grupo de Investigación',
    grupoSemillero: 'Robótica y Automatización Industrial'
  },
  {
    id: 'cert3',
    tipo: 'Adscripción',
    beneficiario: 'Mg. Luis Martínez',
    cedula: '1001234575',
    estado: 'Vigente',
    fechaEmision: '2023-03-05',
    fechaVencimiento: '2025-03-05',
    codigo: 'CERT-2023-003',
    descripcion: 'Certificado de Adscripción como Coordinador de Semillero',
    grupoSemillero: 'Semillero de Inteligencia Artificial'
  },
  {
    id: 'cert4',
    tipo: 'Adscripción',
    beneficiario: 'Ing. Roberto Silva',
    cedula: '1001234576',
    estado: 'Vigente',
    fechaEmision: '2023-04-12',
    fechaVencimiento: '2025-04-12',
    codigo: 'CERT-2023-004',
    descripcion: 'Certificado de Adscripción como Coordinador de Semillero',
    grupoSemillero: 'Semillero de Deep Learning'
  },
  {
    id: 'cert5',
    tipo: 'Adscripción',
    beneficiario: 'Ing. Alejandra Morales',
    cedula: '1001234584',
    estado: 'Vigente',
    fechaEmision: '2023-05-20',
    fechaVencimiento: '2025-05-20',
    codigo: 'CERT-2023-005',
    descripcion: 'Certificado de Adscripción como Investigadora',
    grupoSemillero: 'Inteligencia Artificial y Machine Learning'
  },
  {
    id: 'cert6',
    tipo: 'Adscripción',
    beneficiario: 'Estudiante Juanita Peña',
    cedula: '1001234590',
    estado: 'Vigente',
    fechaEmision: '2023-06-15',
    fechaVencimiento: '2024-06-15',
    codigo: 'CERT-2023-006',
    descripcion: 'Certificado de Adscripción como Estudiante Investigador',
    grupoSemillero: 'Semillero de Inteligencia Artificial'
  },
  {
    id: 'cert7',
    tipo: 'Adscripción',
    beneficiario: 'Estudiante Kevin López',
    cedula: '1001234591',
    estado: 'Vencido',
    fechaEmision: '2022-06-15',
    fechaVencimiento: '2023-06-15',
    codigo: 'CERT-2023-007',
    descripcion: 'Certificado de Adscripción como Estudiante Investigador',
    grupoSemillero: 'Semillero de Inteligencia Artificial'
  },
  {
    id: 'cert8',
    tipo: 'Adscripción',
    beneficiario: 'Estudiante Lucía Martínez',
    cedula: '1001234592',
    estado: 'Vigente',
    fechaEmision: '2023-07-10',
    fechaVencimiento: '2024-07-10',
    codigo: 'CERT-2023-008',
    descripcion: 'Certificado de Adscripción como Estudiante Investigador',
    grupoSemillero: 'Semillero de Deep Learning'
  },
  // Certificados por Productos (5)
  {
    id: 'cert9',
    tipo: 'Producto',
    beneficiario: 'Dr. Carlos Mendoza',
    cedula: '1001234567',
    estado: 'Vigente',
    fechaEmision: '2023-04-15',
    codigo: 'PROD-2023-001',
    descripcion: 'Certificado de Autoría - Artículo de Investigación Publicado',
    productoInfo: {
      tipoProducto: 'Artículo',
      nombreProducto: 'Deep Learning Applications in Computer Vision',
      revistaEventoEditorial: 'IEEE Transactions on Pattern Analysis'
    }
  },
  {
    id: 'cert10',
    tipo: 'Producto',
    beneficiario: 'Ing. Patricia González',
    cedula: '1001234579',
    estado: 'Vigente',
    fechaEmision: '2023-05-20',
    codigo: 'PROD-2023-002',
    descripcion: 'Certificado de Presentación - Ponencia en Congreso Internacional',
    productoInfo: {
      tipoProducto: 'Ponencia',
      nombreProducto: 'Web Development Frameworks: Comparative Analysis',
      revistaEventoEditorial: 'International Conference on Web Technologies 2023'
    }
  },
  {
    id: 'cert11',
    tipo: 'Producto',
    beneficiario: 'Dra. Elena Castro',
    cedula: '1001234582',
    estado: 'Vigente',
    fechaEmision: '2023-06-30',
    codigo: 'PROD-2023-003',
    descripcion: 'Certificado de Autoría - Libro Especializado Publicado',
    productoInfo: {
      tipoProducto: 'Libro',
      nombreProducto: 'Molecular Biology: Theory and Practice',
      revistaEventoEditorial: 'Academic Publishing House'
    }
  },
  {
    id: 'cert12',
    tipo: 'Producto',
    beneficiario: 'Ing. Mauricio Blanco',
    cedula: '1001234577',
    estado: 'Vigente',
    fechaEmision: '2023-07-15',
    codigo: 'PROD-2023-004',
    descripcion: 'Certificado de Registro - Patente de Invención',
    productoInfo: {
      tipoProducto: 'Patente',
      nombreProducto: 'Sistema Automático de Control Robótico Avanzado',
      revistaEventoEditorial: 'Oficina de Patentes y Marcas'
    }
  },
  {
    id: 'cert13',
    tipo: 'Producto',
    beneficiario: 'Ing. Igor Santana',
    cedula: '1001234589',
    estado: 'Vigente',
    fechaEmision: '2023-08-01',
    codigo: 'PROD-2023-005',
    descripcion: 'Certificado de Registro - Software Desarrollado',
    productoInfo: {
      tipoProducto: 'Software',
      nombreProducto: 'Advanced Analytics Platform for Research Management',
      revistaEventoEditorial: 'Dirección Nacional de Derechos de Autor'
    }
  }
];
