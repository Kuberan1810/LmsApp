import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { Image as ExpoImage } from 'expo-image';
import InstructorHeader from '@/components/Instructor/InstructorHeader';
import { DocumentUpload, Maximize, Link as IconsaxLink } from 'iconsax-react-native';
import EditChapter, { EditChapterData } from './EditChapter';

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

export interface FileItem {
    id: string;
    name: string;
    size: string;
    status: 'ready' | 'uploading';
    progress?: number;
}

export interface ChapterData {
    id?: string;
    chapterTitle?: string;
    title?: string;
    moduleName?: string;
    classContent?: string;
    keyTopics?: string;
    resources?: FileItem[];
}

interface ChaptersProps {
    chapter?: ChapterData;
    chapterTitle?: string;
    moduleName?: string;
    onBack?: () => void;
    initialIsEditing?: boolean;
    onSave?: (data: EditChapterData) => void;
}

export default function Chapters({
    chapter,
    chapterTitle = '3.4 AI Agents (LangChain, CrewAI, AutoGen)',
    moduleName = 'Module 1: Module-1',
    onBack,
    initialIsEditing = false,
    onSave,
}: ChaptersProps) {
    const [isEditing, setIsEditing] = useState(initialIsEditing);

    const [title, setTitle] = useState(chapter?.title || chapter?.chapterTitle || chapterTitle);
    const [modName, setModName] = useState(chapter?.moduleName || moduleName);

    const [classContent, setClassContent] = useState(chapter?.classContent || '');
    const [keyTopics, setKeyTopics] = useState(chapter?.keyTopics || '');
    const [resources, setResources] = useState<FileItem[]>(chapter?.resources || []);

    const handleSaveFromEdit = (data: EditChapterData) => {
        if (data.title) setTitle(data.title);
        if (data.moduleName) setModName(data.moduleName);
        if (data.classContent) setClassContent(data.classContent);
        if (data.keyTopics) setKeyTopics(data.keyTopics);
        if (data.resources) setResources(data.resources);
        if (onSave) {
            onSave(data);
        }
        setIsEditing(false);
    };

    if (isEditing) {
        return (
            <EditChapter
                chapter={{
                    title,
                    moduleName: modName,
                    classContent,
                    keyTopics,
                    resources,
                }}
                onBack={() => setIsEditing(false)}
                onSave={handleSaveFromEdit}
            />
        );
    }

    return (
        <View className="flex-1 bg-[#FAFAFA]">
            {/* Header */}
            <InstructorHeader
                title="Chapter"
                onBackPress={onBack}
                showSearch={false}
                showNotification={false}
                showProfile={false}
                titleAlign="center"
            />

            <ScrollView
                className="flex-1 px-5 pt-2"
                contentContainerStyle={{ paddingBottom: 100 }}
                showsVerticalScrollIndicator={false}
            >
                {/* Chapter Overview Card */}
                <View className="bg-white rounded-[16px] p-6 mb-4 border border-[#F2EEF4]">
                    <View className="flex-row items-center justify-between mb-4">
                        <Text className="text-[20px] font-medium text-[#333333] flex-1 mr-2">{title}</Text>
                    </View>

                    {/* Class Content Section */}
                    <View className="mb-6">
                        <Text className="text-[18px] font-medium text-[#333333] mb-3">Class Content:</Text>
                        <Text className={`text-[14px] leading-relaxed text-left ${classContent ? 'text-[#4D4D4D]' : 'text-[#8C8E90] italic'}`}>
                            {classContent || 'No class content provided yet.'}
                        </Text>
                    </View>

                    {/* Key Topics Section */}
                    <View className="mb-2">
                        <Text className="text-[18px] font-medium text-[#333333] mb-3">Key Topics:</Text>
                        <Text className={`text-[14px] leading-relaxed text-left ${keyTopics ? 'text-[#4D4D4D]' : 'text-[#8C8E90] italic'}`}>
                            {keyTopics || 'No key topics provided yet.'}
                        </Text>
                    </View>
                </View>

                {/* Resources Card Wrapper */}
                <View className="bg-white border border-[#F2EEF4] p-5 rounded-[16px] mb-5">
                    <Text className="text-[20px] font-medium text-[#333333] mb-4">Resources</Text>

                    {/* Resources List */}
                    {resources.map((resItem, index, arr) => {
                        const resTitle = resItem.name;
                        const subtitle = resItem.size || 'external-link.com';
                        const ext = resTitle.split('.').pop()?.toLowerCase();
                        const isFile = ['pdf', 'doc', 'docx', 'xls', 'xlsx', 'png', 'jpg'].includes(ext || '');
                        const iconBg = isFile ? getFileBgColor(resTitle) : 'bg-[#EFF6FF]';
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
                                                source={getFileIconSource(resTitle)}
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
                                            {resTitle}
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

                {/* Edit Chapter */}
                <View className="flex-row mt-1 mb-6">
                    <TouchableOpacity
                        onPress={() => setIsEditing(true)}
                        className="flex-1 h-12 rounded-[15px] bg-[#F67300] items-center justify-center"
                        activeOpacity={0.8}
                    >
                        <Text className="text-white text-[16px] font-semibold">Edit Chapter</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </View>
    );
}
