import { useState, useMemo } from 'react';
import { Integrante } from '../../../mocks/integrantes';
import { gruposData } from '../../../mocks/grupos';
import { useAuth } from '../../../router/AuthContext';

function NewIntegranteForm({ onSubmit, onCancel, groupNames, roles }: {
  onSubmit: (data: Omit<Integrante, 'id'>) => void;
  onCancel: () => void;
  groupNames: string[];
  roles: ('Líder (Grupo)' | 'Líder (Semillero)' | 'Profesor' | 'Semillerista')[];
}) {
  const [formData, setFormData] = useState({
    nombre: '',
    cedula: '',
    email: '',
    telefono: '',
    especialidad: '',
    rol: (roles[0] || 'Semillerista') as 'Líder (Grupo)' | 'Líder (Semillero)' | 'Profesor' | 'Semillerista',
    grupo: groupNames[0] || '',
    fechaVinculacion: new Date().toISOString(),
    iniciales: '',
    estado: 'Activo' as 'Activo' | 'Inactivo',
    afiliacion: { tipo: 'grupo' as const, id: '1' }
  });

  const handleSubmit = () => {
    const grupo = gruposData.find(g => g.nombre === formData.grupo);
    const initials = formData.nombre.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);
    onSubmit({
      ...formData,
      grupo: grupo?.id || '',
      iniciales: initials,
      rol: formData.rol
    });
  };

  return (
    <div className="space-y-4">
      <input
        type="text"
        value={formData.nombre}
        onChange={(e) => setFormData({...formData, nombre: e.target.value})}
        placeholder="Nombre"
        className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
      />
      <input
        type="text"
        value={formData.cedula}
        onChange={(e) => setFormData({...formData, cedula: e.target.value})}
        placeholder="Cédula"
        className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
      />
      <input
        type="email"
        value={formData.email}
        onChange={(e) => setFormData({...formData, email: e.target.value})}
        placeholder="Email"
        className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
      />
      <input
        type="tel"
        value={formData.telefono}
        onChange={(e) => setFormData({...formData, telefono: e.target.value})}
        placeholder="Teléfono"
        className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
      />
      <input
        type="text"
        value={formData.especialidad}
        onChange={(e) => setFormData({...formData, especialidad: e.target.value})}
        placeholder="Especialidad"
        className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
      />
      <select
        value={formData.rol}
        onChange={(e) => setFormData({...formData, rol: e.target.value as any})}
        className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
      >
        {roles.map(r => <option key={r} value={r}>{r}</option>)}
      </select>
      <select
        value={formData.grupo}
        onChange={(e) => setFormData({...formData, grupo: e.target.value})}
        className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
      >
        {groupNames.map(g => <option key={g} value={g}>{g}</option>)}
      </select>
      <div className="flex gap-2">
        <button onClick={handleSubmit} className="flex-1 btn-primary py-2">Crear</button>
        <button onClick={onCancel} className="flex-1 btn-ghost py-2">Cancelar</button>
      </div>
    </div>
  );
}

