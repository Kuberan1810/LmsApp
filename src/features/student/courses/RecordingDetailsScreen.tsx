import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Feather, Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { Document, ClipboardText } from 'iconsax-react-native';
import Header from '@/components/Student/Header';

export const RecordingDetailsScreen = () => {
  const router = useRouter();

  return (
    <SafeAreaView className="flex-1 bg-gray-50">
      <Header
        title='3.4 AI Agents (LangChain, CrewAI, AutoGen)'
        onBackPress={() => router.back()}
        showSearch={false}
        showNotification={false}
        showProfile={false}
        titleAlign="center"
      />

      <View className="flex-1 px-4 pt-2">

        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 40 }}>

          {/* Class Content */}
          <View className="bg-white rounded-[24px] p-5 border border-gray-200 mb-4">
            <Text className="text-[#333333] font-semibold text-[14px] mb-3">Class Content :</Text>
            <Text className="text-[#6B7280] font-normal text-[12px] leading-relaxed text-justify">
              AI Agents are systems that use LLMs to plan, act, and collaborate autonomously. LangChain builds tool-using agents for workflows and RAG. CrewAI enables role-based multi-agent teamwork. AutoGen focuses on conversation-driven agents that interact with each other and humans to solve complex tasks.
            </Text>
          </View>

          {/* Key Topic */}
          <View className="bg-white rounded-[24px] p-5 border border-gray-200 mb-4">
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

          {/* Resources Empty State */}
          <View className="bg-white rounded-[24px] p-5 border border-gray-200 mb-4 h-[160px]">
            <Text className="text-[#333333] font-semibold text-[14px] mb-2">Resources</Text>
            <View className="flex-1 items-center justify-center pb-2">
              <View className="w-14 h-14 rounded-full bg-orange-50 items-center justify-center mb-2">
                <Document size={24} color="#EA580C" variant="Linear" />
              </View>
              <Text className="text-[#333333] font-medium text-[11px]">No Resources</Text>
            </View>
          </View>

          {/* Assignments Empty State */}
          <View className="bg-white rounded-[24px] p-5 border border-gray-200 mb-6 h-[160px]">
            <Text className="text-[#333333] font-semibold text-[14px] mb-2">Assignments</Text>
            <View className="flex-1 items-center justify-center pb-2">
              <View className="w-14 h-14 rounded-full bg-orange-50 items-center justify-center mb-2">
                <ClipboardText size={24} color="#EA580C" variant="Linear" />
              </View>
              <Text className="text-[#333333] font-medium text-[11px]">No Assignment</Text>
            </View>
          </View>

        </ScrollView>
      </View>
    </SafeAreaView>
  );
};
