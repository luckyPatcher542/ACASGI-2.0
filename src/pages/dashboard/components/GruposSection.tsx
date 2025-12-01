import { useState, useMemo } from 'react';
import { gruposData, Grupo } from '../../../mocks/grupos';
import { createStatusChangeNotification } from '../../../mocks/notifications';
import { useAuth } from '../../../router/AuthContext';

function NewGroupForm({ onSubmit, onCancel, faculties }: { 
  onSubmit: (data: Omit<Grupo, 'id'>) => void;
  onCancel: () => void;
  faculties: ('Tecnología' | 'Ciencias Sociales' | 'Ciencias Naturales' | 'Matemáticas' | 'Otros')[];
}) {
  const [formData, setFormData] = useState<Omit<Grupo, 'id'>>({
    nombre: '',
    descripcion: '',
    categoria: faculties[0] || 'Tecnología',
    lider: '',
    integrantes: 0,
    semilleros: 0,
    estado: 'Activo',
    fechaCreacion: new Date().toISOString()
  });

  return (
    <div className="space-y-4">
      <input
        type="text"
        value={formData.nombre}
        onChange={(e) => setFormData({...formData, nombre: e.target.value})}
        placeholder="Nombre del grupo"
        className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
      />
      <textarea
        value={formData.descripcion}
        onChange={(e) => setFormData({...formData, descripcion: e.target.value})}
        placeholder="Descripción"
        className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
      />
      <select
        value={formData.categoria}
        onChange={(e) => setFormData({...formData, categoria: e.target.value as any})}
        className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
      >
        {faculties.map(f => <option key={f} value={f}>{f}</option>)}
      </select>
      <input
        type="text"
        value={formData.lider}
        onChange={(e) => setFormData({...formData, lider: e.target.value})}
        placeholder="Líder del grupo"
        className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
      />
      <div className="flex gap-2">
        <button onClick={() => onSubmit(formData)} className="flex-1 btn-primary py-2">Crear</button>
        <button onClick={onCancel} className="flex-1 btn-ghost py-2">Cancelar</button>
      </div>
    </div>
  );
}

