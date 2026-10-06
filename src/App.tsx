import { Navigate, Route, Routes, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { useStudent } from '@/context/StudentContext';
import AppShell from '@/components/layout/AppShell';
import LoginPage from '@/pages/LoginPage';
import DashboardPage from '@/pages/DashboardPage';
import MissionListPage from '@/pages/MissionListPage';
import MissionPage from '@/pages/MissionPage';
import LabPage from '@/pages/LabPage';
import DataPage from '@/pages/DataPage';
import AchievementsPage from '@/pages/AchievementsPage';
import ToolkitPage from '@/pages/ToolkitPage';
import ProfilePage from '@/pages/ProfilePage';
import DeveloperPage from '@/pages/DeveloperPage';
import CertificatePage from '@/pages/CertificatePage';

export default function App() {
  const { student } = useStudent();
  const location = useLocation();
  const loggedIn = !!student.name;

  if (!loggedIn && location.pathname !== '/login') {
    return <Navigate to="/login" replace />;
  }
  if (loggedIn && location.pathname === '/login') {
    return <Navigate to="/" replace />;
  }

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/login" element={<LoginPage />} />
        <Route element={<AppShell />}>
          <Route path="/" element={<DashboardPage />} />
          <Route path="/misi" element={<MissionListPage />} />
          <Route path="/misi/:id" element={<MissionPage />} />
          <Route path="/lab" element={<LabPage />} />
          <Route path="/data" element={<DataPage />} />
          <Route path="/pencapaian" element={<AchievementsPage />} />
          <Route path="/toolkit" element={<ToolkitPage />} />
          <Route path="/profil" element={<ProfilePage />} />
          <Route path="/pengembang" element={<DeveloperPage />} />
          <Route path="/sertifikat" element={<CertificatePage />} />
        </Route>
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </AnimatePresence>
  );
}