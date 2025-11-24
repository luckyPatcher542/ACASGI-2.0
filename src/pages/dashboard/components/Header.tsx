import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

interface HeaderProps {
  title: string;
}

export default function Header({ title }: HeaderProps) {
  const navigate = useNavigate();
  const [isDark, setIsDark] = useState(document.documentElement.classList.contains('dark'));
  const [showProfile, setShowProfile] = useState(false);

  const userName = localStorage.getItem('userName') || 'Usuario';
  const userRole = localStorage.getItem('userRole') || 'Rol';

  const toggleTheme = () => {
    const html = document.documentElement;
    html.classList.toggle('dark');
    setIsDark(html.classList.contains('dark'));
    localStorage.setItem('theme', html.classList.contains('dark') ? 'dark' : 'light');
  };

  const handleLogout = () => {
    localStorage.removeItem('authToken');
    localStorage.removeItem('userEmail');
    localStorage.removeItem('userName');
    localStorage.removeItem('userRole');
    navigate('/login');
  };

  return (
    <header className="fixed top-0 left-64 right-0 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 z-40">
      <div className="flex items-center justify-between px-6 py-4 gap-4">
        {/* Title */}
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">{title}</h1>

        {/* Right - Controls */}
        <div className="flex items-center gap-4">
          {/* Theme Toggle */}
          <button
            onClick={toggleTheme}
            className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition"
            title="Cambiar tema"
          >
            {isDark ? (
              <i className="ri-sun-line text-xl text-yellow-500"></i>
            ) : (
              <i className="ri-moon-line text-xl text-gray-600"></i>
            )}
          </button>

          {/* Notifications */}
          <button className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition relative">
            <i className="ri-notification-line text-xl text-gray-600 dark:text-gray-400"></i>
            <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
          </button>

          {/* Profile Dropdown */}
          <div className="relative">
            <button
              onClick={() => setShowProfile(!showProfile)}
              className="flex items-center gap-2 px-3 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition"
            >
              <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white text-sm font-bold">
                {userName.charAt(0)}
              </div>
              <div className="hidden sm:block">
                <div className="text-sm font-semibold text-gray-900 dark:text-white">{userName}</div>
                <div className="text-xs text-gray-500 dark:text-gray-400">{userRole}</div>
              </div>
              <i className={`ri-chevron-down-line transition ${showProfile ? 'rotate-180' : ''}`}></i>
            </button>

            {/* Dropdown Menu */}
            {showProfile && (
              <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-xl">
                <button onClick={() => {
                  navigate('/dashboard/perfil');
                  setShowProfile(false);
                }} className="w-full text-left px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 transition flex items-center gap-2">
                  <i className="ri-user-line"></i>
                  Mi Perfil
                </button>
                <button onClick={() => {
                  navigate('/dashboard/configuracion');
                  setShowProfile(false);
                }} className="w-full text-left px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 transition flex items-center gap-2">
                  <i className="ri-settings-line"></i>
                  Configuración
                </button>
                <hr className="border-gray-200 dark:border-gray-700" />
                <button
                  onClick={handleLogout}
                  className="w-full text-left px-4 py-2 text-red-600 hover:bg-red-50 dark:hover:bg-red-900 dark:hover:bg-opacity-30 transition flex items-center gap-2"
                >
                  <i className="ri-logout-box-r-line"></i>
                  Cerrar Sesión
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
