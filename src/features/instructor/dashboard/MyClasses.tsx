import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import React from 'react';
import { Ionicons } from '@expo/vector-icons';

const COURSES = [
  {
    id: '1',
    title: 'AM101 - AI / ML Frontier AI Engineer',
    batch: 'Batch-01',
    studentsCount: '32 Students',
    modulesCount: '3 Modules Completed',
    progress: 35,
    bgColor: 'bg-[#D2E4E2]',
  },
  {
    id: '2',
    title: 'SS102 - System Architecture',
    batch: 'Batch-02',
    studentsCount: '24 Students',
    modulesCount: '5 Modules Completed',
    progress: 60,
    bgColor: 'bg-[#D8CAE8]',
  },
];

export default function MyClasses() {
  return (
    <View className="mt-2 bg-white rounded-2xl py-4 mb-4 px-1 border border-[#F2EEF4] mx-4">
      <View className="mb-3.5">
        <Text className="text-[20px] font-medium text-[#333333]">My Classes</Text>
      </View>

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: 0 }}
      >
        {COURSES.map((course) => (
          <TouchableOpacity
            key={course.id}
            activeOpacity={0.7}
            className={`${course.bgColor} rounded-[10px] p-5 mr-4 max-w-full h-[135px] justify-between border shadow-sm relative overflow-hidden`}
            style={{ borderColor: '#ffffff', borderWidth: 1 }}
          >
            {/* Background icons */}
            <Ionicons
              name="sparkles-outline"
              size={38}
              color="#FFFFFF"
              style={{ position: 'absolute', right: 50, top: 0, opacity: 0.40 }}
            />
            <Ionicons
              name="sparkles-outline"
              size={20}
              color="#FFFFFF"
              style={{ position: 'absolute', right: 8, top: 36, opacity: 0.40 }}
            />
            <Ionicons
              name="book"
              size={50}
              color="#FFFFFF"
              style={{ position: 'absolute', right: 10, top: 70, opacity: 0.40, transform: [{ rotate: '-30deg' }] }}
            />
            <Ionicons
              name="sparkles-outline"
              size={30}
              color="#FFFFFF"
              style={{ position: 'absolute', right: 90, bottom: 8, opacity: 0.40 }}
            />

            {/* Course Title */}
            <Text className="text-[14px] font-semibold text-[#333333] leading-snug pr-8" numberOfLines={2}>
              {course.title}
            </Text>

            <Text className="text-[10px] font-medium text-[#333333] leading-snug pr-8" numberOfLines={2}>
              {course.batch}
            </Text>

            <View className="flex-row items-center mt-1">
              {/* Students Count */}
              <View className="flex-row items-center mr-4">
                <View className="w-[18px] h-[18px] rounded-[5px] bg-white border border-[#F3F5F7] items-center justify-center shadow-xs">
                  <Ionicons name="people-outline" size={10} color="#626262" />
                </View>
                <Text className="text-[12px] font-medium text-[#8C8E90] ml-1.5">
                  {course.studentsCount}
                </Text>
              </View>

              {/* Modules Count */}
              <View className="flex-row items-center">
                <View className="w-[18px] h-[18px] rounded-[5px] bg-white border border-[#F3F5F7] items-center justify-center shadow-xs">
                  <Ionicons name="document-text-outline" size={10} color="#626262" />
                </View>
                <Text className="text-[12px] font-medium text-[#8C8E90] ml-1.5">
                  {course.modulesCount}
                </Text>
              </View>
            </View>

            {/* Progress Bar*/}
            <View className="flex-row items-center justify-between mt-2">
              <View className="flex-1 h-1.5 bg-white rounded-full mr-3 overflow-hidden">
                <View
                  className="h-full bg-[#EE8B3A] rounded-full"
                  style={{ width: `${course.progress}%` }}
                />
              </View>
              <View className="bg-white px-1.5 py-0.5 rounded-full border border-[#E5E5E5]">
                <Text className="text-[9px] font-bold text-gray-700">{course.progress}%</Text>
              </View>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
}
