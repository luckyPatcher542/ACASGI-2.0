import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function HomePage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');

  const handleScroll = (elementId: string) => {
    const element = document.getElementById(elementId);
    element?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-white dark:bg-dark text-gray-900 dark:text-gray-100">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white dark:bg-gray-800 shadow-sm">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <i className="ri-graduation-cap-line text-3xl text-blue-500"></i>
            <span className="text-2xl font-pacifico text-blue-600 dark:text-blue-400">ACASGI</span>
          </div>
          <nav className="hidden md:flex gap-6 items-center">
            <button onClick={() => handleScroll('features')} className="hover:text-blue-500 transition">
              Características
            </button>
            <button onClick={() => handleScroll('stats')} className="hover:text-blue-500 transition">
              Estadísticas
            </button>
            <button onClick={() => handleScroll('about')} className="hover:text-blue-500 transition">
              Sobre Nosotros
            </button>
            <button
              onClick={() => navigate('/login')}
              className="btn-primary"
            >
              Iniciar Sesión
            </button>
          </nav>
          <button
            onClick={() => navigate('/login')}
            className="md:hidden btn-primary text-sm"
          >
            Ingresar
          </button>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative gradient-acasgi py-20 md:py-32 text-white overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-96 h-96 bg-white rounded-full filter blur-3xl"></div>
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-white rounded-full filter blur-3xl"></div>
        </div>
        
        <div className="relative max-w-7xl mx-auto px-6 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-4 font-pacifico drop-shadow-lg">
            ACASGI
          </h1>
          <h2 className="text-xl md:text-3xl font-semibold mb-6 drop-shadow-lg">
            Automatización de Certificados de Adscripción de Semilleros y Grupos de Investigación
          </h2>
          <p className="text-lg md:text-xl max-w-2xl mx-auto mb-8 opacity-95">
            Fomentamos la investigación científica y el desarrollo de talento en Colombia a través de una plataforma moderna y completa.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
            <button
              onClick={() => navigate('/login')}
              className="btn-primary px-8 py-3 text-lg bg-white text-blue-600 hover:bg-gray-100"
            >
              Iniciar Sesión
            </button>
            <button
              onClick={() => handleScroll('features')}
              className="btn-ghost px-8 py-3 text-lg border-2 border-white text-white hover:bg-white hover:text-blue-600"
            >
              Conocer Más
            </button>
          </div>

          <div className="flex gap-4 justify-center flex-wrap text-sm md:text-base">
            <div className="flex items-center gap-2 bg-white bg-opacity-20 px-4 py-2 rounded-full">
              <i className="ri-team-line text-xl"></i>
              <span>127+ Integrantes</span>
            </div>
            <div className="flex items-center gap-2 bg-white bg-opacity-20 px-4 py-2 rounded-full">
              <i className="ri-plant-line text-xl"></i>
              <span>15 Semilleros Activos</span>
            </div>
            <div className="flex items-center gap-2 bg-white bg-opacity-20 px-4 py-2 rounded-full">
              <i className="ri-award-line text-xl"></i>
              <span>45+ Certificados</span>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 bg-light dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-4xl font-bold text-center mb-16">Características Principales</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: 'ri-team-line',
                title: 'Gestión de Grupos',
                description: 'Administra grupos de investigación con toda la información centralizada'
              },
              {
                icon: 'ri-plant-line',
                title: 'Semilleros de Investigación',
                description: 'Organiza y supervisa semilleros asociados a tus grupos'
              },
              {
                icon: 'ri-award-line',
                title: 'Certificados Digitales',
                description: 'Emite certificados de adscripción y por productos de investigación'
              },
              {
                icon: 'ri-bar-chart-line',
                title: 'Reportes Avanzados',
                description: 'Visualiza análisis e informes interactivos en tiempo real'
              }
            ].map((feature, i) => (
              <div key={i} className="bg-white dark:bg-gray-800 rounded-xl p-8 card-shadow hover:shadow-2xl">
                <i className={`${feature.icon} text-5xl text-blue-500 mb-4 inline-block`}></i>
                <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
                <p className="text-gray-600 dark:text-gray-400">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section id="stats" className="py-20 bg-white dark:bg-dark">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-4xl font-bold text-center mb-16">Números que Hablan</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { number: '8', label: 'Grupos de Investigación', icon: 'ri-team-fill' },
              { number: '15', label: 'Semilleros Activos', icon: 'ri-plant-fill' },
              { number: '127', label: 'Integrantes Activos', icon: 'ri-user-fill' },
              { number: '45', label: 'Certificados Emitidos', icon: 'ri-award-fill' }
            ].map((stat, i) => (
              <div key={i} className="text-center">
                <i className={`${stat.icon} text-6xl text-gradient-acasgi bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent mb-4 inline-block`}></i>
                <div className="text-5xl font-bold text-blue-600 dark:text-blue-400 mb-2">{stat.number}</div>
                <p className="text-gray-600 dark:text-gray-400">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-20 bg-light dark:bg-gray-900">
        <div className="max-w-2xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold mb-6">Mantente Informado</h2>
          <p className="text-gray-600 dark:text-gray-400 mb-8">
            Suscríbete para recibir actualizaciones sobre nuevos semilleros y oportunidades de investigación
          </p>
          <div className="flex gap-2 mb-4">
            <input
              type="email"
              placeholder="Tu correo electrónico"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="flex-1 px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 dark:bg-gray-800 dark:text-white"
            />
            <button className="btn-primary px-6 py-3">Suscribirse</button>
          </div>
          <p className="text-sm text-gray-500">Nunca compartiremos tu información</p>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 bg-white dark:bg-dark">
        <div className="max-w-4xl mx-auto px-6">
          <h2 className="text-4xl font-bold text-center mb-12">Sobre ACASGI</h2>
          
          <p className="text-lg text-gray-600 dark:text-gray-400 mb-6 leading-relaxed">
            ACASGI (Automatización de Certificados de Adscripción de Semilleros y Grupos de Investigación) es un sistema especializado en la gestión integral y certificación de adscripción para semilleros y grupos de investigación. Nos comprometemos con el desarrollo del talento investigativo mediante automatización de procesos certificadores, facilitando la documentación y acreditación de calidad en investigación.
          </p>
          
          <p className="text-lg text-gray-600 dark:text-gray-400 mb-6 leading-relaxed">
            Nuestro sistema de gestión integral permite a investigadores, coordinadores y estudiantes colaborar efectivamente, compartir conocimiento y documentar sus logros académicos. Operamos con los más altos estándares de transparencia y excelencia.
          </p>

          <div className="bg-blue-50 dark:bg-gray-800 rounded-xl p-8 border-l-4 border-blue-500">
            <h3 className="text-2xl font-bold mb-4">Nuestra Misión</h3>
            <p className="text-gray-700 dark:text-gray-300">
              Promover la investigación científica de calidad, fortalecer los semilleros de investigación y desarrollar el talento académico en Colombia, proporcionando herramientas modernas y un ambiente colaborativo que impulse la innovación y el conocimiento.
            </p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-800 dark:bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <i className="ri-graduation-cap-line text-2xl"></i>
                <span className="font-pacifico text-xl">ACASGI</span>
              </div>
              <p className="text-gray-400">Fomentando la investigación en Colombia</p>
            </div>
            <div>
              <h4 className="font-bold mb-4">Navegación</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#features" className="hover:text-white transition">Características</a></li>
                <li><a href="#stats" className="hover:text-white transition">Estadísticas</a></li>
                <li><a href="#about" className="hover:text-white transition">Sobre Nosotros</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4">Contacto</h4>
              <ul className="space-y-2 text-gray-400">
                <li>Email: info@acasgi.org</li>
                <li>Teléfono: +57 (1) 1234567</li>
                <li>Colombia</li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4">Redes Sociales</h4>
              <div className="flex gap-4">
                <a href="#" className="w-10 h-10 bg-gray-700 rounded-full flex items-center justify-center hover:bg-blue-600 transition">
                  <i className="ri-facebook-line"></i>
                </a>
                <a href="#" className="w-10 h-10 bg-gray-700 rounded-full flex items-center justify-center hover:bg-blue-400 transition">
                  <i className="ri-twitter-line"></i>
                </a>
                <a href="#" className="w-10 h-10 bg-gray-700 rounded-full flex items-center justify-center hover:bg-pink-600 transition">
                  <i className="ri-instagram-line"></i>
                </a>
              </div>
            </div>
          </div>
          
          <div className="border-t border-gray-700 pt-8">
            <p className="text-center text-gray-400">
              &copy; 2024 ACASGI - Automatización de Certificados de Adscripción de Semilleros y Grupos de Investigación. Todos los derechos reservados.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
