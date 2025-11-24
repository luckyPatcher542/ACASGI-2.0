import { useState } from 'react';

export default function ConfiguracionSection() {
  const [settings, setSettings] = useState({
    notificaciones: true,
    emailNotifications: true,
    darkMode: document.documentElement.classList.contains('dark'),
    idioma: 'es',
    privacidad: 'publico',
    dosFactores: false
  });

  const handleSave = () => {
    if (settings.darkMode !== document.documentElement.classList.contains('dark')) {
      document.documentElement.classList.toggle('dark');
      localStorage.setItem('theme', settings.darkMode ? 'dark' : 'light');
    }
    alert('Configuración guardada correctamente');
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* General Settings */}
      <div className="bg-white dark:bg-gray-800 rounded-xl p-6 card-shadow">
        <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6">Configuración General</h2>

        <div className="space-y-6">
          {/* Idioma */}
          <div className="flex items-center justify-between pb-6 border-b border-gray-200 dark:border-gray-700">
            <div>
              <h3 className="font-semibold text-gray-900 dark:text-white flex items-center gap-2">
                <i className="ri-global-line"></i>
                Idioma
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">Selecciona el idioma de la aplicación</p>
            </div>
            <select
              value={settings.idioma}
              onChange={(e) => setSettings({...settings, idioma: e.target.value})}
              className="px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
            >
              <option value="es">Español</option>
              <option value="en">English</option>
              <option value="pt">Português</option>
            </select>
          </div>

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
              onClick={() => setSettings({...settings, darkMode: !settings.darkMode})}
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
              onChange={(e) => setSettings({...settings, privacidad: e.target.value})}
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
              onClick={() => setSettings({...settings, notificaciones: !settings.notificaciones})}
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
              onClick={() => setSettings({...settings, emailNotifications: !settings.emailNotifications})}
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
              onClick={() => setSettings({...settings, dosFactores: !settings.dosFactores})}
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
            <button className="btn-secondary px-4 py-2 text-sm">
              Cambiar
            </button>
          </div>
        </div>
      </div>

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
