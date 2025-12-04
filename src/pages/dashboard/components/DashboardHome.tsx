import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../../router/AuthContext';
import axios from 'axios';
import { getNotifications } from '../../../mocks/notifications';

export default function DashboardHome() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [notifications, setNotifications] = useState(getNotifications());
  const [grupos, setGrupos] = useState<any[]>([]);
  const [semilleros, setSemilleros] = useState<any[]>([]);
  const [certificados, setCertificados] = useState<any[]>([]);
  const [integrantes, setIntegrantes] = useState<any[]>([]);

  // Actualizar notificaciones cuando cambie algo
  useEffect(() => {
    const updateNotifications = () => {
      setNotifications(getNotifications());
    };

    // Actualizar cada segundo para ver cambios en tiempo real
    const interval = setInterval(updateNotifications, 1000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const fetchKpis = async () => {
      try {
        const [gRes, sRes, cRes, iRes] = await Promise.all([
          axios.get('http://localhost:4000/api/grupo'),
          axios.get('http://localhost:4000/api/semillero'),
          axios.get('http://localhost:4000/api/certificado'),
          axios.get('http://localhost:4000/api/integrante')
        ]);
        const gruposRows = Array.isArray(gRes.data) ? gRes.data : [];
        const semRows = Array.isArray(sRes.data) ? sRes.data : [];
        const certRows = Array.isArray(cRes.data) ? cRes.data : [];
        const integrantesRows = Array.isArray(iRes.data) ? iRes.data : [];

        // Normalizar mínimamente para KPIs
        const normalizedGrupos = gruposRows.map((r: any) => ({
          id: String(r.ID_GRUPO ?? r.id ?? ''),
          nombre: r.NOMBRE ?? r.nombre ?? '',
          categoria: r.FACULTAD ?? r.categoria ?? '',
          estado: (r.ESTADO === 1 || r.ESTADO === '1') ? 'Activo' : 'Inactivo'
        }));

        const normalizedSemilleros = semRows.map((s: any) => ({
          id: String(s.ID_SEMILLERO ?? s.id ?? ''),
          nombre: s.NOMBRE ?? s.nombre ?? '',
          estado: (s.ESTADO === 1 || s.ESTADO === '1') ? 'Activo' : 'Inactivo'
        }));

        const normalizedCerts = certRows.map((r: any) => ({
          id: String(r.ID_CERTIFICADO ?? r.id ?? ''),
        }));

        const normalizedIntegrantes = integrantesRows.map((i: any) => ({
          id: String(i.ID_PERSONA ?? i.id ?? ''),
          nombre: i.NOMBRE ?? i.nombre ?? '',
          apellido: i.APELLIDO ?? i.apellido ?? ''
        }));

        setGrupos(normalizedGrupos);
        setSemilleros(normalizedSemilleros);
        setCertificados(normalizedCerts);
        setIntegrantes(normalizedIntegrantes);
      } catch (err) {
        console.error('Error cargando KPIs:', err);
      }
    };
    fetchKpis();
  }, []);

  // KPIs - Mismos para todos
  const totalGrupos = grupos.length;
  const activeSemilleros = semilleros.filter(s => s.estado === 'Activo').length;
  const totalIntegrantes = integrantes.length;
  const totalCertificados = certificados.length;

  // Actividad Reciente - Usar notificaciones del sistema o valores por defecto
  const recentActivities = notifications.length > 0 ? notifications.slice(0, 5) : [
    {
      id: '1',
      icon: 'ri-user-add-line',
      description: 'Nuevo integrante agregado: Maria González',
      timestamp: 'Hace 2 horas',
      type: 'member' as const
    },
    {
      id: '2',
      icon: 'ri-award-line',
      description: 'Certificado emitido: Certificado de Adscripción',
      timestamp: 'Hace 5 horas',
      type: 'certificate' as const
    },
    {
      id: '3',
      icon: 'ri-team-fill',
      description: 'Nuevo grupo creado: Inteligencia Artificial',
      timestamp: 'Ayer',
      type: 'group' as const
    },
    {
      id: '4',
      icon: 'ri-team-fill',
      description: 'Semillero actualizado: Deep Learning',
      timestamp: 'Hace 2 días',
      type: 'seedbed' as const
    },
    {
      id: '5',
      icon: 'ri-bar-chart-line',
      description: 'Reporte mensual generado',
      timestamp: 'Hace 3 días',
      type: 'report' as const
    }
  ];

  // Función para renderizar acciones rápidas según el rol
  const renderQuickActions = () => {
    switch (user?.role) {
      case 'Administrador':
        return (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <button
              onClick={() => navigate('/dashboard/grupos')}
              className="group relative bg-gradient-to-br from-blue-50 to-blue-100 dark:from-gray-700 dark:to-gray-600 rounded-xl p-8 border border-blue-200 dark:border-gray-500 hover:shadow-xl hover:border-blue-300 dark:hover:border-blue-400 transition-all duration-300 text-left overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500 to-blue-600 opacity-0 group-hover:opacity-5 transition-opacity duration-300"></div>
              <div className="relative">
                <div className="mb-4 inline-block p-3 bg-blue-100 dark:bg-gray-600 rounded-lg">
                  <i className="ri-team-fill text-4xl text-blue-600 dark:text-blue-400"></i>
                </div>
                <h4 className="font-bold text-gray-900 dark:text-white mb-2 text-base">Grupos</h4>
                <p className="text-sm text-gray-600 dark:text-gray-300">Visualiza y gestiona todos los grupos</p>
              </div>
            </button>

            <button
              onClick={() => navigate('/dashboard/semilleros')}
              className="group relative bg-gradient-to-br from-blue-50 to-blue-100 dark:from-gray-700 dark:to-gray-600 rounded-xl p-8 border border-blue-200 dark:border-gray-500 hover:shadow-xl hover:border-blue-300 dark:hover:border-blue-400 transition-all duration-300 text-left overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500 to-blue-600 opacity-0 group-hover:opacity-5 transition-opacity duration-300"></div>
              <div className="relative">
                <div className="mb-4 inline-block p-3 bg-blue-100 dark:bg-gray-600 rounded-lg">
                  <i className="ri-team-fill text-4xl text-blue-600 dark:text-blue-400"></i>
                </div>
                <h4 className="font-bold text-gray-900 dark:text-white mb-2 text-base">Semilleros</h4>
                <p className="text-sm text-gray-600 dark:text-gray-300">Explora los semilleros de investigación</p>
              </div>
            </button>

            <button
              onClick={() => navigate('/dashboard/certificados')}
              className="group relative bg-gradient-to-br from-purple-50 to-purple-100 dark:from-gray-700 dark:to-gray-600 rounded-xl p-8 border border-purple-200 dark:border-gray-500 hover:shadow-xl hover:border-purple-300 dark:hover:border-purple-400 transition-all duration-300 text-left overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-purple-500 to-purple-600 opacity-0 group-hover:opacity-5 transition-opacity duration-300"></div>
              <div className="relative">
                <div className="mb-4 inline-block p-3 bg-purple-100 dark:bg-gray-600 rounded-lg">
                  <i className="ri-award-line text-4xl text-purple-600 dark:text-purple-400"></i>
                </div>
                <h4 className="font-bold text-gray-900 dark:text-white mb-2 text-base">Certificados</h4>
                <p className="text-sm text-gray-600 dark:text-gray-300">Crea y descarga certificados</p>
              </div>
            </button>
          </div>
        );

      case 'LiderGrupo':
        return (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <button
              onClick={() => navigate('/dashboard/grupos')}
              className="group relative bg-gradient-to-br from-blue-50 to-blue-100 dark:from-gray-700 dark:to-gray-600 rounded-xl p-8 border border-blue-200 dark:border-gray-500 hover:shadow-xl transition-all duration-300 text-left overflow-hidden"
            >
              <div className="relative">
                <div className="mb-4 inline-block p-3 bg-blue-100 dark:bg-gray-600 rounded-lg">
                  <i className="ri-team-fill text-4xl text-blue-600 dark:text-blue-400"></i>
                </div>
                <h4 className="font-bold text-gray-900 dark:text-white mb-2 text-base">Ver Grupo</h4>
                <p className="text-sm text-gray-600 dark:text-gray-300">Información del grupo</p>
              </div>
            </button>

            <button
              onClick={() => navigate('/dashboard/integrantes')}
              className="group relative bg-gradient-to-br from-purple-50 to-purple-100 dark:from-gray-700 dark:to-gray-600 rounded-xl p-8 border border-purple-200 dark:border-gray-500 hover:shadow-xl transition-all duration-300 text-left overflow-hidden"
            >
              <div className="relative">
                <div className="mb-4 inline-block p-3 bg-purple-100 dark:bg-gray-600 rounded-lg">
                  <i className="ri-user-fill text-4xl text-purple-600 dark:text-purple-400"></i>
                </div>
                <h4 className="font-bold text-gray-900 dark:text-white mb-2 text-base">Ver Integrantes</h4>
                <p className="text-sm text-gray-600 dark:text-gray-300">Gestiona tu equipo</p>
              </div>
            </button>

            <button
              onClick={() => navigate('/dashboard/certificados')}
              className="group relative bg-gradient-to-br from-green-50 to-green-100 dark:from-gray-700 dark:to-gray-600 rounded-xl p-8 border border-green-200 dark:border-gray-500 hover:shadow-xl transition-all duration-300 text-left overflow-hidden"
            >
              <div className="relative">
                <div className="mb-4 inline-block p-3 bg-green-100 dark:bg-gray-600 rounded-lg">
                  <i className="ri-award-line text-4xl text-green-600 dark:text-green-400"></i>
                </div>
                <h4 className="font-bold text-gray-900 dark:text-white mb-2 text-base">Ver Certificados</h4>
                <p className="text-sm text-gray-600 dark:text-gray-300">Certificados emitidos</p>
              </div>
            </button>
          </div>
        );

      case 'LiderSemillero':
        return (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <button
              onClick={() => navigate('/dashboard/semilleros')}
              className="group relative bg-gradient-to-br from-green-50 to-green-100 dark:from-gray-700 dark:to-gray-600 rounded-xl p-8 border border-green-200 dark:border-gray-500 hover:shadow-xl transition-all duration-300 text-left overflow-hidden"
            >
              <div className="relative">
                <div className="mb-4 inline-block p-3 bg-green-100 dark:bg-gray-600 rounded-lg">
                  <i className="ri-team-fill text-4xl text-green-600 dark:text-green-400"></i>
                </div>
                <h4 className="font-bold text-gray-900 dark:text-white mb-2 text-base">Ver Semillero</h4>
                <p className="text-sm text-gray-600 dark:text-gray-300">Información del semillero</p>
              </div>
            </button>

            <button
              onClick={() => navigate('/dashboard/integrantes')}
              className="group relative bg-gradient-to-br from-purple-50 to-purple-100 dark:from-gray-700 dark:to-gray-600 rounded-xl p-8 border border-purple-200 dark:border-gray-500 hover:shadow-xl transition-all duration-300 text-left overflow-hidden"
            >
              <div className="relative">
                <div className="mb-4 inline-block p-3 bg-purple-100 dark:bg-gray-600 rounded-lg">
                  <i className="ri-user-fill text-4xl text-purple-600 dark:text-purple-400"></i>
                </div>
                <h4 className="font-bold text-gray-900 dark:text-white mb-2 text-base">Ver Integrantes</h4>
                <p className="text-sm text-gray-600 dark:text-gray-300">Gestiona tu equipo</p>
              </div>
            </button>

            <button
              onClick={() => navigate('/dashboard/certificados')}
              className="group relative bg-gradient-to-br from-blue-50 to-blue-100 dark:from-gray-700 dark:to-gray-600 rounded-xl p-8 border border-blue-200 dark:border-gray-500 hover:shadow-xl transition-all duration-300 text-left overflow-hidden"
            >
              <div className="relative">
                <div className="mb-4 inline-block p-3 bg-blue-100 dark:bg-gray-600 rounded-lg">
                  <i className="ri-award-line text-4xl text-blue-600 dark:text-blue-400"></i>
                </div>
                <h4 className="font-bold text-gray-900 dark:text-white mb-2 text-base">Ver Certificados</h4>
                <p className="text-sm text-gray-600 dark:text-gray-300">Certificados emitidos</p>
              </div>
            </button>
          </div>
        );

      case 'Profesor':
        return (
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <button
              onClick={() => navigate('/dashboard/grupos')}
              className="group relative bg-gradient-to-br from-blue-50 to-blue-100 dark:from-gray-700 dark:to-gray-600 rounded-xl p-6 border border-blue-200 dark:border-gray-500 hover:shadow-lg transition-all duration-300 text-left overflow-hidden"
            >
              <div className="relative">
                <div className="mb-3 inline-block p-2 bg-blue-100 dark:bg-gray-600 rounded-lg">
                  <i className="ri-team-fill text-2xl text-blue-600 dark:text-blue-400"></i>
                </div>
                <h4 className="font-bold text-gray-900 dark:text-white text-sm">Ver Grupos</h4>
              </div>
            </button>

            <button
              onClick={() => navigate('/dashboard/semilleros')}
              className="group relative bg-gradient-to-br from-green-50 to-green-100 dark:from-gray-700 dark:to-gray-600 rounded-xl p-6 border border-green-200 dark:border-gray-500 hover:shadow-lg transition-all duration-300 text-left overflow-hidden"
            >
              <div className="relative">
                <div className="mb-3 inline-block p-2 bg-green-100 dark:bg-gray-600 rounded-lg">
                  <i className="ri-team-fill text-2xl text-green-600 dark:text-green-400"></i>
                </div>
                <h4 className="font-bold text-gray-900 dark:text-white text-sm">Ver Semilleros</h4>
              </div>
            </button>

            <button
              onClick={() => navigate('/dashboard/integrantes')}
              className="group relative bg-gradient-to-br from-purple-50 to-purple-100 dark:from-gray-700 dark:to-gray-600 rounded-xl p-6 border border-purple-200 dark:border-gray-500 hover:shadow-lg transition-all duration-300 text-left overflow-hidden"
            >
              <div className="relative">
                <div className="mb-3 inline-block p-2 bg-purple-100 dark:bg-gray-600 rounded-lg">
                  <i className="ri-user-fill text-2xl text-purple-600 dark:text-purple-400"></i>
                </div>
                <h4 className="font-bold text-gray-900 dark:text-white text-sm">Ver Integrantes</h4>
              </div>
            </button>

            <button
              onClick={() => navigate('/dashboard/certificados')}
              className="group relative bg-gradient-to-br from-yellow-50 to-yellow-100 dark:from-gray-700 dark:to-gray-600 rounded-xl p-6 border border-yellow-200 dark:border-gray-500 hover:shadow-lg transition-all duration-300 text-left overflow-hidden"
            >
              <div className="relative">
                <div className="mb-3 inline-block p-2 bg-yellow-100 dark:bg-gray-600 rounded-lg">
                  <i className="ri-award-line text-2xl text-yellow-600 dark:text-yellow-400"></i>
                </div>
                <h4 className="font-bold text-gray-900 dark:text-white text-sm">Ver Certificados</h4>
              </div>
            </button>
          </div>
        );

      case 'Semillerista':
        return (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <button
              onClick={() => navigate('/dashboard/semilleros')}
              className="group relative bg-gradient-to-br from-yellow-50 to-yellow-100 dark:from-gray-700 dark:to-gray-600 rounded-xl p-8 border border-yellow-200 dark:border-gray-500 hover:shadow-xl transition-all duration-300 text-left overflow-hidden"
            >
              <div className="relative">
                <div className="mb-4 inline-block p-3 bg-yellow-100 dark:bg-gray-600 rounded-lg">
                  <i className="ri-team-fill text-4xl text-yellow-600 dark:text-yellow-400"></i>
                </div>
                <h4 className="font-bold text-gray-900 dark:text-white mb-2 text-base">Ver Semillero</h4>
                <p className="text-sm text-gray-600 dark:text-gray-300">Información del semillero</p>
              </div>
            </button>

            <button
              onClick={() => navigate('/dashboard/certificados')}
              className="group relative bg-gradient-to-br from-purple-50 to-purple-100 dark:from-gray-700 dark:to-gray-600 rounded-xl p-8 border border-purple-200 dark:border-gray-500 hover:shadow-xl transition-all duration-300 text-left overflow-hidden"
            >
              <div className="relative">
                <div className="mb-4 inline-block p-3 bg-purple-100 dark:bg-gray-600 rounded-lg">
                  <i className="ri-award-line text-4xl text-purple-600 dark:text-purple-400"></i>
                </div>
                <h4 className="font-bold text-gray-900 dark:text-white mb-2 text-base">Ver Certificados</h4>
                <p className="text-sm text-gray-600 dark:text-gray-300">Certificados disponibles</p>
              </div>
            </button>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="space-y-6">
      {/* KPIs Section - Visibles para todos */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          {
            label: 'Total de Grupos',
            value: totalGrupos,
            change: '+12%',
            icon: 'ri-team-fill',
            color: 'blue'
          },
          {
            label: 'Semilleros Activos',
            value: activeSemilleros,
            change: '+8%',
            icon: 'ri-team-fill',
            color: 'green'
          },
          {
            label: 'Total Integrantes',
            value: totalIntegrantes,
            change: '+15%',
            icon: 'ri-user-fill',
            color: 'purple'
          },
          {
            label: 'Certificados Emitidos',
            value: totalCertificados,
            change: '+25%',
            icon: 'ri-award-fill',
            color: 'yellow'
          }
        ].map((kpi, i) => (
          <div
            key={i}
            className="bg-white dark:bg-gray-800 rounded-xl p-6 card-shadow"
          >
            <div className="flex items-start justify-between mb-4">
              <div>
                <p className="text-gray-600 dark:text-gray-400 text-sm mb-1">{kpi.label}</p>
                <h3 className="text-4xl font-bold text-gray-900 dark:text-white">{kpi.value}</h3>
              </div>
              <div
                className={`w-12 h-12 rounded-lg flex items-center justify-center text-2xl text-white ${
                  kpi.color === 'blue' ? 'bg-blue-500' :
                  kpi.color === 'green' ? 'bg-green-500' :
                  kpi.color === 'purple' ? 'bg-purple-500' :
                  'bg-yellow-500'
                }`}
              >
                <i className={kpi.icon}></i>
              </div>
            </div>
            <p className={`text-sm font-semibold ${
              kpi.change.startsWith('+') ? 'text-green-600' : 'text-red-600'
            }`}>
              {kpi.change} vs mes anterior
            </p>
          </div>
        ))}
      </div>

      {/* Charts Section - Visibles para todos */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Growth Chart */}
        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 card-shadow">
          <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">
            Crecimiento Mensual de Grupos
          </h3>
          <div className="h-64 flex items-end justify-around gap-2">
            {[65, 70, 75, 78, 82, 85, 87, 89, 91, 88, 90, 92].map((value, i) => (
              <div key={i} className="flex flex-col items-center flex-1">
                <div className="w-full bg-blue-500 rounded-t-lg" style={{ height: `${(value / 100) * 240}px` }}></div>
                <span className="text-xs mt-2 text-gray-600 dark:text-gray-400">
                  {['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'][i]}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Distribution Chart - Roles reales del sistema */}
        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 card-shadow">
          <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">
            Distribución de Integrantes por Rol
          </h3>
          <div className="h-64 flex items-center justify-around">
            {[
              { role: 'Administrador', count: 1, color: 'bg-blue-500', percentage: 1 },
              { role: 'Líder de Grupo', count: 4, color: 'bg-purple-500', percentage: 3 },
              { role: 'Líder de Semillero', count: 5, color: 'bg-green-500', percentage: 4 },
              { role: 'Profesor', count: 20, color: 'bg-yellow-500', percentage: 16 },
              { role: 'Semillerista', count: 95, color: 'bg-indigo-500', percentage: 76 }
            ].map((item, i) => (
              <div key={i} className="flex flex-col items-center">
                <div className="relative w-24 h-24 rounded-full flex items-center justify-center text-white font-bold">
                  <div className={`absolute inset-0 ${item.color} rounded-full opacity-80`}></div>
                  <div className="relative text-center">
                    <div className="text-2xl font-bold">{item.percentage}%</div>
                    <div className="text-xs">{item.count}</div>
                  </div>
                </div>
                <span className="text-xs mt-2 text-gray-600 dark:text-gray-400 text-center">{item.role}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Activity and Quick Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Activity */}
        <div className="lg:col-span-1 bg-white dark:bg-gray-800 rounded-xl p-6 card-shadow">
          <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">
            Actividad Reciente
          </h3>
          <div className="space-y-4">
            {recentActivities.map((activity) => (
              <div key={activity.id} className="flex gap-4 pb-4 border-b border-gray-200 dark:border-gray-700 last:border-0 last:pb-0">
                <div className={`w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 text-lg text-white ${
                  activity.type === 'member' ? 'bg-blue-500' :
                  activity.type === 'certificate' ? 'bg-green-500' :
                  activity.type === 'group' ? 'bg-purple-500' :
                  activity.type === 'seedbed' ? 'bg-yellow-500' :
                  'bg-gray-500'
                }`}>
                  <i className={activity.icon}></i>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-gray-900 dark:text-white">{activity.description}</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">{activity.timestamp}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Actions - Filtradas por rol */}
        <div className="lg:col-span-2 bg-white dark:bg-gray-800 rounded-xl p-6 card-shadow">
          <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-6">
            Acciones Rápidas
          </h3>
          {renderQuickActions()}
        </div>
      </div>
    </div>
  );
}