export default function IntegrantesSection() {
  const { user } = useAuth();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedRole, setSelectedRole] = useState('Todos');
  const [selectedGroup, setSelectedGroup] = useState('Todos');
  const [selectedStatus, setSelectedStatus] = useState('Activo');
  const [selectedIntegrante, setSelectedIntegrante] = useState<any>(null);
  const [integrantes, setIntegrantes] = useState<Integrante[]>([]);
  const [showNewForm, setShowNewForm] = useState(false);
  const [editingIntegrante, setEditingIntegrante] = useState<Integrante | null>(null);
  const [showStatusModal, setShowStatusModal] = useState(false);
  const [statusChangeIntegrante, setStatusChangeIntegrante] = useState<Integrante | null>(null);
  const [statusChangeReason, setStatusChangeReason] = useState('');

  const roles = ['Todos', 'Líder (Grupo)', 'Líder (Semillero)', 'Profesor', 'Semillerista'];
  const groupNames = ['Todos', ...new Set(gruposData.map(g => g.nombre))];
  const estados = ['Todos', 'Activo', 'Inactivo'];

  // Helper function to get initials from name
  const getInitials = (nombre: string) => {
    return nombre.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);
  };

  const filteredIntegrantes = useMemo(() => {
    return integrantes.filter(integrante => {
      const matchesSearch = integrante.nombre.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           integrante.cedula.includes(searchQuery);
      const matchesRole = selectedRole === 'Todos' || integrante.rol === selectedRole;
      const grupo = gruposData.find(g => g.id === integrante.grupo);
      const matchesGroup = selectedGroup === 'Todos' || grupo?.nombre === selectedGroup;
      const matchesStatus = selectedStatus === 'Todos' || integrante.estado === selectedStatus;
      return matchesSearch && matchesRole && matchesGroup && matchesStatus;
    });
  }, [searchQuery, selectedRole, selectedGroup, selectedStatus, integrantes]);

  const getRoleColor = (rol: string) => {
    switch(rol) {
      case 'Líder (Grupo)': return 'bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-200';
      case 'Líder (Semillero)': return 'bg-purple-100 dark:bg-purple-900 text-purple-700 dark:text-purple-200';
      case 'Profesor': return 'bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-200';
      case 'Semillerista': return 'bg-yellow-100 dark:bg-yellow-900 text-yellow-700 dark:text-yellow-200';
      default: return 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-200';
    }
  };

  const handleClearFilters = () => {
    setSearchQuery('');
    setSelectedRole('Todos');
    setSelectedGroup('Todos');
    setSelectedStatus('Activo');
  };

  const handleCreateIntegrante = (newIntegrante: Omit<Integrante, 'id'>) => {
    const integrante: Integrante = {
      ...newIntegrante,
      id: 'integrante_' + Date.now()
    };
    setIntegrantes([...integrantes, integrante]);
    setShowNewForm(false);
  };

  const handleEditIntegrante = (integrante: Integrante) => {
    setEditingIntegrante(integrante);
  };

  const handleSaveEdit = (updatedIntegrante: Integrante) => {
    setIntegrantes(integrantes.map(i => 
      i.id === updatedIntegrante.id ? updatedIntegrante : i
    ));
    setEditingIntegrante(null);
  };

  const handleStatusChange = (integrante: Integrante) => {
    setStatusChangeIntegrante(integrante);
    setStatusChangeReason('');
    setShowStatusModal(true);
  };

  const handleConfirmStatusChange = () => {
    if (statusChangeIntegrante && statusChangeReason.trim()) {
      const updatedIntegrante: Integrante = {
        ...statusChangeIntegrante,
        estado: statusChangeIntegrante.estado === 'Activo' ? 'Inactivo' : 'Activo'
      };
      setIntegrantes(integrantes.map(i => 
        i.id === updatedIntegrante.id ? updatedIntegrante : i
      ));
      setShowStatusModal(false);
      setStatusChangeIntegrante(null);
      setStatusChangeReason('');
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <p className="text-gray-600 dark:text-gray-400 text-sm">{filteredIntegrantes.length} integrantes encontrados</p>
        </div>
        {user?.role === 'Administrador' && (
          <button onClick={() => setShowNewForm(true)} className="btn-success flex items-center gap-2">
            <i className="ri-add-line text-xl"></i>
            Nuevo Integrante
          </button>
        )}
      </div>

      {/* Filters */}
      <div className="bg-white dark:bg-gray-800 rounded-xl p-6 card-shadow">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-4">
          {/* Search */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Buscar por nombre o cédula</label>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Buscar..."
              className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
            />
          </div>

          {/* Role */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Rol</label>
            <select
              value={selectedRole}
              onChange={(e) => setSelectedRole(e.target.value)}
              className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
            >
              {roles.map(role => (
                <option key={role} value={role}>{role}</option>
              ))}
            </select>
          </div>

          {/* Group */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Grupo</label>
            <select
              value={selectedGroup}
              onChange={(e) => setSelectedGroup(e.target.value)}
              className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
            >
              {groupNames.map(name => (
                <option key={name} value={name}>{name}</option>
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
              {estados.map(estado => (
                <option key={estado} value={estado}>{estado}</option>
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

      {/* Members Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredIntegrantes.slice(0, 24).map((integrante) => {
          const grupo = gruposData.find(g => g.id === integrante.grupo);
          return (
            <div key={integrante.id} className="bg-white dark:bg-gray-800 rounded-xl p-6 card-shadow hover:shadow-2xl">
              <div className="flex items-start gap-4 mb-4">
                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center text-white text-2xl font-bold flex-shrink-0">
                  {getInitials(integrante.nombre)}
                </div>
                <div className="flex-1">
                  <h3 className="font-bold text-gray-900 dark:text-white">{integrante.nombre}</h3>
                  <span className={`badge text-xs ${getRoleColor(integrante.rol)}`}>
                    {integrante.rol}
                  </span>
                </div>
              </div>

              <div className="space-y-2 text-sm mb-4">
                <p><strong>Cédula:</strong> {integrante.cedula}</p>
                <p><strong>Email:</strong> {integrante.email}</p>
                <p><strong>Teléfono:</strong> {integrante.telefono}</p>
                <p><strong>Especialidad:</strong> {integrante.especialidad}</p>
                <p><strong>Grupo:</strong> {grupo?.nombre.substring(0, 20)}...</p>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  Vinculado: {new Date(integrante.fechaVinculacion).toLocaleDateString('es-ES')}
                </p>
              </div>

              <div className="flex gap-2">
                <button
                  onClick={() => setSelectedIntegrante(integrante)}
                  className="flex-1 btn-primary py-2 text-sm"
                >
                  Ver Perfil
                </button>
                {user?.role === 'Administrador' && (
                  <>
                    <button 
                      onClick={() => handleEditIntegrante(integrante)}
                      className="btn-yellow py-2 px-3 text-sm"
                    >
                      <i className="ri-edit-line"></i>
                    </button>
                    <button 
                      onClick={() => handleStatusChange(integrante)}
                      className="btn-danger py-2 px-3 text-sm"
                    >
                      <i className="ri-delete-line"></i>
                    </button>
                  </>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Detail Modal */}
      {selectedIntegrante && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white dark:bg-gray-800 rounded-xl max-w-2xl w-full max-h-96 overflow-y-auto p-6">
            <div className="flex items-start justify-between mb-4">
              <div>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">{selectedIntegrante.nombre}</h2>
                <span className={`badge mt-2 ${getRoleColor(selectedIntegrante.rol)}`}>
                  {selectedIntegrante.rol}
                </span>
              </div>
              <button
                onClick={() => setSelectedIntegrante(null)}
                className="text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"
              >
                <i className="ri-close-line text-2xl"></i>
              </button>
            </div>

            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Cédula</p>
                  <p className="font-semibold text-gray-900 dark:text-white">{selectedIntegrante.cedula}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Email</p>
                  <p className="font-semibold text-gray-900 dark:text-white break-all text-sm">{selectedIntegrante.email}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Teléfono</p>
                  <p className="font-semibold text-gray-900 dark:text-white">{selectedIntegrante.telefono}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Especialidad</p>
                  <p className="font-semibold text-gray-900 dark:text-white">{selectedIntegrante.especialidad}</p>
                </div>
              </div>

              <button
                onClick={() => setSelectedIntegrante(null)}
                className="w-full btn-primary py-2"
              >
                Cerrar
              </button>
            </div>
          </div>
        </div>
      )}

      {/* New Integrante Modal */}
      {showNewForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white dark:bg-gray-800 rounded-xl max-w-2xl w-full max-h-96 overflow-y-auto p-6">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Nuevo Integrante</h2>
            <NewIntegranteForm 
              onSubmit={handleCreateIntegrante}
              onCancel={() => setShowNewForm(false)}
              groupNames={groupNames.filter(g => g !== 'Todos')}
              roles={roles.filter(r => r !== 'Todos') as ('Líder (Grupo)' | 'Líder (Semillero)' | 'Profesor' | 'Semillerista')[]}
            />
          </div>
        </div>
      )}

      {/* Edit Integrante Modal */}
      {editingIntegrante && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white dark:bg-gray-800 rounded-xl max-w-2xl w-full p-6">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Editar Integrante</h2>
            <div className="space-y-4 max-h-96 overflow-y-auto mb-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Nombre</label>
                  <input
                    type="text"
                    defaultValue={editingIntegrante.nombre}
                    onChange={(e) => setEditingIntegrante({ ...editingIntegrante, nombre: e.target.value })}
                    className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Cédula</label>
                  <input
                    type="text"
                    defaultValue={editingIntegrante.cedula}
                    onChange={(e) => setEditingIntegrante({ ...editingIntegrante, cedula: e.target.value })}
                    className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Email</label>
                  <input
                    type="email"
                    defaultValue={editingIntegrante.email}
                    onChange={(e) => setEditingIntegrante({ ...editingIntegrante, email: e.target.value })}
                    className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Teléfono</label>
                  <input
                    type="text"
                    defaultValue={editingIntegrante.telefono}
                    onChange={(e) => setEditingIntegrante({ ...editingIntegrante, telefono: e.target.value })}
                    className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                  />
                </div>
                <div className="col-span-2">
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Especialidad</label>
                  <input
                    type="text"
                    defaultValue={editingIntegrante.especialidad}
                    onChange={(e) => setEditingIntegrante({ ...editingIntegrante, especialidad: e.target.value })}
                    className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Rol</label>
                  <select
                    value={editingIntegrante.rol}
                    onChange={(e) => setEditingIntegrante({ 
                      ...editingIntegrante, 
                      rol: e.target.value as 'Líder (Grupo)' | 'Líder (Semillero)' | 'Profesor' | 'Semillerista'
                    })}
                    className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                  >
                    {roles.filter(r => r !== 'Todos').map(role => (
                      <option key={role} value={role}>{role}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Grupo</label>
                  <select
                    value={editingIntegrante.grupo}
                    onChange={(e) => setEditingIntegrante({ ...editingIntegrante, grupo: e.target.value })}
                    className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                  >
                    {gruposData.map(grupo => (
                      <option key={grupo.id} value={grupo.id}>{grupo.nombre}</option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => handleSaveEdit(editingIntegrante)}
                className="flex-1 btn-success"
              >
                Guardar Cambios
              </button>
              <button
                onClick={() => setEditingIntegrante(null)}
                className="flex-1 btn-ghost"
              >
                Cancelar
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Status Change Modal */}
      {showStatusModal && statusChangeIntegrante && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white dark:bg-gray-800 rounded-xl max-w-md w-full p-6">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
              {statusChangeIntegrante.estado === 'Activo' ? 'Inactivar' : 'Activar'} Integrante
            </h2>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              ¿Está seguro que desea {statusChangeIntegrante.estado === 'Activo' ? 'inactivar' : 'activar'} a <strong>{statusChangeIntegrante.nombre}</strong>?
            </p>
            
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Motivo</label>
              <textarea
                value={statusChangeReason}
                onChange={(e) => setStatusChangeReason(e.target.value)}
                placeholder="Explique el motivo del cambio..."
                className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white min-h-24 resize-none"
              />
            </div>

            <div className="flex gap-2">
              <button
                onClick={handleConfirmStatusChange}
                disabled={!statusChangeReason.trim()}
                className="flex-1 btn-danger disabled:opacity-50"
              >
                Confirmar
              </button>
              <button
                onClick={() => {
                  setShowStatusModal(false);
                  setStatusChangeIntegrante(null);
                  setStatusChangeReason('');
                }}
                className="flex-1 btn-ghost"
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
