import { useState } from 'react';

export default function PerfilSection() {
  const [isEditing, setIsEditing] = useState(false);
  const [profile, setProfile] = useState({
    nombre: localStorage.getItem('userName') || 'Admin ACASGI',
    email: localStorage.getItem('userEmail') || 'investigaciones@admon.uniajc.edu.co',
    rol: localStorage.getItem('userRole') || 'Administrador',
    telefono: '6652828 Ext: 3301',
    departamento: 'Decanato Asociado de Investigaciones',
    fechaIngreso: localStorage.getItem('userJoinDate') || '2023-01-15'
  });

  const [formData, setFormData] = useState(profile);

  const handleSave = () => {
    setProfile(formData);
    setIsEditing(false);
    localStorage.setItem('userName', formData.nombre);
    alert('Perfil actualizado correctamente');
  };

  return (
    <div className="max-w-4xl mx-auto">
      {/* Profile Header */}
      <div className="bg-white dark:bg-gray-800 rounded-xl overflow-hidden card-shadow mb-6">
        <div className="bg-gradient-to-r from-blue-500 to-purple-500 h-32"></div>
        <div className="px-6 pb-6">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between -mt-16 mb-6">
            <div className="flex items-end gap-4">
              <div className="w-32 h-32 bg-gradient-to-br from-blue-500 to-purple-500 rounded-lg flex items-center justify-center text-white text-5xl font-bold border-4 border-white dark:border-gray-800">
                {profile.nombre.charAt(0)}
              </div>
              <div className="mb-4">
                <h1 className="text-3xl font-bold text-gray-900 dark:text-white">{profile.nombre}</h1>
                <p className="text-gray-600 dark:text-gray-400">{profile.rol}</p>
              </div>
            </div>
            <button
              onClick={() => {
                if (isEditing) {
                  setFormData(profile);
                  setIsEditing(false);
                } else {
                  setIsEditing(true);
                }
              }}
              className={isEditing ? 'btn-ghost px-6 py-2' : 'btn-primary px-6 py-2'}
            >
              {isEditing ? 'Cancelar' : 'Editar Perfil'}
            </button>
          </div>
        </div>
      </div>

      {/* Profile Information */}
      {isEditing ? (
        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 card-shadow space-y-4">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6">Editar Información</h2>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Nombre</label>
            <input
              type="text"
              value={formData.nombre}
              onChange={(e) => setFormData({...formData, nombre: e.target.value})}
              className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Email</label>
            <input
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({...formData, email: e.target.value})}
              className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Teléfono</label>
            <input
              type="tel"
              value={formData.telefono}
              onChange={(e) => setFormData({...formData, telefono: e.target.value})}
              className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
            />
          </div>

          <div className="flex gap-2 pt-4">
            <button onClick={handleSave} className="flex-1 btn-primary py-2">
              Guardar Cambios
            </button>
            <button
              onClick={() => {
                setFormData(profile);
                setIsEditing(false);
              }}
              className="flex-1 btn-ghost py-2"
            >
              Cancelar
            </button>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 card-shadow">
            <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">Información Personal</h3>
            <div className="space-y-4">
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">Email</p>
                <p className="font-semibold text-gray-900 dark:text-white">{profile.email}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">Teléfono</p>
                <p className="font-semibold text-gray-900 dark:text-white">{profile.telefono}</p>
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 card-shadow">
            <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">Información Laboral</h3>
            <div className="space-y-4">
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">Rol</p>
                <p className="font-semibold text-gray-900 dark:text-white">{profile.rol}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">Departamento</p>
                <p className="font-semibold text-gray-900 dark:text-white">{profile.departamento}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">Fecha de Ingreso</p>
                <p className="font-semibold text-gray-900 dark:text-white">{new Date(profile.fechaIngreso).toLocaleDateString('es-ES')}</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
