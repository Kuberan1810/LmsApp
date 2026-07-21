import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, TextInput } from 'react-native';
import { Danger, CalendarRemove } from 'iconsax-react-native';
import { Assignment } from './AssignmentCard';
import Header from '@/components/Student/Header';
import UploadModal, { UploadedFile } from '@/components/uploadmodal';

interface SubmitAssignmentProps {
  assignment: Assignment;
  onBack: () => void;
  onSuccess: (submittedFiles: { name: string; size: string }[], notes: string) => void;
}

export default function SubmitAssignment({ assignment, onBack, onSuccess }: SubmitAssignmentProps) {
  const { title, courseCode, courseName, dateStr, status } = assignment;

  const getStatusBadge = () => {
    switch (status) {
      case 'Submitted':
        return (
          <View className="flex-row items-center bg-[#2A9A46]/10 px-3 py-1.5 rounded-full self-start">
            <Text className="text-[#2A9A46] text-[12px] font-medium">
              Submitted
            </Text>
          </View>
        );
      case 'In Progress':
        return (
          <View className="flex-row items-center bg-[#FFEDDE] px-3 py-1.5 rounded-[1000px] self-start">
            <Text className="text-[#F67300] text-[12px] font-medium">
              In Progress
            </Text>
          </View>
        );
      case 'Overdue':
        return (
          <View className="flex-row items-center bg-[#F1351B]/10 px-3 py-1.5 rounded-full self-start">
            <Text className="text-[#F1351B] text-[12px] font-medium">
              Overdue
            </Text>
          </View>
        );
    }
  };

  const [files, setFiles] = useState<UploadedFile[]>([]);
  const [notes, setNotes] = useState('');

  const isAnyFileUploading = files.some((f) => f.status === 'Uploading');
  const hasFiles = files.length > 0;

  const renderIcon = () => {
    if (status === 'Overdue') {
      return (
        <View className="w-[18px] h-[18px] rounded-[5px] bg-white border border-[#F3F5F7] items-center justify-center shadow-xs">
          <Danger size={12} color="#F1351B" variant="Linear" />
        </View>
      );
    }
    return (
      <View className="w-[18px] h-[18px] rounded-[5px] bg-white border border-[#F3F5F7] items-center justify-center shadow-xs">
        <CalendarRemove size={10} color="#9CA3AF" variant="Linear" />
      </View>
    );
  };

  return (
    <View className="flex-1 bg-[#FAFAFA]">
      <Header
        title="My Courses"
        onBackPress={onBack}
        showSearch={false}
        showNotification={false}
        titleAlign="center"
      />

      {/* Main Content */}
      <ScrollView className="flex-1 px-5 pt-4" contentContainerStyle={{ paddingBottom: 100 }}>
        <View className="bg-white border border-[#F2EEF4] p-5 rounded-[15px] mb-5 shadow-xs">
          {getStatusBadge()}
          {/* Assignment  */}
          <Text className="text-[20px] font-semibold text-[#333333] mt-3.5 mb-1">
            {title}
          </Text>
          <Text className="text-[12px] text-[#626262] mb-3">
            {courseCode} - {courseName}
          </Text>

          {/* Due Date Row */}
          <View className="flex-row items-center">
            {renderIcon()}
            <Text className={`text-[14px] ml-1.5 ${status === 'Overdue' ? 'text-[#F1351B]' : 'text-[#626262]'}`}>
              {status === 'Overdue' ? 'Missed' : 'Due'} {dateStr}
            </Text>
          </View>
        </View>

        {/* Submission Notes Card */}
        <View className="mb-5">
          <Text className="text-[20px] font-medium text-[#333333] mb-4">Submission Notes</Text>
          <View className="bg-white border border-[#F2EEF4] p-4 rounded-[15px]">
            <TextInput
              multiline
              numberOfLines={6}
              value={notes}
              onChangeText={setNotes}
              placeholder="Type Your Assignment Answers, Notes, Or Link To External Resources Here..."
              placeholderTextColor="#99A1AF"
              textAlignVertical="top"
              className="text-[14px] text-[#4D4D4D] min-h-[120px] leading-[20px] p-0"
            />
          </View>
        </View>

        {/* Submit Assignment Card */}
        <View className="mb-5">
          <Text className="text-[20px] font-medium text-[#333333] mb-4">Submit Assignment</Text>
          <UploadModal files={files} onFilesChange={setFiles} />
        </View>

        {/*  Submit Button */}
        <View>
          <TouchableOpacity
            disabled={isAnyFileUploading || !hasFiles}
            onPress={() => {
              onSuccess(files.map((f) => ({ name: f.name, size: f.size })), notes);
            }}
            className={`w-full py-3 rounded-xl items-center justify-center ${
              isAnyFileUploading || !hasFiles ? 'bg-[#F67300]/50' : 'bg-[#F67300]'
            }`}
          >
            <Text className="text-white text-[14px] font-medium">
              {isAnyFileUploading ? 'Uploading Files...' : 'Submit Assignment'}
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
}