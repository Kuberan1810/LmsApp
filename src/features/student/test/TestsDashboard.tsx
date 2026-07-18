import Header from '@/components/Student/Header';
import { useTabBarScroll } from '@/context/TabBarVisibilityContext';
import { useRouter } from 'expo-router';
import { Calendar, Clock, DocumentText1, SearchNormal1, Setting4, TickCircle } from 'iconsax-react-native';
import React, { useState } from 'react';
import { ScrollView, Text, TextInput, TouchableOpacity, View } from 'react-native';
import Animated from 'react-native-reanimated';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function TestsDashboard() {
  const router = useRouter();
  const scrollHandler = useTabBarScroll();
  const [activeFilter, setActiveFilter] = useState('All Tests');

  const filters = ['All Tests', 'Available', 'Not Attended', 'Completed'];

  const MOCK_TESTS = [
    {
      id: '1',
      title: 'Mid-term Assessment: AI/ML',
      courseName: 'AM101 - AI / ML Frontier AI Engineer',
      desc: "A comprehensive test covering fundamental concepts of HTML and CSS, including structure, styling, and basic coding practices.",
      date: '2026-07-13',
      time: '03:10 PM - 04:05 PM',
      questions: 20,
      marks: '100 / 100 Marks',
      status: 'Available',
    },
    {
      id: '2',
      title: 'Module 1 Quiz: Vector Databases',
      courseName: 'SS102 - System Architecture',
      desc: "A comprehensive test covering fundamental concepts of HTML and CSS, including structure, styling.",
      date: '2026-07-15',
      time: '10:00 AM - 10:15 AM',
      questions: 10,
      marks: '12 / 12 Marks',
      status: 'Not Attended',
    },
    {
      id: '3',
      title: 'Module 1 Quiz: Vector Databases',
      courseName: 'SS102 - System Architecture',
      desc: "A comprehensive test covering fundamental concepts of HTML and CSS, including structure, styling.",
      date: '2026-07-15',
      time: '10:00 AM - 10:15 AM',
      questions: 10,
      marks: '12 / 12 Marks',
      status: 'Not Attended',
    },
    {
      id: '4',
      title: 'Module 1 Quiz: Vector Databases',
      courseName: 'SS102 - System Architecture',
      desc: "A comprehensive test covering fundamental concepts of HTML and CSS, including structure, styling.",
      date: '2026-07-15',
      time: '10:00 AM - 10:15 AM',
      questions: 10,
      marks: '12 / 12 Marks',
      status: 'Not Attended',
    },
    {
      id: '5',
      title: 'Module 1 Quiz: Vector Databases',
      courseName: 'SS102 - System Architecture',
      desc: "A comprehensive test covering fundamental concepts of HTML and CSS, including structure, styling.",
      date: '2026-07-15',
      time: '10:00 AM - 10:15 AM',
      questions: 10,
      marks: '12 / 12 Marks',
      status: 'Not Attended',
    },
    {
      id: '6',
      title: 'Module 1 Quiz: Vector Databases',
      courseName: 'SS102 - System Architecture',
      desc: "A comprehensive test covering fundamental concepts of HTML and CSS, including structure, styling.",
      date: '2026-07-15',
      time: '10:00 AM - 10:15 AM',
      questions: 10,
      marks: '12 / 12 Marks',
      status: 'Not Attended',
    },
    {
      id: '7',
      title: 'Module 1 Quiz: Vector Databases',
      courseName: 'SS102 - System Architecture',
      desc: "A comprehensive test covering fundamental concepts of HTML and CSS, including structure, styling.",
      date: '2026-07-15',
      time: '10:00 AM - 10:15 AM',
      questions: 10,
      marks: '12 / 12 Marks',
      status: 'Not Attended',
    },
    {
      id: '8',
      title: 'Module 1 Quiz: Vector Databases',
      courseName: 'SS102 - System Architecture',
      desc: "A comprehensive test covering fundamental concepts of HTML and CSS, including structure, styling.",
      date: '2026-07-15',
      time: '10:00 AM - 10:15 AM',
      questions: 10,
      marks: '12 / 12 Marks',
      status: 'Not Attended',
    },
    {
      id: '9',
      title: 'Module 1 Quiz: Vector Databases',
      courseName: 'SS102 - System Architecture',
      desc: "A comprehensive test covering fundamental concepts of HTML and CSS, including structure, styling.",
      date: '2026-07-15',
      time: '10:00 AM - 10:15 AM',
      questions: 10,
      marks: '12 / 12 Marks',
      status: 'Not Attended',
    },
    {
      id: '10',
      title: 'Module 1 Quiz: Vector Databases',
      courseName: 'SS102 - System Architecture',
      desc: "A comprehensive test covering fundamental concepts of HTML and CSS, including structure, styling.",
      date: '2026-07-15',
      time: '10:00 AM - 10:15 AM',
      questions: 10,
      marks: '12 / 12 Marks',
      status: 'Not Attended',
    },
  ];

  const IconBox = ({ children, text }: { children: React.ReactNode, text: string }) => (
    <View className="flex-row items-center w-[48%] mb-3">
      <View className="w-8 h-8 rounded-xl border border-[#E5E7EB] items-center justify-center mr-3 bg-white">
        {children}
      </View>
      <Text className="text-[13px] font-medium text-[#4B5563]">{text}</Text>
    </View>
  );

  return (
    <SafeAreaView className="flex-1 bg-[#FAFAFA]" edges={['top', 'left', 'right']}>
      <Header
        title='Available Tests'
      />
      <View className="px-5 pt-2">

        {/* Search Bar */}
        <View className="flex-row items-center bg-white border border-[#F2EEF4] rounded-[16px] px-4 py-1.5 mb-4 shadow-sm">
          <SearchNormal1 size={18} color="#A0A0AB" />
          <TextInput
            placeholder="Search tests, courses..."
            placeholderTextColor="#A0A0AB"
            className="flex-1 ml-3 font-medium text-[14px] text-[#1E1E2D]"
          />
          <TouchableOpacity>
            <Setting4 size={18} color="#A0A0AB" />
          </TouchableOpacity>
        </View>
      </View>

      {/* Filter Chips */}
      <View className="mb-6">
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ paddingHorizontal: 20 }}
          decelerationRate="fast"
        >
          {filters.map((filter) => (
            <TouchableOpacity
              key={filter}
              onPress={() => setActiveFilter(filter)}
              className={`mr-3 px-5 py-2.5 rounded-full border ${activeFilter === filter ? 'bg-[#1E1E2D] border-[#1E1E2D]' : 'bg-white border-[#F2EEF4]'}`}
            >
              <Text className={`text-[13px] font-medium ${activeFilter === filter ? 'text-white' : 'text-[#6B7280]'}`}>
                {filter}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      <Animated.ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 100, paddingHorizontal: 20 }}
        onScroll={scrollHandler}
        scrollEventThrottle={16}
      >
        {MOCK_TESTS.map((test) => (
          <TouchableOpacity
            key={test.id}
            onPress={() => router.push('/(student)/tests/test-intro')}
            className="bg-white border border-[#F2EEF4] rounded-[24px] p-5 mb-5 shadow-xs"
          >
            <View className="flex-row justify-between items-start mb-4">
              <View className="flex-1 ">

                <View className='flex-row justify-between items-start'>
                  <Text
                    className="flex-1 text-[12px] font-medium text-[#909090] mb-1 mr-2"
                    numberOfLines={1}
                  >
                    {test.courseName}
                  </Text>
                  <View className={`px-3 py-1 rounded-full ${test.status === 'Available' ? 'bg-[#2A9A46]/10' : 'bg-[#F67300]/10'}`}>
                    <Text className={`text-[12px] font-medium ${test.status === 'Available' ? 'text-[#2A9A46]' : 'text-[#F67300]'}`}>{test.status}</Text>
                  </View>
                </View>
                <Text className="text-[18px] font-semibold text-[#333333] leading-6">{test.title}</Text>
                {/* <Text className="text-[14px] text-[#808080] leading-5 mt-2 line-clamp-1">{test.desc}</Text> */}
              </View>

            </View>

            <View className="flex-row flex-wrap justify-between ">
              <IconBox text={test.date}>
                <Calendar size={16} color="#6B7280" variant="Linear" />
              </IconBox>
              <IconBox text={test.time}>
                <Clock size={16} color="#6B7280" variant="Linear" />
              </IconBox>
              <IconBox text={`${test.questions} Questions`}>
                <DocumentText1 size={16} color="#6B7280" variant="Linear" />
              </IconBox>
              <IconBox text={test.marks}>
                <TickCircle size={16} color="#6B7280" variant="Linear" />
              </IconBox>
            </View>

            {test.status === 'Available' && (
              <View className="mt-4 bg-[#EE8B3A] py-3 rounded-xl items-center">
                <Text className="text-white font-semibold text-[15px]">Start Test</Text>
              </View>
            )}
          </TouchableOpacity>
        ))}
      </Animated.ScrollView>
    </SafeAreaView>
  );
}
