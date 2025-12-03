import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useNotifications } from '../../../router/NotificationsContext';
import { useAuth } from '../../../router/AuthContext';

interface HeaderProps {
  title: string;
}

export default function Header({ title }: HeaderProps) {
  const navigate = useNavigate();
  const { notifications, unreadCount, markAsRead, refreshNotifications } = useNotifications();
  const { user, logout } = useAuth();
  const [isDark, setIsDark] = useState(document.documentElement.classList.contains('dark'));
  const [showProfile, setShowProfile] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const notificationsRef = useRef<HTMLDivElement>(null);

  // Ocultar notificaciones para líderes (visible solo para Administrador, Profesor, Semillerista)
  const showNotificationsIcon = user?.role && ['Administrador', 'Profesor', 'Semillerista'].includes(user.role);

  // Refrescar notificaciones cada segundo
  useEffect(() => {
    const interval = setInterval(() => {
      refreshNotifications();
    }, 1000);
    return () => clearInterval(interval);
  }, [refreshNotifications]);

  // Cerrar dropdown al hacer clic fuera
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (notificationsRef.current && !notificationsRef.current.contains(event.target as Node)) {
        setShowNotifications(false);
      }
    };

    if (showNotifications) {
      document.addEventListener('mousedown', handleClickOutside);
      return () => document.removeEventListener('mousedown', handleClickOutside);
    }
  }, [showNotifications]);

  const toggleTheme = () => {
    const html = document.documentElement;
    html.classList.toggle('dark');
    setIsDark(html.classList.contains('dark'));
    localStorage.setItem('theme', html.classList.contains('dark') ? 'dark' : 'light');
  };

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const handleNotificationClick = (notificationId: string) => {
    markAsRead(notificationId);
  };

  const getNotificationColor = (type: string) => {
    switch (type) {
      case 'member': return 'bg-blue-500';
      case 'certificate': return 'bg-green-500';
      case 'group': return 'bg-purple-500';
      case 'seedbed': return 'bg-yellow-500';
      case 'report': return 'bg-gray-500';
      default: return 'bg-gray-500';
    }
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

          {/* Notifications Dropdown */}
          <div className="relative" ref={notificationsRef}>
            <button
              onClick={() => setShowNotifications(!showNotifications)}
              className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition relative"
              title="Notificaciones"
            >
              {showNotificationsIcon && (
                <>
                  <i className="ri-notification-line text-xl text-gray-600 dark:text-gray-400"></i>
                  {unreadCount > 0 && (
                    <span className="absolute top-1 right-1 w-5 h-5 bg-red-500 rounded-full flex items-center justify-center text-white text-xs font-bold">
                      {unreadCount > 9 ? '9+' : unreadCount}
                    </span>
                  )}
                </>
              )}
            </button>

            {/* Notifications Dropdown Menu */}
            {showNotifications && showNotificationsIcon && (
              <div className="absolute right-0 mt-2 w-96 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-2xl z-50 max-h-96 overflow-y-auto">
                <div className="sticky top-0 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 px-4 py-3 flex items-center justify-between">
                  <h3 className="font-bold text-gray-900 dark:text-white">Notificaciones</h3>
                  {unreadCount > 0 && (
                    <span className="text-xs bg-red-500 text-white px-2 py-1 rounded-full">
                      {unreadCount} nuevas
                    </span>
                  )}
                </div>

                {notifications.length === 0 ? (
                  <div className="px-4 py-8 text-center text-gray-500 dark:text-gray-400">
                    <i className="ri-notification-off-line text-3xl mb-2 block"></i>
                    <p>No tienes notificaciones</p>
                  </div>
                ) : (
                  <div className="divide-y divide-gray-200 dark:divide-gray-700">
                    {notifications.slice(0, 10).map((notification) => (
                      <button
                        key={notification.id}
                        onClick={() => {
                          handleNotificationClick(notification.id);
                          setShowNotifications(false);
                        }}
                        className={`w-full px-4 py-3 hover:bg-gray-50 dark:hover:bg-gray-700 transition text-left ${
                          !notification.read ? 'bg-blue-50 dark:bg-gray-700 dark:bg-opacity-50' : ''
                        }`}
                      >
                        <div className="flex gap-3">
                          <div className={`w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 text-lg text-white ${getNotificationColor(notification.type)}`}>
                            <i className={notification.icon}></i>
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="text-sm text-gray-900 dark:text-white font-medium">{notification.description}</p>
                            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">{notification.timestamp}</p>
                          </div>
                          {!notification.read && (
                            <div className="w-2 h-2 bg-blue-500 rounded-full flex-shrink-0 mt-2"></div>
                          )}
                        </div>
                      </button>
                    ))}
                  </div>
                )}

                {notifications.length > 0 && (
                  <div className="sticky bottom-0 bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 px-4 py-2">
                    <button className="w-full text-sm text-blue-600 dark:text-blue-400 hover:underline py-2">
                      Ver todas las notificaciones
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Profile Dropdown */}
          <div className="relative">
            <button
              onClick={() => setShowProfile(!showProfile)}
              className="flex items-center gap-2 px-3 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition"
            >
              <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white text-sm font-bold">
                {user?.name?.charAt(0) || 'U'}
              </div>
              <div className="hidden sm:block">
                <div className="text-sm font-semibold text-gray-900 dark:text-white">{user?.name || 'Usuario'}</div>
                <div className="text-xs text-gray-500 dark:text-gray-400">{user?.role || 'Rol'}</div>
              </div>
              <i className={`ri-chevron-down-line transition ${showProfile ? 'rotate-180' : ''}`}></i>
            </button>

            {/* Dropdown Menu */}
            {showProfile && (
              <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-xl z-50">
                <button onClick={() => {
                  navigate('/dashboard/perfil');
                  setShowProfile(false);
                }} className="w-full text-left px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 transition flex items-center gap-2">
                  <i className="ri-user-line"></i>
                  Perfil
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
                  Logout
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
