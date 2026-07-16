import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, Image } from 'react-native';
import { Image as ExpoImage } from 'expo-image';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Feather, MaterialCommunityIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import BtnCom from '../../../components/BtnCom';

export const LessonDetailsScreen = () => {
  const router = useRouter();

  return (
    <SafeAreaView className="flex-1 bg-gray-50">
      <View className="flex-1 px-4 pt-2">
        {/* Header */}
        <View className="flex-row items-center gap-2 mb-6 mt-2">
          <TouchableOpacity className="p-1" onPress={() => router.canGoBack() ? router.back() : router.push('/(student)/courses/courses' as any)}>
            <Feather name="chevron-left" size={24} color="black" />
          </TouchableOpacity>
          <Text className="text-[14px] font-semibold text-[#333333]">
            3.4 AI Agents (LangChain, CrewAI, AutoGen)
          </Text>
        </View>

        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 40 }}>
          
          {/* Class Content */}
          <View className="bg-white rounded-[24px] p-5 shadow-sm shadow-gray-200 mb-4">
            <Text className="text-[#333333] font-semibold text-[14px] mb-3">Class Content :</Text>
            <Text className="text-[#6B7280] font-normal text-[12px] leading-relaxed text-justify">
              AI Agents are systems that use LLMs to plan, act, and collaborate autonomously. LangChain builds tool-using agents for workflows and RAG. CrewAI enables role-based multi-agent teamwork. AutoGen focuses on conversation-driven agents that interact with each other and humans to solve complex tasks.
            </Text>
          </View>

          {/* Key Topic */}
          <View className="bg-white rounded-[24px] p-5 shadow-sm shadow-gray-200 mb-4">
            <Text className="text-[#333333] font-semibold text-[14px] mb-4">Key Topic :</Text>
            {[
              'Introduction to AI Agents',
              'Agent Architecture & Planning',
              'Tools, Memory & RAG',
              'Multi-Agent Collaboration'
            ].map((topic, idx) => (
              <View key={idx} className="flex-row items-center gap-3 mb-3">
                <View className="w-3 h-3 rounded-full border-[1.5px] border-[#EA580C] items-center justify-center">
                  <View className="w-1.5 h-1.5 rounded-full bg-[#EA580C]" />
                </View>
                <Text className="text-[#333333] font-normal text-[12px]">{topic}</Text>
              </View>
            ))}
          </View>

          {/* Resources */}
          <View className="bg-white rounded-[24px] p-5 shadow-sm shadow-gray-200 mb-4">
            <Text className="text-[#333333] font-semibold text-[14px] mb-4">Resources</Text>
            
            <View className="flex-row items-center justify-between border border-[#F3F4F6] rounded-2xl p-3 mb-3">
              <View className="flex-row items-center gap-3">
                <View className="w-[56px] h-[49px] rounded-[16px] bg-[#FEE2E2] items-center justify-center">
                  <ExpoImage source={require('../../../../assets/images/pdficon.svg')} contentFit="contain" style={{ width: 24, height: 29 }} />
                </View>
                <View>
                  <Text className="text-[#333333] font-medium text-[13px] mb-1">Project_Guidelines.pdf</Text>
                  <Text className="text-[#9CA3AF] font-normal text-[11px]">2.4MB</Text>
                </View>
              </View>
              <Feather name="download" size={16} color="#9CA3AF" />
            </View>

            <View className="flex-row items-center justify-between border border-[#F3F4F6] rounded-2xl p-3">
              <View className="flex-row items-center gap-3">
                <View className="w-[56px] h-[49px] rounded-[16px] bg-[#E0F2FE] items-center justify-center">
                  <Feather name="link-2" size={20} color="#0EA5E9" />
                </View>
                <View>
                  <Text className="text-[#333333] font-medium text-[13px] mb-1">RAG Architecture Overview</Text>
                  <Text className="text-[#9CA3AF] font-normal text-[11px]">external-link.com</Text>
                </View>
              </View>
              <Feather name="external-link" size={16} color="#9CA3AF" />
            </View>
          </View>

          {/* Recorded Classes */}
          <View className="mb-6">
            <Text className="text-[#333333] font-semibold text-[14px] mb-4 pl-1">Recorded Classes</Text>
            {[1, 2].map((item) => (
              <View key={item} className="bg-white border border-[#F3F4F6] rounded-[24px] p-5 mb-3 shadow-sm shadow-gray-100">
                <Text className="text-[#333333] font-semibold text-[14px] mb-1">
                  AI Agents (LangChain, CrewAI, AutoGen) I
                </Text>
                <Text className="text-[#9CA3AF] font-normal text-[11px] mb-4">
                  Instructor : ED Donner
                </Text>
                
                <View className="flex-row items-center gap-6 mb-5">
                  <View className="flex-row items-center gap-2">
                    <Feather name="calendar" size={14} color="#6B7280" />
                    <Text className="text-[#6B7280] text-[12px]">Jan23, 5:30 PM</Text>
                  </View>
                  <View className="flex-row items-center gap-2">
                    <Feather name="clock" size={14} color="#6B7280" />
                    <Text className="text-[#6B7280] text-[12px]">01h 20 mins</Text>
                  </View>
                </View>

                <TouchableOpacity 
                  className="border border-[#EA580C] rounded-lg py-2 px-4 self-start"
                  onPress={() => router.push('/courses/recording/1' as any)}
                >
                  <Text className="text-[#EA580C] font-medium text-[13px]">View Recording</Text>
                </TouchableOpacity>
              </View>
            ))}
          </View>

          {/* Assignments */}
          <View className="bg-white rounded-[24px] p-5 shadow-sm shadow-gray-200">
            <View className="flex-row justify-between items-center mb-4">
              <Text className="text-[#333333] font-semibold text-[14px]">Assignments</Text>
              <BtnCom label="View All" />
            </View>

            {[1, 2, 3].map((_, idx) => (
              <View key={idx} className="flex-row items-center border border-[#F3F4F6] rounded-2xl p-4 mb-3">
                <View className="w-[34px] h-[37px] rounded-[28px] bg-[#F67300] items-center justify-center mr-3">
                  <Feather name="clipboard" size={18} color="white" />
                </View>
                <View className="flex-1">
                  <Text className="text-[#333333] font-medium text-[13px] mb-1">
                    Build Q&A system using RAG
                  </Text>
                  <Text className="text-[#9CA3AF] font-normal text-[12px]">
                    Due date : 2 Jan
                  </Text>
                </View>
                <View className="bg-green-100 px-3 py-1 rounded-full">
                  <Text className="text-green-500 font-medium text-[10px]">Completed</Text>
                </View>
              </View>
            ))}
          </View>

        </ScrollView>
      </View>
    </SafeAreaView>
  );
};
