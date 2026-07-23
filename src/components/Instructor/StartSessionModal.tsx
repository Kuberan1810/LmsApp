import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Modal, TextInput } from 'react-native';
import CustomDropdown from './CustomDropdown';
import * as Haptics from 'expo-haptics';
import { useHaptics } from '@/context/HapticsContext';

interface StartSessionModalProps {
  visible: boolean;
  onClose: () => void;
  onStart?: (data: { module: string; chapter: string; sessionTitle: string }) => void;
}

export default function StartSessionModal({ visible, onClose, onStart }: StartSessionModalProps) {
  const [selectedModule, setSelectedModule] = useState('');
  const [selectedChapter, setSelectedChapter] = useState('');
  const [sessionTitle, setSessionTitle] = useState('');
  const { hapticsEnabled } = useHaptics();

  const moduleOptions = [
    { label: 'Module 1: Foundations', value: 'module1' },
    { label: 'Module 2: Advanced Topics', value: 'module2' },
    { label: 'Module 3: Practical Applications', value: 'module3' },
  ];

  const chapterOptions = [
    { label: 'Chapter 1: Getting Started', value: 'chapter1' },
    { label: 'Chapter 2: Deep Dive', value: 'chapter2' },
    { label: 'Chapter 3: Final Wrap-up', value: 'chapter3' },
  ];

  const handleStart = () => {
    if (hapticsEnabled) {
      Haptics.selectionAsync();
    }
    onStart?.({ module: selectedModule, chapter: selectedChapter, sessionTitle });
    onClose();
  };

  const handleCancel = () => {
    if (hapticsEnabled) {
      Haptics.selectionAsync();
    }
    onClose();
  };

  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onClose}
    >
      <View className="flex-1 bg-black/50 items-center justify-center px-5">
        <View className="bg-white rounded-[28px] p-6 w-full max-w-[350px] shadow-2xl">
          {/* Title */}
          <Text className="text-[22px] font-bold text-[#1F2937] mb-6">Start Session</Text>

          {/* Module Field */}
          <View className="mb-5 z-20">
            <Text className="text-[14px] font-medium text-[#4B5563] mb-2">Module</Text>
            <CustomDropdown
              value={selectedModule}
              onChange={setSelectedModule}
              options={moduleOptions}
              placeholder="Select Module"
              className="h-12 rounded-[16px] border-[#E5E7EB] px-4"
            />
          </View>

          {/* Chapter Field */}
          <View className="mb-5 z-10">
            <Text className="text-[14px] font-medium text-[#4B5563] mb-2">Chapter</Text>
            <CustomDropdown
              value={selectedChapter}
              onChange={setSelectedChapter}
              options={chapterOptions}
              placeholder="Select Chapter"
              className="h-12 rounded-[16px] border-[#E5E7EB] px-4"
            />
          </View>

          {/* Session Title Field */}
          <View className="mb-8">
            <Text className="text-[14px] font-medium text-[#4B5563] mb-2">Session Title</Text>
            <TextInput
              value={sessionTitle}
              onChangeText={setSessionTitle}
              placeholder="e.g. Chapter-1"
              placeholderTextColor="#9CA3AF"
              className="bg-white border border-[#E5E7EB] rounded-[16px] h-12 px-4 text-[14px] text-[#1F2937]"
            />
          </View>

          {/* Action Buttons */}
          <View className="flex-row gap-3">
            <TouchableOpacity
              onPress={handleCancel}
              className="flex-1 h-12 rounded-[16px] border border-[#E5E7EB] items-center justify-center bg-white"
              activeOpacity={0.7}
            >
              <Text className="text-[#1F2937] text-[15px] font-semibold">Cancel</Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={handleStart}
              className="flex-1 h-12 rounded-[16px] bg-[#F89B48] items-center justify-center"
              activeOpacity={0.85}
            >
              <Text className="text-white text-[15px] font-semibold">Start</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
}
