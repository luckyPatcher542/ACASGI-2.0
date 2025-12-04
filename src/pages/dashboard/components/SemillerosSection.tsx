import { useState, useMemo, useEffect } from 'react';
import axios from 'axios';
import { Semillero } from '../../../mocks/semilleros';
import { createStatusChangeNotification } from '../../../mocks/notifications';
import { useAuth } from '../../../router/AuthContext';

function NewSemilleroForm({ onSubmit, onCancel, grupos }: { 
  onSubmit: (data: Omit<Semillero, 'id'>) => void;
  onCancel: () => void;
  grupos: any[];
}) {
  const [formData, setFormData] = useState<Omit<Semillero, 'id'>>({
    nombre: '',
    descripcion: '',
    grupoPadre: '',
    coordinador: '',
    integrantes: 0,
    estado: 'Activo',
    fechaCreacion: new Date().toISOString()
  });

  return (
    <div className="space-y-4">
      <input
        type="text"
        value={formData.nombre}
        onChange={(e) => setFormData({...formData, nombre: e.target.value})}
        placeholder="Nombre del semillero"
        className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
      />
      <textarea
        value={formData.descripcion}
        onChange={(e) => setFormData({...formData, descripcion: e.target.value})}
        placeholder="Descripción"
        className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
      />
      <select
        value={formData.grupoPadre}
        onChange={(e) => setFormData({...formData, grupoPadre: e.target.value})}
        className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
      >
        {grupos.map(g => (
          <option key={g.id ?? g} value={g.id ?? g}>{(g.nombre ?? g)}</option>
        ))}
      </select>
      <input
        type="text"
        value={formData.coordinador}
        onChange={(e) => setFormData({...formData, coordinador: e.target.value})}
        placeholder="Coordinador"
        className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
      />
      <input
        type="number"
        value={formData.integrantes}
        onChange={(e) => setFormData({...formData, integrantes: parseInt(e.target.value) || 0})}
        placeholder="Integrantes"
        className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
      />
      <div className="flex gap-2">
        <button onClick={() => onSubmit(formData)} className="flex-1 btn-primary py-2">Crear</button>
        <button onClick={onCancel} className="flex-1 btn-ghost py-2">Cancelar</button>
      </div>
    </div>
  );
}

