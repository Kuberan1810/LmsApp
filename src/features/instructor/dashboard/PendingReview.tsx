import { View, Text, TouchableOpacity } from 'react-native';
import React, { useState } from 'react';
import { ArrowRight2 } from 'iconsax-react-native';
import { router } from 'expo-router';
import ReviewModal from '@/app/(instructor)/courses/tests/reviewModal';
import ViewSubmissionModal from '@/features/instructor/Courses/assignment/viewSubmissionModal';

const ITEMS = [
    {
        id: '1',
        batch: 'batch-3',
        studentName: 'Kuberan',
        type: 'ASSIGNMENT',
        courseName: 'AA101 - AI',
        submittedAt: '17 Jul, 13:04',
        btnText: 'Review Assignment',
    },
    {
        id: '2',
        batch: 'batch-b',
        studentName: 'Kuberan',
        type: 'TEST',
        courseName: 'AA101 - HTML Test',
        submittedAt: '16 Jul, 07:09',
        btnText: 'Review Test',
    },
    {
        id: '3',
        batch: 'batch-3',
        studentName: 'Kuberan',
        type: 'TEST',
        courseName: 'AA101 - HTML Test',
        submittedAt: '16 Jul, 07:09',
        btnText: 'Review Test',
    },
    {
        id: '4',
        batch: 'batch-b',
        studentName: 'Kuberan',
        type: 'TEST',
        courseName: 'AA101 - Add New Test',
        submittedAt: '14 Jul, 11:47',
        btnText: 'Review Test',
    },
];

export default function PendingReview() {
    const [selectedStudent, setSelectedStudent] = useState<any>(null);
    const [isViewModalOpen, setIsViewModalOpen] = useState(false);
    const [selectedSubmission, setSelectedSubmission] = useState<any>(null);

    const handleUpdateGrade = (grade: string, feedback: string) => {
        console.log('Update grade', grade, feedback);
    };

    return (
        <View className="bg-white rounded-[28px] p-6 mb-3 border border-[#F2EEF4] mt-5 mx-4">
            {/* Header */}
            <View className="flex-row justify-between items-center mb-1">
                <Text className="text-[20px] font-semibold text-[#333333]">Pending Review</Text>
                <TouchableOpacity
                    onPress={() => router.push('/(instructor)/review')}
                    className="border border-[#F2EEF4] rounded-[10px] px-4 py-2 bg-white"
                >
                    <Text className="text-[14px] text-[#808080] font-medium">View all</Text>
                </TouchableOpacity>
            </View>
            <Text className="text-[14px] text-[#626262] mb-4">
                Review assignments submitted by your students.
            </Text>

            {/* List */}
            <View className="space-y-4">
                {ITEMS.map((item, index) => (
                    <View
                        key={index}
                        className="bg-white border border-[#F2EEF4] rounded-[16px] p-5 mb-4"
                        style={{
                            shadowColor: '#d3d3d3ff',
                            shadowOffset: { width: 0, height: 1 },
                            shadowOpacity: 0.1,
                            shadowRadius: 2.5,
                            elevation: 2,
                        }}
                    >
                        {/* Batch & ID Row */}
                        <View className="flex-row justify-between items-center mb-3">
                            <View className="bg-[#F67300]/10 px-2.5 py-1 rounded-full">
                                <Text className="text-[12px] font-bold text-[#F67300]">{item.batch}</Text>
                            </View>
                            <Text className="text-[12px] text-[#888888] font-medium">ID: 10</Text>
                        </View>

                        {/* Student Name */}
                        <Text className="text-[16px] font-bold text-[#0B1C30]">{item.studentName}</Text>

                        {/* Type Tag & Course Row */}
                        <View className="flex-row items-center mt-2 mb-3 gap-2 flex-wrap">
                            <View
                                className={`px-2 py-0.5 rounded-[4px] ${item.type === 'ASSIGNMENT' ? 'bg-[#FFEDD4]' : 'bg-[#F3E8FF]'
                                    }`}
                            >
                                <Text
                                    className={`text-[10px] font-bold ${item.type === 'ASSIGNMENT' ? 'text-[#F67300]' : 'text-[#8200DB]'
                                        }`}
                                >
                                    {item.type}
                                </Text>
                            </View>
                            <Text className="text-[14px] text-[#F67300] font-semibold">{item.courseName}</Text>
                        </View>

                        {/* Submitted Date */}
                        <Text className="text-[12px] text-[#626262] mb-4">
                            Submitted on <Text className="font-semibold text-[#333333]">{item.submittedAt}</Text>
                        </Text>

                        {/* Review Button */}
                        <TouchableOpacity
                            onPress={() => {
                                if (item.type === 'ASSIGNMENT') {
                                    setSelectedSubmission({
                                        studentId: '10',
                                        studentName: item.studentName,
                                        submittedOn: item.submittedAt,
                                        notes: 'Attached is the completed assignment for your review.',
                                        fileName: 'Text_to_PDF_Onlinenotpad',
                                    });
                                    setIsViewModalOpen(true);
                                } else if (item.type === 'TEST') {
                                    setSelectedStudent({
                                        name: item.studentName,
                                        id: '10',
                                        status: 'Submitted',
                                    });
                                }
                            }}
                            className="w-full bg-[#F67300] h-12 rounded-[12px] items-center justify-center flex-row"
                            activeOpacity={0.8}
                        >
                            <Text className="text-white text-[14px] font-bold mr-1">{item.btnText}</Text>
                            <ArrowRight2 size={14} color="white" />
                        </TouchableOpacity>
                    </View>
                ))}
            </View>

            <ReviewModal
                visible={!!selectedStudent}
                onClose={() => setSelectedStudent(null)}
                student={selectedStudent}
            />



            <ViewSubmissionModal
                visible={isViewModalOpen}
                submission={selectedSubmission}
                onClose={() => setIsViewModalOpen(false)}
                onUpdateGrade={handleUpdateGrade}
            />
        </View>
    );
}
