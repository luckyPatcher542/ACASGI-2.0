import { useState, useMemo } from 'react';
import { semillerosData, Semillero } from '../../../mocks/semilleros';
import { gruposData } from '../../../mocks/grupos';

export default function SemillerosSection() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFaculty, setSelectedFaculty] = useState('Todos');
  const [selectedStatus, setSelectedStatus] = useState('Todos');
  const [selectedSemillero, setSelectedSemillero] = useState<Semillero | null>(null);
  const [semilleros, setSemilleros] = useState(semillerosData);
  const [showStatusModal, setShowStatusModal] = useState(false);
  const [statusChangeReason, setStatusChangeReason] = useState('');
  const [statusChangeSemillero, setStatusChangeSemillero] = useState<Semillero | null>(null);

  const faculties = ['Todos', 'Ingeniería', 'Administración', 'Ciencias Humanas', 'Derecho', 'Medicina'];
  const statuses = ['Todos', 'Activo', 'Inactivo'];

  const filteredSemilleros = useMemo(() => {
    return semilleros.filter(semillero => {
      const matchesSearch = semillero.nombre.toLowerCase().includes(searchQuery.toLowerCase());
      const grupo = gruposData.find(g => g.id === semillero.grupoPadre);
      const matchesFaculty = selectedFaculty === 'Todos' || grupo?.categoria === selectedFaculty;
      const matchesStatus = selectedStatus === 'Todos' || semillero.estado === selectedStatus;
      return matchesSearch && matchesFaculty && matchesStatus;
    });
  }, [searchQuery, selectedFaculty, selectedStatus, semilleros]);

  const handleClearFilters = () => {
    setSearchQuery('');
    setSelectedFaculty('Todos');
    setSelectedStatus('Todos');
  };

  const handleStatusChange = (semillero: Semillero) => {
    setStatusChangeSemillero(semillero);
    setStatusChangeReason('');
    setShowStatusModal(true);
  };

  const handleConfirmStatusChange = () => {
    if (statusChangeSemillero && statusChangeReason.trim()) {
      const nuevoEstado = statusChangeSemillero.estado === 'Activo' ? 'Inactivo' : 'Activo';
      setSemilleros(semilleros.map(s =>
        s.id === statusChangeSemillero.id
          ? { ...s, estado: nuevoEstado }
          : s
      ));
      alert(`Semillero ${nuevoEstado === 'Activo' ? 'activado' : 'inactivado'} correctamente.\nMotivo: ${statusChangeReason}`);
      setShowStatusModal(false);
      setStatusChangeSemillero(null);
      setStatusChangeReason('');
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <p className="text-gray-600 dark:text-gray-400 text-sm">{filteredSemilleros.length} semilleros encontrados</p>
        </div>
        <button className="btn-secondary flex items-center gap-2">
          <i className="ri-add-line text-xl"></i>
          Nuevo Semillero
        </button>
      </div>

      {/* Filters */}
      <div className="bg-white dark:bg-gray-800 rounded-xl p-6 card-shadow">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
          {/* Search */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Buscar por nombre</label>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Buscar semillero..."
              className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
            />
          </div>

          {/* Group */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Facultad</label>
            <select
              value={selectedFaculty}
              onChange={(e) => setSelectedFaculty(e.target.value)}
              className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
            >
              {faculties.map(f => (
                <option key={f} value={f}>{f}</option>
              ))}
            </select>
          </div>

          {/* Status */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Estado</label>
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
            >
              {statuses.map(status => (
                <option key={status} value={status}>{status}</option>
              ))}
            </select>
          </div>

          {/* Clear Button */}
          <div className="flex items-end">
            <button
              onClick={handleClearFilters}
              className="w-full btn-ghost"
            >
              <i className="ri-refresh-line"></i> Limpiar
            </button>
          </div>
        </div>
      </div>

      {/* Seedbeds Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredSemilleros.map((semillero) => {
          const grupo = gruposData.find(g => g.id === semillero.grupoPadre);
          return (
            <div key={semillero.id} className="bg-white dark:bg-gray-800 rounded-xl overflow-hidden card-shadow">
              <div className="bg-gradient-to-r from-green-500 to-emerald-500 p-4 text-white">
                <div className="flex items-start justify-between mb-2">
                  <i className="ri-team-fill text-3xl"></i>
                  <span className={`badge text-xs ${
                    semillero.estado === 'Activo'
                      ? 'bg-green-600 text-white'
                      : 'bg-gray-500 text-white'
                  }`}>
                    {semillero.estado}
                  </span>
                </div>
                <h3 className="font-bold text-lg line-clamp-2">{semillero.nombre}</h3>
              </div>

              <div className="p-4">
                <div className="mb-3">
                  <span className="badge bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-200 text-xs">
                    {grupo?.nombre || 'Grupo no encontrado'}
                  </span>
                </div>

                <p className="text-sm text-gray-600 dark:text-gray-400 mb-4 line-clamp-2">
                  {semillero.descripcion}
                </p>

                <div className="space-y-2 text-sm mb-4">
                  <p><strong>Coordinador:</strong> {semillero.coordinador}</p>
                  <p><strong>Integrantes:</strong> {semillero.integrantes}</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    Creado: {new Date(semillero.fechaCreacion).toLocaleDateString('es-ES')}
                  </p>
                </div>

                <div className="flex gap-2">
                  <button
                    onClick={() => setSelectedSemillero(semillero)}
                    className="flex-1 btn-primary py-2 text-sm"
                  >
                    Ver Detalles
                  </button>
                  <button className="btn-yellow py-2 px-3 text-sm">
                    <i className="ri-edit-line"></i>
                  </button>
                  <button 
                    onClick={() => handleStatusChange(semillero)}
                    className={`py-2 px-3 text-sm rounded-lg ${
                      semillero.estado === 'Activo'
                        ? 'btn-warning'
                        : 'bg-green-600 text-white hover:bg-green-700'
                    }`}
                    title={semillero.estado === 'Activo' ? 'Inactivar' : 'Activar'}
                  >
                    <i className={semillero.estado === 'Activo' ? 'ri-eye-off-line' : 'ri-eye-line'}></i>
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Detail Modal */}
      {selectedSemillero && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white dark:bg-gray-800 rounded-xl max-w-2xl w-full max-h-96 overflow-y-auto p-6">
            <div className="flex items-start justify-between mb-4">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">{selectedSemillero.nombre}</h2>
              <button
                onClick={() => setSelectedSemillero(null)}
                className="text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"
              >
                <i className="ri-close-line text-2xl"></i>
              </button>
            </div>

            <div className="space-y-4">
              <p className="text-gray-600 dark:text-gray-400">{selectedSemillero.descripcion}</p>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Grupo Padre</p>
                  <p className="font-semibold text-gray-900 dark:text-white">{gruposData.find(g => g.id === selectedSemillero.grupoPadre)?.nombre}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Estado</p>
                  <p className="font-semibold text-gray-900 dark:text-white">{selectedSemillero.estado}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Coordinador</p>
                  <p className="font-semibold text-gray-900 dark:text-white">{selectedSemillero.coordinador}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Integrantes</p>
                  <p className="font-semibold text-gray-900 dark:text-white">{selectedSemillero.integrantes}</p>
                </div>
              </div>

              <button
                onClick={() => setSelectedSemillero(null)}
                className="w-full btn-primary py-2"
              >
                Cerrar
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Status Change Modal */}
      {showStatusModal && statusChangeSemillero && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white dark:bg-gray-800 rounded-xl max-w-md w-full p-6">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              {statusChangeSemillero.estado === 'Activo' ? 'Inactivar' : 'Activar'} Semillero
            </h2>
            
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              Ingresa el motivo del cambio de estado para <strong>{statusChangeSemillero.nombre}</strong>:
            </p>

            <textarea
              value={statusChangeReason}
              onChange={(e) => setStatusChangeReason(e.target.value)}
              placeholder="Motivo del cambio de estado..."
              className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white mb-4 h-24"
            />

            <div className="flex gap-2">
              <button 
                onClick={handleConfirmStatusChange}
                disabled={!statusChangeReason.trim()}
                className="flex-1 btn-primary py-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Confirmar
              </button>
              <button 
                onClick={() => {
                  setShowStatusModal(false);
                  setStatusChangeSemillero(null);
                  setStatusChangeReason('');
                }}
                className="flex-1 btn-ghost py-2"
              >
                Cancelar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
