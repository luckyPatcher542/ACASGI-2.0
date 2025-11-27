import Juan from "../fotos/Juan.png";
import Jacque from "../fotos/Jacque.png";
import Gilma from "../fotos/Gilma.png";
import Danna from "../fotos/Danna.png";
import Gabo from "../fotos/Gabo.png";
import Gabi from "../fotos/Gabi.png";
import Diego from "../fotos/Diego.png";


const teamMembers = [
  {
    id: '1',
  nombre: 'Juan Carlos Cruz Ardila',
  cargo: 'Decano Asociado de Investigaciones',
  email: 'jcarloscruz@admon.uniajc.edu.co',
  telefono: '+6026652828',
  extension: '3305',
  foto: Juan

  },
  {
    id: '2',
  nombre: 'Jacqueline Díaz Rodriguez',
  cargo: 'Técnica Administrativa de Investigaciones',
  email: 'jdiazr@admon.uniajc.edu.co',
  telefono: '+6026652828',
  extension: '3305',
  foto: Jacque
  },
  {
    id: '3',
  nombre: 'Gilmar Yarlina Cuero Hurtado',
  cargo: 'Auxiliar Administrativo',
  email: 'aux_inv1@admon.uniajc.edu.co',
  telefono: '+6026652828',
  extension: '3304',
  foto: Gilma
  },
  {
  id: '4',
  nombre: 'Danna Vanessa Mancilla Aguilar',
  cargo: 'Becaria de Investigaciones 1',
  email: 'beca_inv1@admon.uniajc.edu.co',
  telefono: '+6026652828',
  extension: '3304',
  foto: Danna
  },
  {
    id: '5',
  nombre: 'Gabriel Tellez Bedon',
  cargo: 'Becario de Investigaciones 2',
  email: 'beca_inv2@admon.uniajc.edu.co',
  telefono: '+6026652828',
  extension: '3304',
  foto: Gabo
  },
  {
    id: '6',
  nombre: 'Gabriela Sofía Ruiz Castro',
  cargo: 'Becaria de Investigaciones 3',
  email: 'beca_inv3@admon.uniajc.edu.co',
  telefono: '+6026652828',
  extension: '3304',
  foto: Gabi
  },
  {
   id: '7',
  nombre: 'Diego Armando Palacios Cruz',
  cargo: 'Becario de Investigaciones 4',
  email: 'beca_inv4@admon.uniajc.edu.co',
  telefono: '+6026652828',
  extension: '3304',
  foto: Diego

  },
  {
    id: '8',
  nombre: 'Espacio para futuro becari@',
  cargo: 'Becari@ de Investigaciones 5',
  email: 'beca_inv5@admon.uniajc.edu.co',
  telefono: '+6026652828',
  extension: '3304',
  foto: null

  }
];

