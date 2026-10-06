import { createContext, useCallback, useContext, useState, type ReactNode } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import type { Toast } from '@/types';

interface ToastCtx {
  push: (message: string, type?: Toast['type']) => void;
}
const Ctx = createContext<ToastCtx | null>(null);

export function ToastProvider({ children }: { children: ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const push = useCallback((message: string, type: Toast['type'] = 'success') => {
    const id = Math.random().toString(36).slice(2);
    setToasts((t) => [...t, { id, message, type }]);
    setTimeout(() => {
      setToasts((t) => t.filter((x) => x.id !== id));
    }, 2600);
  }, []);

  const colors: Record<Toast['type'], string> = {
    success: 'bg-emerald-600',
    info: 'bg-sky-600',
    warn: 'bg-amber-600',
    error: 'bg-rose-600',
  };

  return (
    <Ctx.Provider value={{ push }}>
      {children}
      <div className="fixed left-1/2 -translate-x-1/2 bottom-24 md:bottom-8 z-[9998] flex flex-col gap-2 items-center">
        <AnimatePresence>
          {toasts.map((t) => (
            <motion.div
              key={t.id}
              initial={{ opacity: 0, y: 20, scale: .9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, scale: .9 }}
              className={`px-6 py-3 rounded-2xl text-white font-semibold shadow-xl ${colors[t.type]}`}
            >
              {t.message}
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </Ctx.Provider>
  );
}

export function useToast() {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error('useToast must be inside ToastProvider');
  return ctx;
}