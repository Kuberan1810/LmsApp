import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, TextInput, Alert } from 'react-native';
import { Image as ExpoImage } from 'expo-image';
import * as DocumentPicker from 'expo-document-picker';
import Header from '@/components/Instructor/header';
import { Edit2, Trash2, UploadCloud, X, Check } from 'lucide-react-native';

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
            return 'bg-[#FFF0F0]';
        case 'doc':
        case 'docx':
            return 'bg-[#EBF5FF]';
        case 'xls':
        case 'xlsx':
            return 'bg-[#F0FDF4]';
        case 'png':
        case 'jpg':
        case 'jpeg':
            return 'bg-[#FFF7ED]';
        default:
            return 'bg-[#FFF0F0]';
    }
};

export interface FileItem {
    id: string;
    name: string;
    size: string;
    status: 'ready' | 'uploading';
    progress?: number;
}

interface ChaptersProps {
    chapterTitle?: string;
    moduleName?: string;
    onBack?: () => void;
}

export default function Chapters({
    chapterTitle = '3.4 AI Agents (LangChain, CrewAI, AutoGen)',
    moduleName = 'Module 1: Module-1',
    onBack,
}: ChaptersProps) {
    const [title, setTitle] = useState(chapterTitle);
    const [isEditingTitle, setIsEditingTitle] = useState(false);

    const [classContent, setClassContent] = useState(
        'AI Agents are systems that use LLMs to plan, act, and collaborate autonomously. LangChain builds tool-using agents for workflows and RAG. CrewAI enables role-based multi-agent teamwork. AutoGen focuses on conversation-driven agents that interact with each other and humans to solve complex tasks.'
    );

    const [keyTopics, setKeyTopics] = useState(
        'AI Agents are systems that use LLMs to plan, act, and collaborate autonomously. LangChain builds tool-using agents for workflows and RAG. CrewAI enables role-based multi-agent teamwork. AutoGen focuses on conversation-driven agents that interact with each other and humans to solve complex tasks.'
    );

    const [files, setFiles] = useState<FileItem[]>([
        {
            id: '1',
            name: 'Project_Guidelines.pdf',
            size: '2.4MB',
            status: 'ready',
        },
        {
            id: '2',
            name: 'Module_assignment.pdf',
            size: '6.8MB',
            status: 'uploading',
            progress: 65,
        },
    ]);

    const handlePickDocument = async () => {
        try {
            const result = await DocumentPicker.getDocumentAsync({
                type: ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document', 'text/plain'],
                copyToCacheDirectory: true,
            });

            if (!result.canceled && result.assets && result.assets.length > 0) {
                const asset = result.assets[0];
                const newFileId = String(Date.now());
                const newFile: FileItem = {
                    id: newFileId,
                    name: asset.name,
                    size: asset.size ? `${(asset.size / (1024 * 1024)).toFixed(1)}MB` : '2.0MB',
                    status: 'uploading',
                    progress: 35,
                };
                setFiles(prev => [...prev, newFile]);

                setTimeout(() => {
                    setFiles(prev =>
                        prev.map(item =>
                            item.id === newFileId ? { ...item, progress: 100, status: 'ready' } : item
                        )
                    );
                }, 800);
            }
        } catch (err) {
            console.log('Document picker error:', err);
        }
    };

    const handleDeleteFile = (id: string) => {
        setFiles(prev => prev.filter(f => f.id !== id));
    };

    return (
        <View className="flex-1 bg-[#FAFAFA]">
            {/* Header */}
            <Header title="Chapter" onBackPress={onBack} />

            <ScrollView className="flex-1 px-5 pt-2" showsVerticalScrollIndicator={false}>
                {/* Chapter Title */}
                <View className="flex-row items-center mb-6 pr-2">
                    {isEditingTitle ? (
                        <View className="flex-row items-center flex-1 bg-white border border-[#8C8E90] rounded-[12px] px-3 py-1 mr-2">
                            <TextInput
                                value={title}
                                onChangeText={setTitle}
                                className="flex-1 text-[18px] font-medium text-[#333333]"
                                autoFocus
                            />
                            <TouchableOpacity onPress={() => setIsEditingTitle(false)} className="p-1">
                                <Check size={20} color="#F67300" />
                            </TouchableOpacity>
                        </View>
                    ) : (
                        <View className="flex-row items-center flex-1">
                            <Text className="text-[18px] font-medium text-[#333333] mr-2 flex-1 leading-tight">
                                {title}
                            </Text>
                            <TouchableOpacity onPress={() => setIsEditingTitle(true)} className="p-1">
                                <Edit2 size={16} color="#8C8E90" />
                            </TouchableOpacity>
                        </View>
                    )}
                </View>

                {/* Class Content Section */}
                <View className="bg-white border border-[#F2EEF4] rounded-[24px] p-6 mb-5">
                    <Text className="text-[20px] font-medium text-[#333333] mb-4">Class Content:</Text>
                    <View className="bg-[#FFFFFF] border border-[#DEDEDE] rounded-[18px] p-4">
                        <Text className="text-[12px] text-[#333333] leading-6 font-normal">
                            {classContent}
                        </Text>
                    </View>
                </View>

                {/* Key Topics Section */}
                <View className="bg-white border border-[#F2EEF4] rounded-[24px] p-6 mb-5">
                    <Text className="text-[20px] font-medium text-[#333333] mb-4">Key Topics::</Text>
                    <View className="bg-[#FFFFFF] border border-[#DEDEDE] rounded-[18px] p-4">
                        <Text className="text-[12px] text-[#333333] leading-6 font-normal">
                            {keyTopics}
                        </Text>
                    </View>
                </View>

                {/* Resources Section */}
                <View className="bg-white rounded-[16px] border border-[#F2EEF4] p-6 mb-5">
                    <Text className="text-[20px] font-medium text-[#333333] mb-4">Resources</Text>

                    <TouchableOpacity
                        onPress={handlePickDocument}
                        className="border border-dashed border-[#333333] rounded-[10px] p-4 items-center justify-center bg-white mb-4"
                        activeOpacity={0.8}
                    >
                        <View
                            className="w-[70px] h-[70px] rounded-full bg-[#F67300] items-center justify-center mb-3"
                            style={{
                                shadowColor: '#000000',
                                shadowOffset: { width: 0, height: 4 },
                                shadowOpacity: 0.2,
                                shadowRadius: 5,
                                elevation: 4,
                            }}
                        >
                            <UploadCloud size={32} color="#FFFFFF" />
                        </View>
                        <Text className="text-[20px] font-medium text-[#333333] mb-3">Upload your files</Text>
                        <Text className="text-[12px] text-[#626262] mb-2 text-center">
                            Drag and drop files here or click to select files
                        </Text>
                        <Text className="text-[12px] text-center text-[#626262] mb-0.5">
                            Supported formats: pdf, doc, docx, txt Maximum file size: 10MB
                        </Text>
                    </TouchableOpacity>

                    {/* Uploaded Files */}
                    <View className="gap-2.5">
                        {files.map((file) => {
                            const isUploading = file.status === 'uploading' || (file.progress && file.progress < 100);

                            return (
                                <View key={file.id} className="bg-white p-2">
                                    <View className="flex-row items-center justify-between">
                                        <View className="flex-row items-center flex-1 mr-2">
                                            <View className={`w-12 h-11 rounded-[16px] ${getFileBgColor(file.name)} items-center justify-center mr-3`}>
                                                <ExpoImage
                                                    source={getFileIconSource(file.name)}
                                                    style={{ width: 26, height: 26 }}
                                                    contentFit="contain"
                                                />
                                            </View>
                                            <View className="flex-1">
                                                <Text className={`text-[16px] font-medium text-[#4D4D4D] ${isUploading ? 'italic' : ''}`} numberOfLines={1}>
                                                    {file.name}
                                                </Text>
                                                <View className="flex-row items-center gap-2 mt-1">
                                                    <Text className="text-[12px] text-[#808080]">{file.size}</Text>
                                                    <Text className={`text-[14px] font-medium ${isUploading ? 'text-[#6A7282]' : 'text-[#16A34A]'}`}>
                                                        {isUploading ? 'Uploading...' : 'Ready to submit'}
                                                    </Text>
                                                </View>
                                            </View>
                                        </View>
                                        <TouchableOpacity onPress={() => handleDeleteFile(file.id)} className="p-1">
                                            {isUploading ? <X size={16} color="#333333" /> : <Trash2 size={16} color="#333333" />}
                                        </TouchableOpacity>
                                    </View>

                                    {/* Progress bar */}
                                    {isUploading && (
                                        <View className="h-1.5 bg-[#E5E5E5] rounded-full overflow-hidden mt-2.5 w-full">
                                            <View style={{ width: `${file.progress || 65}%` }} className="h-full bg-[#F67300]" />
                                        </View>
                                    )}
                                </View>
                            );
                        })}

                        {files.length === 0 && (
                            <Text className="text-[13px] text-[#8C8E90] italic text-center py-2">No files uploaded yet.</Text>
                        )}
                    </View>
                </View>

                {/* Upload Action Button */}
                <TouchableOpacity
                    activeOpacity={0.85}
                    className="bg-[#F67300] rounded-[20px] py-4 items-center justify-center mt-1 mb-10 shadow-sm"
                >
                    <Text className="text-[16px] font-semibold text-white">Upload</Text>
                </TouchableOpacity>
            </ScrollView>
        </View>
    );
}
