import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, TextInput } from 'react-native';
import { Image as ExpoImage } from 'expo-image';
import * as DocumentPicker from 'expo-document-picker';
import Header from '@/components/Instructor/header';
import { Calendar, Clock } from 'iconsax-react-native';
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

export interface ResourceItem {
    id: string;
    name: string;
    size: string;
    type?: string;
    status?: string;
    progress?: number;
}

export interface EditAssignmentData {
    id?: string;
    title?: string;
    batch?: string;
    dueDate?: string;
    dueTime?: string;
    description?: string;
    objective?: string;
    expectedOutcome?: string;
    resources?: ResourceItem[];
}

interface EditAssignmentProps {
    assignment?: EditAssignmentData;
    onBack?: () => void;
    onSave?: (data: EditAssignmentData) => void;
}

export default function EditAssignment({ assignment, onBack, onSave }: EditAssignmentProps) {
    const [title, setTitle] = useState(assignment?.title || 'Assignment Name');
    const [batch] = useState(assignment?.batch || 'Batch 02');
    const [dueDate, setDueDate] = useState(assignment?.dueDate || '12/01/2026');
    const [dueTime, setDueTime] = useState(assignment?.dueTime || '11:59 pm');

    const [description, setDescription] = useState(
        assignment?.description ||
        'AI Agents are systems that use LLMs to plan, act, and collaborate autonomously. LangChain builds tool-using agents for workflows and RAG. CrewAI enables role-based multi-agent teamwork. AutoGen focuses on conversation-driven agents that interact with each other and humans to solve complex tasks.'
    );

    const [objective, setObjective] = useState(
        assignment?.objective ||
        'AI Agents are systems that use LLMs to plan, act, and collaborate autonomously. LangChain builds tool-using agents for workflows and RAG. CrewAI enables role-based multi-agent teamwork. AutoGen focuses on conversation-driven agents that interact with each other and humans to solve complex tasks.'
    );

    const [expectedOutcome, setExpectedOutcome] = useState(
        assignment?.expectedOutcome ||
        'AI Agents are systems that use LLMs to plan, act, and collaborate autonomously. LangChain builds tool-using agents for workflows and RAG. CrewAI enables role-based multi-agent teamwork. AutoGen focuses on conversation-driven agents that interact with each other and humans to solve complex tasks.'
    );

    const [resources, setResources] = useState<ResourceItem[]>(
        assignment?.resources || [
            { id: '1', name: 'Project_Guidelines.pdf', size: '2.4MB', type: 'pdf', status: 'Ready to submit' },
            { id: '2', name: 'external-link.com', size: '6.6MB', type: 'pdf', status: 'Ready to submit' },
        ]
    );

    const [comment, setComment] = useState('');

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

                const ext = asset.name.split('.').pop()?.toLowerCase();
                const fileType = ['pdf', 'doc', 'docx', 'xls', 'xlsx'].includes(ext || '') ? 'pdf' : 'file';

                const newFile: ResourceItem = {
                    id: newFileId,
                    name: asset.name,
                    size: sizeStr,
                    type: fileType,
                    status: 'Uploading',
                    progress: 35,
                };

                setResources(prev => [...prev, newFile]);

                setTimeout(() => {
                    setResources(prev =>
                        prev.map(item =>
                            item.id === newFileId ? { ...item, progress: 100, status: 'Ready to submit' } : item
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
                batch,
                dueDate,
                dueTime,
                description,
                objective,
                expectedOutcome,
                resources,
            });
        }
    };

    return (
        <View className="flex-1 bg-[#FAFAFA]">
            {/* Header */}
            <Header title="Assignment" onBackPress={onBack} />

            <ScrollView
                className="flex-1 px-5 pt-2"
                contentContainerStyle={{ paddingBottom: 100 }}
                showsVerticalScrollIndicator={false}
            >
                {/* Assignment Title & Batch Header */}
                <View className="flex-row items-center justify-between mb-4 px-1">
                    <View className="flex-row items-center gap-2">
                        <Text className="text-[16px] font-medium text-[#333333]">{title}</Text>
                        <Edit2 size={14} color="#8C8E90" />
                    </View>
                    <View className="bg-[#F67300]/10 px-3 py-1 rounded-full">
                        <Text className="text-[#F67300] text-[12px]">{batch}</Text>
                    </View>
                </View>

                {/* Due Date & Time Inputs */}
                <View className="flex-row gap-3 mb-4">
                    <View className="flex-1 bg-white rounded-[10px] p-2.5">
                        <Text className="text-[13px] text-[#333333] font-medium mb-2">Due date</Text>
                        <View className="flex-row items-center justify-between">
                            <TextInput
                                value={dueDate}
                                onChangeText={setDueDate}
                                className="flex-1 text-[13px] text-[#8C8E90] font-medium p-0"
                            />
                            <View className="w-6 h-6 rounded-[5px] border border-[#F3F5F7] bg-white items-center justify-center">
                                <Calendar size={14} color="#8C8E90" />
                            </View>
                        </View>
                    </View>

                    <View className="flex-1 bg-white rounded-[10px] p-2.5">
                        <Text className="text-[13px] text-[#333333] font-medium mb-2">Due Time(IST)</Text>
                        <View className="flex-row items-center justify-between">
                            <TextInput
                                value={dueTime}
                                onChangeText={setDueTime}
                                className="flex-1 text-[13px] text-[#8C8E90] font-medium p-0"
                            />
                            <View className="w-6 h-6 rounded-[5px] border border-[#F3F5F7] bg-white items-center justify-center">
                                <Clock size={14} color="#8C8E90" />
                            </View>
                        </View>
                    </View>
                </View>

                {/* Description Card */}
                <View className="bg-white rounded-[24px] p-6 mb-4">
                    <Text className="text-[20px] font-medium text-[#333333] mb-2">Description:</Text>
                    <View className="border border-[#DEDEDE] rounded-[18px] p-4 bg-white min-h-[140px]">
                        <TextInput
                            value={description}
                            onChangeText={setDescription}
                            multiline
                            textAlignVertical="top"
                            className="text-[12px] text-[#333333] leading-relaxed p-0 text-left"
                        />
                    </View>
                </View>

                {/* Objective Card */}
                <View className="bg-white rounded-[24px] p-6 mb-4">
                    <Text className="text-[20px] font-medium text-[#333333] mb-2">Objective:</Text>
                    <View className="border border-[#DEDEDE] rounded-[18px] p-4 bg-white min-h-[140px]">
                        <TextInput
                            value={objective}
                            onChangeText={setObjective}
                            multiline
                            textAlignVertical="top"
                            className="text-[12px] text-[#333333] leading-relaxed p-0 text-left"
                        />
                    </View>
                </View>

                {/* Expected Outcome Card */}
                <View className="bg-white rounded-[24px] p-6 mb-4">
                    <Text className="text-[20px] font-medium text-[#333333] mb-2">Expected Outcome:</Text>
                    <View className="border border-[#DEDEDE] rounded-[18px] p-4 bg-white min-h-[140px]">
                        <TextInput
                            value={expectedOutcome}
                            onChangeText={setExpectedOutcome}
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
                        <Text className="text-[12px] text-center text-[#626262] mb-0.5">Supported formats: pdf, doc, docx, txt Maximum file size: 10MB</Text>
                    </TouchableOpacity>

                    {/* Uploaded Files */}
                    <View className="gap-2.5">
                        {resources.map((res) => {
                            const isUploading = res.status === 'Uploading' || (res.progress && res.progress < 100);

                            return (
                                <View key={res.id} className="bg-white p-2">
                                    <View className="flex-row items-center justify-between">
                                        <View className="flex-row items-center flex-1 mr-2">
                                            <View className={`w-12 h-11 rounded-[16px] ${getFileBgColor(res.name)} items-center justify-center mr-3`}>
                                                <ExpoImage
                                                    source={getFileIconSource(res.name)}
                                                    style={{ width: 26, height: 26 }}
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
                                    {isUploading && (
                                        <View className="h-1.5 bg-[#E5E5E5] rounded-full overflow-hidden mt-2.5 w-full">
                                            <View style={{ width: `${res.progress || 60}%` }} className="h-full bg-[#F67300]" />
                                        </View>
                                    )}
                                </View>
                            );
                        })}

                        {resources.length === 0 && (
                            <Text className="text-[13px] text-[#8C8E90] italic text-center py-2">No files uploaded yet.</Text>
                        )}
                    </View>
                </View>

                {/* Add Comment Card */}
                <View className="bg-white rounded-[16px] border border-[#F2EEF4] p-6 mb-4">
                    <Text className="text-[20px] font-medium text-[#333333] mb-2">Add Comment:</Text>
                    <View className="border border-[#DEDEDE] rounded-[18px] p-4 bg-white min-h-[110px] flex-row items-start justify-between">
                        <TextInput
                            value={comment}
                            onChangeText={setComment}
                            placeholder="Add Comments..."
                            placeholderTextColor="#A0A0AB"
                            multiline
                            textAlignVertical="top"
                            className="flex-1 text-[14px] text-[#333333] p-0 text-left mr-2"
                        />
                        <View className="flex-row items-center gap-2 pt-1">
                            <TouchableOpacity className="p-0.5">
                                <LinkIcon size={18} color="#808080" />
                            </TouchableOpacity>
                            <TouchableOpacity className="p-0.5">
                                <Smile size={18} color="#808080" />
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>

                {/* Save  */}
                <View className="items-end mt-2 mb-6">
                    <TouchableOpacity
                        onPress={handleSaveSubmit}
                        className="bg-[#F67300] px-7 h-11 rounded-[12px] items-center justify-center "
                        activeOpacity={0.8}
                    >
                        <Text className="text-white text-[16px] font-semibold">Save</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView >
        </View >
    );
}
