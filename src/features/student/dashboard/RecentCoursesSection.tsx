import { View, Text, ScrollView } from 'react-native';
import React from 'react';
import EnrollCourseCard, { EnrollCourseType } from '../../../components/Student/EnrollCourseCard';
import BtnCom from '../../../components/BtnCom';

const COURSES: EnrollCourseType[] = [
  {
    code: 'AM101',
    name: 'AI / ML Frontier AI Engineer',
    duration: '3 Months',
    lessons: '05 Lessons',
    bgColor: 'bg-[#DDF0EB]',
    textColor: 'text-slate-800',
  },
  {
    code: 'SS102',
    name: 'System and Software System Pro',
    duration: '2 Months',
    lessons: '12 Lessons',
    bgColor: 'bg-[#E6DCF6]',
    textColor: 'text-slate-800',
  },
];

export default function RecentCoursesSection() {
  return (
    <View className="mt-6">
      <View className="flex-row justify-between items-center px-5 mb-4">
        <Text className="text-[20px] font-semibold text-[#333333]">Recent enrolled courses</Text>
        <BtnCom label="View all" />
      </View>

      <ScrollView 
        horizontal 
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: 20 }}
      >
        {COURSES.map((course, idx) => (
          <EnrollCourseCard 
            key={idx}
            course={course}
          />
        ))}
      </ScrollView>
    </View>
  );
}
