import { useTabBarScroll } from '@/context/TabBarVisibilityContext';
import { Calendar, Clock, DocumentText1, TickCircle } from 'iconsax-react-native';
import { useRouter } from 'expo-router';
import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import Animated from 'react-native-reanimated';
import { SafeAreaView } from 'react-native-safe-area-context';
import Header from '@/components/Student/Header';

export default function TestsDashboard() {
  const router = useRouter();
  const scrollHandler = useTabBarScroll();

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
    }
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
      <Header/>
      <Animated.ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 100, paddingHorizontal: 20, paddingTop: 10 }}
        onScroll={scrollHandler}
        scrollEventThrottle={16}
      >
        <Text className="text-[18px] font-semibold text-[#333] mb-5">Available Tests</Text>
        

        {MOCK_TESTS.map((test) => (
          <TouchableOpacity
            key={test.id}
            onPress={() => router.push('/(student)/tests/test-intro')}
            className="bg-white border border-[#F2EEF4] rounded-[24px] p-5 mb-5 shadow-xs"
          >
            <View className="flex-row justify-between items-start mb-4">
              <View className="flex-1 ">

               <View className='flex-row  justify-between'>
                 <Text className="text-[12px] font-medium text-[#909090] mb-1">{test.courseName}</Text>
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
