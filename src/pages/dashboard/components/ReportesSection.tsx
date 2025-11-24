import { useState } from 'react';

export default function ReportesSection() {
  const [selectedPeriod, setSelectedPeriod] = useState('mes');
  const [selectedCategory, setSelectedCategory] = useState('todas');

  const periods = [
    { value: 'semana', label: 'Última semana' },
    { value: 'mes', label: 'Último mes' },
    { value: 'trimestre', label: 'Último trimestre' },
    { value: 'año', label: 'Último año' }
  ];

  const categories = [
    { value: 'todas', label: 'Todas' },
    { value: 'tecnologia', label: 'Tecnología' },
    { value: 'ciencias-sociales', label: 'Ciencias Sociales' },
    { value: 'ciencias-naturales', label: 'Ciencias Naturales' },
    { value: 'matematicas', label: 'Matemáticas' }
  ];

  return (
    <div className="space-y-6">
      {/* Filters */}
      <div className="bg-white dark:bg-gray-800 rounded-xl p-6 card-shadow">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Rango de Fechas</label>
            <select
              value={selectedPeriod}
              onChange={(e) => setSelectedPeriod(e.target.value)}
              className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
            >
              {periods.map(period => (
                <option key={period.value} value={period.value}>{period.label}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Categoría</label>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
            >
              {categories.map(cat => (
                <option key={cat.value} value={cat.value}>{cat.label}</option>
              ))}
            </select>
          </div>

          <div className="flex items-end">
            <button className="w-full btn-primary py-2">
              <i className="ri-filter-line"></i> Aplicar Filtros
            </button>
          </div>
        </div>
      </div>

      {/* KPIs */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { label: 'Productividad General', value: '87%', change: '+5%', icon: 'ri-progress-2-line', color: 'from-blue-500 to-cyan-500' },
          { label: 'Proyectos Activos', value: '24', change: '+3', icon: 'ri-lightbulb-line', color: 'from-green-500 to-emerald-500' },
          { label: 'Publicaciones', value: '156', change: '+12%', icon: 'ri-file-list-line', color: 'from-purple-500 to-pink-500' },
          { label: 'Impacto Social', value: '92%', change: '+8%', icon: 'ri-heart-line', color: 'from-yellow-500 to-orange-500' }
        ].map((kpi, i) => (
          <div key={i} className={`bg-gradient-to-br ${kpi.color} rounded-xl p-6 card-shadow text-white transform transition hover:scale-105`}>
            <div className="flex items-start justify-between mb-4">
              <div>
                <p className="text-white text-opacity-80 text-sm mb-1">{kpi.label}</p>
                <h3 className="text-3xl font-bold">{kpi.value}</h3>
              </div>
              <i className={`${kpi.icon} text-4xl text-white text-opacity-50`}></i>
            </div>
            <p className="text-white text-opacity-90 text-sm font-semibold">{kpi.change}</p>
          </div>
        ))}
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Activity Chart */}
        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 card-shadow">
          <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">Actividad Mensual</h3>
          <div className="space-y-4">
            {['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun'].map((month, i) => {
              const height = 30 + i * 15;
              return (
                <div key={month} className="flex items-center gap-4">
                  <span className="w-10 text-sm font-medium text-gray-600 dark:text-gray-400">{month}</span>
                  <div className="flex-1 bg-gray-200 dark:bg-gray-700 rounded-full h-2 overflow-hidden">
                    <div
                      className={`h-full bg-gradient-to-r from-blue-500 to-cyan-500 transition-all duration-500`}
                      style={{ width: `${height}%` }}
                    ></div>
                  </div>
                  <span className="w-12 text-right text-sm font-semibold text-gray-900 dark:text-white">{height}%</span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Pie Chart Representation */}
        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 card-shadow">
          <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">Distribución por Facultad</h3>
          <div className="space-y-3">
            {[
              { name: 'Ingeniería', value: 35, color: 'bg-blue-500' },
              { name: 'Administración', value: 25, color: 'bg-purple-500' },
              { name: 'Ciencias Humanas', value: 20, color: 'bg-green-500' },
              { name: 'Derecho', value: 15, color: 'bg-yellow-500' },
              { name: 'Medicina', value: 5, color: 'bg-pink-500' }
            ].map((item, i) => (
              <div key={i}>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-gray-700 dark:text-gray-300">{item.name}</span>
                  <span className="text-sm font-semibold text-gray-900 dark:text-white">{item.value}%</span>
                </div>
                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                  <div className={`${item.color} h-2 rounded-full transition-all duration-500`} style={{ width: `${item.value}%` }}></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Data Table */}
      <div className="bg-white dark:bg-gray-800 rounded-xl p-6 card-shadow overflow-x-auto">
        <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">Resumen de Grupos</h3>
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-200 dark:border-gray-700">
              <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700 dark:text-gray-300">Grupo</th>
              <th className="text-center py-3 px-4 text-sm font-semibold text-gray-700 dark:text-gray-300">Integrantes</th>
              <th className="text-center py-3 px-4 text-sm font-semibold text-gray-700 dark:text-gray-300">Semilleros</th>
              <th className="text-center py-3 px-4 text-sm font-semibold text-gray-700 dark:text-gray-300">Estado</th>
              <th className="text-center py-3 px-4 text-sm font-semibold text-gray-700 dark:text-gray-300">Productividad</th>
            </tr>
          </thead>
          <tbody>
            {[
              { name: 'GIDIS', members: 24, seedbeds: 5, status: 'Activo', productivity: 95 },
              { name: 'GISSIC', members: 18, seedbeds: 3, status: 'Activo', productivity: 87 },
              { name: 'GIMU', members: 15, seedbeds: 2, status: 'Activo', productivity: 82 },
              { name: 'GIT', members: 12, seedbeds: 4, status: 'Activo', productivity: 78 }
            ].map((grupo, i) => (
              <tr key={i} className="border-b border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 transition">
                <td className="py-3 px-4 text-sm font-medium text-gray-900 dark:text-white">{grupo.name}</td>
                <td className="py-3 px-4 text-center text-sm text-gray-700 dark:text-gray-400">{grupo.members}</td>
                <td className="py-3 px-4 text-center text-sm text-gray-700 dark:text-gray-400">{grupo.seedbeds}</td>
                <td className="py-3 px-4 text-center">
                  <span className="badge bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-200 text-xs">
                    {grupo.status}
                  </span>
                </td>
                <td className="py-3 px-4 text-center">
                  <div className="flex items-center justify-center gap-2">
                    <div className="w-20 bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                      <div className="bg-gradient-to-r from-green-500 to-emerald-500 h-2 rounded-full" style={{ width: `${grupo.productivity}%` }}></div>
                    </div>
                    <span className="text-sm font-semibold text-gray-900 dark:text-white w-8 text-right">{grupo.productivity}%</span>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Key Insights */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-gradient-to-br from-green-50 to-emerald-50 dark:from-gray-800 dark:to-gray-700 rounded-xl p-6 border-l-4 border-green-500">
          <h4 className="text-lg font-bold text-gray-900 dark:text-white mb-2 flex items-center gap-2">
            <i className="ri-lightbulb-line text-green-500"></i>
            Recomendación
          </h4>
          <p className="text-sm text-gray-700 dark:text-gray-300">Aumentar el número de semilleros en grupos con menos de 3 semilleros activos para mejorar productividad.</p>
        </div>

        <div className="bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-gray-800 dark:to-gray-700 rounded-xl p-6 border-l-4 border-blue-500">
          <h4 className="text-lg font-bold text-gray-900 dark:text-white mb-2 flex items-center gap-2">
            <i className="ri-arrow-up-line text-blue-500"></i>
            Tendencia
          </h4>
          <p className="text-sm text-gray-700 dark:text-gray-300">La actividad en investigación ha aumentado un 12% respecto al mes anterior, indicando mejor engagement.</p>
        </div>

        <div className="bg-gradient-to-br from-purple-50 to-pink-50 dark:from-gray-800 dark:to-gray-700 rounded-xl p-6 border-l-4 border-purple-500">
          <h4 className="text-lg font-bold text-gray-900 dark:text-white mb-2 flex items-center gap-2">
            <i className="ri-target-line text-purple-500"></i>
            Meta
          </h4>
          <p className="text-sm text-gray-700 dark:text-gray-300">Objetivo: Alcanzar 95% de productividad general en los próximos 3 meses.</p>
        </div>
      </div>
    </div>
  );
}
