import React, { useState } from 'react';
import ReviewAssignment from './reviewAssignment';
import EditAssignment from './editassignment';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { Image as ExpoImage } from 'expo-image';
import InstructorHeader from '@/components/Instructor/InstructorHeader';
import { DocumentUpload, Maximize, Link as IconsaxLink, Import, ImportCurve, Calendar as IconsaxCalendar, CalendarRemove } from 'iconsax-react-native';
import { Calendar } from 'lucide-react-native';

const getFileIconSource = (fileName: string) => {
    const ext = fileName.split('.').pop()?.toLowerCase();
    switch (ext) {
        case 'pdf':
            return require('../../../../../assets/icon/pdfIcon.svg');
        case 'doc':
            return require('../../../../../assets/icon/docIcon.svg');
        case 'docx':
            return require('../../../../../assets/icon/word.svg');
        case 'xls':
        case 'xlsx':
            return require('../../../../../assets/icon/xl.svg');
        case 'png':
        case 'jpg':
        case 'jpeg':
            return require('../../../../../assets/icon/imgIcon.svg');
        default:
            return require('../../../../../assets/icon/file.svg');
    }
};

const getFileBgColor = (fileName: string) => {
    const ext = fileName.split('.').pop()?.toLowerCase();
    if (fileName.includes('link') || fileName.includes('.com') || fileName.includes('http')) {
        return 'bg-[#EFF6FF]';
    }
    switch (ext) {
        case 'pdf':
            return 'bg-[#FEE2E2]';
        case 'doc':
        case 'docx':
            return 'bg-[#E0F2FE]';
        case 'xls':
        case 'xlsx':
            return 'bg-[#DCFCE7]';
        case 'png':
        case 'jpg':
        case 'jpeg':
            return 'bg-[#F3E8FF]';
        default:
            return 'bg-gray-100';
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
    resources?: ResourceItem[];
}

interface AssignmentsProps {
    assignment?: AssignmentData;
    initialIsEditing?: boolean;
    onBack?: () => void;
    onSave?: (data: AssignmentData) => void;
}

export default function Assignments({ assignment, initialIsEditing = false, onBack, onSave }: AssignmentsProps) {
    const [isReviewing, setIsReviewing] = useState(false);
    const [isEditing, setIsEditing] = useState(initialIsEditing);
    const [title, setTitle] = useState(assignment?.title || 'Build Q&A system using RAG');
    const [status] = useState(assignment?.status || 'In Progress');
    const [dueDate, setDueDate] = useState(assignment?.dueDate || 'Jan 26');
    const [dueTime, setDueTime] = useState(assignment?.dueTime || '11:59 PM');
    const [courseCode] = useState(assignment?.courseCode || 'AM101');
    const [courseName] = useState(assignment?.courseName || 'AI / ML Frontier Ai Engineer');
    const [batch] = useState(assignment?.batch || 'Batch 02');
    const [moduleName] = useState(assignment?.moduleName || 'Module 1: Module-1');

    // Description
    const [description, setDescription] = useState(
        assignment?.description !== undefined && assignment.description !== ''
            ? assignment.description
            : (initialIsEditing ? '' : 'Build a complete Question & Answering (Q&A) system using Retrieval-Augmented Generation (RAG) architecture with LangChain and vector databases.')
    );
    const [objective, setObjective] = useState(
        assignment?.objective !== undefined && assignment.objective !== ''
            ? assignment.objective
            : (initialIsEditing ? '' : 'Understand and implement vector embeddings, document chunking, semantic retrieval, and LLM prompt orchestration.')
    );
    const [expectedOutcome, setExpectedOutcome] = useState(
        assignment?.expectedOutcome !== undefined && assignment.expectedOutcome !== ''
            ? assignment.expectedOutcome
            : (initialIsEditing ? '' : 'A functional Python notebook or script demonstrating end-to-end RAG pipeline querying custom documents with accurate answers.')
    );
    const [resources, setResources] = useState<ResourceItem[]>(
        assignment?.resources !== undefined && assignment.resources.length > 0
            ? assignment.resources
            : (initialIsEditing ? [] : [
                { id: '1', name: 'RAG_Architecture_Guide.pdf', size: '3.1 MB', status: 'Ready to submit' },
                { id: '2', name: 'Dataset_Sample_Docs.zip', size: '12.5 MB', status: 'Ready to submit' },
            ])
    );

    const fullDueDateStr = `${dueDate}${dueTime ? `, ${dueTime}` : ''}`;

    if (isEditing) {
        return (
            <EditAssignment
                assignment={{
                    id: assignment?.id,
                    title,
                    batch,
                    dueDate,
                    dueTime,
                    description,
                    objective,
                    expectedOutcome,
                    resources,
                }}
                onBack={() => setIsEditing(false)}
                onSave={(data) => {
                    if (data.title) setTitle(data.title);
                    if (data.dueDate) setDueDate(data.dueDate);
                    if (data.dueTime) setDueTime(data.dueTime);
                    if (data.description !== undefined) setDescription(data.description);
                    if (data.objective !== undefined) setObjective(data.objective);
                    if (data.expectedOutcome !== undefined) setExpectedOutcome(data.expectedOutcome);
                    if (data.resources !== undefined) setResources(data.resources);
                    setIsEditing(false);
                    if (onSave) {
                        onSave(data);
                    }
                }}
            />
        );
    }

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
            <InstructorHeader
                title="Assignment"
                onBackPress={onBack}
                showSearch={false}
                showNotification={false}
                showProfile={false}
                titleAlign="center"
            />

            <ScrollView className="flex-1 px-5 pt-2" showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 40 }}>
                {/* Assignment Overview Card */}
                <View className="bg-white rounded-[16px] p-3 mb-4 border border-[#F2EEF4]">
                    <Text className="text-[20px] font-medium text-[#333333] mb-2">{title}</Text>

                    <View className="flex-row items-center gap-3 mb-2">
                        <View className="bg-[#FFEDDE] px-3 py-1 rounded-full">
                            <Text className="text-[#F67300] text-[12px] font-semibold">{status}</Text>
                        </View>
                        <View className="flex-row items-center">
                            <View className="bg-white border border-[#F3F5F7] rounded-[5px] p-[4px] mr-2 justify-center items-center">
                                <CalendarRemove size={14} color="#626262" variant="Linear" />
                            </View>
                            <Text className="text-[14px] text-[#626262] font-medium">
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
                        <Text className={`text-[14px] leading-relaxed text-left ${description ? 'text-[#4D4D4D]' : 'text-[#8C8E90] italic'}`}>
                            {description || 'No description provided yet.'}
                        </Text>
                    </View>

                    {/* Objective */}
                    <View className="mb-6">
                        <Text className="text-[18px] font-medium text-[#333333] mb-3">Objective:</Text>
                        <Text className={`text-[14px] leading-relaxed text-left ${objective ? 'text-[#4D4D4D]' : 'text-[#8C8E90] italic'}`}>
                            {objective || 'No objective provided yet.'}
                        </Text>
                    </View>

                    {/* Expected Outcome */}
                    <View>
                        <Text className="text-[18px] font-medium text-[#333333] mb-3">Expected Outcome:</Text>
                        <Text className={`text-[14px] leading-relaxed text-left ${expectedOutcome ? 'text-[#4D4D4D]' : 'text-[#8C8E90] italic'}`}>
                            {expectedOutcome || 'No expected outcome provided yet.'}
                        </Text>
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
                        const iconBg = isFile ? getFileBgColor(title) : 'bg-[#EFF6FF]';
                        const actionIcon = isFile ? (
                            <ImportCurve size={18} color="#808080" variant="Linear" />
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
            </ScrollView>

            {/* Action Buttons Bar */}
            <View className="px-5 py-4 bg-[#FAFAFA] flex-row gap-3">
                <TouchableOpacity
                    onPress={() => setIsReviewing(true)}
                    className="flex-1 h-12 rounded-[15px] bg-[#F67300] items-center justify-center"
                    activeOpacity={0.8}
                >
                    <Text className="text-white text-[16px] font-semibold">Review Assignment</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    onPress={() => setIsEditing(true)}
                    className="flex-1 h-12 rounded-[15px] bg-[#F67300] items-center justify-center"
                    activeOpacity={0.8}
                >
                    <Text className="text-white text-[16px] font-semibold">Edit Assignment</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}
