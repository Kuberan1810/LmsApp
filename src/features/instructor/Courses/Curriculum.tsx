import React, { useState } from 'react';
import { View, Text, TouchableOpacity, TextInput, Modal } from 'react-native';
import { Search, Plus, Trash2, Edit2, ChevronUp, ChevronDown, MoreVertical } from 'lucide-react-native';
import Assignments from './assignments';

interface Chapter {
    id: string;
    title: string;
}

interface Assignment {
    id: string;
    title: string;
    due: string;
}

interface Test {
    id: string;
    title: string;
    due: string;
}

interface Module {
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
        statusBg: 'bg-[#DDF0EB]',
        statusColor: 'text-[#2BB290]',
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

export default function Curriculum() {
    const [searchQuery, setSearchQuery] = useState('');
    const [modules, setModules] = useState<Module[]>(INITIAL_MODULES);
    const [expandedModuleId, setExpandedModuleId] = useState<string | null>('1');

    // Selected Assignment state for viewing / editing detail page
    const [selectedAssignmentData, setSelectedAssignmentData] = useState<{ assignment: Assignment; moduleTitle: string } | null>(null);

    // Module Menu 
    const [activeModuleMenuId, setActiveModuleMenuId] = useState<string | null>(null);
    const [moduleMenuY, setModuleMenuY] = useState(0);

    // Modal
    const [isAddModuleOpen, setIsAddModuleOpen] = useState(false);
    const [newModuleTitle, setNewModuleTitle] = useState('');

    const [isEditModuleOpen, setIsEditModuleOpen] = useState(false);
    const [editingModuleId, setEditingModuleId] = useState<string | null>(null);
    const [editModuleTitle, setEditModuleTitle] = useState('');

    const [isAddChapterOpen, setIsAddChapterOpen] = useState(false);
    const [targetModuleIdForChapter, setTargetModuleIdForChapter] = useState<string | null>(null);
    const [newChapterTitle, setNewChapterTitle] = useState('');

    const [isEditChapterOpen, setIsEditChapterOpen] = useState(false);
    const [targetModuleIdForChapterEdit, setTargetModuleIdForChapterEdit] = useState<string | null>(null);
    const [editingChapterId, setEditingChapterId] = useState<string | null>(null);
    const [editChapterTitle, setEditChapterTitle] = useState('');

    // Add Assignment 
    const [isAddAssignmentOpen, setIsAddAssignmentOpen] = useState(false);
    const [targetModuleIdForAssignment, setTargetModuleIdForAssignment] = useState<string | null>(null);
    const [newAssignmentTitle, setNewAssignmentTitle] = useState('');
    const [newAssignmentDue, setNewAssignmentDue] = useState('18-07-2026');

    // Add Test
    const [isAddTestOpen, setIsAddTestOpen] = useState(false);
    const [targetModuleIdForTest, setTargetModuleIdForTest] = useState<string | null>(null);
    const [newTestTitle, setNewTestTitle] = useState('');
    const [newTestDue, setNewTestDue] = useState('2026-07-20');

    const [deleteModalState, setDeleteModalState] = useState<{
        isOpen: boolean;
        type: 'module' | 'chapter' | 'assignment' | 'test';
        moduleId: string;
        itemId?: string;
        title?: string;
    }>({
        isOpen: false,
        type: 'module',
        moduleId: '',
    });

    const toggleExpand = (id: string) => {
        setExpandedModuleId(expandedModuleId === id ? null : id);
    };

    const filteredModules = modules.filter((m) =>
        m.title.toLowerCase().includes(searchQuery.toLowerCase())
    );

    // Module Handlers
    const handleAddModule = () => {
        if (!newModuleTitle.trim()) return;
        const nextId = (modules.length + 1).toString();
        const newModule: Module = {
            id: nextId,
            title: newModuleTitle.trim(),
            status: 'Ongoing',
            statusBg: 'bg-[#FFEDDE]',
            statusColor: 'text-[#F67300]',
            chapters: [],
            assignments: [],
            tests: []
        };
        setModules([...modules, newModule]);
        setExpandedModuleId(nextId);
        setNewModuleTitle('');
        setIsAddModuleOpen(false);
    };

    const handleOpenEditModule = (m: Module) => {
        setEditingModuleId(m.id);
        setEditModuleTitle(m.title);
        setIsEditModuleOpen(true);
    };

    const handleSaveEditModule = () => {
        if (!editingModuleId || !editModuleTitle.trim()) return;
        setModules(prev =>
            prev.map(m => (m.id === editingModuleId ? { ...m, title: editModuleTitle.trim() } : m))
        );
        setIsEditModuleOpen(false);
        setEditingModuleId(null);
        setEditModuleTitle('');
    };

    // Chapter Handlers
    const handleOpenAddChapter = (moduleId: string) => {
        setTargetModuleIdForChapter(moduleId);
        setNewChapterTitle('');
        setIsAddChapterOpen(true);
    };

    const handleAddChapter = () => {
        if (!targetModuleIdForChapter || !newChapterTitle.trim()) return;
        setModules(prev =>
            prev.map(m => {
                if (m.id === targetModuleIdForChapter) {
                    return {
                        ...m,
                        chapters: [...m.chapters, { id: `c_${Date.now()}`, title: newChapterTitle.trim() }]
                    };
                }
                return m;
            })
        );
        setIsAddChapterOpen(false);
        setTargetModuleIdForChapter(null);
        setNewChapterTitle('');
    };

    const handleOpenEditChapter = (moduleId: string, chapter: Chapter) => {
        setTargetModuleIdForChapterEdit(moduleId);
        setEditingChapterId(chapter.id);
        setEditChapterTitle(chapter.title);
        setIsEditChapterOpen(true);
    };

    const handleSaveEditChapter = () => {
        if (!targetModuleIdForChapterEdit || !editingChapterId || !editChapterTitle.trim()) return;
        setModules(prev =>
            prev.map(m => {
                if (m.id === targetModuleIdForChapterEdit) {
                    return {
                        ...m,
                        chapters: m.chapters.map(c => c.id === editingChapterId ? { ...c, title: editChapterTitle.trim() } : c)
                    };
                }
                return m;
            })
        );
        setIsEditChapterOpen(false);
        setTargetModuleIdForChapterEdit(null);
        setEditingChapterId(null);
        setEditChapterTitle('');
    };

    // Assignment Handlers
    const handleOpenAddAssignment = (moduleId: string) => {
        setTargetModuleIdForAssignment(moduleId);
        setNewAssignmentTitle('');
        setNewAssignmentDue('18-07-2026');
        setIsAddAssignmentOpen(true);
    };

    const handleAddAssignment = () => {
        if (!targetModuleIdForAssignment || !newAssignmentTitle.trim()) return;
        setModules(prev =>
            prev.map(m => {
                if (m.id === targetModuleIdForAssignment) {
                    return {
                        ...m,
                        assignments: [...m.assignments, {
                            id: `a_${Date.now()}`,
                            title: newAssignmentTitle.trim(),
                            due: newAssignmentDue.trim() || '18-07-2026'
                        }]
                    };
                }
                return m;
            })
        );
        setIsAddAssignmentOpen(false);
        setTargetModuleIdForAssignment(null);
        setNewAssignmentTitle('');
    };

    // Test Handlers
    const handleOpenAddTest = (moduleId: string) => {
        setTargetModuleIdForTest(moduleId);
        setNewTestTitle('');
        setNewTestDue('2026-07-20');
        setIsAddTestOpen(true);
    };

    const handleAddTest = () => {
        if (!targetModuleIdForTest || !newTestTitle.trim()) return;
        setModules(prev =>
            prev.map(m => {
                if (m.id === targetModuleIdForTest) {
                    return {
                        ...m,
                        tests: [...m.tests, {
                            id: `t_${Date.now()}`,
                            title: newTestTitle.trim(),
                            due: newTestDue.trim() || '2026-07-20'
                        }]
                    };
                }
                return m;
            })
        );
        setIsAddTestOpen(false);
        setTargetModuleIdForTest(null);
        setNewTestTitle('');
    };

    // Delete Handler
    const handleConfirmDelete = () => {
        const { type, moduleId, itemId } = deleteModalState;
        if (type === 'module') {
            setModules(prev => prev.filter(m => m.id !== moduleId));
        } else if (type === 'chapter' && itemId) {
            setModules(prev =>
                prev.map(m => m.id === moduleId ? { ...m, chapters: m.chapters.filter(c => c.id !== itemId) } : m)
            );
        } else if (type === 'assignment' && itemId) {
            setModules(prev =>
                prev.map(m => m.id === moduleId ? { ...m, assignments: m.assignments.filter(a => a.id !== itemId) } : m)
            );
        } else if (type === 'test' && itemId) {
            setModules(prev =>
                prev.map(m => m.id === moduleId ? { ...m, tests: m.tests.filter(t => t.id !== itemId) } : m)
            );
        }
        setDeleteModalState({ isOpen: false, type: 'module', moduleId: '' });
    };

    return (
        <View className="bg-white border border-[#F2EEF4] rounded-[16px] mb-4 p-4 mx-5">
            <View className="mb-4">
                <Text className="text-[18px] font-semibold text-[#333333]">Curriculum</Text>
            </View>

            {/* Search and Add */}
            <View className="flex-row items-center gap-3 mb-5">
                <View className="flex-1 flex-row items-center bg-[#F3F4F6] rounded-[12px] px-3 h-11">
                    <Search size={16} color="#000000" />
                    <TextInput
                        placeholder="Search module"
                        placeholderTextColor="#A0A0AB"
                        value={searchQuery}
                        onChangeText={setSearchQuery}
                        className="flex-1 ml-2 font-medium text-[#1E1E2D] text-[14px]"
                    />
                </View>
                <TouchableOpacity
                    onPress={() => setIsAddModuleOpen(true)}
                    className="w-11 h-11 rounded-[12px] bg-[#FAFAFA] border border-[#F2EEF4] items-center justify-center"
                    activeOpacity={0.8}
                >
                    <Plus size={24} color="#333333" />
                </TouchableOpacity>
            </View>

            {/* Modules  */}
            <View className="gap-4">
                {filteredModules.map((item) => {
                    const isExpanded = expandedModuleId === item.id;
                    return (
                        <View key={item.id} className="bg-white border border-[#F2EEF4] rounded-[12px] overflow-hidden">
                            <View className="flex-row items-center justify-between p-4">
                                <TouchableOpacity
                                    onPress={() => toggleExpand(item.id)}
                                    className="flex-row items-center gap-2 flex-1 mr-2"
                                    activeOpacity={0.9}
                                >
                                    <Text className="text-[18px] font-medium text-[#333333] shrink" numberOfLines={1}>
                                        {item.title}
                                    </Text>
                                    <View className={`${item.statusBg} px-2 py-0.5 rounded-full shrink-0`}>
                                        <Text className={`text-[10px] font-semibold ${item.statusColor}`}>{item.status}</Text>
                                    </View>
                                </TouchableOpacity>

                                <View className="flex-row items-center gap-1 shrink-0">
                                    <TouchableOpacity
                                        onPress={(event) => {
                                            const py = event.nativeEvent.pageY;
                                            setModuleMenuY(py);
                                            setActiveModuleMenuId(item.id);
                                        }}
                                        className="w-8 h-8 rounded-full items-center justify-center"
                                    >
                                        <MoreVertical size={18} color="#626262" />
                                    </TouchableOpacity>
                                    <TouchableOpacity onPress={() => toggleExpand(item.id)} className="w-8 h-8 rounded-full items-center justify-center">
                                        {isExpanded ? (
                                            <ChevronUp size={18} color="#626262" />
                                        ) : (
                                            <ChevronDown size={18} color="#626262" />
                                        )}
                                    </TouchableOpacity>
                                </View>
                            </View>

                            {isExpanded && (
                                <View className="px-4 py-3 gap-5">
                                    {/* Chapters */}
                                    <View>
                                        <View className="flex-row justify-between items-center mb-3">
                                            <Text className="text-[16px] font-semibold text-[#333333]">Chapters:</Text>
                                            <TouchableOpacity
                                                onPress={() => handleOpenAddChapter(item.id)}
                                                className="w-8 h-8 rounded-[12px] bg-[#FAFAFA] border border-[#F2EEF4] items-center justify-center"
                                            >
                                                <Plus size={14} color="#333333" />
                                            </TouchableOpacity>
                                        </View>
                                        <View className="gap-2.5">
                                            {item.chapters.map((ch) => (
                                                <View key={ch.id} className="flex-row items-center justify-between bg-white border border-[#F2EEF4] rounded-[12px] p-3">
                                                    <Text className="text-[15px] text-[#333333] font-medium flex-1 mr-2" numberOfLines={1}>{ch.title}</Text>
                                                    <View className="flex-row items-center gap-2 shrink-0">
                                                        <TouchableOpacity onPress={() => handleOpenEditChapter(item.id, ch)} className="p-1">
                                                            <Edit2 size={14} color="#6A7282" />
                                                        </TouchableOpacity>
                                                        <TouchableOpacity
                                                            onPress={() => setDeleteModalState({ isOpen: true, type: 'chapter', moduleId: item.id, itemId: ch.id, title: ch.title })}
                                                            className="p-1"
                                                        >
                                                            <Trash2 size={14} color="#F32D2D" />
                                                        </TouchableOpacity>
                                                    </View>
                                                </View>
                                            ))}
                                            {item.chapters.length === 0 && (
                                                <Text className="text-[12px] text-[#8C8E90] italic pl-1">No chapters added yet.</Text>
                                            )}
                                        </View>
                                    </View>

                                    {/* Assignments */}
                                    <View>
                                        <View className="flex-row justify-between items-center mb-3">
                                            <Text className="text-[16px] font-semibold text-[#333333]">Assignments:</Text>
                                            <TouchableOpacity
                                                onPress={() => handleOpenAddAssignment(item.id)}
                                                className="w-8 h-8 rounded-[12px] bg-[#FAFAFA] border border-[#F2EEF4] items-center justify-center"
                                            >
                                                <Plus size={14} color="#333333" />
                                            </TouchableOpacity>
                                        </View>
                                        <View className="gap-2.5">
                                            {item.assignments.map((as) => (
                                                <TouchableOpacity
                                                    key={as.id}
                                                    onPress={() => setSelectedAssignmentData({ assignment: as, moduleTitle: item.title })}
                                                    activeOpacity={0.7}
                                                    className="flex-row items-center justify-between bg-white border border-[#F2EEF4] rounded-[12px] p-3"
                                                >
                                                    <View className="flex-1 mr-2">
                                                        <Text className="text-[15px] text-[#4D4D4D] font-medium" numberOfLines={1}>{as.title}</Text>
                                                        <Text className="text-[12px] text-[#909090] mt-0.5">Due: {as.due}</Text>
                                                    </View>
                                                    <TouchableOpacity
                                                        onPress={(e) => {
                                                            e.stopPropagation();
                                                            setDeleteModalState({ isOpen: true, type: 'assignment', moduleId: item.id, itemId: as.id, title: as.title });
                                                        }}
                                                        className="p-1 shrink-0"
                                                    >
                                                        <Trash2 size={14} color="#F32D2D" />
                                                    </TouchableOpacity>
                                                </TouchableOpacity>
                                            ))}
                                            {item.assignments.length === 0 && (
                                                <Text className="text-[12px] text-[#8C8E90] italic pl-1">No assignments added yet.</Text>
                                            )}
                                        </View>
                                    </View>

                                    {/* Tests */}
                                    <View>
                                        <View className="flex-row justify-between items-center mb-3">
                                            <Text className="text-[16px] font-semibold text-[#333333]">Tests:</Text>
                                            <TouchableOpacity
                                                onPress={() => handleOpenAddTest(item.id)}
                                                className="w-8 h-8 rounded-[12px] bg-[#FAFAFA] border border-[#F2EEF4] items-center justify-center"
                                            >
                                                <Plus size={14} color="#333333" />
                                            </TouchableOpacity>
                                        </View>
                                        <View className="gap-2.5">
                                            {item.tests.map((ts) => (
                                                <View key={ts.id} className="flex-row items-center justify-between bg-white border border-[#F2EEF4] rounded-[12px] p-3">
                                                    <View className="flex-1 mr-2">
                                                        <Text className="text-[15px] text-[#333333] font-medium" numberOfLines={1}>{ts.title}</Text>
                                                        <Text className="text-[12px] text-[#808080] mt-0.5">Due: {ts.due}</Text>
                                                    </View>
                                                    <TouchableOpacity
                                                        onPress={() => setDeleteModalState({ isOpen: true, type: 'test', moduleId: item.id, itemId: ts.id, title: ts.title })}
                                                        className="p-1 shrink-0"
                                                    >
                                                        <Trash2 size={14} color="#F32D2D" />
                                                    </TouchableOpacity>
                                                </View>
                                            ))}
                                            {item.tests.length === 0 && (
                                                <Text className="text-[12px] text-[#8C8E90] italic pl-1">No tests added yet.</Text>
                                            )}
                                        </View>
                                    </View>
                                </View>
                            )}
                        </View>
                    );
                })}
            </View>



            <Modal
                visible={!!activeModuleMenuId}
                transparent
                animationType="fade"
                onRequestClose={() => setActiveModuleMenuId(null)}
            >
                <TouchableOpacity
                    className="flex-1 bg-transparent"
                    activeOpacity={1}
                    onPress={() => setActiveModuleMenuId(null)}
                >
                    <View
                        className="bg-white border border-[#F2EEF4] rounded-[16px] p-2 shadow-lg absolute min-w-[140px]"
                        style={{
                            top: Math.max(80, moduleMenuY - 10),
                            right: 40,
                        }}
                    >
                        <TouchableOpacity
                            onPress={() => {
                                const mod = modules.find(m => m.id === activeModuleMenuId);
                                if (mod) handleOpenEditModule(mod);
                                setActiveModuleMenuId(null);
                            }}
                            className="flex-row items-center gap-2.5 px-3 py-2.5 rounded-[10px] active:bg-[#F3F4F6]"
                        >
                            <Edit2 size={16} color="#6A7282" />
                            <Text className="text-[14px] font-medium text-[#333333]">Edit</Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            onPress={() => {
                                const mod = modules.find(m => m.id === activeModuleMenuId);
                                if (mod) {
                                    setDeleteModalState({ isOpen: true, type: 'module', moduleId: mod.id, title: mod.title });
                                }
                                setActiveModuleMenuId(null);
                            }}
                            className="flex-row items-center gap-2.5 px-3 py-2.5 rounded-[10px] active:bg-[#F3F4F6]"
                        >
                            <Trash2 size={16} color="#F32D2D" />
                            <Text className="text-[14px] font-medium text-[#F32D2D]">Delete</Text>
                        </TouchableOpacity>
                    </View>
                </TouchableOpacity>
            </Modal>

            {/* Modals */}
            {/* 1. Add Module Modal */}
            <Modal visible={isAddModuleOpen} transparent animationType="fade" onRequestClose={() => setIsAddModuleOpen(false)}>
                <View className="flex-1 bg-black/40 items-center justify-center px-6">
                    <View className="bg-white rounded-[16px] p-7 w-full max-w-[340px] shadow-lg">
                        <View className="mb-1">
                            <Text className="text-[20px] font-semibold text-[#0B1C30]">Add Module</Text>
                        </View>
                        <Text className="text-[14px] text-[#808080] mb-5">Add a new module to this batch curriculum</Text>

                        <View className="mb-6">
                            <Text className="text-[14px] font-semibold text-[#626262] mb-1.5">Module Title</Text>
                            <TextInput
                                value={newModuleTitle}
                                onChangeText={setNewModuleTitle}
                                placeholder="Enter module title"
                                placeholderTextColor="#A0A0AB"
                                className="border border-[#F2EEF4] rounded-[12px] px-3.5 py-2 h-11 text-[16px] text-[#333333] bg-white"
                            />
                        </View>

                        <View className="flex-row gap-3">
                            <TouchableOpacity
                                onPress={() => setIsAddModuleOpen(false)}
                                className="flex-1 h-11 rounded-[12px] border border-[#F2EEF4] items-center justify-center bg-white"
                                activeOpacity={0.7}
                            >
                                <Text className="text-[#808080] text-[16px] font-semibold">Cancel</Text>
                            </TouchableOpacity>

                            <TouchableOpacity
                                onPress={handleAddModule}
                                disabled={!newModuleTitle.trim()}
                                className={`flex-1 h-11 rounded-[12px] items-center justify-center ${newModuleTitle.trim() ? 'bg-[#F67300]' : 'bg-[#FFEDD4]'}`}
                                activeOpacity={newModuleTitle.trim() ? 0.8 : 1}
                            >
                                <Text className="text-white text-[16px] font-semibold">Add Module</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </Modal>

            {/* 2. Edit Module Modal */}
            <Modal visible={isEditModuleOpen} transparent animationType="fade" onRequestClose={() => setIsEditModuleOpen(false)}>
                <View className="flex-1 bg-black/40 items-center justify-center px-6">
                    <View className="bg-white rounded-[16px] p-7 w-full max-w-[340px] shadow-lg">
                        <View className="mb-1">
                            <Text className="text-[20px] font-semibold text-[#0B1C30]">Edit Module</Text>
                        </View>
                        <Text className="text-[14px] text-[#808080] mb-5">Update the module title</Text>

                        <View className="mb-6">
                            <Text className="text-[14px] font-semibold text-[#626262] mb-1.5">Module Title</Text>
                            <TextInput
                                value={editModuleTitle}
                                onChangeText={setEditModuleTitle}
                                placeholder="Enter module title"
                                placeholderTextColor="#A0A0AB"
                                className="border border-[#F2EEF4] rounded-[12px] px-3.5 py-2 h-11 text-[16px] text-[#333333] bg-white"
                            />
                        </View>

                        <View className="flex-row gap-3">
                            <TouchableOpacity
                                onPress={() => setIsEditModuleOpen(false)}
                                className="flex-1 h-11 rounded-[12px] border border-[#F2EEF4] items-center justify-center bg-white"
                                activeOpacity={0.7}
                            >
                                <Text className="text-[#808080] text-[16px] font-semibold">Cancel</Text>
                            </TouchableOpacity>

                            <TouchableOpacity
                                onPress={handleSaveEditModule}
                                disabled={!editModuleTitle.trim()}
                                className={`flex-1 h-11 rounded-[12px] items-center justify-center ${editModuleTitle.trim() ? 'bg-[#F67300]' : 'bg-[#FFEDD4]'}`}
                                activeOpacity={editModuleTitle.trim() ? 0.8 : 1}
                            >
                                <Text className="text-white text-[16px] font-semibold">Save Changes</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </Modal>

            {/* 3. Add Chapter Modal */}
            <Modal visible={isAddChapterOpen} transparent animationType="fade" onRequestClose={() => setIsAddChapterOpen(false)}>
                <View className="flex-1 bg-black/40 items-center justify-center px-6">
                    <View className="bg-white rounded-[16px] p-7 w-full max-w-[340px] shadow-lg">
                        <View className="mb-1">
                            <Text className="text-[20px] font-semibold text-[#0B1C30]">Add Chapter</Text>
                        </View>
                        <Text className="text-[14px] text-[#808080] mb-5">Enter chapter title</Text>

                        <View className="mb-6">
                            <Text className="text-[14px] font-semibold text-[#626262] mb-1.5">Chapter Title</Text>
                            <TextInput
                                value={newChapterTitle}
                                onChangeText={setNewChapterTitle}
                                placeholder="Enter chapter title"
                                placeholderTextColor="#A0A0AB"
                                className="border border-[#F2EEF4] rounded-[12px] px-3.5 py-2 h-11 text-[16px] text-[#333333] bg-white"
                            />
                        </View>

                        <View className="flex-row gap-3">
                            <TouchableOpacity
                                onPress={() => setIsAddChapterOpen(false)}
                                className="flex-1 h-11 rounded-[12px] border border-[#F2EEF4] items-center justify-center bg-white"
                                activeOpacity={0.7}
                            >
                                <Text className="text-[#808080] text-[16px] font-semibold">Cancel</Text>
                            </TouchableOpacity>

                            <TouchableOpacity
                                onPress={handleAddChapter}
                                disabled={!newChapterTitle.trim()}
                                className={`flex-1 h-11 rounded-[12px] items-center justify-center ${newChapterTitle.trim() ? 'bg-[#F67300]' : 'bg-[#FFEDD4]'}`}
                                activeOpacity={newChapterTitle.trim() ? 0.8 : 1}
                            >
                                <Text className="text-white text-[16px] font-semibold">Add Chapter</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </Modal>

            {/* 4. Edit Chapter Modal */}
            <Modal visible={isEditChapterOpen} transparent animationType="fade" onRequestClose={() => setIsEditChapterOpen(false)}>
                <View className="flex-1 bg-black/40 items-center justify-center px-6">
                    <View className="bg-white rounded-[16px] p-7 w-full max-w-[340px] shadow-lg">
                        <View className="mb-1">
                            <Text className="text-[20px] font-semibold text-[#0B1C30]">Edit Chapter</Text>
                        </View>
                        <Text className="text-[14px] text-[#808080] mb-5">Update chapter title</Text>

                        <View className="mb-6">
                            <Text className="text-[14px] font-semibold text-[#626262] mb-1.5">Chapter Title</Text>
                            <TextInput
                                value={editChapterTitle}
                                onChangeText={setEditChapterTitle}
                                placeholder="Enter chapter title"
                                placeholderTextColor="#A0A0AB"
                                className="border border-[#F2EEF4] rounded-[12px] px-3.5 py-2 h-11 text-[16px] text-[#333333] bg-white"
                            />
                        </View>

                        <View className="flex-row gap-3">
                            <TouchableOpacity
                                onPress={() => setIsEditChapterOpen(false)}
                                className="flex-1 h-11 rounded-[12px] border border-[#F2EEF4] items-center justify-center bg-white"
                                activeOpacity={0.7}
                            >
                                <Text className="text-[#808080] text-[16px] font-semibold">Cancel</Text>
                            </TouchableOpacity>

                            <TouchableOpacity
                                onPress={handleSaveEditChapter}
                                disabled={!editChapterTitle.trim()}
                                className={`flex-1 h-11 rounded-[12px] items-center justify-center ${editChapterTitle.trim() ? 'bg-[#F67300]' : 'bg-[#FFEDD4]'}`}
                                activeOpacity={editChapterTitle.trim() ? 0.8 : 1}
                            >
                                <Text className="text-white text-[16px] font-semibold">Save Changes</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </Modal>

            {/* 5. Add Assignment Modal */}
            <Modal visible={isAddAssignmentOpen} transparent animationType="fade" onRequestClose={() => setIsAddAssignmentOpen(false)}>
                <View className="flex-1 bg-black/40 items-center justify-center px-6">
                    <View className="bg-white rounded-[16px] p-7 w-full max-w-[340px] shadow-lg">
                        <View className="mb-1">
                            <Text className="text-[20px] font-semibold text-[#0B1C30]">Add Assignment</Text>
                        </View>
                        <Text className="text-[14px] text-[#808080] mb-5">Enter assignment details for this module</Text>

                        <View className="mb-4">
                            <Text className="text-[14px] font-semibold text-[#626262] mb-1.5">Assignment Title</Text>
                            <TextInput
                                value={newAssignmentTitle}
                                onChangeText={setNewAssignmentTitle}
                                placeholder="Enter assignment title"
                                placeholderTextColor="#A0A0AB"
                                className="border border-[#F2EEF4] rounded-[12px] px-3.5 py-2 h-11 text-[16px] text-[#333333] bg-white"
                            />
                        </View>

                        <View className="mb-6">
                            <Text className="text-[14px] font-semibold text-[#626262] mb-1.5">Due Date</Text>
                            <TextInput
                                value={newAssignmentDue}
                                onChangeText={setNewAssignmentDue}
                                placeholder="DD-MM-YYYY"
                                placeholderTextColor="#A0A0AB"
                                className="border border-[#F2EEF4] rounded-[12px] px-3.5 py-2 h-11 text-[16px] text-[#333333] bg-white"
                            />
                        </View>

                        <View className="flex-row gap-3">
                            <TouchableOpacity
                                onPress={() => setIsAddAssignmentOpen(false)}
                                className="flex-1 h-11 rounded-[12px] border border-[#F2EEF4] items-center justify-center bg-white"
                                activeOpacity={0.7}
                            >
                                <Text className="text-[#808080] text-[16px] font-semibold">Cancel</Text>
                            </TouchableOpacity>

                            <TouchableOpacity
                                onPress={handleAddAssignment}
                                disabled={!newAssignmentTitle.trim()}
                                className={`flex-1 h-11 rounded-[12px] items-center justify-center ${newAssignmentTitle.trim() ? 'bg-[#F67300]' : 'bg-[#FFEDD4]'}`}
                                activeOpacity={newAssignmentTitle.trim() ? 0.8 : 1}
                            >
                                <Text className="text-white text-[16px] font-semibold">Add Assignment</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </Modal>

            {/* 6. Add Test Modal */}
            <Modal visible={isAddTestOpen} transparent animationType="fade" onRequestClose={() => setIsAddTestOpen(false)}>
                <View className="flex-1 bg-black/40 items-center justify-center px-6">
                    <View className="bg-white rounded-[16px] p-7 w-full max-w-[340px] shadow-lg">
                        <View className="mb-1">
                            <Text className="text-[20px] font-semibold text-[#0B1C30]">Add Test</Text>
                        </View>
                        <Text className="text-[14px] text-[#808080] mb-5">Enter test details for this module</Text>

                        <View className="mb-4">
                            <Text className="text-[14px] font-semibold text-[#626262] mb-1.5">Test Title</Text>
                            <TextInput
                                value={newTestTitle}
                                onChangeText={setNewTestTitle}
                                placeholder="Enter test title"
                                placeholderTextColor="#A0A0AB"
                                className="border border-[#F2EEF4] rounded-[12px] px-3.5 py-2 h-11 text-[16px] text-[#333333] bg-white"
                            />
                        </View>

                        <View className="mb-6">
                            <Text className="text-[14px] font-semibold text-[#626262] mb-1.5">Due Date</Text>
                            <TextInput
                                value={newTestDue}
                                onChangeText={setNewTestDue}
                                placeholder="DD-MM-YYYY"
                                placeholderTextColor="#A0A0AB"
                                className="border border-[#F2EEF4] rounded-[12px] px-3.5 py-2 h-11 text-[16px] text-[#333333] bg-white"
                            />
                        </View>

                        <View className="flex-row gap-3">
                            <TouchableOpacity
                                onPress={() => setIsAddTestOpen(false)}
                                className="flex-1 h-11 rounded-[12px] border border-[#F2EEF4] items-center justify-center bg-white"
                                activeOpacity={0.7}
                            >
                                <Text className="text-[#808080] text-[16px] font-semibold">Cancel</Text>
                            </TouchableOpacity>

                            <TouchableOpacity
                                onPress={handleAddTest}
                                disabled={!newTestTitle.trim()}
                                className={`flex-1 h-11 rounded-[12px] items-center justify-center ${newTestTitle.trim() ? 'bg-[#F67300]' : 'bg-[#FFEDD4]'}`}
                                activeOpacity={newTestTitle.trim() ? 0.8 : 1}
                            >
                                <Text className="text-white text-[16px] font-semibold">Add Test</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </Modal>

            {/* 7. Confirm Delete Modal */}
            <Modal visible={deleteModalState.isOpen} transparent animationType="fade" onRequestClose={() => setDeleteModalState(prev => ({ ...prev, isOpen: false }))}>
                <View className="flex-1 bg-black/40 items-center justify-center px-6">
                    <View className="bg-white rounded-[16px] p-7 w-full max-w-[320px] shadow-lg items-center">
                        <View className="w-12 h-12 rounded-full bg-[#FEF2F2] items-center justify-center mb-6">
                            <Trash2 size={22} color="#F32D2D" />
                        </View>
                        <Text className="text-[20px] font-bold text-black text-center mb-2">Confirm Delete</Text>
                        <Text className="text-[14px] text-[#6A7282] text-center mb-10">
                            Are you sure you want to delete this {deleteModalState.type}? This action cannot be undone and will remove all associated content.
                        </Text>

                        <View className="flex-row gap-3 w-full">
                            <TouchableOpacity
                                onPress={() => setDeleteModalState(prev => ({ ...prev, isOpen: false }))}
                                className="flex-1 h-11 rounded-[12px] border border-[#F2EEF4] items-center justify-center bg-white"
                                activeOpacity={0.7}
                            >
                                <Text className="text-[#808080] text-[16px] font-semibold">Cancel</Text>
                            </TouchableOpacity>

                            <TouchableOpacity
                                onPress={handleConfirmDelete}
                                className="flex-1 h-11 rounded-[12px] bg-[#FB2C36] items-center justify-center"
                                activeOpacity={0.8}
                            >
                                <Text className="text-white text-[16px] font-semibold">Delete</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </Modal>

            {/* Assignment View / Edit Screen Modal */}
            <Modal
                visible={!!selectedAssignmentData}
                animationType="slide"
                onRequestClose={() => setSelectedAssignmentData(null)}
            >
                {selectedAssignmentData && (
                    <Assignments
                        assignment={{
                            title: selectedAssignmentData.assignment.title,
                            dueDate: selectedAssignmentData.assignment.due,
                            moduleName: selectedAssignmentData.moduleTitle,
                        }}
                        onBack={() => setSelectedAssignmentData(null)}
                    />
                )}
            </Modal>
        </View>
    );
}
