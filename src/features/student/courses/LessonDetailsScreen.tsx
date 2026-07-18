import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, Image } from 'react-native';
import { Image as ExpoImage } from 'expo-image';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Feather, MaterialCommunityIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { Export, Link, Import, ClipboardText } from 'iconsax-react-native';
import BtnCom from '../../../components/BtnCom';

export const LessonDetailsScreen = () => {
  const router = useRouter();

  return (
    <SafeAreaView className="flex-1 bg-gray-50">
      <View className="flex-1 px-4 pt-2">
        {/* Header */}
        <View className="flex-row items-center gap-2 mb-6 mt-2">
          <TouchableOpacity className="p-1" onPress={() => router.back()}>
            <Feather name="chevron-left" size={24} color="black" />
          </TouchableOpacity>
          <Text className="text-[14px] font-semibold text-[#333333]">
            3.4 AI Agents (LangChain, CrewAI, AutoGen)
          </Text>
        </View>

        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 40 }}>
          
          {/* Class Content */}
          <View className="bg-white rounded-[24px] p-5 mb-4 border border-gray-200">
            <Text className="text-[#333333] font-semibold text-[14px] mb-3">Class Content :</Text>
            <Text className="text-[#6B7280] font-normal text-[12px] leading-relaxed text-justify">
              AI Agents are systems that use LLMs to plan, act, and collaborate autonomously. LangChain builds tool-using agents for workflows and RAG. CrewAI enables role-based multi-agent teamwork. AutoGen focuses on conversation-driven agents that interact with each other and humans to solve complex tasks.
            </Text>
          </View>

          {/* Key Topic */}
          <View className="bg-white rounded-[24px] p-5 mb-4 border border-gray-200">
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
          <View className="bg-white rounded-[24px] p-5 mb-4 border border-gray-200">
            <Text className="text-[#333333] font-semibold text-[14px] mb-4">Resources</Text>
            
            <View
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
              className="flex-row justify-between items-center bg-white pl-1 py-1 pr-5 rounded-[15px] mb-3.5"
            >
              <View className="flex-row items-center flex-1 pr-2">
                <View
                  style={{ width: 76, height: 69 }}
                  className="rounded-[24px] bg-[#FEE2E2] justify-center items-center"
                >
                  <ExpoImage
                    source={require('../../../../assets/icon/pdfIcon.svg')}
                    style={{ width: 32, height: 32 }}
                    contentFit="contain"
                  />
                </View>
                <View className="ml-[10px] flex-1 justify-center">
                  <Text className="text-[15px] font-medium text-[#333333]" numberOfLines={1}>Project_Guidelines.pdf</Text>
                  <Text className="text-[12px] text-[#808080] mt-0.5">2.4MB</Text>
                </View>
              </View>
              <TouchableOpacity className="p-1">
                <Import size={18} color="#808080" variant="Linear" />
              </TouchableOpacity>
            </View>

            <View
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
              className="flex-row justify-between items-center bg-white pl-1 py-1 pr-5 rounded-[15px]"
            >
              <View className="flex-row items-center flex-1 pr-2">
                <View
                  style={{ width: 76, height: 69 }}
                  className="rounded-[24px] bg-blue-50 justify-center items-center"
                >
                  <Link size={24} color="#3B82F6" variant="Linear" />
                </View>
                <View className="ml-[10px] flex-1 justify-center">
                  <Text className="text-[15px] font-medium text-[#333333]" numberOfLines={1}>RAG Architecture Overview</Text>
                  <Text className="text-[12px] text-[#808080] mt-0.5">external-link.com</Text>
                </View>
              </View>
              <TouchableOpacity className="p-1">
                <Export size={18} color="#808080" variant="Linear" />
              </TouchableOpacity>
            </View>
          </View>

          {/* Recorded Classes */}
          <View className="mb-6">
            <Text className="text-[#333333] font-semibold text-[14px] mb-4 pl-1">Recorded Classes</Text>
            {[1, 2].map((item) => (
              <View key={item} className="bg-white border border-gray-200 rounded-[24px] p-5 mb-3">
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
          <View className="bg-white rounded-[24px] p-5 border border-gray-200">
            <View className="flex-row justify-between items-center mb-4">
              <Text className="text-[#333333] font-semibold text-[14px]">Assignments</Text>
              <BtnCom label="View All" onClick={() => router.push('/(student)/assignments/assignments' as any)} />
            </View>

            {[1, 2, 3].map((_, idx) => (
              <View key={idx} className="flex-row items-center border border-[#F3F4F6] rounded-2xl p-4 mb-3">
                <View className="w-[34px] h-[37px] rounded-[28px] bg-[#F67300] items-center justify-center mr-3">
                  <ClipboardText size={18} color="white" variant="Linear" />
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
