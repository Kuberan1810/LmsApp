import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, TextInput } from 'react-native';
import { Image as ExpoImage } from 'expo-image';
import * as DocumentPicker from 'expo-document-picker';
import UploadModalHeader from '@/components/Instructor/UploadModalHeader';
import { Calendar, Clock, Link1, EmojiHappy } from 'iconsax-react-native';
import UploadModal from '@/components/uploadmodal';

export interface EditAssignmentData {
    id?: string;
    title: string;
    batch?: string;
    dueDate: string;
    dueTime: string;
    description: string;
    objective: string;
    expectedOutcome: string;
    resources: any[];
}

interface EditAssignmentProps {
    assignment?: EditAssignmentData;
    onBack?: () => void;
    onSave?: (data: EditAssignmentData) => void;
}

export default function EditAssignment({ assignment, onBack, onSave }: EditAssignmentProps) {
    const [title, setTitle] = useState(assignment?.title || 'Assignment Name');
    const [batch, setBatch] = useState(assignment?.batch || 'Batch 02');
    const [dueDate, setDueDate] = useState(assignment?.dueDate || '21/07/2026');
    const [dueTime, setDueTime] = useState(assignment?.dueTime || '4:33 PM');
    const [description, setDescription] = useState(assignment?.description || '');
    const [objective, setObjective] = useState(assignment?.objective || '');
    const [expectedOutcome, setExpectedOutcome] = useState(assignment?.expectedOutcome || '');
    const [resources, setResources] = useState<any[]>(assignment?.resources || []);
    const [comment, setComment] = useState('');

    const handleSaveSubmit = () => {
        if (onSave) {
            onSave({
                id: assignment?.id || Math.random().toString(),
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
            <UploadModalHeader
                title={title}
                onTitleChange={setTitle}
                batch={batch}
                onBackPress={onBack}
                placeholder="Assignment Name"
                titleAlign="left"
            />

            <ScrollView
                className="flex-1 px-5 pt-2"
                contentContainerStyle={{ paddingBottom: 100 }}
                showsVerticalScrollIndicator={false}
            >
                {/* Due Date & Time Inputs */}
                <View className="flex-row gap-3 mb-4">
                    <View className="flex-1 bg-white rounded-[10px] border border-[#F2EEF4] p-2.5">
                        <Text className="text-[13px] text-[#333333] font-medium mb-2">Due date</Text>
                        <View className="flex-row items-center justify-between">
                            <TextInput
                                value={dueDate}
                                onChangeText={setDueDate}
                                className="flex-1 text-[13px] text-[#8C8E90] font-medium p-0"
                            />
                            <View className="w-6 h-6 rounded-[5px] border border-[#F3F5F7] bg-white items-center justify-center">
                                <Calendar size={14} color="#8C8E90" variant="Linear" />
                            </View>
                        </View>
                    </View>

                    <View className="flex-1 bg-white rounded-[10px] border border-[#F2EEF4] p-2.5">
                        <Text className="text-[13px] text-[#333333] font-medium mb-2">Due Time(IST)</Text>
                        <View className="flex-row items-center justify-between">
                            <TextInput
                                value={dueTime}
                                onChangeText={setDueTime}
                                className="flex-1 text-[13px] text-[#8C8E90] font-medium p-0"
                            />
                            <View className="w-6 h-6 rounded-[5px] border border-[#F3F5F7] bg-white items-center justify-center">
                                <Clock size={14} color="#8C8E90" variant="Linear" />
                            </View>
                        </View>
                    </View>
                </View>

                {/* Description Card */}
                <View className="bg-white rounded-[24px] border border-[#F2EEF4] p-6 mb-4">
                    <Text className="text-[20px] font-medium text-[#333333] mb-2">Description:</Text>
                    <View className="border border-[#DEDEDE] rounded-[18px] p-4 bg-white min-h-[140px]">
                        <TextInput
                            value={description}
                            onChangeText={setDescription}
                            placeholder="Enter description..."
                            placeholderTextColor="#A0A0AB"
                            multiline
                            textAlignVertical="top"
                            className="text-[12px] text-[#333333] leading-relaxed p-0 text-left"
                        />
                    </View>
                </View>

                {/* Objective Card */}
                <View className="bg-white rounded-[24px] border border-[#F2EEF4] p-6 mb-4">
                    <Text className="text-[20px] font-medium text-[#333333] mb-2">Objective:</Text>
                    <View className="border border-[#DEDEDE] rounded-[18px] p-4 bg-white min-h-[140px]">
                        <TextInput
                            value={objective}
                            onChangeText={setObjective}
                            placeholder="Enter objective..."
                            placeholderTextColor="#A0A0AB"
                            multiline
                            textAlignVertical="top"
                            className="text-[12px] text-[#333333] leading-relaxed p-0 text-left"
                        />
                    </View>
                </View>

                {/* Expected Outcome Card */}
                <View className="bg-white rounded-[24px] border border-[#F2EEF4] p-6 mb-4">
                    <Text className="text-[20px] font-medium text-[#333333] mb-2">Expected Outcome:</Text>
                    <View className="border border-[#DEDEDE] rounded-[18px] p-4 bg-white min-h-[140px]">
                        <TextInput
                            value={expectedOutcome}
                            onChangeText={setExpectedOutcome}
                            placeholder="Enter expected outcome..."
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
                    <UploadModal files={resources as any} onFilesChange={(newFiles) => setResources(newFiles as any)} />
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
                                <Link1 size={18} color="#808080" variant="Linear" />
                            </TouchableOpacity>
                            <TouchableOpacity className="p-0.5">
                                <EmojiHappy size={18} color="#808080" variant="Linear" />
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
