import React, { useState } from 'react';
import { View, Text, TouchableOpacity, TextInput } from 'react-native';
import { Search, Plus, Trash2, Edit2, ChevronUp, ChevronDown } from 'lucide-react-native';

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
        title: 'Module 1',
        status: 'Ongoing',
        statusBg: 'bg-[#FFEDDE]',
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
        title: 'Module 2',
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

    const toggleExpand = (id: string) => {
        setExpandedModuleId(expandedModuleId === id ? null : id);
    };

    const filteredModules = modules.filter((m) =>
        m.title.toLowerCase().includes(searchQuery.toLowerCase())
    );

    //  Add Chapter
    const addChapter = (moduleId: string) => {
        setModules(prevModules =>
            prevModules.map(m => {
                if (m.id === moduleId) {
                    const nextNum = m.chapters.length + 1;
                    return {
                        ...m,
                        chapters: [...m.chapters, { id: `c_${Date.now()}`, title: `Chapter 1.${nextNum} - Chapter-${nextNum}` }]
                    };
                }
                return m;
            })
        );
    };

    // Delete Chapter
    const deleteChapter = (moduleId: string, chapterId: string) => {
        setModules(prevModules =>
            prevModules.map(m => {
                if (m.id === moduleId) {
                    return {
                        ...m,
                        chapters: m.chapters.filter(c => c.id !== chapterId)
                    };
                }
                return m;
            })
        );
    };

    //  Add Assignment
    const addAssignment = (moduleId: string) => {
        setModules(prevModules =>
            prevModules.map(m => {
                if (m.id === moduleId) {
                    const nextNum = m.assignments.length + 1;
                    return {
                        ...m,
                        assignments: [...m.assignments, { id: `a_${Date.now()}`, title: `Assignment 1.${nextNum} - Task-${nextNum}`, due: '20-07-2026' }]
                    };
                }
                return m;
            })
        );
    };

    //  Delete Assignment
    const deleteAssignment = (moduleId: string, assignmentId: string) => {
        setModules(prevModules =>
            prevModules.map(m => {
                if (m.id === moduleId) {
                    return {
                        ...m,
                        assignments: m.assignments.filter(a => a.id !== assignmentId)
                    };
                }
                return m;
            })
        );
    };

    //  Add Test
    const addTest = (moduleId: string) => {
        setModules(prevModules =>
            prevModules.map(m => {
                if (m.id === moduleId) {
                    const nextNum = m.tests.length + 1;
                    return {
                        ...m,
                        tests: [...m.tests, { id: `t_${Date.now()}`, title: `Test 1.${nextNum} - Quiz-${nextNum}`, due: '2026-07-20' }]
                    };
                }
                return m;
            })
        );
    };

    // Delete Test
    const deleteTest = (moduleId: string, testId: string) => {
        setModules(prevModules =>
            prevModules.map(m => {
                if (m.id === moduleId) {
                    return {
                        ...m,
                        tests: m.tests.filter(t => t.id !== testId)
                    };
                }
                return m;
            })
        );
    };

    // Add Module
    const addModule = () => {
        const nextId = (modules.length + 1).toString();
        const newModule: Module = {
            id: nextId,
            title: `Module ${nextId}`,
            status: 'Ongoing',
            statusBg: 'bg-[#FFEDDE]',
            statusColor: 'text-[#F67300]',
            chapters: [],
            assignments: [],
            tests: []
        };
        setModules([...modules, newModule]);
        setExpandedModuleId(nextId);
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
                    onPress={addModule}
                    className="w-11 h-11 rounded-[12px] bg-[#FAFAFA] items-center justify-center"
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
                            <TouchableOpacity
                                onPress={() => toggleExpand(item.id)}
                                className="flex-row items-center justify-between p-4"
                                activeOpacity={0.9}
                            >
                                <View className="flex-row items-center gap-2">
                                    <Text className="text-[18px] font-medium text-[#333333]">{item.title}</Text>
                                    <View className={`${item.statusBg} px-2 py-0.5 rounded-full`}>
                                        <Text className={`text-[10px] font-semibold ${item.statusColor}`}>{item.status}</Text>
                                    </View>
                                </View>
                                {isExpanded ? (
                                    <ChevronUp size={18} color="#626262" />
                                ) : (
                                    <ChevronDown size={18} color="#626262" />
                                )}
                            </TouchableOpacity>

                            {isExpanded && (
                                <View className=" px-4 py-3 gap-5">
                                    {/* Chapters */}
                                    <View>
                                        <View className="flex-row justify-between items-center mb-3">
                                            <Text className="text-[16px] font-semibold text-[#333333]">Chapters:</Text>
                                            <TouchableOpacity
                                                onPress={() => addChapter(item.id)}
                                                className="w-8 h-8 rounded-[12px] bg-[#FAFAFA] border border-[#F2EEF4] items-center justify-center"
                                            >
                                                <Plus size={14} color="#333333" />
                                            </TouchableOpacity>
                                        </View>
                                        <View className="gap-2.5">
                                            {item.chapters.map((ch) => (
                                                <View key={ch.id} className="flex-row items-center justify-between bg-white border border-[#F2EEF4] rounded-[12px] p-3">
                                                    <Text className="text-[15px] text-[#333333] font-medium">{ch.title}</Text>
                                                    <View className="flex-row items-center gap-2">
                                                        <TouchableOpacity className="p-1">
                                                            <Edit2 size={14} color="#6A7282" />
                                                        </TouchableOpacity>
                                                        <TouchableOpacity onPress={() => deleteChapter(item.id, ch.id)} className="p-1">
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
                                                onPress={() => addAssignment(item.id)}
                                                className="w-8 h-8 rounded-[12px] bg-[#FAFAFA] border border-[#F2EEF4] items-center justify-center"
                                            >
                                                <Plus size={14} color="#333333" />
                                            </TouchableOpacity>
                                        </View>
                                        <View className="gap-2.5">
                                            {item.assignments.map((as) => (
                                                <View key={as.id} className="flex-row items-center justify-between bg-white border border-[#F2EEF4] rounded-[12px] p-3 shadow-2xs">
                                                    <View className="flex-1">
                                                        <Text className="text-[15px] text-[#4D4D4D] font-medium">{as.title}</Text>
                                                        <Text className="text-[12px] text-[#909090] mt-0.5">Due: {as.due}</Text>
                                                    </View>
                                                    <TouchableOpacity onPress={() => deleteAssignment(item.id, as.id)} className="p-1">
                                                        <Trash2 size={14} color="#F32D2D" />
                                                    </TouchableOpacity>
                                                </View>
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
                                                onPress={() => addTest(item.id)}
                                                className="w-8 h-8 rounded-[12px] bg-[#FAFAFA] border border-[#F2EEF4] items-center justify-center"
                                            >
                                                <Plus size={14} color="#333333" />
                                            </TouchableOpacity>
                                        </View>
                                        <View className="gap-2.5">
                                            {item.tests.map((ts) => (
                                                <View key={ts.id} className="flex-row items-center justify-between bg-white border border-[#F2EEF4] rounded-[12px] p-3 shadow-2xs">
                                                    <View className="flex-1">
                                                        <Text className="text-[15px] text-[#333333] font-medium">{ts.title}</Text>
                                                        <Text className="text-[12px] text-[#808080] mt-0.5">Due: {ts.due}</Text>
                                                    </View>
                                                    <TouchableOpacity onPress={() => deleteTest(item.id, ts.id)} className="p-1">
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
        </View>
    );
}
