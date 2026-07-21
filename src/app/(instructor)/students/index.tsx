import React from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import InstructorHeader from '@/components/Instructor/header';
import { FilterSearch } from 'iconsax-react-native';
import { MoreVertical } from 'lucide-react-native';

const MOCK_STUDENTS = [
    { name: 'Aarav', id: 'BT011', attendance: '85%', lastScore: '91%' },
    { name: 'Priya', id: 'BT012', attendance: '92%', lastScore: '88%' },
    { name: 'Rohan', id: 'BT013', attendance: '78%', lastScore: '95%' },
    { name: 'Meera', id: 'BT014', attendance: '96%', lastScore: '92%' },
    { name: 'Arjun', id: 'BT015', attendance: '88%', lastScore: '84%' },
];

export default function StudentListScreen() {
    const router = useRouter();

    return (
        <SafeAreaView className="flex-1 bg-[#FAFAFA]" edges={['top', 'left', 'right']}>
            <InstructorHeader title="Student List" onBackPress={() => router.back()} />

            <View className="px-5 pt-3 pb-3 flex-row justify-between items-center">
                <Text className="text-[14px] text-[#8C8E90] font-medium">Showing {MOCK_STUDENTS.length} Students</Text>
                <TouchableOpacity className="flex-row items-center">
                    <FilterSearch size={16} color="#F67300" variant="Outline" />
                    <Text className="text-[#F67300] font-medium text-[13px] ml-1.5">Filter</Text>
                </TouchableOpacity>
            </View>

            <ScrollView 
                className="flex-1 px-5" 
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{ paddingBottom: 40 }}
            >
                {MOCK_STUDENTS.map((student, index) => (
                    <TouchableOpacity 
                        key={index} 
                        onPress={() => router.push(`/(instructor)/students/${student.id}`)}
                        activeOpacity={0.7}
                        className="bg-white rounded-[24px] p-5 mb-4 flex-row items-start shadow-sm shadow-black/5 border border-[#F2EEF4]"
                    >
                        {/* Avatar */}
                        <View className="w-14 h-14 rounded-full bg-[#FFF5ED] items-center justify-center mr-4">
                            <Text className="text-[#F67300] text-[24px] font-bold">
                                {student.name.charAt(0)}
                            </Text>
                        </View>

                        {/* Details */}
                        <View className="flex-1">
                            <View className="flex-row justify-between items-center">
                                <Text className="text-[18px] font-semibold text-[#1E1E2D]">{student.name}</Text>
                                <TouchableOpacity className="p-1 -mr-2">
                                    <MoreVertical size={18} color="#8C8E90" />
                                </TouchableOpacity>
                            </View>
                            <Text className="text-[12px] text-[#8C8E90] mb-3 mt-0.5 uppercase tracking-wider">
                                ID : {student.id}
                            </Text>

                            <View className="flex-row">
                                <View className="w-1/2 pr-2">
                                    <Text className="text-[14px] text-[#8C8E90] mb-1">Attendance</Text>
                                    <Text className="text-[14px] font-bold text-[#F67300]">{student.attendance}</Text>
                                </View>
                                <View className="w-1/2 pl-2">
                                    <Text className="text-[14px] text-[#8C8E90] mb-1">Last Score</Text>
                                    <Text className="text-[14px] font-bold text-[#1E1E2D]">{student.lastScore}</Text>
                                </View>
                            </View>
                        </View>
                    </TouchableOpacity>
                ))}
            </ScrollView>
        </SafeAreaView>
    );
}
