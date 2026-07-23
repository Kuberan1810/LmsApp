import { FileItem } from '@/features/instructor/Courses/chapters/EditChapter';
import { ResourceItem } from '@/features/instructor/Courses/assignment/assignments';

export interface Chapter {
    id: string;
    title: string;
    classContent?: string;
    keyTopics?: string;
    resources?: FileItem[];
    isNew?: boolean;
}

export interface Assignment {
    id: string;
    title: string;
    due: string;
    dueTime?: string;
    description?: string;
    objective?: string;
    expectedOutcome?: string;
    resources?: ResourceItem[];
    isNew?: boolean;
}

export interface Test {
    id: string;
    title: string;
    due: string;
}

export interface Module {
    id: string;
    title: string;
    status: string;
    statusBg: string;
    statusColor: string;
    chapters: Chapter[];
    assignments: Assignment[];
    tests: Test[];
}

const INITIAL_MODULES: Module[] = [
    {
        id: '1',
        title: 'Module 1: Module-1',
        status: 'Ongoing',
        statusBg: 'bg-[#FFF5ED]',
        statusColor: 'text-[#F67300]',
        chapters: [
            { id: 'c1', title: 'Chapter 1.1 - Chapter-1' },
        ],
        assignments: [
            { id: 'a1', title: 'Assignment 1.1 - basics', due: '18-07-2026' },
        ],
        tests: [
            { id: 't1', title: 'Test 1.1 - fundamentals', due: 'Jul 18, 2026 11:06 AM' },
            { id: 't2', title: 'Test 1.2 - python', due: '2026-07-18' },
        ],
    },
    {
        id: '2',
        title: 'Module 2: Module-2',
        status: 'Completed',
        statusBg: 'bg-[#2A9A46]/10',
        statusColor: 'text-[#2A9A46]',
        chapters: [
            { id: 'c2', title: 'Chapter 2.1 - Intro to AI' },
        ],
        assignments: [
            { id: 'a2', title: 'Assignment 2.1 - Basics', due: '10-07-2026' },
        ],
        tests: [
            { id: 't3', title: 'Test 2.1 - Setup Check', due: '2026-07-10' },
        ],
    }
];

type Listener = () => void;

class CurriculumState {
    private listeners = new Set<Listener>();
    public modules: Module[] = INITIAL_MODULES;

    subscribe(listener: Listener) {
        this.listeners.add(listener);
        return () => {
            this.listeners.delete(listener);
        };
    }

    notify() {
        this.listeners.forEach(l => l());
    }

    setModules(newModules: Module[]) {
        this.modules = newModules;
        this.notify();
    }

    updateChapter(moduleId: string, chapterId: string, data: Partial<Chapter>) {
        this.modules = this.modules.map(m => {
            if (m.id === moduleId) {
                return {
                    ...m,
                    chapters: m.chapters.map(c =>
                        c.id === chapterId
                            ? {
                                  ...c,
                                  ...data,
                                  isNew: false,
                              }
                            : c
                    ),
                };
            }
            return m;
        });
        this.notify();
    }

    updateAssignment(moduleId: string, assignmentId: string, data: Partial<Assignment>) {
        this.modules = this.modules.map(m => {
            if (m.id === moduleId) {
                return {
                    ...m,
                    assignments: m.assignments.map(a =>
                        a.id === assignmentId
                            ? {
                                  ...a,
                                  ...data,
                                  isNew: false,
                              }
                            : a
                    ),
                };
            }
            return m;
        });
        this.notify();
    }
}

export const curriculumState = new CurriculumState();