export default function GruposSection() {
  const { user } = useAuth();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Todos');
  const [selectedStatus, setSelectedStatus] = useState('Todos');
  const [selectedGroup, setSelectedGroup] = useState<Grupo | null>(null);
  const [grupos, setGrupos] = useState(gruposData);
  const [editingGroup, setEditingGroup] = useState<Grupo | null>(null);
  const [showNewGroupForm, setShowNewGroupForm] = useState(false);
  const [showStatusModal, setShowStatusModal] = useState(false);
  const [statusChangeReason, setStatusChangeReason] = useState('');
  const [statusChangeGroup, setStatusChangeGroup] = useState<Grupo | null>(null);

  const faculties: ('Tecnología' | 'Ciencias Sociales' | 'Ciencias Naturales' | 'Matemáticas' | 'Otros')[] = ['Tecnología', 'Ciencias Sociales', 'Ciencias Naturales', 'Matemáticas', 'Otros'];
  const statuses = ['Todos', 'Activo', 'Inactivo'];

  const filteredGroups = useMemo(() => {
    return grupos.filter(group => {
      const matchesSearch = group.nombre.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = selectedCategory === 'Todos' || group.categoria === selectedCategory as any;
      const matchesStatus = selectedStatus === 'Todos' || group.estado === selectedStatus as any;
      return matchesSearch && matchesCategory && matchesStatus;
    });
  }, [searchQuery, selectedCategory, selectedStatus, grupos]);

  const facultiesOptions = ['Todos', ...faculties];

  const handleClearFilters = () => {
    setSearchQuery('');
    setSelectedCategory('Todos');
    setSelectedStatus('Todos');
  };

  const handleStatusChange = (group: Grupo) => {
    setStatusChangeGroup(group);
    setStatusChangeReason('');
    setShowStatusModal(true);
  };

  const handleConfirmStatusChange = () => {
    if (statusChangeGroup && statusChangeReason.trim()) {
      const nuevoEstado = statusChangeGroup.estado === 'Activo' ? 'Inactivo' : 'Activo';
      setGrupos(grupos.map(g =>
        g.id === statusChangeGroup.id
          ? { ...g, estado: nuevoEstado }
          : g
      ));
      
      // Crear notificación
      createStatusChangeNotification(statusChangeGroup.nombre, 'grupo', nuevoEstado);
      
      alert(`Grupo ${nuevoEstado === 'Activo' ? 'activado' : 'inactivado'} correctamente.\nMotivo: ${statusChangeReason}`);
      setShowStatusModal(false);
      setStatusChangeGroup(null);
      setStatusChangeReason('');
    }
  };

  const handleEditGroup = (group: Grupo) => {
    setEditingGroup(group);
  };

  const handleSaveEdit = (updatedGroup: Grupo) => {
    setGrupos(grupos.map(g => 
      g.id === updatedGroup.id ? updatedGroup : g
    ));
    setEditingGroup(null);
  };

  const handleCreateGroup = (newGroup: Omit<Grupo, 'id'>) => {
    const grupo: Grupo = {
      ...newGroup,
      id: 'grupo_' + Date.now()
    };
    setGrupos([...grupos, grupo]);
    setShowNewGroupForm(false);
  };

  return (
    <div className="space-y-6">
      {/* Header with Create Button */}
      <div className="flex items-center justify-between">
        <div>
          <p className="text-gray-600 dark:text-gray-400 text-sm">{filteredGroups.length} grupos encontrados</p>
        </div>
        {user?.role === 'Administrador' && (
          <button onClick={() => setShowNewGroupForm(true)} className="btn-primary flex items-center gap-2">
            <i className="ri-add-line text-xl"></i>
            Nuevo Grupo
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
              placeholder="Buscar grupo..."
              className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
            />
          </div>

          {/* Category */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Facultad</label>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
            >
              {facultiesOptions.map(cat => (
                <option key={cat} value={cat}>{cat}</option>
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

      {/* Groups Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredGroups.map((group) => (
          <div key={group.id} className="bg-white dark:bg-gray-800 rounded-xl overflow-hidden card-shadow hover:shadow-2xl">
            {/* Header */}
            <div className="bg-gradient-to-r from-blue-500 to-purple-500 p-4 text-white">
              <div className="flex items-start justify-between mb-2">
                <i className="ri-team-fill text-3xl"></i>
                <span className={`badge text-xs ${
                  group.estado === 'Activo'
                    ? 'bg-green-500 text-white'
                    : 'bg-gray-500 text-white'
                }`}>
                  {group.estado}
                </span>
              </div>
              <h3 className="font-bold text-lg line-clamp-2">{group.nombre}</h3>
            </div>

            {/* Body */}
            <div className="p-4">
              <div className="mb-3">
                <span className="badge bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-200 text-xs">
                  {group.categoria}
                </span>
              </div>

              <p className="text-sm text-gray-600 dark:text-gray-400 mb-4 line-clamp-2">
                {group.descripcion}
              </p>

              <div className="space-y-2 text-sm mb-4">
                <p><strong>Líder:</strong> {group.lider}</p>
                <p><strong>Integrantes:</strong> {group.integrantes}</p>
                <p><strong>Semilleros:</strong> {group.semilleros}</p>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  Creado: {new Date(group.fechaCreacion).toLocaleDateString('es-ES')}
                </p>
              </div>

              {/* Actions */}
              <div className="flex gap-2">
                <button
                  onClick={() => setSelectedGroup(group)}
                  className="flex-1 btn-primary py-2 text-sm"
                >
                  Ver Detalles
                </button>
                {user?.role === 'Administrador' && (
                  <>
                    <button onClick={() => handleEditGroup(group)} className="btn-yellow py-2 px-3 text-sm" title="Editar">
                      <i className="ri-edit-line"></i>
                    </button>
                    <button 
                      onClick={() => handleStatusChange(group)}
                      className={`py-2 px-3 text-sm rounded-lg ${
                        group.estado === 'Activo'
                          ? 'btn-warning'
                          : 'bg-green-600 text-white hover:bg-green-700'
                      }`}
                      title={group.estado === 'Activo' ? 'Inactivar' : 'Activar'}
                    >
                      <i className={group.estado === 'Activo' ? 'ri-eye-off-line' : 'ri-eye-line'}></i>
                    </button>
                  </>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Detail Modal */}
      {selectedGroup && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white dark:bg-gray-800 rounded-xl max-w-2xl w-full max-h-96 overflow-y-auto p-6">
            <div className="flex items-start justify-between mb-4">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">{selectedGroup.nombre}</h2>
              <button
                onClick={() => setSelectedGroup(null)}
                className="text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"
              >
                <i className="ri-close-line text-2xl"></i>
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Descripción</h3>
                <p className="text-gray-600 dark:text-gray-400">{selectedGroup.descripcion}</p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Categoría</p>
                  <p className="font-semibold text-gray-900 dark:text-white">{selectedGroup.categoria}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Estado</p>
                  <p className="font-semibold text-gray-900 dark:text-white">{selectedGroup.estado}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Líder</p>
                  <p className="font-semibold text-gray-900 dark:text-white">{selectedGroup.lider}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Integrantes</p>
                  <p className="font-semibold text-gray-900 dark:text-white">{selectedGroup.integrantes}</p>
                </div>
              </div>

              <div>
                <button
                  onClick={() => setSelectedGroup(null)}
                  className="w-full btn-primary py-2"
                >
                  Cerrar
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Edit Modal */}
      {editingGroup && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white dark:bg-gray-800 rounded-xl max-w-2xl w-full max-h-96 overflow-y-auto p-6">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Editar Grupo</h2>
            <div className="space-y-4">
              <input
                type="text"
                value={editingGroup.nombre}
                onChange={(e) => setEditingGroup({...editingGroup, nombre: e.target.value})}
                placeholder="Nombre"
                className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
              />
              <textarea
                value={editingGroup.descripcion}
                onChange={(e) => setEditingGroup({...editingGroup, descripcion: e.target.value})}
                placeholder="Descripción"
                className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
              />
              <input
                type="text"
                value={editingGroup.lider}
                onChange={(e) => setEditingGroup({...editingGroup, lider: e.target.value})}
                placeholder="Líder"
                className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
              />
              <div className="flex gap-2">
                <button onClick={() => handleSaveEdit(editingGroup)} className="flex-1 btn-primary py-2">Guardar</button>
                <button onClick={() => setEditingGroup(null)} className="flex-1 btn-ghost py-2">Cancelar</button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* New Group Modal */}
      {showNewGroupForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white dark:bg-gray-800 rounded-xl max-w-2xl w-full max-h-96 overflow-y-auto p-6">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Nuevo Grupo</h2>
            <NewGroupForm 
              onSubmit={handleCreateGroup}
              onCancel={() => setShowNewGroupForm(false)}
              faculties={faculties}
            />
          </div>
        </div>
      )}

      {/* Status Change Modal */}
      {showStatusModal && statusChangeGroup && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white dark:bg-gray-800 rounded-xl max-w-md w-full p-6">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              {statusChangeGroup.estado === 'Activo' ? 'Inactivar' : 'Activar'} Grupo
            </h2>
            
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              Ingresa el motivo del cambio de estado para <strong>{statusChangeGroup.nombre}</strong>:
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
                  setStatusChangeGroup(null);
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
