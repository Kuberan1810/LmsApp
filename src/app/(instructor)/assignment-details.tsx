import UploadModalHeader from '@/components/Instructor/UploadModalHeader';
import UploadModal from '@/components/uploadmodal';
import DateTimePicker from '@react-native-community/datetimepicker';
import * as DocumentPicker from 'expo-document-picker';
import { Stack, router } from 'expo-router';
import { Calendar2, Clock, Link1, TickCircle } from 'iconsax-react-native';
import { useState } from 'react';
import { Animated, Modal, ScrollView, Text, TextInput, TouchableOpacity, View } from 'react-native';

export default function AssignmentDetailsScreen() {
  type UploadFile = {
    id: string;
    name: string;
    size: string;
    progress: Animated.Value;
    status: 'uploading' | 'ready';
  };
  const [files, setFiles] = useState<UploadFile[]>([]);
  const [assignmentName, setAssignmentName] = useState('Assignment Name');
  const [description, setDescription] = useState('');
  const [objective, setObjective] = useState('');
  const [expectedOutcome, setExpectedOutcome] = useState('');
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  const [date, setDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showTimePicker, setShowTimePicker] = useState(false);

  const onChangeDate = (event: any, selectedDate?: Date) => {
    setShowDatePicker(false);
    if (selectedDate) setDate(selectedDate);
  };

  const onChangeTime = (event: any, selectedDate?: Date) => {
    setShowTimePicker(false);
    if (selectedDate) setDate(selectedDate);
  };

  const formattedDate = date.toLocaleDateString('en-GB', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric'
  });

  const formattedTime = date.toLocaleTimeString('en-US', {
    hour: 'numeric',
    minute: '2-digit',
    hour12: true
  });

  return (
    <View className="flex-1 bg-[#F9FAFB]">
      <Stack.Screen options={{ headerShown: false }} />

      {/* Header */}
      <UploadModalHeader
        title=""
        onBackPress={() => router.back()}
        showSearch={false}
        showNotification={false}
        showProfile={false}
        titleAlign="left"
      />

      <ScrollView className="flex-1 px-5" showsVerticalScrollIndicator={false}>

        {/* Date & Time Row */}
        <View className="flex-row justify-between mb-8 mt-2">
          {/* Due Date */}
          <TouchableOpacity
            onPress={() => setShowDatePicker(true)}
            className="bg-white rounded-2xl p-4 flex-1 mr-3 flex-row items-center justify-between"
          >
            <View>
              <Text className="text-sm font-medium text-[#4B5563] mb-1">Due date</Text>
              <Text className="text-[#9CA3AF] text-sm">{formattedDate}</Text>
            </View>
            <Calendar2 size={20} color="#9CA3AF" variant="Linear" />
          </TouchableOpacity>

          {/* Due Time */}
          <TouchableOpacity
            onPress={() => setShowTimePicker(true)}
            className="bg-white rounded-2xl p-4 flex-1 ml-3 flex-row items-center justify-between"
          >
            <View>
              <Text className="text-sm font-medium text-[#4B5563] mb-1">Due Time(IST)</Text>
              <Text className="text-[#9CA3AF] text-sm">{formattedTime}</Text>
            </View>
            <Clock size={20} color="#9CA3AF" variant="Linear" />
          </TouchableOpacity>
        </View>

        {showDatePicker && (
          <DateTimePicker
            value={date}
            mode="date"
            display="default"
            onChange={onChangeDate}
          />
        )}

        {showTimePicker && (
          <DateTimePicker
            value={date}
            mode="time"
            display="default"
            onChange={onChangeTime}
          />
        )}

        {/* Description Card */}
        <View className="bg-white rounded-[24px] p-5 mb-5">
          <Text className="text-[18px] text-[#1F2937] mb-4">Description:</Text>
          <View className="border border-[#E5E7EB] rounded-2xl p-4 min-h-[120px]">
            <TextInput
              multiline
              textAlignVertical="top"
              placeholder="Enter description here..."
              placeholderTextColor="#9CA3AF"
              className="text-[#4B5563] text-[14px] leading-5 flex-1"
              value={description}
              onChangeText={setDescription}
            />
          </View>
        </View>

        {/* Objective Card */}
        <View className="bg-white rounded-[24px] p-5 mb-5">
          <Text className="text-[18px] text-[#1F2937] mb-4">Objective:</Text>
          <View className="border border-[#E5E7EB] rounded-2xl p-4 min-h-[120px]">
            <TextInput
              multiline
              textAlignVertical="top"
              placeholder="Enter objective here..."
              placeholderTextColor="#9CA3AF"
              className="text-[#4B5563] text-[14px] leading-5 flex-1"
              value={objective}
              onChangeText={setObjective}
            />
          </View>
        </View>

        {/* Expected Outcome Card */}
        <View className="bg-white rounded-[24px] p-5 mb-8">
          <Text className="text-[18px] text-[#1F2937] mb-4">Expected Outcome:</Text>
          <View className="border border-[#E5E7EB] rounded-2xl p-4 min-h-[120px]">
            <TextInput
              multiline
              textAlignVertical="top"
              placeholder="Enter expected outcome here..."
              placeholderTextColor="#9CA3AF"
              className="text-[#4B5563] text-[14px] leading-5 flex-1"
              value={expectedOutcome}
              onChangeText={setExpectedOutcome}
            />
          </View>
        </View>

        {/* Resources Card */}
        <View className="bg-white rounded-[24px] p-5 mb-5">
          <Text className="text-[18px] text-[#1F2937] mb-4">Resources</Text>
          <UploadModal files={files as any} onFilesChange={(newFiles) => setFiles(newFiles as any)} />
        </View>

        {/* Add Comment Card */}
        <View className="bg-white rounded-[24px] p-5 mb-8">
          <Text className="text-[18px] text-[#1F2937] mb-4">Add Comment:</Text>
          <View className="border border-[#E5E7EB] rounded-2xl p-4 flex-row items-start min-h-[100px]">
            <TextInput
              multiline
              textAlignVertical="top"
              placeholder="Add Comments..."
              placeholderTextColor="#9CA3AF"
              className="text-[#4B5563] text-[14px] leading-5 flex-1 mr-2"
            />
            <View className="flex-row mt-1">
              <TouchableOpacity className="mr-3">
                <Link1 size={20} color="#9CA3AF" variant="Linear" />
              </TouchableOpacity>
            </View>
          </View>
        </View>

        {/* Footer */}
        <View className="flex-row items-center justify-end mb-10">
          <TouchableOpacity
            className="bg-[#F67300] py-3.5 px-8 rounded-xl items-center justify-center"
            onPress={() => setShowSuccessModal(true)}
          >
            <Text className="text-white font-semibold text-sm">Save & Upload</Text>
          </TouchableOpacity>
        </View>

      </ScrollView>

      {/* Success Modal */}
      <Modal
        visible={showSuccessModal}
        transparent
        animationType="fade"
      >
        <View className="flex-1 items-center justify-center px-10" style={{ backgroundColor: 'rgba(0, 0, 0, 0.4)' }}>
          <View className="bg-white rounded-[32px] p-8 w-full items-center">
            <View className="w-14 h-14 bg-[#22C55E] rounded-full items-center justify-center mb-6">
              <TickCircle size={32} color="#FFFFFF" variant="Linear" />
            </View>
            <Text className="text-[20px] font-medium text-[#374151] mb-8 text-center">
              Assignment Created !
            </Text>
            <TouchableOpacity
              className="bg-[#F67300] w-[140px] py-3.5 rounded-xl items-center justify-center"
              onPress={() => {
                setShowSuccessModal(false);
                router.back();
              }}
            >
              <Text className="text-white font-medium text-base">Done</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
}
