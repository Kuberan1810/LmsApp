import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import React, { useState } from 'react';
import { router } from 'expo-router';
import { ArrowLeft2, ArrowRight2, ClipboardText, DocumentText, DocumentText1, CalendarTick } from 'iconsax-react-native';
import InstructorHeader from '@/components/Instructor/InstructorHeader';
import { SafeAreaView } from 'react-native-safe-area-context';
import ReviewModal from '@/app/(instructor)/courses/tests/reviewModal';
import ViewSubmissionModal from '@/features/instructor/Courses/assignment/viewSubmissionModal';

const ITEMS = [
    {
        id: '1',
        batch: 'batch-b',
        studentName: 'Kuberan',
        type: 'TEST',
        courseName: 'AAND1 - Add New Test',
        submittedAt: '18 Jul, 12:28',
        btnText: 'Review Test',
        studentId: '10',
    },
    {
        id: '2',
        batch: 'batch-9',
        studentName: 'Kuberan',
        type: 'TEST',
        courseName: 'AAND1 - Add New Test',
        submittedAt: '18 Jul, 12:28',
        btnText: 'Review Test',
        studentId: '10',
    },
    {
        id: '3',
        batch: 'batch-9',
        studentName: 'Kuberan',
        type: 'ASSIGNMENT',
        courseName: 'AA101 - Xc',
        submittedAt: '17 Jul, 13:04',
        btnText: 'Review Assignment',
        studentId: '10',
    },
    {
        id: '4',
        batch: 'batch-b',
        studentName: 'Kuberan',
        type: 'TEST',
        courseName: 'AAND1 - HTML Test',
        submittedAt: '16 Jul, 07:09',
        btnText: 'Review Test',
        studentId: '10',
    },
    {
        id: '5',
        batch: 'batch-9',
        studentName: 'Kuberan',
        type: 'TEST',
        courseName: 'AAND1 - HTML Test',
        submittedAt: '16 Jul, 07:09',
        btnText: 'Review Test',
        studentId: '10',
    },
    {
        id: '6',
        batch: 'batch-b',
        studentName: 'Kuberan',
        type: 'TEST',
        courseName: 'AAND1 - Aandsi',
        submittedAt: '13 Jul, 09:42',
        btnText: 'Review Test',
        studentId: '10',
    },
];

const METRICS = [
    {
        id: 'total',
        title: 'TOTAL PENDING',
        value: '17',
        subtitle: 'All active reviews',
        Icon: ClipboardText,
        iconColor: '#3B82F6',
        iconBg: '#EFF6FF',
        tab: 'All' as const,
    },
    {
        id: 'assignments',
        title: 'PENDING ASSIGNMENTS',
        value: '1',
        subtitle: 'Active assignments',
        Icon: DocumentText,
        iconColor: '#EA580C',
        iconBg: '#FFF3ED',
        tab: 'Assignments' as const,
    },
    {
        id: 'tests',
        title: 'PENDING TESTS',
        value: '16',
        subtitle: 'Active tests',
        Icon: DocumentText1,
        iconColor: '#7C3AED',
        iconBg: '#F5F3FF',
        tab: 'Tests' as const,
    },
    {
        id: 'submitted',
        title: 'SUBMITTED TODAY',
        value: '0',
        subtitle: 'New submissions today',
        Icon: CalendarTick,
        iconColor: '#16A34A',
        iconBg: '#F6FEF9',
        tab: null,
    },
];

