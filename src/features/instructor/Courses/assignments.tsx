import React, { useState } from 'react';
import EditAssignment from './editassignment';
import ReviewAssignment from './reviewAssignment';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { Image as ExpoImage } from 'expo-image';
import Header from '@/components/Instructor/header';
import { DocumentUpload, Maximize, Link as IconsaxLink } from 'iconsax-react-native';
import { Calendar } from 'lucide-react-native';

const getFileIconSource = (fileName: string) => {
    const ext = fileName.split('.').pop()?.toLowerCase();
    switch (ext) {
        case 'pdf':
            return require('../../../../assets/icon/pdfIcon.svg');
        case 'doc':
            return require('../../../../assets/icon/docIcon.svg');
        case 'docx':
            return require('../../../../assets/icon/word.svg');
        case 'xls':
        case 'xlsx':
            return require('../../../../assets/icon/xl.svg');
        case 'png':
        case 'jpg':
        case 'jpeg':
            return require('../../../../assets/icon/imgIcon.svg');
        default:
            return require('../../../../assets/icon/file.svg');
    }
};

export interface ResourceItem {
    id: string;
    name: string;
    size: string;
    type?: string;
    status?: string;
    progress?: number;
}

export interface AssignmentData {
    id?: string;
    title?: string;
    status?: string;
    dueDate?: string;
    dueTime?: string;
    courseCode?: string;
    courseName?: string;
    batch?: string;
    moduleName?: string;
    description?: string;
    objective?: string;
    expectedOutcome?: string;
}

interface AssignmentsProps {
    assignment?: AssignmentData;
    onBack?: () => void;
    initialIsEditing?: boolean;
}

