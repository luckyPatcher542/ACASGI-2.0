export interface Semillero {
  id: string;
  nombre: string;
  grupoPadre: string;
  estado: 'Activo' | 'Inactivo';
  descripcion: string;
  coordinador: string;
  integrantes: number;
  fechaCreacion: string;
}

export const semillerosData: Semillero[] = [
  {
    id: 's1',
    nombre: 'Semillero de Inteligencia Artificial',
    grupoPadre: '1',
    estado: 'Activo',
    descripcion: 'Formación en técnicas de IA y machine learning',
    coordinador: 'Mg. Luis Martínez',
    integrantes: 8,
    fechaCreacion: '2021-04-01'
  },
  {
    id: 's2',
    nombre: 'Semillero de Deep Learning',
    grupoPadre: '1',
    estado: 'Activo',
    descripcion: 'Especialización en redes neuronales profundas',
    coordinador: 'Ing. Roberto Silva',
    integrantes: 6,
    fechaCreacion: '2021-08-15'
  },
  {
    id: 's3',
    nombre: 'Semillero de Robótica',
    grupoPadre: '2',
    estado: 'Activo',
    descripcion: 'Desarrollo de robots y sistemas automáticos',
    coordinador: 'Ing. Mauricio Blanco',
    integrantes: 7,
    fechaCreacion: '2021-07-10'
  },
  {
    id: 's4',
    nombre: 'Semillero de Drones y UAV',
    grupoPadre: '2',
    estado: 'Activo',
    descripcion: 'Investigación en vehículos aéreos no tripulados',
    coordinador: 'Ing. Carlos Ruiz',
    integrantes: 5,
    fechaCreacion: '2022-01-20'
  },
  {
    id: 's5',
    nombre: 'Semillero de Desarrollo Web',
    grupoPadre: '3',
    estado: 'Activo',
    descripcion: 'Formación en tecnologías web modernas',
    coordinador: 'Ing. Patricia González',
    integrantes: 9,
    fechaCreacion: '2020-10-05'
  },
  {
    id: 's6',
    nombre: 'Semillero de Desarrollo Mobile',
    grupoPadre: '3',
    estado: 'Activo',
    descripcion: 'Desarrollo de aplicaciones móviles multiplataforma',
    coordinador: 'Ing. Daniel Torres',
    integrantes: 8,
    fechaCreacion: '2021-09-12'
  },
  {
    id: 's7',
    nombre: 'Semillero de Cloud Computing',
    grupoPadre: '3',
    estado: 'Activo',
    descripcion: 'Implementación de soluciones en la nube',
    coordinador: 'Ing. Mariana Pérez',
    integrantes: 6,
    fechaCreacion: '2022-03-18'
  },
  {
    id: 's8',
    nombre: 'Semillero de Biotecnología Molecular',
    grupoPadre: '4',
    estado: 'Activo',
    descripcion: 'Técnicas avanzadas de biología molecular',
    coordinador: 'Dra. Elena Castro',
    integrantes: 7,
    fechaCreacion: '2021-02-14'
  },
  {
    id: 's9',
    nombre: 'Semillero de Genómica',
    grupoPadre: '4',
    estado: 'Activo',
    descripcion: 'Análisis de secuencias genómicas',
    coordinador: 'Dr. Javier Hernández',
    integrantes: 5,
    fechaCreacion: '2021-11-22'
  },
  {
    id: 's10',
    nombre: 'Semillero de Energía Solar',
    grupoPadre: '5',
    estado: 'Activo',
    descripcion: 'Investigación en tecnología solar fotovoltaica',
    coordinador: 'Ing. Ricardo Mejía',
    integrantes: 6,
    fechaCreacion: '2022-03-01'
  },
  {
    id: 's11',
    nombre: 'Semillero de Energía Eólica',
    grupoPadre: '5',
    estado: 'Activo',
    descripcion: 'Estudio de sistemas de energía eólica',
    coordinador: 'Ing. Alejandro Fuentes',
    integrantes: 4,
    fechaCreacion: '2022-05-10'
  },
  {
    id: 's12',
    nombre: 'Semillero de Desarrollo Comunitario',
    grupoPadre: '6',
    estado: 'Activo',
    descripcion: 'Proyectos de impacto social comunitario',
    coordinador: 'Dra. Catalina Vargas',
    integrantes: 7,
    fechaCreacion: '2021-06-08'
  },
  {
    id: 's13',
    nombre: 'Semillero de Políticas Sociales',
    grupoPadre: '6',
    estado: 'Activo',
    descripcion: 'Análisis de políticas públicas y sociales',
    coordinador: 'Dr. Víctor Reyes',
    integrantes: 6,
    fechaCreacion: '2021-09-25'
  },
  {
    id: 's14',
    nombre: 'Semillero de Modelación Matemática',
    grupoPadre: '7',
    estado: 'Activo',
    descripcion: 'Desarrollo de modelos matemáticos aplicados',
    coordinador: 'Dr. Ismael García',
    integrantes: 5,
    fechaCreacion: '2021-01-30'
  },
  {
    id: 's15',
    nombre: 'Semillero de Análisis Químico',
    grupoPadre: '8',
    estado: 'Inactivo',
    descripcion: 'Técnicas de análisis químico ambiental',
    coordinador: 'Dra. Lucía Moreno',
    integrantes: 4,
    fechaCreacion: '2022-05-15'
  }
];
