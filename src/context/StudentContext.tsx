import {
  createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode,
} from 'react';
import type { Student, MasteryRecord, Badge, Reflection } from '@/types';
import { LS_KEY } from '@/lib/utils';
import { BADGES } from '@/data/badges';

function defaultStudent(): Student {
  return {
    name: '',
    className: '',
    mastery: {},
    completedActivities: [],
    badges: [],
    reflections: [],
    finalProject: null,
    settings: { reduceMotion: false },
    createdAt: Date.now(),
  };
}

interface StudentCtx {
  student: Student;
  login: (name: string, className: string) => void;
  logout: () => void;
  reset: () => void;
  updateMastery: (competencyId: string, record: MasteryRecord) => void;
  markActivity: (key: string) => void;
  awardBadge: (id: string) => boolean;
  saveReflection: (items: Reflection[]) => void;
  setFinalProject: (data: Record<string, string>) => void;
  setReduceMotion: (v: boolean) => void;
}

const Ctx = createContext<StudentCtx | null>(null);

export function StudentProvider({ children }: { children: ReactNode }) {
  const [student, setStudent] = useState<Student>(() => {
    try {
      const raw = localStorage.getItem(LS_KEY);
      if (raw) return { ...defaultStudent(), ...JSON.parse(raw) };
    } catch { /* noop */ }
    return defaultStudent();
  });

  useEffect(() => {
    try { localStorage.setItem(LS_KEY, JSON.stringify(student)); } catch { /* noop */ }
  }, [student]);

  useEffect(() => {
    document.body.classList.toggle('reduce-motion', student.settings.reduceMotion);
  }, [student.settings.reduceMotion]);

  const login = useCallback((name: string, className: string) => {
    setStudent((s) => {
      const next: Student = { ...s, name, className };
      if (!next.badges.length && BADGES.eco_starter) {
        next.badges = [{
          id: 'eco_starter',
          icon: BADGES.eco_starter.icon,
          name: BADGES.eco_starter.name,
          date: Date.now(),
        }];
      }
      return next;
    });
  }, []);

  const logout = useCallback(() => {
    setStudent((s) => ({ ...s, name: '', className: '' }));
  }, []);

  const reset = useCallback(() => {
    localStorage.removeItem(LS_KEY);
    setStudent(defaultStudent());
  }, []);

  const updateMastery = useCallback((competencyId: string, record: MasteryRecord) => {
    setStudent((s) => ({
      ...s,
      mastery: { ...s.mastery, [competencyId]: record },
    }));
  }, []);

  const markActivity = useCallback((key: string) => {
    setStudent((s) =>
      s.completedActivities.includes(key)
        ? s
        : { ...s, completedActivities: [...s.completedActivities, key] },
    );
  }, []);

  const awardBadge = useCallback((id: string): boolean => {
    let awarded = false;
    setStudent((s) => {
      if (s.badges.some((b: Badge) => b.id === id)) return s;
      const def = BADGES[id];
      if (!def) return s;
      awarded = true;
      return {
        ...s,
        badges: [...s.badges, { id, icon: def.icon, name: def.name, date: Date.now() }],
      };
    });
    return awarded;
  }, []);

  const saveReflection = useCallback((items: Reflection[]) => {
    setStudent((s) => {
      const map = new Map(s.reflections.map((r) => [r.k, r]));
      items.forEach((it) => map.set(it.k, { ...it, date: Date.now() }));
      return { ...s, reflections: Array.from(map.values()) };
    });
  }, []);

  const setFinalProject = useCallback((data: Record<string, string>) => {
    setStudent((s) => ({ ...s, finalProject: { ...data, _submitted: String(Date.now()) } }));
  }, []);

  const setReduceMotion = useCallback((v: boolean) => {
    setStudent((s) => ({ ...s, settings: { ...s.settings, reduceMotion: v } }));
  }, []);

  const value = useMemo<StudentCtx>(() => ({
    student, login, logout, reset, updateMastery, markActivity,
    awardBadge, saveReflection, setFinalProject, setReduceMotion,
  }), [student, login, logout, reset, updateMastery, markActivity, awardBadge, saveReflection, setFinalProject, setReduceMotion]);

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export function useStudent() {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error('useStudent must be inside StudentProvider');
  return ctx;
}