export default function Assignments({ assignment, onBack, initialIsEditing = false }: AssignmentsProps) {
    const [isEditing, setIsEditing] = useState(initialIsEditing);
    const [isReviewing, setIsReviewing] = useState(false);
    const [title] = useState(assignment?.title || 'Build Q&A system using RAG');
    const [status] = useState(assignment?.status || 'In Progress');
    const [dueDate] = useState(assignment?.dueDate || 'Jan 26');
    const [dueTime] = useState(assignment?.dueTime || '11:59 PM');
    const [courseCode] = useState(assignment?.courseCode || 'AM101');
    const [courseName] = useState(assignment?.courseName || 'AI / ML Frontier Ai Engineer');
    const [batch] = useState(assignment?.batch || 'Batch 02');
    const [moduleName] = useState(assignment?.moduleName || 'Module 1: Module-1');

    // Description
    const [description, setDescription] = useState(
        assignment?.description ||
        (isEditing
            ? 'AI Agents are systems that use LLMs to plan, act, and collaborate autonomously. LangChain builds tool-using agents for workflows and RAG. CrewAI enables role-based multi-agent teamwork. AutoGen focuses on conversation-driven agents that interact with each other and humans to solve complex tasks.'
            : 'Build a Question Answering (Q&A) system using Retrieval-Augmented Generation (RAG). In this assignment, you will combine a language model with external knowledge sources to generate more accurate and context-aware answers instead of relying only on the model\'s memory.')
    );

    const [objective, setObjective] = useState(
        assignment?.objective ||
        (isEditing
            ? 'AI Agents are systems that use LLMs to plan, act, and collaborate autonomously. LangChain builds tool-using agents for workflows and RAG. CrewAI enables role-based multi-agent teamwork. AutoGen focuses on conversation-driven agents that interact with each other and humans to solve complex tasks.'
            : 'Design and implement a basic retrieval pipeline that searches relevant information, passes it as context to the language model, and produces meaningful responses.')
    );

    const [expectedOutcome, setExpectedOutcome] = useState(
        assignment?.expectedOutcome ||
        (isEditing
            ? 'AI Agents are systems that use LLMs to plan, act, and collaborate autonomously. LangChain builds tool-using agents for workflows and RAG. CrewAI enables role-based multi-agent teamwork. AutoGen focuses on conversation-driven agents that interact with each other and humans to solve complex tasks.'
            : 'A working RAG-based Q&A system that can answer questions accurately using provided data, demonstrating the practical application of AI in learning platforms.')
    );

    // Resources
    const [resources] = useState<ResourceItem[]>([
        { id: '1', name: 'Project_Guidelines.pdf', size: '2.4MB', type: 'pdf', status: 'Ready to submit' },
        { id: '2', name: 'external-link.com', size: '6.6MB', type: 'pdf', status: 'Ready to submit' },
    ]);

    const handleToggleEditMode = (editing: boolean) => {
        if (editing) {
            setDescription('AI Agents are systems that use LLMs to plan, act, and collaborate autonomously. LangChain builds tool-using agents for workflows and RAG. CrewAI enables role-based multi-agent teamwork. AutoGen focuses on conversation-driven agents that interact with each other and humans to solve complex tasks.');
            setObjective('AI Agents are systems that use LLMs to plan, act, and collaborate autonomously. LangChain builds tool-using agents for workflows and RAG. CrewAI enables role-based multi-agent teamwork. AutoGen focuses on conversation-driven agents that interact with each other and humans to solve complex tasks.');
            setExpectedOutcome('AI Agents are systems that use LLMs to plan, act, and collaborate autonomously. LangChain builds tool-using agents for workflows and RAG. CrewAI enables role-based multi-agent teamwork. AutoGen focuses on conversation-driven agents that interact with each other and humans to solve complex tasks.');
        }
        setIsEditing(editing);
    };

    if (isEditing) {
        return (
            <EditAssignment
                assignment={{
                    title,
                    dueDate,
                    dueTime,
                    description,
                    objective,
                    expectedOutcome,
                    resources,
                }}
                onBack={() => setIsEditing(false)}
                onSave={() => setIsEditing(false)}
            />
        );
    }

    const fullDueDateStr = `${dueDate}${dueTime ? `, ${dueTime}` : ''}`;

    if (isReviewing) {
        return (
            <ReviewAssignment
                assignmentTitle={title}
                moduleName={moduleName}
                batchName={batch}
                dueDate={fullDueDateStr}
                onBack={() => setIsReviewing(false)}
            />
        );
    }

    return (
        <View className="flex-1 bg-[#FAFAFA]">
            {/* Navigation Header */}
            <Header title="Assignment" onBackPress={onBack} />

            <ScrollView className="flex-1 px-5 pt-2" contentContainerStyle={{ paddingBottom: 100 }} showsVerticalScrollIndicator={false}>
                {/* Assignment Overview Card */}
                <View className="bg-white rounded-[16px] p-3 mb-4 border border-[#F2EEF4]">
                    <Text className="text-[20px] font-medium text-[#333333] mb-2">{title}</Text>

                    <View className="flex-row items-center gap-3 mb-2">
                        <View className="bg-[#FFEDDE] px-3 py-1 rounded-full">
                            <Text className="text-[#F67300] text-[12px] font-semibold">{status}</Text>
                        </View>
                        <View className="flex-row items-center">
                            <Calendar size={14} color="#6A7282" />
                            <Text className="text-[14px] text-[#626262] ml-1.5 font-medium">
                                Due {fullDueDateStr}
                            </Text>
                        </View>
                    </View>

                    <Text className="text-[16px] text-[#626262] mb-5 font-medium">
                        {courseCode} - {courseName}
                    </Text>

                    {/* Description */}
                    <View className="mb-6">
                        <Text className="text-[18px] font-medium text-[#333333] mb-3">Description:</Text>
                        <Text className="text-[14px] text-[#4D4D4D] leading-relaxed text-left">{description}</Text>
                    </View>

                    {/* Objective */}
                    <View className="mb-6">
                        <Text className="text-[18px] font-medium text-[#333333] mb-3">Objective:</Text>
                        <Text className="text-[14px] text-[#4D4D4D] leading-relaxed text-left">{objective}</Text>
                    </View>

                    {/* Expected Outcome */}
                    <View>
                        <Text className="text-[18px] font-medium text-[#333333] mb-3">Expected Outcome:</Text>
                        <Text className="text-[14px] text-[#4D4D4D] leading-relaxed text-left">{expectedOutcome}</Text>
                    </View>
                </View>

                {/* Resources Card Wrapper */}
                <View className="bg-white border border-[#F2EEF4] p-5 rounded-[16px] mb-5">
                    <Text className="text-[20px] font-medium text-[#333333] mb-4">Resources</Text>

                    {/* Resources List */}
                    {resources.map((resItem, index, arr) => {
                        const title = resItem.name;
                        const subtitle = resItem.size || 'external-link.com';
                        const ext = title.split('.').pop()?.toLowerCase();
                        const isFile = ['pdf', 'doc', 'docx', 'xls', 'xlsx', 'png', 'jpg'].includes(ext || '');
                        const iconBg = isFile ? 'bg-[#FEE2E2]' : 'bg-blue-50';
                        const actionIcon = isFile ? (
                            <DocumentUpload size={18} color="#808080" variant="Linear" />
                        ) : (
                            <Maximize size={18} color="#808080" variant="Linear" />
                        );

                        return (
                            <View
                                key={resItem.id || index}
                                style={{
                                    borderWidth: 0.5,
                                    borderColor: '#F2EEF4',
                                    shadowColor: '#F2EEF4',
                                    shadowOffset: { width: 0, height: 4 },
                                    shadowOpacity: 0.25,
                                    shadowRadius: 4,
                                    elevation: 3,
                                    height: 77,
                                }}
                                className={`flex-row justify-between items-center bg-white pl-1 py-1 pr-5 rounded-[15px] ${index < arr.length - 1 ? 'mb-3.5' : ''
                                    }`}
                            >
                                <View className="flex-row items-center flex-1 pr-2">
                                    {isFile ? (
                                        <View
                                            style={{ width: 76, height: 69 }}
                                            className={`rounded-[24px] ${iconBg} justify-center items-center`}
                                        >
                                            <ExpoImage
                                                source={getFileIconSource(title)}
                                                style={{ width: 32, height: 32 }}
                                                contentFit="contain"
                                            />
                                        </View>
                                    ) : (
                                        <View
                                            style={{ width: 76, height: 69 }}
                                            className={`rounded-[24px] ${iconBg} justify-center items-center`}
                                        >
                                            <IconsaxLink size={24} color="#3B82F6" variant="Linear" />
                                        </View>
                                    )}
                                    <View className="ml-[10px] flex-1 justify-center">
                                        <Text className="text-[15px] font-medium text-[#333333]" numberOfLines={1}>
                                            {title}
                                        </Text>
                                        <Text className="text-[12px] text-[#808080] mt-0.5">{subtitle}</Text>
                                    </View>
                                </View>
                                <TouchableOpacity className="p-1">
                                    {actionIcon}
                                </TouchableOpacity>
                            </View>
                        );
                    })}
                    {resources.length === 0 && (
                        <Text className="text-[13px] text-[#8C8E90] italic text-center py-2">No resources available.</Text>
                    )}
                </View>

                {/* Action Buttons */}
                <View className="flex-row gap-3 mt-1 mb-6">
                    <TouchableOpacity
                        onPress={() => setIsReviewing(true)}
                        className="flex-1 h-12 rounded-[15px] bg-[#F67300] items-center justify-center"
                        activeOpacity={0.8}
                    >
                        <Text className="text-white text-[16px] font-semibold">Review Assignment</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        onPress={() => handleToggleEditMode(true)}
                        className="flex-1 h-12 rounded-[15px] bg-[#F67300] items-center justify-center"
                        activeOpacity={0.8}
                    >
                        <Text className="text-white text-[16px] font-semibold">Edit Assignment</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </View>
    );
}
