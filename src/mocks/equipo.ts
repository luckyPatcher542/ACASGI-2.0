export interface Equipo {
  id: string;
  nombre: string;
  cargo: string;
  foto: string;
  email: string;
}

export const equipoData: Equipo[] = [
  {
    id: '1',
    nombre: 'Dra. Margarita Fernández',
    cargo: 'Directora Ejecutiva',
    foto: 'https://ui-avatars.com/api/?name=Margarita+Fernandez&background=3B82F6&color=fff',
    email: 'margarita.fernandez@acasgi.org'
  },
  {
    id: '2',
    nombre: 'Dr. Ricardo Morales',
    cargo: 'Coordinador Académico',
    foto: 'https://ui-avatars.com/api/?name=Ricardo+Morales&background=9333EA&color=fff',
    email: 'ricardo.morales@acasgi.org'
  },
  {
    id: '3',
    nombre: 'Ing. Sofía Gutiérrez',
    cargo: 'Jefe de Proyectos',
    foto: 'https://ui-avatars.com/api/?name=Sofia+Gutierrez&background=10B981&color=fff',
    email: 'sofia.gutierrez@acasgi.org'
  },
  {
    id: '4',
    nombre: 'Abg. Hernando López',
    cargo: 'Asesor Legal',
    foto: 'https://ui-avatars.com/api/?name=Hernando+Lopez&background=3B82F6&color=fff',
    email: 'hernando.lopez@acasgi.org'
  }
];
