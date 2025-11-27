import { useState, useEffect } from 'react';

export default function ConfiguracionSection() {
  const [settings, setSettings] = useState({
    notificaciones: true,
    emailNotifications: true,
    darkMode: false,
    privacidad: 'publico',
    dosFactores: false
  });
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });

  // Cargar configuración desde localStorage al montar el componente
  useEffect(() => {
    const savedSettings = localStorage.getItem('appSettings');
    if (savedSettings) {
      try {
        const parsed = JSON.parse(savedSettings);
        setSettings(parsed);
      } catch (e) {
        console.error('Error cargando configuración:', e);
      }
    }
    
    // Aplicar tema guardado
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
      document.documentElement.classList.add('dark');
      setSettings(prev => ({ ...prev }));
    }
  }, []);

  const handleSettingChange = (key: string, value: any) => {
    const newSettings = { ...settings, [key]: value };
    setSettings(newSettings);
    localStorage.setItem('appSettings', JSON.stringify(newSettings));

    // Aplicar tema inmediatamente
    if (key === 'darkMode') {
      if (value) {
        document.documentElement.classList.add('dark');
        localStorage.setItem('theme', 'dark');
      } else {
        document.documentElement.classList.remove('dark');
        localStorage.setItem('theme', 'light');
      }
    }

    // Guardar privacidad
    if (key === 'privacidad') {
      localStorage.setItem('privacyLevel', value);
    }
  };

  const handleSave = () => {
    localStorage.setItem('appSettings', JSON.stringify(settings));
    alert('Configuración guardada correctamente');
  };

  const handleChangePassword = () => {
    if (!passwordData.currentPassword || !passwordData.newPassword || !passwordData.confirmPassword) {
      alert('Por favor completa todos los campos');
      return;
    }

    if (passwordData.newPassword !== passwordData.confirmPassword) {
      alert('Las contraseñas no coinciden');
      return;
    }

    if (passwordData.newPassword.length < 6) {
      alert('La contraseña debe tener al menos 6 caracteres');
      return;
    }

    // Simular cambio de contraseña
    alert('Contraseña cambida correctamente');
    setPasswordData({ currentPassword: '', newPassword: '', confirmPassword: '' });
    setShowPasswordModal(false);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* General Settings */}
      <div className="bg-white dark:bg-gray-800 rounded-xl p-6 card-shadow">
        <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6">Configuración General</h2>

        <div className="space-y-6">
          {/* Tema Oscuro */}
          <div className="flex items-center justify-between pb-6 border-b border-gray-200 dark:border-gray-700">
            <div>
              <h3 className="font-semibold text-gray-900 dark:text-white flex items-center gap-2">
                <i className="ri-moon-line"></i>
                Tema Oscuro
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">Activa el tema oscuro en toda la aplicación</p>
            </div>
            <button
              onClick={() => handleSettingChange('darkMode', !settings.darkMode)}
              className={`relative inline-flex h-8 w-14 items-center rounded-full transition-colors ${
                settings.darkMode ? 'bg-blue-500' : 'bg-gray-300'
              }`}
            >
              <span
                className={`inline-block h-6 w-6 transform rounded-full bg-white transition-transform ${
                  settings.darkMode ? 'translate-x-7' : 'translate-x-1'
                }`}
              />
            </button>
          </div>

          {/* Privacidad */}
          <div className="flex items-center justify-between pb-6 border-b border-gray-200 dark:border-gray-700">
            <div>
              <h3 className="font-semibold text-gray-900 dark:text-white flex items-center gap-2">
                <i className="ri-lock-line"></i>
                Nivel de Privacidad
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">Controla quién puede ver tu información</p>
            </div>
            <select
              value={settings.privacidad}
              onChange={(e) => handleSettingChange('privacidad', e.target.value)}
              className="px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
            >
              <option value="privado">Privado</option>
              <option value="publico">Público</option>
              <option value="grupo">Solo Grupo</option>
            </select>
          </div>
        </div>
      </div>

      {/* Notifications Settings */}
      <div className="bg-white dark:bg-gray-800 rounded-xl p-6 card-shadow">
        <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-2">
          <i className="ri-notification-line"></i>
          Notificaciones
        </h2>

        <div className="space-y-4">
          {/* Notificaciones App */}
          <div className="flex items-center justify-between pb-4 border-b border-gray-200 dark:border-gray-700">
            <div>
              <h3 className="font-semibold text-gray-900 dark:text-white">Notificaciones en la App</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">Recibe alertas dentro de la aplicación</p>
            </div>
            <button
              onClick={() => handleSettingChange('notificaciones', !settings.notificaciones)}
              className={`relative inline-flex h-8 w-14 items-center rounded-full transition-colors ${
                settings.notificaciones ? 'bg-blue-500' : 'bg-gray-300'
              }`}
            >
              <span
                className={`inline-block h-6 w-6 transform rounded-full bg-white transition-transform ${
                  settings.notificaciones ? 'translate-x-7' : 'translate-x-1'
                }`}
              />
            </button>
          </div>

          {/* Notificaciones Email */}
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-semibold text-gray-900 dark:text-white">Notificaciones por Email</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">Recibe resúmenes y alertas por correo</p>
            </div>
            <button
              onClick={() => handleSettingChange('emailNotifications', !settings.emailNotifications)}
              className={`relative inline-flex h-8 w-14 items-center rounded-full transition-colors ${
                settings.emailNotifications ? 'bg-blue-500' : 'bg-gray-300'
              }`}
            >
              <span
                className={`inline-block h-6 w-6 transform rounded-full bg-white transition-transform ${
                  settings.emailNotifications ? 'translate-x-7' : 'translate-x-1'
                }`}
              />
            </button>
          </div>
        </div>
      </div>

      {/* Security Settings */}
      <div className="bg-white dark:bg-gray-800 rounded-xl p-6 card-shadow">
        <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-2">
          <i className="ri-shield-check-line"></i>
          Seguridad
        </h2>

        <div className="space-y-4">
          {/* Dos Factores */}
          <div className="flex items-center justify-between pb-4 border-b border-gray-200 dark:border-gray-700">
            <div>
              <h3 className="font-semibold text-gray-900 dark:text-white">Autenticación de Dos Factores</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">Aumenta la seguridad de tu cuenta</p>
            </div>
            <button
              onClick={() => handleSettingChange('dosFactores', !settings.dosFactores)}
              className={`relative inline-flex h-8 w-14 items-center rounded-full transition-colors ${
                settings.dosFactores ? 'bg-blue-500' : 'bg-gray-300'
              }`}
            >
              <span
                className={`inline-block h-6 w-6 transform rounded-full bg-white transition-transform ${
                  settings.dosFactores ? 'translate-x-7' : 'translate-x-1'
                }`}
              />
            </button>
          </div>

          {/* Cambiar Contraseña */}
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-semibold text-gray-900 dark:text-white">Cambiar Contraseña</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">Última vez: Hace 3 meses</p>
            </div>
            <button onClick={() => setShowPasswordModal(true)} className="btn-secondary px-4 py-2 text-sm">
              Cambiar
            </button>
          </div>
        </div>
      </div>

      {/* Password Change Modal */}
      {showPasswordModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 max-w-md w-full">
            <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">Cambiar Contraseña</h3>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Contraseña Actual
                </label>
                <input
                  type="password"
                  value={passwordData.currentPassword}
                  onChange={(e) => setPasswordData({...passwordData, currentPassword: e.target.value})}
                  placeholder="Ingresa tu contraseña actual"
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Nueva Contraseña
                </label>
                <input
                  type="password"
                  value={passwordData.newPassword}
                  onChange={(e) => setPasswordData({...passwordData, newPassword: e.target.value})}
                  placeholder="Ingresa tu nueva contraseña"
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Confirmar Contraseña
                </label>
                <input
                  type="password"
                  value={passwordData.confirmPassword}
                  onChange={(e) => setPasswordData({...passwordData, confirmPassword: e.target.value})}
                  placeholder="Confirma tu nueva contraseña"
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                />
              </div>
            </div>

            <div className="flex gap-2 mt-6">
              <button
                onClick={handleChangePassword}
                className="flex-1 btn-primary py-2"
              >
                Cambiar Contraseña
              </button>
              <button
                onClick={() => {
                  setShowPasswordModal(false);
                  setPasswordData({ currentPassword: '', newPassword: '', confirmPassword: '' });
                }}
                className="flex-1 btn-ghost py-2"
              >
                Cancelar
              </button>
            </div>
          </div>
        </div>
      )}

      {/* About */}
      <div className="bg-gradient-to-br from-blue-50 to-purple-50 dark:from-gray-800 dark:to-gray-700 rounded-xl p-6 card-shadow">
        <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">Acerca de ACASGI</h3>
        <p className="text-gray-700 dark:text-gray-300 mb-4">
          <strong>ACASGI</strong> es la plataforma de <strong>Automatización de Certificados de Adscripción de Semilleros y Grupos de Investigación</strong>.
          Diseñada para facilitar la gestión de grupos de investigación, semilleros académicos e integrantes en instituciones educativas.
        </p>
        <div className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
          <p><strong>Versión:</strong> 1.0.0</p>
          <p><strong>Última actualización:</strong> Noviembre 2025</p>
          <p><strong>Desarrollador:</strong> Equipo de Tecnología ACASGI</p>
        </div>
      </div>

      {/* Save Button */}
      <div className="flex gap-2">
        <button onClick={handleSave} className="flex-1 btn-primary py-3">
          <i className="ri-save-line"></i> Guardar Cambios
        </button>
      </div>
    </div>
  );
}
