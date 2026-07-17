import { Feather, Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { Image, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { Image as ExpoImage } from 'expo-image';
import { SafeAreaView } from 'react-native-safe-area-context';
import BtnCom from '../../../components/BtnCom';

export const CourseDetailsScreen = () => {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState('Curriculum');
  const [expandedModule, setExpandedModule] = useState<number | null>(0);
  const [expandedFaq, setExpandedFaq] = useState<number | null>(0);

  return (
    <SafeAreaView className="flex-1 bg-gray-50">
      <View className="flex-1 px-4 pt-2">
        {/* Header */}
        <View className="flex-row items-center justify-between mb-6 mt-2">
          <View className="flex-row items-center gap-2">
            <TouchableOpacity className="p-1" onPress={() => router.canGoBack() ? router.back() : router.push('/(student)/courses/courses' as any)}>
              <Feather name="chevron-left" size={24} color="black" />
            </TouchableOpacity>
            <Text className="text-2xl font-semibold text-black">My Courses</Text>
          </View>
          <View className="flex-row items-center gap-[10px]">
            <TouchableOpacity className="w-[30px] h-[30px] rounded-lg border border-[#E5E5E5] bg-[#FAFAFA] items-center justify-center">
              <Feather name="search" size={14} color="black" />
            </TouchableOpacity>
            <TouchableOpacity className="w-[30px] h-[30px] rounded-lg border border-[#E5E5E5] bg-[#FAFAFA] items-center justify-center relative">
              <View className="absolute top-[6px] right-[8px] w-1.5 h-1.5 bg-orange-500 rounded-full z-10" />
              <Ionicons name="notifications-outline" size={14} color="black" />
            </TouchableOpacity>
            <TouchableOpacity 
              onPress={() => router.push('/(student)/profile/profile' as any)}
              className="w-[30px] h-[30px] rounded-lg overflow-hidden bg-orange-500"
            >
              <Image
                source={{ uri: 'https://i.pravatar.cc/150?img=11' }}
                className="w-full h-full"
                resizeMode="cover"
              />
            </TouchableOpacity>
          </View>
        </View>

        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 40 }}>
          {/* Main Top Card (Overview, Tabs, Alert, Modules) */}
          <View className="bg-white rounded-[24px] p-5 shadow-sm shadow-gray-200 mb-6">
            <Text className="text-[#333333] font-semibold text-[16px] mb-3">
              AM101- AI / ML Frontier AI Engineer
            </Text>
            <Text className="text-[#121212] font-normal text-[12px] leading-5 text-justify mb-7">
              The AI / ML Frontier AI Engineer course is designed to equip learners with the skills required to build, deploy, and scale real-world AI and machine learning solutions.
            </Text>
            <View className="flex-row items-center gap-3">
              <View className="w-10 h-10 rounded-full bg-[#F3F4F6] items-center justify-center">
                <Text className="text-[#333333] font-semibold text-[16px]">E</Text>
              </View>
              <View>
                <Text className="text-[#333333] font-semibold text-[14px]">Ed Donner</Text>
                <Text className="text-[#6B7280] font-medium text-[12px]">Lead AI Instructor</Text>
              </View>
            </View>
          </View>

          {/* Curriculum Section (Tabs, Alert, Modules) */}
          <View className="bg-white rounded-[24px] p-5 shadow-sm shadow-gray-200 mb-6">
            {/* Tabs */}
            <View className="flex-row items-center justify-between border-gray-100 mb-6">
              {['Curriculum', 'Resources', 'FAQs'].map((tab) => (
                <TouchableOpacity 
                  key={tab} 
                  onPress={() => setActiveTab(tab)}
                  className={`pb-3 border-b-2 ${activeTab === tab ? 'border-[#F67300]' : 'border-transparent'}`}
                >
                  <Text className={`text-[14px] font-normal leading-none ${activeTab === tab ? 'text-[#F67300]' : 'text-[#6B7280]'}`}>
                    {tab}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>

            {/* Conditional Content */}
            {activeTab === 'Curriculum' && (
              <>
                {/* Alert */}
                <View className="flex-row items-center bg-[#FFEDEF] rounded-[10px] p-[10px] gap-[10px] h-[34px] mb-6">
                  <Feather name="alert-triangle" size={14} color="#F1351B" />
                  <Text className="text-[#F1351B] font-medium text-[12px]">
                    You Missed the Live class on Jan 02, 05:30 PM
                  </Text>
                </View>

                {/* Course Modules */}
                <View>
                  <Text className="text-[#6B7280] font-semibold text-[14px] mb-4">Course Modules</Text>
                  
                  {[
                    'Module 3 : Frontier AI Systems & Deployment',
                    'Module 2 : Generative AI & LLM Engineering',
                    'Module 1 : AI & ML Foundations'
                  ].map((moduleName, idx) => {
                    const isExpanded = expandedModule === idx;
                    
                    return (
                      <TouchableOpacity 
                        key={idx} 
                        onPress={() => setExpandedModule(isExpanded ? null : idx)}
                        activeOpacity={0.8}
                        className={`mb-3 border rounded-xl overflow-hidden border-[#F2EEF4]`}
                      >
                        <View className={`px-4 h-[56px] flex-row items-center justify-between ${isExpanded ? 'bg-gray-50' : 'bg-[#F8FAFC]'}`}>
                          <Text className={`font-medium text-[13px] text-[#333333]`}>{moduleName}</Text>
                        </View>
                        
                        {isExpanded && (
                          <View className="bg-white px-4 py-4">
                            <Text className="text-[#6B7280] text-[12px] mb-4">3.5 AI safety & real-world use cases</Text>
                            <TouchableOpacity onPress={() => router.push('/courses/lesson/3-4' as any)}>
                              <Text className="text-[#333333] text-[12px] font-medium mb-4">3.4 AI Agents (LangChain, CrewAI, AutoGen)</Text>
                            </TouchableOpacity>
                            <Text className="text-[#333333] text-[12px] mb-4">3.3 Tool-using autonomous agents</Text>
                            <Text className="text-[#333333] text-[12px] mb-4">3.2 API & Web App integration (FastAPI/Flask)</Text>
                            <Text className="text-[#333333] text-[12px]">3.1 Model deployment & basics of MLOps</Text>
                          </View>
                        )}
                      </TouchableOpacity>
                    );
                  })}
                </View>
              </>
            )}

            {activeTab === 'Resources' && (
              <View>
                {[1, 2, 3, 4].map((item, idx) => (
                  <TouchableOpacity 
                    key={item} 
                    className={`flex-row items-center justify-between border border-[#F3F4F6] rounded-2xl p-3 ${idx < 3 ? 'mb-3' : ''}`}
                    activeOpacity={0.7}
                  >
                    <View className="flex-row items-center gap-3">
                      <View className="w-[56px] h-[49px] rounded-[24px] bg-[#FEE2E2] items-center justify-center">
                        <ExpoImage source={require('../../../../assets/images/pdficon.svg')} contentFit="contain" style={{ width: 22, height: 24 }} />
                      </View>
                      <View>
                        <Text className="text-[#333333] font-medium text-[13px] mb-1">Agent Architecture.pdf</Text>
                        <Text className="text-[#9CA3AF] font-normal text-[11px]">2.4MB</Text>
                      </View>
                    </View>
                    <Feather name="download" size={16} color="#9CA3AF" />
                  </TouchableOpacity>
                ))}
              </View>
            )}

            {activeTab === 'FAQs' && (
              <View>
                {[
                  {
                    q: 'What is this course about?',
                    a: 'This course focuses on building, deploying, and scaling real-world AI/ML and Generative AI systems. It covers the complete AI lifecycle—from fundamentals to production-ready applications.'
                  },
                  {
                    q: 'What tools and technologies are covered in this course?',
                    a: 'We cover Python, LangChain, CrewAI, AutoGen, vector databases, FastAPI, and more.'
                  },
                  {
                    q: 'What skills will I gain by the end of this course?',
                    a: 'You will be able to design, build, and deploy robust AI applications and autonomous agents.'
                  }
                ].map((faq, idx) => {
                  const isExpanded = expandedFaq === idx;
                  
                  return (
                    <TouchableOpacity 
                      key={idx} 
                      onPress={() => setExpandedFaq(isExpanded ? null : idx)}
                      activeOpacity={0.8}
                      className={`mb-3 border rounded-xl overflow-hidden ${isExpanded ? 'border-orange-200' : 'border-[#F1F5F9]'}`}
                    >
                      <View className={`px-4 py-4 flex-row items-center justify-between ${isExpanded ? 'bg-orange-50' : 'bg-[#F8FAFC]'}`}>
                        <Text className={`font-medium text-[13px] flex-1 pr-4 ${isExpanded ? 'text-[#F67300]' : 'text-[#333333]'}`}>
                          {faq.q}
                        </Text>
                        <Feather name={isExpanded ? 'chevron-up' : 'chevron-down'} size={20} color={isExpanded ? '#F67300' : '#333333'} />
                      </View>
                      
                      {isExpanded && (
                        <View className="bg-white px-4 py-4 border-t border-orange-100">
                          <Text className="text-[#6B7280] text-[12px] leading-relaxed">
                            {faq.a}
                          </Text>
                        </View>
                      )}
                    </TouchableOpacity>
                  );
                })}
              </View>
            )}
          </View>

          {/* Assignments */}
          <View className="bg-white rounded-[24px] p-5 shadow-sm shadow-gray-200 mb-6">
            <View className="flex-row justify-between items-center mb-4">
              <Text className="text-[#333333] font-semibold text-[16px]">Assignments</Text>
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
                  <Text className="text-[#9CA3AF] font-medium text-[12px]">
                    Due date : 2 Jan
                  </Text>
                </View>
                <View className="bg-green-100 px-3 py-1 rounded-full">
                  <Text className="text-green-500 font-medium text-[10px]">Completed</Text>
                </View>
              </View>
            ))}
          </View>

          {/* Course Info */}
          <View className="bg-[#F7F9FF] rounded-[24px] p-5 mb-6">
            <Text className="text-[#6B7280] font-semibold text-[14px] mb-4">Course Info</Text>

            <View className="flex-row items-center justify-between px-2">
              <View className="flex-row items-center gap-2">
                <Feather name="clock" size={16} color="#9CA3AF" />
                <Text className="text-[#333333] font-medium text-[13px]">12 weeks</Text>
              </View>

              <View className="flex-row items-center gap-2">
                <MaterialCommunityIcons name="clipboard-text-outline" size={16} color="#9CA3AF" />
                <Text className="text-[#333333] font-medium text-[13px]">1,240 Students</Text>
              </View>

              <View className="flex-row items-center gap-2">
                <Feather name="users" size={16} color="#9CA3AF" />
                <Text className="text-[#333333] font-medium text-[13px]">Active</Text>
              </View>
            </View>
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};
