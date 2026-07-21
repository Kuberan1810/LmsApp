import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, TextInput } from 'react-native';
import { Image as ExpoImage } from 'expo-image';
import * as DocumentPicker from 'expo-document-picker';
import InstructorHeader from '@/components/Instructor/InstructorHeader';
import { Edit2, Trash2, UploadCloud, X, Link as LinkIcon, Smile } from 'lucide-react-native';

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

export interface EditChapterData {
    id?: string;
    title?: string;
    moduleName?: string;
    classContent?: string;
    keyTopics?: string;
    resources?: FileItem[];
}

interface EditChapterProps {
    chapter?: EditChapterData;
    onBack?: () => void;
    onSave?: (data: EditChapterData) => void;
}

export default function EditChapter({ chapter, onBack, onSave }: EditChapterProps) {
    const [title, setTitle] = useState(chapter?.title || '3.4 AI Agents (LangChain, CrewAI, AutoGen)');
    const [moduleName] = useState(chapter?.moduleName || 'Module 1: Module-1');
    const [isEditingTitle, setIsEditingTitle] = useState(false);
    const titleInputRef = React.useRef<TextInput>(null);

    const handleEditTitlePress = () => {
        setIsEditingTitle(prev => {
            const next = !prev;
            if (next) {
                setTimeout(() => titleInputRef.current?.focus(), 50);
            }
            return next;
        });
    };

    const [classContent, setClassContent] = useState(
        chapter?.classContent !== undefined
            ? chapter.classContent
            : 'AI Agents are systems powered by Large Language Models (LLMs) that can autonomously perform tasks, make decisions, and interact with environments using tools and reasoning frameworks like ReAct.'
    );
    const [keyTopics, setKeyTopics] = useState(
        chapter?.keyTopics !== undefined
            ? chapter.keyTopics
            : 'Introduction to AI Agents & Autonomous Workflows\nLangChain Fundamentals & Agent Executors\nCrewAI Multi-Agent Collaboration Framework\nAutoGen Framework for Conversational AI\nBuilding Real-World AI Agents'
    );
    const [resources, setResources] = useState<FileItem[]>(
        chapter?.resources !== undefined
            ? chapter.resources
            : [
                { id: '1', name: 'Agent_Architecture_Overview.pdf', size: '2.4 MB', status: 'ready' },
                { id: '2', name: 'LangChain_CrewAI_Guide.docx', size: '1.8 MB', status: 'ready' },
                { id: '3', name: 'Agentic_AI_Deep_Dive.mp4', size: '45.0 MB', status: 'ready' },
            ]
    );


    const handleDeleteResource = (id: string) => {
        setResources(prev => prev.filter(item => item.id !== id));
    };

    const handleAddFile = async () => {
        try {
            const result = await DocumentPicker.getDocumentAsync({
                type: ['*/*'],
                copyToCacheDirectory: true,
            });

            if (!result.canceled && result.assets && result.assets.length > 0) {
                const asset = result.assets[0];
                const newFileId = Date.now().toString();

                let sizeStr = '0 B';
                if (asset.size) {
                    if (asset.size > 1024 * 1024) {
                        sizeStr = `${(asset.size / (1024 * 1024)).toFixed(1)}MB`;
                    } else {
                        sizeStr = `${(asset.size / 1024).toFixed(0)}KB`;
                    }
                }

                const newFile: FileItem = {
                    id: newFileId,
                    name: asset.name,
                    size: sizeStr,
                    status: 'uploading',
                    progress: 35,
                };

                setResources(prev => [...prev, newFile]);

                setTimeout(() => {
                    setResources(prev =>
                        prev.map(item =>
                            item.id === newFileId ? { ...item, progress: 100, status: 'ready' } : item
                        )
                    );
                }, 800);
            }
        } catch (err) {
            console.log('Error picking document:', err);
        }
    };

    const handleSaveSubmit = () => {
        if (onSave) {
            onSave({
                title,
                moduleName,
                classContent,
                keyTopics,
                resources,
            });
        }
    };

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
                {/* Chapter Title & Module Header */}
                <View className="flex-row items-center justify-between mb-4 px-1">
                    <View className="flex-row items-center gap-2 flex-1 mr-2">
                        {isEditingTitle ? (
                            <View className="flex-1 flex-row items-center border border-[#8C8E90] rounded-[10px] px-3 py-1.5 bg-white">
                                <TextInput
                                    ref={titleInputRef}
                                    value={title}
                                    onChangeText={setTitle}
                                    onBlur={() => setIsEditingTitle(false)}
                                    className="text-[16px] font-medium text-[#333333] flex-1 p-0"
                                    autoFocus
                                />
                            </View>
                        ) : (
                            <Text className="text-[16px] font-medium text-[#333333] flex-1">{title}</Text>
                        )}
                        <TouchableOpacity onPress={handleEditTitlePress} className="p-1" activeOpacity={0.7}>
                            <Edit2 size={16} color={isEditingTitle ? "#F67300" : "#8C8E90"} />
                        </TouchableOpacity>
                    </View>
                </View>

                {/* Class Content Card */}
                <View className="bg-white rounded-[24px] border border-[#F2EEF4] p-6 mb-4">
                    <Text className="text-[20px] font-medium text-[#333333] mb-2">Class Content:</Text>
                    <View className="border border-[#DEDEDE] rounded-[18px] p-4 bg-white min-h-[140px]">
                        <TextInput
                            value={classContent}
                            onChangeText={setClassContent}
                            placeholder="Enter class content..."
                            placeholderTextColor="#A0A0AB"
                            multiline
                            textAlignVertical="top"
                            className="text-[12px] text-[#333333] leading-relaxed p-0 text-left"
                        />
                    </View>
                </View>

                {/* Key Topics Card */}
                <View className="bg-white rounded-[24px] border border-[#F2EEF4] p-6 mb-4">
                    <Text className="text-[20px] font-medium text-[#333333] mb-2">Key Topics:</Text>
                    <View className="border border-[#DEDEDE] rounded-[18px] p-4 bg-white min-h-[140px]">
                        <TextInput
                            value={keyTopics}
                            onChangeText={setKeyTopics}
                            placeholder="Enter key topics..."
                            placeholderTextColor="#A0A0AB"
                            multiline
                            textAlignVertical="top"
                            className="text-[12px] text-[#333333] leading-relaxed p-0 text-left"
                        />
                    </View>
                </View>

                {/* Resources Section */}
                <View className="bg-white rounded-[16px] border border-[#F2EEF4] p-6 mb-4">
                    <Text className="text-[20px] font-medium text-[#333333] mb-2">Resources</Text>

                    <TouchableOpacity
                        onPress={handleAddFile}
                        className="border border-dashed border-[#333333] rounded-[10px] p-6 items-center justify-center bg-white mb-4"
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
                        {resources.map((res) => {
                            const isUploading = res.status === 'uploading' || (res.progress && res.progress < 100);

                            return (
                                <View key={res.id} className="bg-white p-2">
                                    <View className="flex-row items-center justify-between">
                                        <View className="flex-row items-center flex-1 mr-2">
                                            <View className={`w-[76px] h-[69px] rounded-[24px] ${getFileBgColor(res.name)} items-center justify-center mr-3`}>
                                                <ExpoImage
                                                    source={getFileIconSource(res.name)}
                                                    style={{ width: 24, height: 24 }}
                                                    contentFit="contain"
                                                />
                                            </View>
                                            <View className="flex-1">
                                                <Text className={`text-[16px] font-medium text-[#4D4D4D] ${isUploading ? 'italic' : ''}`} numberOfLines={1}>
                                                    {res.name}
                                                </Text>
                                                <View className="flex-row items-center gap-2 mt-1">
                                                    <Text className="text-[12px] text-[#808080]">{res.size}</Text>
                                                    <Text className={`text-[14px] font-medium ${isUploading ? 'text-[#6A7282]' : 'text-[#16A34A]'}`}>
                                                        {isUploading ? 'Uploading...' : 'Ready to submit'}
                                                    </Text>
                                                </View>
                                            </View>
                                        </View>
                                        <TouchableOpacity onPress={() => handleDeleteResource(res.id)} className="p-1">
                                            {isUploading ? <X size={16} color="#333333" /> : <Trash2 size={16} color="#333333" />}
                                        </TouchableOpacity>
                                    </View>

                                    {/* Progress bar */}
                                    {
                                        isUploading && (
                                            <View className="h-1.5 bg-[#E5E5E5] rounded-full overflow-hidden mt-2.5 w-full">
                                                <View style={{ width: `${res.progress || 60}%` }} className="h-full bg-[#F67300]" />
                                            </View>
                                        )
                                    }
                                </View>
                            );
                        })}

                        {resources.length === 0 && (
                            <Text className="text-[13px] text-[#8C8E90] italic text-center py-2">No files uploaded yet.</Text>
                        )}
                    </View>
                </View>

                {/* Save Button */}
                <View className="items-end mt-2 mb-6">
                    <TouchableOpacity
                        onPress={handleSaveSubmit}
                        className="bg-[#F67300] px-7 h-11 rounded-[12px] items-center justify-center"
                        activeOpacity={0.8}
                    >
                        <Text className="text-white text-[16px] font-semibold">Upload</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView >
        </View >
    );
}