export default function SemillerosSection() {
  const { user } = useAuth();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFaculty, setSelectedFaculty] = useState('Todos');
  const [selectedStatus, setSelectedStatus] = useState('Todos');
  const [selectedSemillero, setSelectedSemillero] = useState<Semillero | null>(null);
  const [semilleros, setSemilleros] = useState<Semillero[]>([]);
  const [grupos, setGrupos] = useState<any[]>([]);
  const [editingSemillero, setEditingSemillero] = useState<Semillero | null>(null);
  const [showNewSemilleroForm, setShowNewSemilleroForm] = useState(false);
  const [showStatusModal, setShowStatusModal] = useState(false);
  const [statusChangeReason, setStatusChangeReason] = useState('');
  const [statusChangeSemillero, setStatusChangeSemillero] = useState<Semillero | null>(null);

  const faculties = ['Todos', 'Ingeniería', 'Administración', 'Ciencias Humanas', 'Derecho', 'Medicina'];
  const statuses = ['Todos', 'Activo', 'Inactivo'];

  

  const filteredSemilleros = useMemo(() => {
    return semilleros.filter(semillero => {
      const matchesSearch = semillero.nombre.toLowerCase().includes(searchQuery.toLowerCase());
      const grupo = grupos.find(g => g.id === semillero.grupoPadre);
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

  const handleEditSemillero = (semillero: Semillero) => {
    setEditingSemillero(semillero);
  };

  const handleSaveEdit = async (updatedSemillero: Semillero) => {
    try {
      await axios.put(`http://localhost:4000/api/semillero/${updatedSemillero.id}`, {
        NOMBRE: updatedSemillero.nombre,
        DESCRIPCION: updatedSemillero.descripcion,
        LIDER_SEMILLERO: updatedSemillero.coordinador,
        INTEGRANTES: updatedSemillero.integrantes
      });
      setSemilleros(semilleros.map(s => 
        s.id === updatedSemillero.id ? updatedSemillero : s
      ));
      setEditingSemillero(null);
      alert('Semillero actualizado correctamente');
    } catch (err) {
      console.error('Error actualizando semillero:', err);
      alert('Error al actualizar semillero');
    }
  };

  const handleCreateSemillero = async (newSemillero: Omit<Semillero, 'id'>) => {
    try {
      const res = await axios.post('http://localhost:4000/api/semillero', {
        NOMBRE: newSemillero.nombre,
        DESCRIPCION: newSemillero.descripcion,
        ID_GRUPO: newSemillero.grupoPadre,
        LIDER_SEMILLERO: newSemillero.coordinador,
        INTEGRANTES: newSemillero.integrantes,
        ESTADO: 1
      });
      const semillero: Semillero = {
        ...newSemillero,
        id: String(res.data.id || Date.now())
      };
      setSemilleros([...semilleros, semillero]);
      setShowNewSemilleroForm(false);
      alert('Semillero creado correctamente');
    } catch (err) {
      console.error('Error creando semillero:', err);
      alert('Error al crear semillero');
    }
  };

  const handleStatusChange = (semillero: Semillero) => {
    setStatusChangeSemillero(semillero);
    setStatusChangeReason('');
    setShowStatusModal(true);
  };

  const handleConfirmStatusChange = async () => {
    if (statusChangeSemillero && statusChangeReason.trim()) {
      // Si el estado ACTUAL es Activo, vamos a INACTIVAr
      // Si el estado ACTUAL es Inactivo, vamos a ACTIVAr
      const isCurrentlyActive = statusChangeSemillero.estado === 'Activo';
      const endpoint = isCurrentlyActive
        ? `http://localhost:4000/api/semillero/inactivar/${statusChangeSemillero.id}`
        : `http://localhost:4000/api/semillero/activar/${statusChangeSemillero.id}`;
      
      const nuevoEstado = isCurrentlyActive ? 'Inactivo' : 'Activo';
      
      try {
        console.log('Enviando PUT a:', endpoint, 'con motivo:', statusChangeReason);
        const response = await axios.put(endpoint, { motivo: statusChangeReason });
        console.log('Respuesta del backend:', response.data);
        
        setSemilleros(semilleros.map(s =>
          s.id === statusChangeSemillero.id
            ? { ...s, estado: nuevoEstado }
            : s
        ));
        
        // Crear notificación
        createStatusChangeNotification(statusChangeSemillero.nombre, 'seedbed', nuevoEstado);
        
        alert(`Semillero ${nuevoEstado === 'Activo' ? 'activado' : 'inactivado'} correctamente.\nMotivo: ${statusChangeReason}`);
        setShowStatusModal(false);
        setStatusChangeSemillero(null);
        setStatusChangeReason('');
      } catch (err: any) {
        console.error('Error completo:', err);
        console.error('Error response:', err.response?.data);
        console.error('Error status:', err.response?.status);
        alert(`Error al cambiar estado del semillero: ${err.response?.data?.message || err.message}`);
      }
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [gRes, sRes] = await Promise.all([
          axios.get('http://localhost:4000/api/grupo'),
          axios.get('http://localhost:4000/api/semillero')
        ]);

        // Normalizar grupos
        const groupsRows = Array.isArray(gRes.data) ? gRes.data : [];
        const normalizedGroups = groupsRows.map((r: any) => ({
          id: String(r.ID_GRUPO ?? r.id ?? ''),
          nombre: r.NOMBRE ?? r.nombre ?? '',
          categoria: r.FACULTAD ?? r.categoria ?? r.FACULTAD_ACADEMICA ?? '',
          estado: (r.ESTADO === 1 || r.ESTADO === '1') ? 'Activo' : 'Inactivo',
          descripcion: r.DESCRIPCION ?? r.descripcion ?? '',
          lider: r.LIDER_GRUPO ?? r.lider ?? ''
        }));

        // Normalizar semilleros
        const semRows = Array.isArray(sRes.data) ? sRes.data : [];
        const normalizedSem = semRows.map((s: any) => ({
          id: String(s.ID_SEMILLERO ?? s.id ?? ''),
          nombre: s.NOMBRE ?? s.nombre ?? '',
          descripcion: s.DESCRIPCION ?? s.descripcion ?? '' ,
          grupoPadre: s.ID_GRUPO ?? s.GRUPO_PADRE ?? s.grupoPadre ?? '',
          coordinador: s.LIDER_SEMILLERO ?? s.coordinador ?? s.LIDER ?? '',
          integrantes: s.INTEGRANTES ?? s.integrantes ?? 0,
          estado: (s.ESTADO === 1 || s.ESTADO === '1') ? ('Activo' as const) : ('Inactivo' as const),
          fechaCreacion: s.FECHA_CREACION ?? s.fechaCreacion ?? ''
        }));

        setGrupos(normalizedGroups);
        setSemilleros(normalizedSem);
      } catch (err) {
        console.error('Error cargando semilleros/grupos:', err);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <p className="text-gray-600 dark:text-gray-400 text-sm">{filteredSemilleros.length} semilleros encontrados</p>
        </div>
        {user?.role === 'Administrador' && (
          <button onClick={() => setShowNewSemilleroForm(true)} className="btn-primary flex items-center gap-2">
            <i className="ri-add-line text-xl"></i>
            Nuevo Semillero
          </button>
        )}
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
                  const grupo = grupos.find(g => g.id === semillero.grupoPadre);
          return (
            <div key={semillero.id} className="bg-white dark:bg-gray-800 rounded-xl overflow-hidden card-shadow">
              <div className="bg-gradient-to-r from-blue-500 to-indigo-500 p-4 text-white">
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
                  {user?.role === 'Administrador' && (
                    <>
                      <button onClick={() => handleEditSemillero(semillero)} className="btn-yellow py-2 px-3 text-sm" title="Editar">
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
                    </>
                  )}
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
                  <p className="font-semibold text-gray-900 dark:text-white">{grupos.find(g => g.id === selectedSemillero.grupoPadre)?.nombre}</p>
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

      {/* New Semillero Modal */}
      {showNewSemilleroForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white dark:bg-gray-800 rounded-xl max-w-2xl w-full max-h-96 overflow-y-auto p-6">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Nuevo Semillero</h2>
            <NewSemilleroForm 
              onSubmit={handleCreateSemillero}
              onCancel={() => setShowNewSemilleroForm(false)}
              grupos={grupos}
            />
          </div>
        </div>
      )}

      {/* Edit Modal */}
      {editingSemillero && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white dark:bg-gray-800 rounded-xl max-w-2xl w-full max-h-96 overflow-y-auto p-6">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Editar Semillero</h2>
            <div className="space-y-4">
              <input
                type="text"
                value={editingSemillero.nombre}
                onChange={(e) => setEditingSemillero({...editingSemillero, nombre: e.target.value})}
                placeholder="Nombre"
                className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
              />
              <textarea
                value={editingSemillero.descripcion}
                onChange={(e) => setEditingSemillero({...editingSemillero, descripcion: e.target.value})}
                placeholder="Descripción"
                className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
              />
              <input
                type="text"
                value={editingSemillero.coordinador}
                onChange={(e) => setEditingSemillero({...editingSemillero, coordinador: e.target.value})}
                placeholder="Coordinador"
                className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
              />
              <input
                type="number"
                value={editingSemillero.integrantes}
                onChange={(e) => setEditingSemillero({...editingSemillero, integrantes: parseInt(e.target.value) || 0})}
                placeholder="Integrantes"
                className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
              />
              <div className="flex gap-2">
                <button onClick={() => handleSaveEdit(editingSemillero)} className="flex-1 btn-primary py-2">Guardar</button>
                <button onClick={() => setEditingSemillero(null)} className="flex-1 btn-ghost py-2">Cancelar</button>
              </div>
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
