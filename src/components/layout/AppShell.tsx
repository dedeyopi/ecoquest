import { Outlet } from 'react-router-dom';
import { motion } from 'framer-motion';
import Sidebar from './Sidebar';
import BottomNav from './BottomNav';
import Header from './Header';

export default function AppShell() {
  return (
    <div className="min-h-screen flex">
      <Sidebar />
      <div className="flex-1 min-w-0 flex flex-col">
        <Header />
        <motion.main
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: .35 }}
          className="flex-1 px-4 sm:px-8 py-6 sm:py-8 pb-28 lg:pb-10 max-w-6xl w-full mx-auto"
        >
          <Outlet />
        </motion.main>
      </div>
      <BottomNav />
    </div>
  );
}