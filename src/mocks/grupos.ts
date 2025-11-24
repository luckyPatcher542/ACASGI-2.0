export interface Grupo {
  id: string;
  nombre: string;
  categoria: 'Tecnología' | 'Ciencias Sociales' | 'Ciencias Naturales' | 'Matemáticas' | 'Otros';
  estado: 'Activo' | 'Inactivo';
  descripcion: string;
  lider: string;
  integrantes: number;
  semilleros: number;
  fechaCreacion: string;
}

export const gruposData: Grupo[] = [
  {
    id: '1',
    nombre: 'Inteligencia Artificial y Machine Learning',
    categoria: 'Tecnología',
    estado: 'Activo',
    descripcion: 'Investigación en algoritmos de IA y aprendizaje automático',
    lider: 'Dr. Carlos Mendoza',
    integrantes: 18,
    semilleros: 2,
    fechaCreacion: '2021-03-15'
  },
  {
    id: '2',
    nombre: 'Robótica y Automatización Industrial',
    categoria: 'Tecnología',
    estado: 'Activo',
    descripcion: 'Desarrollo de sistemas robóticos avanzados',
    lider: 'Ing. Ana García',
    integrantes: 15,
    semilleros: 2,
    fechaCreacion: '2021-06-20'
  },
  {
    id: '3',
    nombre: 'Desarrollo de Software y Aplicaciones Web',
    categoria: 'Tecnología',
    estado: 'Activo',
    descripcion: 'Investigación en arquitecturas modernas de software',
    lider: 'Ing. Juan López',
    integrantes: 22,
    semilleros: 3,
    fechaCreacion: '2020-09-10'
  },
  {
    id: '4',
    nombre: 'Biotecnología y Genética Molecular',
    categoria: 'Ciencias Naturales',
    estado: 'Activo',
    descripcion: 'Estudios en biología molecular y aplicaciones biotecnológicas',
    lider: 'Dra. María Rodríguez',
    integrantes: 16,
    semilleros: 2,
    fechaCreacion: '2021-01-12'
  },
  {
    id: '5',
    nombre: 'Energías Renovables y Sostenibilidad',
    categoria: 'Tecnología',
    estado: 'Activo',
    descripcion: 'Investigación en fuentes de energía limpias y sostenibles',
    lider: 'Ing. Pedro Sánchez',
    integrantes: 12,
    semilleros: 1,
    fechaCreacion: '2022-02-18'
  },
  {
    id: '6',
    nombre: 'Ciencias Sociales y Desarrollo Comunitario',
    categoria: 'Ciencias Sociales',
    estado: 'Activo',
    descripcion: 'Investigación en dinámicas sociales y desarrollo comunitario',
    lider: 'Dr. Fernando Díaz',
    integrantes: 14,
    semilleros: 2,
    fechaCreacion: '2021-05-22'
  },
  {
    id: '7',
    nombre: 'Matemáticas Aplicadas y Modelación',
    categoria: 'Matemáticas',
    estado: 'Activo',
    descripcion: 'Modelación matemática de fenómenos complejos',
    lider: 'Dr. Andrés Gómez',
    integrantes: 10,
    semilleros: 1,
    fechaCreacion: '2020-11-08'
  },
  {
    id: '8',
    nombre: 'Química Ambiental y Análisis',
    categoria: 'Ciencias Naturales',
    estado: 'Inactivo',
    descripcion: 'Análisis químico de contaminantes ambientales',
    lider: 'Dra. Sandra López',
    integrantes: 8,
    semilleros: 1,
    fechaCreacion: '2022-04-30'
  }
];
