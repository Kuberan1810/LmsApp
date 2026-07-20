import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, TextInput } from 'react-native';
import { Image as ExpoImage } from 'expo-image';
import { Danger, CalendarRemove, Link, EmojiHappy, DocumentDownload, Export, DocumentUpload, LinkSquare, Maximize } from 'iconsax-react-native';
import { Assignment } from './AssignmentCard';
import Header from '../../../components/Student/Header';
import { router } from 'expo-router';

const getFileIconSource = (fileName: string) => {
  const ext = fileName.split('.').pop()?.toLowerCase();
  switch (ext) {
    case 'pdf':
      return require('../../../../assets/icon/pdfIcon.svg');
    case 'doc':
      return require('../../../../assets/icon/docIcon.svg');
    case 'docx':
      return require('../../../../assets/icon/word.svg');
    case 'xls':
    case 'xlsx':
      return require('../../../../assets/icon/xl.svg');
    case 'png':
    case 'jpg':
    case 'jpeg':
      return require('../../../../assets/icon/imgIcon.svg');
    default:
      return require('../../../../assets/icon/file.svg');
  }
};

interface AssignmentDetailProps {
  assignment: Assignment;
  onBack: () => void;
  onSubmit: () => void;
}

export default function AssignmentDetail({ assignment, onBack, onSubmit }: AssignmentDetailProps) {
  const { title, courseCode, courseName, description, status, dateStr } = assignment;
  const [comment, setComment] = useState('');

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
          <View className="flex-row items-center bg-[#FFEDDE] px-3 py-1.5 rounded-full self-start">
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

  const renderIcon = () => {
    if (status === 'Overdue') {
      return (
        <View className="w-[18px] h-[18px] rounded-[5px] bg-white border border-[#F3F5F7] items-center justify-center shadow-xs">
          <Danger size={14} color="#F1351B" variant="Linear" />
        </View>
      );
    }
    return (
      <View className="w-[18px] h-[18px] rounded-[5px] bg-white border border-[#F3F5F7] items-center justify-center shadow-xs">
        <CalendarRemove size={14} color="#9CA3AF" variant="Linear" />
      </View>
    );
  };

  return (
    <View className="flex-1 bg-[#FAFAFA]">
      <Header
        title='My Courses'
        onBackPress={onBack}
        showSearch={false}
        showNotification={false}
        titleAlign="center"
      />
      {/* Main Content */}
      <ScrollView className="flex-1 px-5 pt-4" contentContainerStyle={{ paddingBottom: 100 }}>
        <View className="bg-white rounded-2xl p-6 mb-5 border border-[#F2EEF4] shadow-xs">
          {getStatusBadge()}

          <Text className="text-[20px] font-semibold text-[#333333] mt-4 mb-1">
            {title}
          </Text>

          {/* <Text className="text-[12px] text-[#626262] mb-3">
            {courseCode} - {courseName}
          </Text> */}

          {/* Due date row */}
          <View className="flex-row items-center mb-4">
            {renderIcon()}
            <Text className={`text-[14px] ml-1.5 ${status === 'Overdue' ? 'text-[#F1351B]' : 'text-[#626262]'}`}>
              {status === 'Overdue' ? 'Missed' : 'Due'} {dateStr}
            </Text>
          </View>

          {/* Details Sections */}
          {[
            {
              title: 'Description',
              content: 'Build a Question Answering (Q&A) system using Retrieval-Augmented Generation (RAG). In this assignment, you will combine a language model with external knowledge sources to generate more accurate and context-aware answers instead of relying only on the model’s memory.',
            },
            {
              title: 'Objective',
              content: 'Design and implement a basic retrieval pipeline that searches relevant information, passes it as context to the language model, and produces meaningful responses.',
            },
            {
              title: 'Expected Outcome',
              content: 'A working RAG-based Q&A system that can answer questions accurately using provided data, demonstrating the practical application of AI in learning platforms.',
            }
          ].map((sec, index) => (
            <React.Fragment key={index}>
              <Text className="text-[18px] font-medium text-[#333333] mb-2">{sec.title}:</Text>
              <Text className="text-[13px] text-[#4D4D4D] leading-relaxed mb-5 textAlign-justify">
                {sec.content}
              </Text>
            </React.Fragment>
          ))}
        </View>

        {/* Resources Card Wrapper */}
        <View className="bg-white border border-[#F2EEF4] p-4 rounded-[10px] mb-5">
          <Text className="text-[20px] font-medium text-[#333333] mb-4">Resources</Text>

          {/* Resources List */}
          {[
            {
              title: 'Project_Guidelines.pdf',
              subtitle: '2.4MB',
              iconBg: 'bg-[#FEE2E2]',
              actionIcon: <DocumentUpload size={18} color="#808080" variant="Linear" />,
            },
            {
              title: 'RAG Architecture Overview',
              subtitle: 'external-link.com',
              iconBg: 'bg-blue-50',
              actionIcon: <Maximize size={18} color="#808080" variant="Linear" />,
            }
          ].map((res, index, arr) => {
            const ext = res.title.split('.').pop()?.toLowerCase();
            const isFile = ['pdf', 'doc', 'docx', 'xls', 'xlsx'].includes(ext || '');

            return (
              <View
                key={index}
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
                      className={`rounded-[24px] ${res.iconBg} justify-center items-center`}
                    >
                      <ExpoImage
                        source={getFileIconSource(res.title)}
                        style={{ width: 32, height: 32 }}
                        contentFit="contain"
                      />
                    </View>
                  ) : (
                    <View
                      style={{ width: 76, height: 69 }}
                      className={`rounded-[24px] ${res.iconBg} justify-center items-center`}
                    >
                      <Link size={24} color="#3B82F6" variant="Linear" />
                    </View>
                  )}
                  <View className="ml-[10px] flex-1 justify-center">
                    <Text className="text-[15px] font-medium text-[#333333]" numberOfLines={1}>
                      {res.title}
                    </Text>
                    <Text className="text-[12px] text-[#808080] mt-0.5">{res.subtitle}</Text>
                  </View>
                </View>
                <TouchableOpacity className="p-1">
                  {res.actionIcon}
                </TouchableOpacity>
              </View>
            );
          })}
        </View>

        {/* Add Comment Card */}
        <View className="bg-white border border-[#F2EEF4] p-7 rounded-[15px] mb-5 shadow-xs">
          <Text className="text-[18px] font-medium text-[#333333] mb-5">Add Comment:</Text>

          {/* Comment Input Field */}
          <View className="flex-row items-center bg-white border border-[#DEDEDE] rounded-[18px] px-4 pt-1 pb-12">
            <TextInput
              value={comment}
              onChangeText={setComment}
              placeholder="Add Comments..."
              placeholderTextColor="#808080"
              className="flex-1 text-[14px] text-[#4D4D4D] py-2"
            />
            <TouchableOpacity className="p-1.5 mr-1">
              <Link size={20} color="#808080" variant="Linear" />
            </TouchableOpacity>
            <TouchableOpacity className="p-1.5">
              <EmojiHappy size={20} color="#808080" variant="Linear" />
            </TouchableOpacity>
          </View>
        </View>

        <View className="px-1 pt-4">
          {status !== 'Submitted' ? (
            <TouchableOpacity
              onPress={onSubmit}
              className="w-full bg-[#F67300] py-3 rounded-xl items-center"
            >
              <Text className="text-white text-[14px] font-medium">Submit Assignment</Text>
            </TouchableOpacity>
          ) : (
            <View className="w-full bg-[#F2F2F2] py-3 rounded-xl items-center">
              <Text className="text-[#8C8C8C] text-[14px] font-medium">Assignment Submitted</Text>
            </View>
          )}
        </View>
      </ScrollView>

    </View>

  );
}