import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import { ArrowLeft2 } from 'iconsax-react-native';
import { Edit2 } from 'lucide-react-native';
import { router, useLocalSearchParams } from 'expo-router';

export interface UploadModalHeaderProps {
  title?: string;
  onBackPress?: () => void;
  showSearch?: boolean;
  showNotification?: boolean;
  showProfile?: boolean;
  titleAlign?: 'left' | 'center';
  batch?: string;
  onBatchChange?: (text: string) => void;
  isEditable?: boolean;
  onTitleChange?: (text: string) => void;
  placeholder?: string;
}

export default function UploadModalHeader({
  title: propTitle,
  onBackPress,
  showSearch = false,
  showNotification = false,
  showProfile = false,
  titleAlign = 'left',
  batch: propBatch,
  onBatchChange,
  isEditable = true,
  onTitleChange,
  placeholder = 'Test name',
}: UploadModalHeaderProps = {}) {
  const params = useLocalSearchParams<{ title?: string; batch?: string }>();

  // Resolve initial effective title and batch: prefer prop if valid/non-empty, otherwise use router params, otherwise fallback
  const getInitialTitle = () => {
    if (propTitle && propTitle.trim() !== '') return propTitle;
    if (params.title && params.title.trim() !== '') return params.title;
    return 'Test name';
  };

  const getInitialBatch = () => {
    if (propBatch && propBatch.trim() !== '') return propBatch;
    if (params.batch && params.batch.trim() !== '') return params.batch;
    return 'Batch 02';
  };

  const [currentTitle, setCurrentTitle] = useState(getInitialTitle);
  const [currentBatch, setCurrentBatch] = useState(getInitialBatch);

  // Sync state whenever props or router params change
  useEffect(() => {
    setCurrentTitle(getInitialTitle());
  }, [propTitle, params.title]);

  useEffect(() => {
    setCurrentBatch(getInitialBatch());
  }, [propBatch, params.batch]);

  const handleBack = onBackPress || (() => router.back());

  const handleTitleChange = (text: string) => {
    setCurrentTitle(text);
    onTitleChange?.(text);
  };

  const handleBatchToggle = () => {
    const nextBatch = currentBatch === 'Batch-01' ? 'Batch-02' : currentBatch === 'Batch-02' || currentBatch === 'Batch 02' ? 'Batch-03' : 'Batch-01';
    setCurrentBatch(nextBatch);
    onBatchChange?.(nextBatch);
  };

  const isCentered = titleAlign === 'center';

  return (
    <View className="px-5 pt-12 pb-4 flex-row items-center justify-between bg-transparent relative">
      {/* Left side: Back Button */}
      <TouchableOpacity
        onPress={handleBack}
        className="w-10 h-10 rounded-full items-center justify-center bg-white border border-[#F2EEF4] z-20"
        activeOpacity={0.7}
      >
        <ArrowLeft2 size={20} color="#1E1E2D" variant="Linear" />
      </TouchableOpacity>

      {/* Title Section (Centered or Left-aligned based on titleAlign) */}
      <View
        className={`flex-row items-center z-10 ${
          isCentered
            ? 'flex-1 justify-center items-center px-2'
            : 'flex-1 justify-start items-center ml-3 pr-2'
        }`}
      >
        {isEditable ? (
          <TextInput
            value={currentTitle}
            onChangeText={handleTitleChange}
            placeholder={placeholder}
            placeholderTextColor="#9CA3AF"
            textAlign={isCentered ? 'center' : 'left'}
            className={`text-[20px] font-medium text-[#1E1E2D] p-0 mr-1.5 ${
              isCentered ? 'text-center' : 'text-left'
            }`}
          />
        ) : (
          <Text
            className={`text-[20px] font-medium text-[#1E1E2D] mr-1.5 ${
              isCentered ? 'text-center' : 'text-left'
            }`}
            numberOfLines={1}
          >
            {currentTitle}
          </Text>
        )}
        <Edit2 size={16} color="#9CA3AF" />
      </View>

      {/* Right side: Batch Badge */}
      {!!currentBatch ? (
        <TouchableOpacity
          onPress={handleBatchToggle}
          activeOpacity={0.8}
          className="bg-[#FFEDDE] px-3.5 py-1.5 rounded-full z-20"
        >
          <Text className="text-[#F67300] text-[12px] font-medium">{currentBatch}</Text>
        </TouchableOpacity>
      ) : (
        <View className="w-10 z-20" />
      )}
    </View>
  );
}
