import { Feather, Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { Image, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { Image as ExpoImage } from 'expo-image';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Import, ClipboardText } from 'iconsax-react-native';
import BtnCom from '../../../components/BtnCom';
import Header from '@/components/Student/Header';
import { COURSE_DATA } from '@/data/mockCourseData';

export const CourseDetailsScreen = () => {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState('Curriculum');
  const [expandedModule, setExpandedModule] = useState<number | null>(0);
  const [expandedFaq, setExpandedFaq] = useState<number | null>(0);

  return (
    <SafeAreaView className="flex-1 bg-gray-50">
      <Header
        title='My Courses'
        onBackPress={() => router.back()}
        showSearch={false}
        showNotification={false}
        titleAlign="center"
      />
      <View className="flex-1 px-4 pt-2">
        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 40 }}>
          {/* Main Top Card (Overview, Tabs, Alert, Modules) */}
          <View className="bg-white rounded-[24px] p-5 mb-6 border border-gray-200">
            <Text className="text-[#333333] font-semibold text-[16px] mb-3">
              {COURSE_DATA.title}
            </Text>
            <Text className="text-[#121212] font-normal text-[12px] leading-5 text-justify mb-7">
              {COURSE_DATA.description}
            </Text>
            <View className="flex-row items-center gap-3">
              <View className="w-10 h-10 rounded-full bg-[#F3F4F6] items-center justify-center">
                <Text className="text-[#333333] font-semibold text-[16px]">{COURSE_DATA.instructor.initials}</Text>
              </View>
              <View>
                <Text className="text-[#333333] font-semibold text-[14px]">{COURSE_DATA.instructor.name}</Text>
                <Text className="text-[#6B7280] font-medium text-[12px]">{COURSE_DATA.instructor.role}</Text>
              </View>
            </View>
          </View>

          {/* Curriculum Section (Tabs, Alert, Modules) */}
          <View className="bg-white rounded-[24px] p-5 mb-6 border border-gray-200">
            {/* Tabs */}
            <View className="flex-row items-center justify-between border-gray-100 mb-6">
              {['Curriculum', 'Resources', 'FAQs'].map((tab) => (
                <TouchableOpacity
                  key={tab}
                  onPress={() => setActiveTab(tab)}
                  className={`pb-3 border-b-2 ${activeTab === tab ? 'border-[#333333]' : 'border-transparent'}`}
                >
                  <Text className={`text-[14px] font-normal leading-none ${activeTab === tab ? 'text-[#333333]' : 'text-[#6B7280]'}`}>
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
                    {COURSE_DATA.missedClassAlert}
                  </Text>
                </View>

                {/* Course Modules */}
                <View>
                  <Text className="text-[#6B7280] font-semibold text-[14px] mb-4">Course Modules</Text>

                  {COURSE_DATA.modules.map((moduleItem, idx) => {
                    const isExpanded = expandedModule === idx;

                    return (
                      <TouchableOpacity
                        key={idx}
                        onPress={() => setExpandedModule(isExpanded ? null : idx)}
                        activeOpacity={0.8}
                        className={`mb-3 border rounded-xl overflow-hidden border-[#F2EEF4]`}
                      >
                        <View className={`px-4 h-[56px] flex-row items-center justify-between ${isExpanded ? 'bg-gray-50' : 'bg-[#F8FAFC]'}`}>
                          <Text className={`font-medium text-[13px] text-[#333333]`}>{moduleItem.title}</Text>
                        </View>

                        {isExpanded && moduleItem.lessons.length > 0 && (
                          <View className="bg-white px-4 py-4">
                            {moduleItem.lessons.map((lesson, lessonIdx) => {
                              if (lesson.link) {
                                return (
                                  <TouchableOpacity key={lessonIdx} onPress={() => router.push(lesson.link as any)}>
                                    <Text className="text-[#333333] text-[12px] font-medium mb-4">{lesson.title}</Text>
                                  </TouchableOpacity>
                                );
                              }
                              return (
                                <Text key={lessonIdx} className="text-[#333333] text-[12px] mb-4">{lesson.title}</Text>
                              );
                            })}
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
                {COURSE_DATA.resources.map((item, idx) => (
                  <TouchableOpacity
                    key={item.id}
                    activeOpacity={0.7}
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
                    className={`flex-row justify-between items-center bg-white pl-1 py-1 pr-5 rounded-[15px] ${idx < 3 ? 'mb-3.5' : ''}`}
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
                        <Text className="text-[15px] font-medium text-[#333333]" numberOfLines={1}>{item.title}</Text>
                        <Text className="text-[12px] text-[#808080] mt-0.5">{item.size}</Text>
                      </View>
                    </View>
                    <View className="p-1">
                      <Import size={18} color="#808080" variant="Linear" />
                    </View>
                  </TouchableOpacity>
                ))}
              </View>
            )}

            {activeTab === 'FAQs' && (
              <View>
                {COURSE_DATA.faqs.map((faq, idx) => {
                  const isExpanded = expandedFaq === idx;

                  return (
                    <TouchableOpacity
                      key={idx}
                      onPress={() => setExpandedFaq(isExpanded ? null : idx)}
                      activeOpacity={0.8}
                      className={`mb-3 border rounded-xl overflow-hidden border-[#F1F5F9]`}
                    >
                      <View className={`px-4 py-4 flex-row items-center justify-between bg-[#F8FAFC]`}>
                        <Text className="font-medium text-[13px] flex-1 pr-4 text-[#333333]">
                          {faq.q}
                        </Text>
                        <Feather name={isExpanded ? 'chevron-up' : 'chevron-down'} size={20} color="#333333" />
                      </View>

                      {isExpanded && (
                        <View className="bg-white px-4 py-4 border-t border-[#F1F5F9]">
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
          <View className="bg-white rounded-[24px] p-5 mb-6 border border-gray-200">
            <View className="flex-row justify-between items-center mb-4">
              <Text className="text-[#333333] font-semibold text-[16px]">Assignments</Text>
              <BtnCom label="View All" onClick={() => router.push('/(student)/assignments/assignments' as any)} />
            </View>

            {COURSE_DATA.assignments.map((assignment, idx) => (
              <View key={assignment.id} className="flex-row items-center border border-[#F3F4F6] rounded-2xl p-4 mb-3">
                <View className="w-[34px] h-[37px] rounded-[28px] bg-[#F67300] items-center justify-center mr-3">
                  <ClipboardText size={18} color="white" variant="Linear" />
                </View>
                <View className="flex-1">
                  <Text className="text-[#333333] font-medium text-[13px] mb-1">
                    {assignment.title}
                  </Text>
                  <Text className="text-[#9CA3AF] font-medium text-[12px]">
                    Due date : {assignment.dueDate}
                  </Text>
                </View>
                <View className="bg-green-100 px-3 py-1 rounded-full">
                  <Text className="text-green-500 font-medium text-[10px]">{assignment.status}</Text>
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
                <Text className="text-[#333333] font-medium text-[13px]">{COURSE_DATA.courseInfo.duration}</Text>
              </View>

              <View className="flex-row items-center gap-2">
                <MaterialCommunityIcons name="clipboard-text-outline" size={16} color="#9CA3AF" />
                <Text className="text-[#333333] font-medium text-[13px]">{COURSE_DATA.courseInfo.students}</Text>
              </View>

              <View className="flex-row items-center gap-2">
                <Feather name="users" size={16} color="#9CA3AF" />
                <Text className="text-[#333333] font-medium text-[13px]">{COURSE_DATA.courseInfo.status}</Text>
              </View>
            </View>
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};