export default function ReviewScreen() {
    const [selectedStudent, setSelectedStudent] = useState<any>(null);
    const [isViewModalOpen, setIsViewModalOpen] = useState(false);
    const [selectedSubmission, setSelectedSubmission] = useState<any>(null);

    const handleUpdateGrade = (grade: string, feedback: string) => {
        console.log('Update grade', grade, feedback);
    };

    const totalCount = ITEMS.length;
    const assignmentCount = ITEMS.filter(item => item.type === 'ASSIGNMENT').length;
    const testCount = ITEMS.filter(item => item.type === 'TEST').length;

    const dynamicMetrics = METRICS.map(m => {
        if (m.id === 'total') return { ...m, value: String(totalCount) };
        if (m.id === 'assignments') return { ...m, value: String(assignmentCount) };
        if (m.id === 'tests') return { ...m, value: String(testCount) };
        return m;
    });

    return (
        <SafeAreaView className="flex-1 bg-[#FAFAFA]" edges={['top', 'left', 'right']}>
            <InstructorHeader
                title="Pending Review"
                onBackPress={() => router.back()}
                showSearch={false}
                showNotification={false}
                showProfile={false}
                titleAlign="center"
            />
            <ScrollView
                className="flex-1"
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{ paddingBottom: 40 }}
            >

                {/* Metrics Grid */}
                <View className="flex-row flex-wrap px-4 mb-6">
                    {dynamicMetrics.map((metric) => {
                        const IconComponent = metric.Icon;
                        const CardContent = (
                            <>
                                <View
                                    className="w-10 h-10 rounded-[12px] items-center justify-center mb-6"
                                    style={{ backgroundColor: metric.iconBg }}
                                >
                                    <IconComponent size={20} color={metric.iconColor} />
                                </View>
                                <Text className="text-[11px] font-bold text-[#626262] tracking-wider mb-1">
                                    {metric.title}
                                </Text>
                                <Text className="text-[24px] font-bold text-[#0B1C30] mb-2">
                                    {metric.value}
                                </Text>
                                <Text className="text-[11px] text-[#888888]">
                                    {metric.subtitle}
                                </Text>
                            </>
                        );

                        return (
                            <View key={metric.id} className="w-1/2 p-2">
                                <View className="bg-white rounded-[16px] p-4 border border-[#F2EEF4]">
                                    {CardContent}
                                </View>
                            </View>
                        );
                    })}
                </View>

                {/* Subtitle Section */}
                <View className="px-6 mb-4">
                    <Text className="text-[20px] font-semibold text-[#333333]">Pending Review</Text>
                    <Text className="text-[14px] text-[#626262] mt-0.5">Review submissions from your students</Text>
                </View>

                {/* Filter Tabs */}
                <View className="flex-row bg-[#F2EEF4]/40 p-[6px] rounded-[12px] self-start mb-6 mx-6 border border-[#F2EEF4] w-[258px] h-[50px] items-center">
                    {(['All', 'Assignments', 'Tests'] as const).map((tab) => {
                        const isActive = tab === 'All';
                        return (
                            <View
                                key={tab}
                                className={`flex-1 rounded-[8px] items-center justify-center h-full ${isActive ? 'bg-white shadow-sm' : ''}`}
                            >
                                <Text className={`text-[14px] font-semibold ${isActive ? 'text-[#0B1C30]' : 'text-[#626262]'}`}>
                                    {tab}
                                </Text>
                            </View>
                        );
                    })}
                </View>

                {/* Student Submissions List */}
                <View className="space-y-4">
                    {ITEMS.map((item, index) => (
                        <View
                            key={item.id}
                            className="bg-white border border-[#F2EEF4] rounded-[16px] p-5 mb-4 mx-6"
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
                                <View className="bg-[#F67300]/10 px-3 py-1 rounded-full">
                                    <Text className="text-[12px] font-bold text-[#F67300]">{item.batch}</Text>
                                </View>
                                <Text className="text-[12px] text-[#888888] font-medium">ID: {item.studentId}</Text>
                            </View>

                            {/* Student Name */}
                            <Text className="text-[18px] font-bold text-[#0B1C30]">{item.studentName}</Text>

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

                            <TouchableOpacity
                                onPress={() => {
                                    if (item.type === 'ASSIGNMENT') {
                                        setSelectedSubmission({
                                            studentId: item.studentId,
                                            studentName: item.studentName,
                                            submittedOn: item.submittedAt,
                                            notes: 'Attached is the completed assignment for your review.',
                                            fileName: 'Text_to_PDF_Onlinenotpad',
                                        });
                                        setIsViewModalOpen(true);
                                    } else if (item.type === 'TEST') {
                                        setSelectedStudent({
                                            name: item.studentName,
                                            id: item.studentId,
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
            </ScrollView>

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
        </SafeAreaView>
    );
}