export default function SobreNosotrosSection() {
  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">Sobre ACASGI</h2>
        <p className="text-lg text-gray-600 dark:text-gray-400">
          Conoce más sobre nuestra organización y el equipo que impulsa la investigación en Colombia
        </p>
      </div>

      {/* Mission and Vision */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900 dark:to-blue-800 rounded-xl p-8 border-l-4 border-blue-600">
          <div className="flex items-center gap-3 mb-4">
            <i className="ri-target-2-line text-3xl text-blue-600 dark:text-blue-300"></i>
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white">Misión</h3>
          </div>
          <p className="text-gray-700 dark:text-gray-200 leading-relaxed">
            Promover la investigación científica de calidad, fortalecer los semilleros de investigación y desarrollar el talento académico en Colombia, proporcionando herramientas modernas y un ambiente colaborativo que impulse la innovación y el conocimiento.
          </p>
        </div>

        <div className="bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-900 dark:to-purple-800 rounded-xl p-8 border-l-4 border-purple-600">
          <div className="flex items-center gap-3 mb-4">
            <i className="ri-eye-line text-3xl text-purple-600 dark:text-purple-300"></i>
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white">Visión</h3>
          </div>
          <p className="text-gray-700 dark:text-gray-200 leading-relaxed">
            Ser la plataforma líder en Colombia para la gestión de semilleros y grupos de investigación, reconocida por su contribución al avance científico, la excelencia académica y el impacto social en la comunidad educativa.
          </p>
        </div>
      </div>

      {/* Values */}
      <div>
        <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Valores Fundamentales</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            {
              icon: 'ri-lightbulb-flash-line',
              title: 'Excelencia',
              description: 'Comprometidos con la calidad en todas nuestras actividades'
            },
            {
              icon: 'ri-team-line',
              title: 'Colaboración',
              description: 'Fomentamos el trabajo en equipo y la sinergia entre grupos'
            },
            {
              icon: 'ri-book-line',
              title: 'Innovación',
              description: 'Impulsamos el pensamiento creativo y nuevas formas de investigar'
            },
            {
              icon: 'ri-integrity-line',
              title: 'Transparencia',
              description: 'Actuamos con honestidad e integridad en todos nuestros procesos'
            }
          ].map((value, i) => (
            <div key={i} className="bg-white dark:bg-gray-800 rounded-xl p-6 card-shadow text-center">
              <i className={`${value.icon} text-4xl text-blue-500 mb-4 inline-block`}></i>
              <h4 className="text-xl font-bold text-gray-900 dark:text-white mb-2">{value.title}</h4>
              <p className="text-sm text-gray-600 dark:text-gray-400">{value.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Team */}
      <div>
        <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Equipo de Investigaciones</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {teamMembers.map((member) => (
            <div key={member.id} className="bg-white dark:bg-gray-800 rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:scale-105 flex flex-col h-full">
              {/* Photo Container */}
              <div className="w-full h-56 bg-gradient-to-br from-blue-50 via-blue-100 to-purple-100 dark:from-gray-700 dark:via-gray-600 dark:to-gray-500 flex items-center justify-center border-b border-gray-100 dark:border-gray-700">
                <div className="w-40 h-40 rounded-full bg-gradient-to-br from-gray-200 to-gray-300 dark:from-gray-600 dark:to-gray-500 flex items-center justify-center shadow-md">
                 <img
  src={member.foto}
  alt={member.nombre}
  className="w-40 h-40 rounded-full object-cover shadow-md"
/>


                </div>
              </div>

              {/* Card Content */}
              <div className="p-6 text-center flex flex-col flex-1">
                <h4 className="font-bold text-gray-900 dark:text-white mb-2 text-base leading-tight">{member.nombre}</h4>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-6 leading-relaxed font-medium">{member.cargo}</p>

                {/* Contact Links */}
                <div className="space-y-3 mt-auto">
                  <div>
                    <a
                      href={`mailto:${member.email}`}
                      className="flex items-center justify-center gap-2 text-xs text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 transition-colors py-2 px-3 rounded-lg bg-blue-50 dark:bg-gray-700/50 hover:bg-blue-100 dark:hover:bg-gray-700 break-words"
                      title={member.email}
                    >
                      <i className="ri-mail-line text-sm flex-shrink-0"></i>
                      <span className="line-clamp-1">{member.email}</span>
                    </a>
                  </div>
                  <div>
                    <a
                      href={`tel:${member.telefono}`}
                      className="flex items-center justify-center gap-2 text-xs text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 transition-colors py-2 px-3 rounded-lg bg-blue-50 dark:bg-gray-700/50 hover:bg-blue-100 dark:hover:bg-gray-700"
                      title={`${member.telefono} ext. ${member.extension}`}
                    >
                      <i className="ri-phone-line text-sm flex-shrink-0"></i>
                      <span>{member.telefono} ext. {member.extension}</span>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Statistics */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl p-12 text-white">
        <h3 className="text-3xl font-bold mb-8 text-center">Nuestro Impacto</h3>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
          {[
            { number: '8', label: 'Grupos de Investigación Activos' },
            { number: '15', label: 'Semilleros en Operación' },
            { number: '127', label: 'Miembros Participando' },
            { number: '45', label: 'Certificados Otorgados' }
          ].map((stat, i) => (
            <div key={i}>
              <div className="text-5xl font-bold mb-2">{stat.number}</div>
              <p className="text-sm opacity-90">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>

      {/* History */}
      <div>
        <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Nuestra Historia</h3>
        <div className="bg-white dark:bg-gray-800 rounded-xl p-8 card-shadow">
          <div className="space-y-6">
            <div className="flex gap-4">
              <div className="flex-shrink-0">
                <div className="flex items-center justify-center h-12 w-12 rounded-md bg-blue-500 text-white">
                  <i className="ri-calendar-line"></i>
                </div>
              </div>
              <div>
                <h4 className="text-lg font-bold text-gray-900 dark:text-white">Fundación</h4>
                <p className="text-gray-600 dark:text-gray-400">ACASGI fue fundada con la misión de centralizar y fortalecer los esfuerzos de investigación en instituciones educativas colombianas.</p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="flex-shrink-0">
                <div className="flex items-center justify-center h-12 w-12 rounded-md bg-green-500 text-white">
                  <i className="ri-growth-line"></i>
                </div>
              </div>
              <div>
                <h4 className="text-lg font-bold text-gray-900 dark:text-white">Crecimiento</h4>
                <p className="text-gray-600 dark:text-gray-400">Hemos crecido significativamente, incorporando nuevos grupos de investigación y ampliando nuestra cobertura a diferentes disciplinas académicas.</p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="flex-shrink-0">
                <div className="flex items-center justify-center h-12 w-12 rounded-md bg-purple-500 text-white">
                  <i className="ri-innovation-fill"></i>
                </div>
              </div>
              <div>
                <h4 className="text-lg font-bold text-gray-900 dark:text-white">Transformación Digital</h4>
                <p className="text-gray-600 dark:text-gray-400">Implementamos esta plataforma moderna para facilitar la gestión, coordinación y seguimiento de todas nuestras operaciones.</p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="flex-shrink-0">
                <div className="flex items-center justify-center h-12 w-12 rounded-md bg-yellow-500 text-white">
                  <i className="ri-star-line"></i>
                </div>
              </div>
              <div>
                <h4 className="text-lg font-bold text-gray-900 dark:text-white">Hoy</h4>
                <p className="text-gray-600 dark:text-gray-400">Continuamos evolucionando, fortaleciendo nuestro compromiso con la excelencia académica y el impacto social en la investigación.</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Contact */}
      <div className="bg-light dark:bg-gray-900 rounded-xl p-8 border border-gray-200 dark:border-gray-700">
        <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Contáctanos</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="flex gap-4">
            <i className="ri-map-pin-line text-2xl text-blue-500 flex-shrink-0 mt-1"></i>
            <div>
              <h4 className="font-bold text-gray-900 dark:text-white">Ubicación</h4>
              <p className="text-gray-600 dark:text-gray-400">Av 6a N #28N - 102</p>
            </div>
          </div>
          <div className="flex gap-4">
            <i className="ri-mail-line text-2xl text-blue-500 flex-shrink-0 mt-1"></i>
            <div>
              <h4 className="font-bold text-gray-900 dark:text-white">Email</h4>
              <a href="mailto:investigaciones@admon.uniajc.edu.co" className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                investigaciones@admon.uniajc.edu.co
              </a>
            </div>
          </div>
          <div className="flex gap-4">
            <i className="ri-phone-line text-2xl text-blue-500 flex-shrink-0 mt-1"></i>
            <div>
              <h4 className="font-bold text-gray-900 dark:text-white">Teléfono</h4>
              <a href="tel:+6026652828" className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                (602) 6652828
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
