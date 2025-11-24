import { createContext, useContext, useState, ReactNode, useEffect } from 'react';

interface AuthContextType {
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  user: { email: string; name: string; role: string } | null;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState<{ email: string; name: string; role: string } | null>(null);

  // Verificar si hay sesión guardada al cargar
  useEffect(() => {
    const token = localStorage.getItem('authToken');
    if (token) {
      const email = localStorage.getItem('userEmail') || '';
      const name = localStorage.getItem('userName') || '';
      const role = localStorage.getItem('userRole') || '';
      setIsAuthenticated(true);
      setUser({ email, name, role });
    }
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    // Credenciales de prueba
    const validEmail = 'admin@acasgi.org';
    const validPassword = 'admin123';

    return new Promise((resolve) => {
      setTimeout(() => {
        if (email === validEmail && password === validPassword) {
          const token = 'token_' + Date.now();
          localStorage.setItem('authToken', token);
          localStorage.setItem('userEmail', email);
          localStorage.setItem('userName', 'Admin ACASGI');
          localStorage.setItem('userRole', 'Administrador');

          setIsAuthenticated(true);
          setUser({
            email,
            name: 'Admin ACASGI',
            role: 'Administrador'
          });
          resolve(true);
        } else {
          resolve(false);
        }
      }, 500);
    });
  };

  const logout = () => {
    localStorage.removeItem('authToken');
    localStorage.removeItem('userEmail');
    localStorage.removeItem('userName');
    localStorage.removeItem('userRole');
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
