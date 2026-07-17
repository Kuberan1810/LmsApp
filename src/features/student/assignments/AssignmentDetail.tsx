import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, TextInput } from 'react-native';
import { Ionicons, MaterialCommunityIcons, Feather } from '@expo/vector-icons';
import { Assignment } from './AssignmentCard';
import Header from './Header';

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
          <Ionicons name="warning-outline" size={14} color="#F1351B" />
        </View>
      );
    }
    return (
      <View className="w-[18px] h-[18px] rounded-[5px] bg-white border border-[#F3F5F7] items-center justify-center shadow-xs">
        <MaterialCommunityIcons name="calendar-remove-outline" size={14} color="#9CA3AF" />
      </View>
    );
  };

  return (
    <View className="flex-1 bg-[#FAFAFA]">
      <Header onBackPress={onBack} showSearchAndNotify />

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

        {/* Resources Card */}
        <View className="bg-white border border-[#F2EEF4] p-5 rounded-[15px] mb-5 shadow-xs">
          <Text className="text-[20px] font-medium text-[#333333] mb-4">Resources</Text>

          {/* Resources List */}
          {[
            {
              title: 'Project_Guidelines.pdf',
              subtitle: '2.4MB',
              iconBg: 'bg-[#FEE2E2]',
              icon: <MaterialCommunityIcons name="file-pdf-box" size={22} color="#EF4444" />,
              actionIcon: <Feather name="download" size={14} color="#808080" />,
            },
            {
              title: 'RAG Architecture Overview',
              subtitle: 'external-link.com',
              iconBg: 'bg-blue-50',
              icon: <Ionicons name="link-outline" size={20} color="#3B82F6" />,
              actionIcon: <Ionicons name="open-outline" size={14} color="#808080" />,
            }
          ].map((res, index, arr) => (
            <View
              key={index}
              className={`flex-row justify-between items-center bg-white border border-[#F3F5F7] p-3 rounded-xl ${index < arr.length - 1 ? 'mb-4' : ''
                }`}
            >
              <View className="flex-row items-center flex-1 pr-4">
                <View className={`w-[38px] h-[38px] ${res.iconBg} rounded-xl justify-center items-center`}>
                  {res.icon}
                </View>
                <View className="ml-3">
                  <Text className="text-[14px] font-medium text-[#4D4D4D]">{res.title}</Text>
                  <Text className="text-[12px] text-[#808080] mt-0.5">{res.subtitle}</Text>
                </View>
              </View>
              <TouchableOpacity className="p-2">
                {res.actionIcon}
              </TouchableOpacity>
            </View>
          ))}
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
              <Ionicons name="link-outline" size={20} color="#808080" />
            </TouchableOpacity>
            <TouchableOpacity className="p-1.5">
              <Ionicons name="happy-outline" size={20} color="#808080" />
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
