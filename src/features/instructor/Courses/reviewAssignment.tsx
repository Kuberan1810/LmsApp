import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, TextInput } from 'react-native';
import Header from '@/components/Instructor/header';
import { SearchNormal1, Filter, ArrowSwapHorizontal, ArrowLeft2, ArrowRight2 } from 'iconsax-react-native';
import ViewSubmissionModal, { SubmissionData } from './viewSubmissionModal';

export interface StudentSubmission {
    sNo: number;
    studentId: string;
    studentName: string;
    submittedOn: string;
    status: 'Graded' | 'Pending' | 'Submitted';
    grade: string | number;
}

interface ReviewAssignmentProps {
    assignmentTitle?: string;
    moduleName?: string;
    batchName?: string;
    dueDate?: string;
    onBack?: () => void;
}

export default function ReviewAssignment({
    assignmentTitle = 'Sample',
    moduleName = 'Module 1: Module-1',
    batchName = 'Batch-3',
    dueDate = 'Jul 14, 2026, 10:35 PM',
    onBack,
}: ReviewAssignmentProps) {
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedSubmission, setSelectedSubmission] = useState<SubmissionData | null>(null);
    const [isViewModalOpen, setIsViewModalOpen] = useState(false);

    const [submissions, setSubmissions] = useState<StudentSubmission[]>([
        {
            sNo: 1,
            studentId: '10',
            studentName: 'kuberan',
            submittedOn: 'Jul 14, 2026, 03:15 PM',
            status: 'Graded',
            grade: 90,
        },
    ]);

    const handleOpenSubmissionModal = (row: StudentSubmission) => {
        setSelectedSubmission({
            studentId: row.studentId,
            studentName: row.studentName,
            submittedOn: row.submittedOn,
            status: row.status,
            grade: row.grade,
            notes: '"this is your assignment work “"',
            fileName: 'Text_to_PDF_Onlinenotpad',
        });
        setIsViewModalOpen(true);
    };

    const handleUpdateGrade = (newGrade: string) => {
        if (selectedSubmission && selectedSubmission.studentId) {
            setSubmissions(prev =>
                prev.map(item =>
                    item.studentId === selectedSubmission.studentId
                        ? { ...item, grade: newGrade, status: 'Graded' }
                        : item
                )
            );
        }
    };

    const filteredSubmissions = submissions.filter(
        sub =>
            sub.studentName.toLowerCase().includes(searchQuery.toLowerCase()) ||
            sub.studentId.includes(searchQuery)
    );

    const submittedCount = submissions.filter(s => s.status === 'Submitted' || s.status === 'Graded').length;
    const enrolledCount = submissions.length;
    const pendingCount = submissions.filter(s => s.status === 'Pending').length;

    return (
        <View className="flex-1 bg-[#FAFAFA]">
            {/* Header  */}
            <Header title="Assignment Submissions" onBackPress={onBack} />

            <ScrollView
                className="flex-1 px-5 pt-2"
                contentContainerStyle={{ paddingBottom: 100 }}
                showsVerticalScrollIndicator={false}
            >
                <View className="bg-white rounded-[20px] border border-[#EEEEEE] p-6 mb-5">
                    {/* Key Details */}
                    <View className="gap-2.5 mb-5">
                        <View className="flex-row items-center">
                            <Text className="w-36 text-[15px] text-[#626262] font-medium">Assignment</Text>
                            <Text className="text-[15px] font-bold text-[#1A1A1A]">{assignmentTitle}</Text>
                        </View>

                        <View className="flex-row items-center">
                            <Text className="w-36 text-[15px] text-[#626262] font-medium">Module</Text>
                            <Text className="text-[15px] font-medium text-[#333333]">{moduleName}</Text>
                        </View>

                        <View className="flex-row items-center">
                            <Text className="w-36 text-[15px] text-[#626262] font-medium">Batch</Text>
                            <Text className="text-[15px] font-medium text-[#333333]">{batchName}</Text>
                        </View>

                        <View className="flex-row items-center">
                            <Text className="w-36 text-[15px] text-[#626262] font-medium">Due Date & Time</Text>
                            <Text className="text-[15px] font-medium text-[#333333]">{dueDate}</Text>
                        </View>
                    </View>

                    <View className="flex-row gap-3">
                        {/* Submitted Stat */}
                        <View className="flex-1 bg-white border border-[#F2EEF4] rounded-[16px] p-2 items-center justify-center shadow-2xs">
                            <Text className="text-[24px] font-bold text-[#10B981] mb-1">{submittedCount}</Text>
                            <Text className="text-[11px] text-[#16A34A] tracking-wider">SUBMITTED</Text>
                        </View>

                        {/* Enrolled Stat */}
                        <View className="flex-1 bg-white border border-[#F2EEF4] rounded-[16px] p-2 items-center justify-center shadow-2xs">
                            <Text className="text-[24px] font-bold text-[#333333] mb-1">{enrolledCount}</Text>
                            <Text className="text-[11px] text-[#666666] tracking-wider">ENROLLED</Text>
                        </View>

                        {/* Pending Stat */}
                        <View className="flex-1 bg-white border border-[#F2EEF4] rounded-[16px] p-2 items-center justify-center shadow-2xs">
                            <Text className="text-[24px] font-bold text-[#F67300] mb-1">{pendingCount}</Text>
                            <Text className="text-[11px] text-[#F67300] tracking-wider">PENDING</Text>
                        </View>
                    </View>
                </View>

                {/* Submissions Table Card */}
                <View className="bg-white rounded-[20px] border border-[#F2EEF4] p-5">
                    <View className="flex-row items-center gap-2 mb-6">
                        {/* Search Input */}
                        <View className="flex-1 flex-row items-center bg-[#F9FAFB] border border-[#E5E7EB] rounded-[12px] px-3 h-10">
                            <SearchNormal1 size={16} color="#9CA3AF" />
                            <TextInput
                                value={searchQuery}
                                onChangeText={setSearchQuery}
                                placeholder="Search by Student name or ID..."
                                placeholderTextColor="#9CA3AF"
                                className="flex-1 ml-2 text-[13px] text-[#333333] p-0"
                            />
                        </View>

                        {/* Filter Button */}
                        <TouchableOpacity
                            className="flex-row items-center bg-white border border-[#E5E7EB] rounded-[12px] px-3 h-10"
                            activeOpacity={0.7}
                        >
                            <Filter size={16} color="#626262" />
                            <Text className="text-[13px] font-medium text-[#626262] ml-1.5">Filter</Text>
                        </TouchableOpacity>

                        {/* Sort Button */}
                        <TouchableOpacity
                            className="flex-row items-center bg-white border border-[#E5E7EB] rounded-[12px] px-3 h-10"
                            activeOpacity={0.7}
                        >
                            <ArrowSwapHorizontal size={16} color="#626262" />
                            <Text className="text-[13px] font-medium text-[#626262] ml-1.5">Sort</Text>
                        </TouchableOpacity>
                    </View>

                    <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                        <View className="min-w-[750px]">
                            {/* Table Header */}
                            <View className="bg-[#FFF5ED] border-b border-[#FFE0CC] py-3 px-4 flex-row items-center">
                                <Text className="w-16 text-[12px] font-bold text-[#F67300] tracking-wider text-center">S.NO</Text>
                                <Text className="w-28 text-[12px] font-bold text-[#F67300] tracking-wider text-center">STUDENT ID</Text>
                                <Text className="w-44 text-[12px] font-bold text-[#F67300] tracking-wider text-center">STUDENT NAME</Text>
                                <Text className="w-48 text-[12px] font-bold text-[#F67300] tracking-wider text-center">SUBMITTED ON</Text>
                                <Text className="w-28 text-[12px] font-bold text-[#F67300] tracking-wider text-center">STATUS</Text>
                                <Text className="w-24 text-[12px] font-bold text-[#F67300] tracking-wider text-center">GRADE</Text>
                                <Text className="w-24 text-[12px] font-bold text-[#F67300] tracking-wider text-center">ACTION</Text>
                            </View>

                            {/* Table Rows */}
                            {filteredSubmissions.map((row, index) => (
                                <View
                                    key={row.studentId || index}
                                    className={`py-3.5 px-4 flex-row items-center border-b border-[#F3F4F6] ${index % 2 === 0 ? 'bg-white' : 'bg-[#FAFAFA]'
                                        }`}
                                >
                                    <Text className="w-16 text-[15px] font-semibold text-[#888888] text-center">{row.sNo}</Text>
                                    <Text className="w-28 text-[15px] font-medium text-[#333333] text-center">{row.studentId}</Text>
                                    <Text className="w-44 text-[15px] font-semibold text-[#333333] text-center">{row.studentName}</Text>
                                    <Text className="w-48 text-[15px] text-[#626262] text-center">{row.submittedOn}</Text>
                                    <View className="w-28 items-center justify-center">
                                        <View className="bg-[#2A9A46]/10 px-3 py-1 rounded-full">
                                            <Text className="text-[#2A9A46] text-[14px] font-semibold">{row.status}</Text>
                                        </View>
                                    </View>
                                    <Text className="w-24 text-[15px] font-bold text-[#1A1A1A] text-center">{row.grade}</Text>
                                    <View className="w-24 items-center justify-center">
                                        <TouchableOpacity
                                            onPress={() => handleOpenSubmissionModal(row)}
                                            className="bg-[#F67300] px-4 py-1.5 rounded-full items-center justify-center shadow-xs"
                                            activeOpacity={0.8}
                                        >
                                            <Text className="text-white text-[13px] font-bold">View</Text>
                                        </TouchableOpacity>
                                    </View>
                                </View>
                            ))}

                            {filteredSubmissions.length === 0 && (
                                <View className="py-8 items-center justify-center">
                                    <Text className="text-[14px] text-[#8C8E90] italic">No submissions found.</Text>
                                </View>
                            )}
                        </View>
                    </ScrollView>

                    {/*  Footer */}
                    <View className="flex-row items-center justify-between mt-4 pt-3">
                        <Text className="text-[13px] font-medium text-[#626262]">
                            Showing <Text className="font-bold text-[#1A1A1A]">1</Text> to{' '}
                            <Text className="font-bold text-[#1A1A1A]">{filteredSubmissions.length}</Text> of{' '}
                            <Text className="font-bold text-[#1A1A1A]">{filteredSubmissions.length}</Text> entries
                        </Text>

                        <View className="flex-row items-center gap-1.5">
                            <TouchableOpacity
                                className="w-8 h-8 rounded-[8px] border border-[#E5E7EB] bg-white items-center justify-center"
                                activeOpacity={0.7}
                            >
                                <ArrowLeft2 size={14} color="#626262" />
                            </TouchableOpacity>

                            <TouchableOpacity
                                className="w-8 h-8 rounded-[8px] bg-[#F67300] items-center justify-center shadow-xs"
                                activeOpacity={0.9}
                            >
                                <Text className="text-white text-[13px] font-bold">1</Text>
                            </TouchableOpacity>

                            <TouchableOpacity
                                className="w-8 h-8 rounded-[8px] border border-[#E5E7EB] bg-white items-center justify-center"
                                activeOpacity={0.7}
                            >
                                <ArrowRight2 size={14} color="#626262" />
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </ScrollView>

            <ViewSubmissionModal
                visible={isViewModalOpen}
                submission={selectedSubmission}
                onClose={() => setIsViewModalOpen(false)}
                onUpdateGrade={handleUpdateGrade}
            />
        </View>
    );
}
