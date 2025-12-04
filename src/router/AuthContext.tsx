import { createContext, useContext, useState, ReactNode, useEffect } from 'react';

export type Role = 'Administrador' | 'LiderGrupo' | 'LiderSemillero' | 'Profesor' | 'Semillerista';

export interface User {
  email: string;
  name: string;
  role: Role;
  afiliacion: {
    tipo: 'grupo' | 'semillero';
    id: string;
  } | null;
}

interface AuthContextType {
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  user: User | null;
}

const mockUsers: Array<{ email: string; password: string; role: Role; name: string; afiliacion: { tipo: 'grupo' | 'semillero'; id: string } | null }> = [
  { email: 'admin@acasgi.org', password: 'admin123', role: 'Administrador', name: 'Admin ACASGI', afiliacion: null },
  { email: 'lidergrupo@acasgi.org', password: 'liderg123', role: 'LiderGrupo', name: 'Líder Grupo', afiliacion: { tipo: 'grupo', id: '1' } },
  { email: 'lidersemillero@acasgi.org', password: 'liders123', role: 'LiderSemillero', name: 'Líder Semillero', afiliacion: { tipo: 'semillero', id: 's1' } },
  { email: 'profesor@acasgi.org', password: 'prof123', role: 'Profesor', name: 'Profesor Ejemplo', afiliacion: { tipo: 'grupo', id: '1' } },
  { email: 'semillerista@acasgi.org', password: 'sem123', role: 'Semillerista', name: 'Semillerista Ej', afiliacion: { tipo: 'semillero', id: 's1' } },
];

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState<User | null>(null);

  // Verificar si hay sesión guardada al cargar
  useEffect(() => {
    const userData = localStorage.getItem('userData');
    if (userData) {
      try {
        const parsedUser = JSON.parse(userData);
        setIsAuthenticated(true);
        setUser(parsedUser);
      } catch (e) {
        console.error('Error cargando userData:', e);
      }
    }
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const mockUser = mockUsers.find(u => u.email === email && u.password === password);
        if (mockUser) {
          const userData: User = {
            email: mockUser.email,
            name: mockUser.name,
            role: mockUser.role,
            afiliacion: mockUser.afiliacion,
          };
          localStorage.setItem('userData', JSON.stringify(userData));
          setIsAuthenticated(true);
          setUser(userData);
          resolve(true);
        } else {
          resolve(false);
        }
      }, 500);
    });
  };

  const logout = () => {
    localStorage.removeItem('userData');
    setIsAuthenticated(false);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout, user }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth debe ser usado dentro de AuthProvider');
  }
  return context;
}
