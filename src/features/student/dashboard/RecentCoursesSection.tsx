import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import React from 'react';
import EnrolledCoursesCard from './EnrolledCoursesCard';

import BtnCom from '../../../components/BtnCom';

const COURSES = [
  {
    id: '1',
    title: 'AM101 - AI / ML Frontier AI Engineer',
    duration: '3 Months',
    lessons: '05 Lessons',
    bgColor: '#DDF0EB', // Light mint green
  },
  {
    id: '2',
    title: 'SS102 - System and Software System Pro',
    duration: '2 Months',
    lessons: '12 Lessons',
    bgColor: '#E6DCF6', // Light purple
  },
];

export default function RecentCoursesSection() {
  return (
    <View className="mt-6">
      <View className="flex-row justify-between items-center px-5 mb-4">
        <Text className="text-[17px] font-semibold text-[#333333]">Recent enrolled courses</Text>
        <BtnCom label="View all" />
      </View>

      <ScrollView 
        horizontal 
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: 20 }}
      >
        {COURSES.map((course) => (
          <EnrolledCoursesCard 
            key={course.id}
            title={course.title}
            duration={course.duration}
            lessons={course.lessons}
            bgColor={course.bgColor}
          />
        ))}
      </ScrollView>
    </View>
  );
}
