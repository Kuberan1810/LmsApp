import React from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Header from '@/components/Student/Header';
import { useRouter } from 'expo-router';
import { Image } from 'expo-image';
import { Edit2, Book1, Book } from 'iconsax-react-native';

export default function MyProfile() {
    const router = useRouter();

    return (
        <SafeAreaView className="flex-1 bg-white" edges={['top', 'left', 'right']}>
            <Header
                title="Profile"
                onBackPress={() => router.back()}
                showProfile={false}
                showSearch={false}
                titleAlign="center"
            />
            <ScrollView className="flex-1 px-5" showsVerticalScrollIndicator={false}>
                {/* Profile Info */}
                <View className="items-center mt-6">
                    <View className="relative">
                        <Image 
                            source={{ uri: 'https://i.pravatar.cc/150?img=11' }} 
                            style={{ width: 110, height: 110, borderRadius: 55 }} 
                            contentFit="cover" 
                        />
                        <TouchableOpacity 
                            style={{ position: 'absolute', bottom: -10, left: '50%', marginLeft: -18 }}
                            className="w-9 h-9 bg-[#5B4CFF] rounded-full items-center justify-center border-[3px] border-white"
                        >
                            <Edit2 size={16} color="#FFF" variant="Bold" />
                        </TouchableOpacity>
                    </View>
                    <Text className="text-[24px] font-bold text-[#1F2937] mt-4">Shane</Text>
                    <Text className="text-[15px] text-[#6B7280] mt-1 mb-8">shane.sine@gmail.com</Text>
                </View>

                {/* Stats Row */}
                <View className="flex-row justify-between mb-8 px-1 mt-2">
                    {/* Stat Card 1 */}
                    <View className="bg-[#BCEAA9] rounded-[24px] p-4 flex-1 mx-1 justify-center shadow-sm">
                        <Text className="text-[#374151] text-[12px] font-medium mb-1">Attendance</Text>
                        <Text className="text-[#111827] text-[18px] font-bold">85<Text className="text-[12px] font-medium"> %</Text></Text>
                    </View>
                    {/* Stat Card 2 */}
                    <View className="bg-[#B9E6F6] rounded-[24px] p-4 flex-1 mx-1 justify-center shadow-sm">
                        <Text className="text-[#374151] text-[12px] font-medium mb-1">Completed</Text>
                        <Text className="text-[#111827] text-[18px] font-bold">12</Text>
                    </View>
                    {/* Stat Card 3 */}
                    <View className="bg-[#F4CF74] rounded-[24px] p-4 flex-1 mx-1 justify-center shadow-sm">
                        <Text className="text-[#374151] text-[12px] font-medium mb-1">Enrolled</Text>
                        <Text className="text-[#111827] text-[18px] font-bold">4</Text>
                    </View>
                </View>

                {/* Courses Section */}
                <View className="mb-10">
                    <Text className="text-[18px] font-bold text-[#1F2937] mb-4">My Courses</Text>
                    
                    {/* Course Item */}
                    <View className="flex-row items-center p-4 bg-[#FAFAFA] border border-[#F3F4F6] rounded-2xl mb-3">
                        <View className="w-12 h-12 bg-[#F67300]/10 rounded-xl items-center justify-center mr-4">
                            <Text className="text-[20px]">🎨</Text>
                        </View>
                        <View className="flex-1">
                            <Text className="text-[16px] font-semibold text-[#1F2937] mb-1">UI/UX Design</Text>
                            <Text className="text-[13px] text-[#6B7280]">Advanced Level • 2 Months left</Text>
                        </View>
                        <View className="items-end">
                            <View className="bg-[#D1F4D9] px-3 py-1 rounded-full">
                                <Text className="text-[11px] font-bold text-[#059669]">Active</Text>
                            </View>
                        </View>
                    </View>

                    {/* Course Item */}
                    <View className="flex-row items-center p-4 bg-[#FAFAFA] border border-[#F3F4F6] rounded-2xl mb-3">
                        <View className="w-12 h-12 bg-[#F67300]/10 rounded-xl items-center justify-center mr-4">
                            <Text className="text-[20px]">💻</Text>
                        </View>
                        <View className="flex-1">
                            <Text className="text-[16px] font-semibold text-[#1F2937] mb-1">Web Development</Text>
                            <Text className="text-[13px] text-[#6B7280]">Beginner Level • Just Started</Text>
                        </View>
                        <View className="items-end">
                            <View className="bg-[#D1F4D9] px-3 py-1 rounded-full">
                                <Text className="text-[11px] font-bold text-[#059669]">Active</Text>
                            </View>
                        </View>
                    </View>

                </View>

            </ScrollView>
        </SafeAreaView>
    );
}