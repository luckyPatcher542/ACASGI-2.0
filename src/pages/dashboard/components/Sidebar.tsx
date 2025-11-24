import { useLocation, useNavigate } from 'react-router-dom';

export default function Sidebar() {
  const location = useLocation();
  const navigate = useNavigate();

  const menuItems = [
    { id: 'dashboard', icon: 'ri-dashboard-line', label: 'Dashboard', path: '/dashboard' },
    { id: 'grupos', icon: 'ri-team-line', label: 'Grupos de Investigación', path: '/dashboard/grupos' },
    { id: 'semilleros', icon: 'ri-plant-line', label: 'Semilleros', path: '/dashboard/semilleros' },
    { id: 'integrantes', icon: 'ri-user-line', label: 'Integrantes', path: '/dashboard/integrantes' },
    { id: 'certificados', icon: 'ri-award-line', label: 'Certificados', path: '/dashboard/certificados' },
    { id: 'reportes', icon: 'ri-bar-chart-line', label: 'Reportes', path: '/dashboard/reportes' },
    { id: 'nosotros', icon: 'ri-information-line', label: 'Sobre Nosotros', path: '/dashboard/nosotros' },
  ];

  const isActive = (path: string) => location.pathname === path || location.pathname.startsWith(path + '/');

  return (
    <aside className="fixed left-0 top-0 h-screen w-64 bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 overflow-y-auto">
      {/* Logo */}
      <div className="p-6 border-b border-gray-200 dark:border-gray-700">
        <div
          onClick={() => navigate('/dashboard')}
          className="flex items-center gap-3 cursor-pointer hover:opacity-80 transition"
        >
          <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-500 rounded-lg flex items-center justify-center">
            <i className="ri-graduation-cap-line text-xl text-white"></i>
          </div>
          <div className="flex-1">
            <div className="font-pacifico text-lg text-blue-600 dark:text-blue-400">ACASGI</div>
            <div className="text-xs text-gray-500 dark:text-gray-400">Sistema de Gestión</div>
          </div>
        </div>
      </div>

      {/* Menu Items */}
      <nav className="p-4 space-y-2">
        {menuItems.map((item) => (
          <button
            key={item.id}
            onClick={() => navigate(item.path)}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
              isActive(item.path)
                ? 'bg-blue-50 dark:bg-gray-700 text-blue-600 dark:text-blue-400 border-l-4 border-blue-600 dark:border-blue-400'
                : 'text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700'
            }`}
          >
            <i className={`${item.icon} text-xl`}></i>
            <span className="text-sm font-medium">{item.label}</span>
          </button>
        ))}
      </nav>
    </aside>
  );
}
