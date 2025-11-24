import { Routes, Route } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import DashboardHome from './components/DashboardHome';
import GruposSection from './components/GruposSection';
import SemillerosSection from './components/SemillerosSection';
import IntegrantesSection from './components/IntegrantesSection';
import CertificadosSection from './components/CertificadosSection';
import ReportesSection from './components/ReportesSection';
import SobreNosotrosSection from './components/SobreNosotrosSection';
import PerfilSection from './components/PerfilSection';
import ConfiguracionSection from './components/ConfiguracionSection';

const DashboardContent = ({ children, title }: { children: React.ReactNode; title: string }) => (
  <div className="flex flex-col h-screen">
    <Header title={title} />
    <div className="flex flex-1 overflow-hidden">
      <Sidebar />
      <main className="flex-1 overflow-auto bg-gray-50 dark:bg-slate-900 p-6 ml-64 mt-20">
        {children}
      </main>
    </div>
  </div>
);

export default function DashboardPage() {
  return (
    <Routes>
      <Route
        index
        element={<DashboardContent title="Dashboard"><DashboardHome /></DashboardContent>}
      />
      <Route
        path="grupos"
        element={<DashboardContent title="Grupos de Investigación"><GruposSection /></DashboardContent>}
      />
      <Route
        path="semilleros"
        element={<DashboardContent title="Semilleros de Investigación"><SemillerosSection /></DashboardContent>}
      />
      <Route
        path="integrantes"
        element={<DashboardContent title="Integrantes"><IntegrantesSection /></DashboardContent>}
      />
      <Route
        path="certificados"
        element={<DashboardContent title="Certificados"><CertificadosSection /></DashboardContent>}
      />
      <Route
        path="reportes"
        element={<DashboardContent title="Reportes"><ReportesSection /></DashboardContent>}
      />
      <Route
        path="nosotros"
        element={<DashboardContent title="Sobre Nosotros"><SobreNosotrosSection /></DashboardContent>}
      />
      <Route
        path="perfil"
        element={<DashboardContent title="Mi Perfil"><PerfilSection /></DashboardContent>}
      />
      <Route
        path="configuracion"
        element={<DashboardContent title="Configuración"><ConfiguracionSection /></DashboardContent>}
      />
    </Routes>
  );
}
