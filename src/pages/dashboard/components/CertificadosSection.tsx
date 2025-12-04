import { useState, useMemo, useEffect } from 'react';
import axios from 'axios';
import { Certificado } from '../../../mocks/certificados';
import { integrantesData } from '../../../mocks/integrantes';

export default function CertificadosSection() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedType, setSelectedType] = useState('Todos');
  const [selectedStatus, setSelectedStatus] = useState('Todos');
  const [selectedCert, setSelectedCert] = useState<Certificado | null>(null);
  const [showAdsModal, setShowAdsModal] = useState(false);
  const [showProductModal, setShowProductModal] = useState(false);
  const [cedula, setCedula] = useState('');
  const [foundIntegrante, setFoundIntegrante] = useState<any>(null);
  const [certificados, setCertificados] = useState<Certificado[]>([]);

  const types = ['Todos', 'Adscripción', 'Producto'];
  const statuses = ['Todos', 'Vigente', 'Vencido', 'Revocado'];

  const filteredCerts = useMemo(() => {
    return certificados.filter(cert => {
      const matchesSearch = cert.beneficiario.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           cert.cedula.includes(searchQuery);
      const matchesType = selectedType === 'Todos' || cert.tipo === selectedType;
      const matchesStatus = selectedStatus === 'Todos' || cert.estado === selectedStatus;
      return matchesSearch && matchesType && matchesStatus;
    });
  }, [searchQuery, selectedType, selectedStatus, certificados]);

  const getStatusColor = (status: string) => {
    switch(status) {
      case 'Vigente': return 'bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-200';
      case 'Vencido': return 'bg-red-100 dark:bg-red-900 text-red-700 dark:text-red-200';
      case 'Revocado': return 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-200';
      default: return 'bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-200';
    }
  };

  const handleClearFilters = () => {
    setSearchQuery('');
    setSelectedType('Todos');
    setSelectedStatus('Todos');
  };

  const handleSearchIntegrante = () => {
    const integrante = integrantesData.find(i => i.cedula === cedula);
    if (integrante) {
      setFoundIntegrante(integrante);
    } else {
      setFoundIntegrante(null);
      alert('Integrante no encontrado');
    }
  };

  const handleGenerateCertificate = async () => {
    if (foundIntegrante) {
      try {
        const res = await axios.post('http://localhost:4000/api/certificado', {
          cedula: foundIntegrante.cedula,
          beneficiario: foundIntegrante.nombre,
          tipo: 'Adscripción',
          estado: 'Vigente',
          fechaEmision: new Date().toISOString(),
          fechaVencimiento: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toISOString(),
          codigo: 'CERT-' + Date.now(),
          descripcion: `Certificado de Adscripción para ${foundIntegrante.nombre}`
        });
        const newCert: Certificado = {
          id: String(res.data.id || Date.now()),
          cedula: foundIntegrante.cedula,
          beneficiario: foundIntegrante.nombre,
          tipo: 'Adscripción',
          estado: 'Vigente',
          fechaEmision: new Date().toISOString(),
          fechaVencimiento: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toISOString(),
          codigo: 'CERT-' + Date.now(),
          descripcion: `Certificado de Adscripción para ${foundIntegrante.nombre}`
        };
        setCertificados([...certificados, newCert]);
        alert('Certificado generado correctamente');
        setShowAdsModal(false);
        setCedula('');
        setFoundIntegrante(null);
      } catch (err) {
        console.error('Error generando certificado:', err);
        alert('Error al generar certificado');
      }
    }
  };

  useEffect(() => {
    const fetchCerts = async () => {
      try {
        const res = await axios.get('http://localhost:4000/api/certificado');
        const rows = Array.isArray(res.data) ? res.data : [];
        const normalized = rows.map((r: any) => {
          const estado = (r.ESTADO === 1 || r.ESTADO === '1' || String(r.estado).toLowerCase() === 'vigente') ? 'Vigente' : (r.ESTADO === 0 || r.ESTADO === '0' || String(r.estado).toLowerCase() === 'vencido' ? 'Vencido' : (r.estado ?? 'Vigente'));
          return {
            id: String(r.ID_CERTIFICADO ?? r.id ?? r.ID ?? ''),
            cedula: r.CEDULA ?? r.cedula ?? '',
            beneficiario: r.BENEFICIARIO ?? r.NOMBRE ?? r.beneficiario ?? r.nombre ?? 'Desconocido',
            tipo: r.TIPO_CERTIFICADO ?? r.TIPO ?? r.tipo ?? 'Adscripción',
            estado,
            fechaEmision: r.FECHA_EMISION ?? r.FECHA_SOLICITUD ?? r.fechaEmision ?? '',
            fechaVencimiento: r.FECHA_VENCIMIENTO ?? r.fechaVencimiento ?? null,
            codigo: r.CODIGO ?? r.codigo ?? '',
            descripcion: r.DESCRIPCION ?? r.descripcion ?? ''
          } as Certificado;
        });
        setCertificados(normalized);
      } catch (err) {
        console.error('Error cargando certificados:', err);
      }
    };
    fetchCerts();
  }, []);

  return (
    <div className="space-y-6">
      {/* Header with Buttons */}
      <div className="flex items-center justify-between">
        <div>
          <p className="text-gray-600 dark:text-gray-400 text-sm">{filteredCerts.length} certificados encontrados</p>
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => setShowAdsModal(true)}
            className="btn-primary flex items-center gap-2"
          >
            <i className="ri-id-card-line text-xl"></i>
            Certificado de Adscripción
          </button>
          <button
            onClick={() => setShowProductModal(true)}
            className="btn-secondary flex items-center gap-2"
          >
            <i className="ri-award-line text-xl"></i>
            Certificado por Producto
          </button>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white dark:bg-gray-800 rounded-xl p-6 card-shadow">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
          {/* Search */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Buscar por cédula o nombre</label>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Buscar..."
              className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
            />
          </div>

          {/* Type */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Tipo</label>
            <select
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value)}
              className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
            >
              {types.map(type => (
                <option key={type} value={type}>{type}</option>
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

      {/* Certificates Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredCerts.map((cert) => (
          <div key={cert.id} className="bg-white dark:bg-gray-800 rounded-xl overflow-hidden card-shadow">
            <div className={`bg-gradient-to-r ${
              cert.tipo === 'Adscripción'
                ? 'from-blue-500 to-cyan-500'
                : 'from-purple-500 to-pink-500'
            } p-4 text-white`}>
              <div className="flex items-start justify-between mb-2">
                <i className={`${
                  cert.tipo === 'Adscripción' ? 'ri-id-card-fill' : 'ri-award-fill'
                } text-3xl`}></i>
                <span className={`badge text-xs ${getStatusColor(cert.estado)}`}>
                  {cert.estado}
                </span>
              </div>
              <h3 className="font-bold text-lg">{cert.beneficiario}</h3>
            </div>

            <div className="p-4">
              <div className="mb-3">
                <span className="badge bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-200 text-xs">
                  {cert.tipo}
                </span>
              </div>

              <div className="space-y-2 text-sm mb-4">
                <p><strong>Cédula:</strong> {cert.cedula}</p>
                <p><strong>Código:</strong> {cert.codigo}</p>
                <p><strong>Emisión:</strong> {new Date(cert.fechaEmision).toLocaleDateString('es-ES')}</p>
                {cert.fechaVencimiento && (
                  <p><strong>Vencimiento:</strong> {new Date(cert.fechaVencimiento).toLocaleDateString('es-ES')}</p>
                )}
              </div>

              <div className="flex gap-2">
                <button
                  onClick={() => setSelectedCert(cert)}
                  className="flex-1 btn-primary py-2 text-sm"
                >
                  Ver Detalle
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Detail Modal */}
      {selectedCert && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white dark:bg-gray-800 rounded-xl max-w-2xl w-full max-h-96 overflow-y-auto p-6">
            <div className="flex items-start justify-between mb-4">
              <div>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">{selectedCert.beneficiario}</h2>
                <span className={`badge mt-2 ${
                  selectedCert.tipo === 'Adscripción' ? 'bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-200' : 'bg-purple-100 dark:bg-purple-900 text-purple-700 dark:text-purple-200'
                }`}>
                  {selectedCert.tipo}
                </span>
              </div>
              <button
                onClick={() => setSelectedCert(null)}
                className="text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"
              >
                <i className="ri-close-line text-2xl"></i>
              </button>
            </div>

            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Cédula</p>
                  <p className="font-semibold text-gray-900 dark:text-white">{selectedCert.cedula}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Código</p>
                  <p className="font-semibold text-gray-900 dark:text-white">{selectedCert.codigo}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Estado</p>
                  <p className="font-semibold text-gray-900 dark:text-white">{selectedCert.estado}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Tipo</p>
                  <p className="font-semibold text-gray-900 dark:text-white">{selectedCert.tipo}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Fecha Emisión</p>
                  <p className="font-semibold text-gray-900 dark:text-white">{new Date(selectedCert.fechaEmision).toLocaleDateString('es-ES')}</p>
                </div>
                {selectedCert.fechaVencimiento && (
                  <div>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Fecha Vencimiento</p>
                    <p className="font-semibold text-gray-900 dark:text-white">{new Date(selectedCert.fechaVencimiento).toLocaleDateString('es-ES')}</p>
                  </div>
                )}
              </div>

              <button
                onClick={() => setSelectedCert(null)}
                className="w-full btn-primary py-2"
              >
                Cerrar
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Adscripción Modal */}
      {showAdsModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white dark:bg-gray-800 rounded-xl max-w-2xl w-full p-6">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Certificado de Adscripción</h2>
            
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-6 bg-blue-50 dark:bg-gray-700 p-4 rounded-lg">
              El Certificado de Adscripción es un documento oficial que confirma que un integrante pertenece y está vinculado a un Grupo o Semillero de Investigación. Este certificado respalda la afiliación institucional para trámites académicos, convocatorias o procesos administrativos.
            </p>
            
            {!foundIntegrante ? (
              <div className="space-y-4">
                <p className="text-gray-600 dark:text-gray-400">Ingresa la cédula del integrante para generar el certificado</p>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={cedula}
                    onChange={(e) => setCedula(e.target.value)}
                    placeholder="Número de cédula"
                    className="flex-1 px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                  />
                  <button onClick={handleSearchIntegrante} className="btn-primary px-6">
                    Buscar
                  </button>
                  <button onClick={() => {
                    setShowAdsModal(false);
                    setCedula('');
                    setFoundIntegrante(null);
                  }} className="btn-ghost px-6">
                    Cancelar
                  </button>
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
                  <h3 className="font-bold text-gray-900 dark:text-white mb-2">Datos del Integrante</h3>
                  <div className="space-y-2 text-sm">
                    <p><strong>Nombre:</strong> {foundIntegrante.nombre}</p>
                    <p><strong>Cédula:</strong> {foundIntegrante.cedula}</p>
                    <p><strong>Email:</strong> {foundIntegrante.email}</p>
                    <p><strong>Rol:</strong> {foundIntegrante.rol}</p>
                  </div>
                </div>
                <div className="flex gap-2">
                  <button onClick={handleGenerateCertificate} className="flex-1 btn-primary py-2">
                    Generar Certificado
                  </button>
                  <button onClick={() => {
                    setShowAdsModal(false);
                    setCedula('');
                    setFoundIntegrante(null);
                  }} className="flex-1 btn-ghost py-2">
                    Cancelar
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Producto Modal */}
      {showProductModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white dark:bg-gray-800 rounded-xl max-w-2xl w-full p-6">
            <div className="flex items-start justify-between mb-4">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Certificado por Producto</h2>
              <button onClick={() => setShowProductModal(false)} className="text-gray-500 hover:text-gray-700">
                <i className="ri-close-line text-2xl"></i>
              </button>
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-6 bg-blue-50 dark:bg-gray-700 p-4 rounded-lg">
              El Certificado de Producto acredita la existencia y validez de un resultado de investigación, como artículos, ponencias, libros o desarrollos tecnológicos, asociado al Grupo o Semillero.
            </p>
            <div className="text-center py-8">
              <i className="ri-time-line text-6xl text-gray-400 mb-4 block"></i>
              <p className="text-lg text-gray-600 dark:text-gray-400 font-semibold">Funcionalidad próximamente</p>
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">Esta funcionalidad estará disponible en futuras actualizaciones</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
