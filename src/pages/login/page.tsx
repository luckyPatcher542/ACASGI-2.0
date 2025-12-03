import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../router/AuthContext';

export default function LoginPage() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    const success = await login(email, password);
    
    if (success) {
      navigate('/dashboard', { replace: true });
    } else {
      setError('Credenciales incorrectas. Usa admin@acasgi.org / admin123');
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-500 via-purple-500 to-blue-600 flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl p-8 md:p-10">
          {/* Logo */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full mb-4">
              <i className="ri-graduation-cap-line text-3xl text-white"></i>
            </div>
            <h1 className="text-3xl font-bold text-blue-600 dark:text-blue-400">ACASGI</h1>
            <p className="text-gray-600 dark:text-gray-400 text-sm mt-2">
              Sistema de Gestión
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            {error && (
              <div className="bg-red-100 dark:bg-red-900 border border-red-400 dark:border-red-700 text-red-800 dark:text-red-200 px-4 py-3 rounded-lg flex items-center gap-2">
                <i className="ri-error-warning-line text-xl"></i>
                {error}
              </div>
            )}

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Correo Electrónico
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@acasgi.org"
                className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Contraseña
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="admin123"
                className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full btn-primary py-3 font-semibold text-lg disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? (
                <span className="flex items-center justify-center gap-2">
                  <i className="ri-loader-4-line animate-spin"></i>
                  Ingresando...
                </span>
              ) : (
                'Iniciar Sesión'
              )}
            </button>
          </form>

          {/* Info Box */}
          <div className="mt-8 bg-blue-50 dark:bg-gray-700 rounded-lg p-4 border border-blue-200 dark:border-gray-600">
            <h3 className="font-semibold text-blue-900 dark:text-blue-200 mb-2">Credenciales de Prueba:</h3>
            <p className="text-sm text-blue-800 dark:text-blue-300 space-y-1">
              <div>📧 <strong>Email:</strong> admin@acasgi.org</div>
              <div>🔐 <strong>Contraseña:</strong> admin123</div>
            </p>
          </div>

          {/* Footer Link */}
          <div className="mt-8 text-center">
            <p className="text-gray-600 dark:text-gray-400 text-sm">
              ¿Primera vez aquí?{' '}
              <button
                onClick={() => navigate('/')}
                className="text-blue-600 dark:text-blue-400 font-semibold hover:underline"
              >
                Volver al inicio
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
