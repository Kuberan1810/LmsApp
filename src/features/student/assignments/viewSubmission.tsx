import React from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Image as ExpoImage } from 'expo-image';
import { ArrowLeft2, CalendarRemove, Award, Message2, ImportCurve } from 'iconsax-react-native';
import { Assignment } from './AssignmentCard';
import { router } from 'expo-router';
import Header from '@/components/Student/Header';

const getFileIconSource = (fileName: string) => {
    const ext = fileName.split('.').pop()?.toLowerCase();
    switch (ext) {
        case 'pdf':
            return require('../../../../assets/icon/pdfIcon.svg');
        case 'doc':
            return require('../../../../assets/icon/docIcon.svg');
        case 'docx':
            return require('../../../../assets/icon/word.svg');
        case 'xls':
        case 'xlsx':
            return require('../../../../assets/icon/xl.svg');
        case 'png':
        case 'jpg':
        case 'jpeg':
            return require('../../../../assets/icon/imgIcon.svg');
        default:
            return require('../../../../assets/icon/file.svg');
    }
};

const getFileIconBg = (fileName: string) => {
    const ext = fileName.split('.').pop()?.toLowerCase();
    switch (ext) {
        case 'pdf':
            return 'bg-[#FEE2E2]';
        case 'doc':
        case 'docx':
            return 'bg-[#E0F2FE]';
        case 'xls':
        case 'xlsx':
            return 'bg-[#DCFCE7]';
        case 'png':
        case 'jpg':
        case 'jpeg':
            return 'bg-[#F3E8FF]';
        default:
            return 'bg-gray-100';
    }
};

interface ViewSubmissionProps {
    assignment: Assignment;
    onBack: () => void;
}

export default function ViewSubmission({ assignment, onBack }: ViewSubmissionProps) {
    // Determine if evaluated
    const isEvaluated = !!assignment.mark;

    return (
        <View className="flex-1 bg-[#FAFAFA]">
      <Header
          title='Assignment Submission'
          onBackPress={onBack}
          showSearch={false}
          showNotification={false}
          showProfile={false}
          titleAlign="center"
      />


            <ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{ paddingBottom: 100 }}
                className="flex-1 px-5 pt-4"
            >
                {/* Header Brief Card */}
                <View className="bg-white border border-[#F2EEF4] p-5 rounded-[16px] mb-5 shadow-xs">
                    <View className="flex-row items-center mb-3">
                       
                        <Text className="text-[20px] font-medium text-[#333333]">
                            {assignment.title}
                        </Text>
                    </View>

                    <View className="flex-row items-center mb-3 gap-2.5">
                        {isEvaluated ? (
                            <View className="flex-row items-center bg-[#2A9A46]/10 px-3 py-1.5 rounded-full">
                                <Text className="text-[#2A9A46] text-[12px] font-medium">
                                    Graded
                                </Text>
                            </View>
                        ) : (
                            <View className="flex-row items-center bg-[#2A9A46]/10 px-3 py-1.5 rounded-full">
                                <Text className="text-[#2A9A46] text-[12px] font-medium">
                                    Submitted
                                </Text>
                            </View>
                        )}

                        <View className="flex-row items-center">
                            <CalendarRemove size={14} color="#9CA3AF" variant="Linear" />
                            <Text className="text-[12px] text-[#626262] ml-1.5">
                                Due {assignment.dateStr}
                            </Text>
                        </View>
                    </View>

                    {/* Course Code/Name */}
                    <Text className="text-[14px] text-[#626262]">
                        {assignment.courseCode} - {assignment.courseName}
                    </Text>
                </View>

                {/* Your Submission Card */}
                <View className="bg-white border border-[#F2EEF4] p-5 rounded-[16px] mb-5 shadow-xs">
                    <Text className="text-[20px] font-semibold text-[#333333] mb-5">Your Submission</Text>
                    <View className="bg-[#F9FAFB]/80 border border-[#F3F4F6] p-6 rounded-[24px]">
                        <Text className="text-[14px] text-[#4D4D4D] leading-[20px]">
                            {assignment.submissionNotes || (isEvaluated ? "Submission Notes" : "notes")}
                        </Text>
                    </View>


                    {/* Attached File Card */}
                    <View className="mt-5">
                        <Text className="text-[20px] font-semibold text-[#333333] mb-5">Attached File</Text>
                        {(assignment.submittedFiles && assignment.submittedFiles.length > 0
                            ? assignment.submittedFiles
                            : [{ name: isEvaluated ? 'task.png' : 'Text_to_PDF_Onlinenotpad.pdf', size: '2.4MB' }]
                        ).map((file, idx, arr) => (
                            <View
                                key={idx}
                                style={{
                                    borderWidth: 0.5,
                                    borderColor: '#F3F4F6',
                                    shadowColor: '#F2EEF4',
                                    shadowOffset: { width: 0, height: 4 },
                                    shadowOpacity: 0.25,
                                    shadowRadius: 4,
                                    elevation: 3,
                                    height: 77,
                                }}
                                className={`flex-row justify-between items-center bg-white pl-1 py-1 pr-5 rounded-[24px] ${idx < arr.length - 1 ? 'mb-3.5' : ''
                                    }`}
                            >
                                <View className="flex-row items-center flex-1 pr-2">
                                    <View
                                        style={{ width: 76, height: 69 }}
                                        className={`rounded-[24px] ${getFileIconBg(file.name)} justify-center items-center`}
                                    >
                                        <ExpoImage
                                            source={getFileIconSource(file.name)}
                                            style={{ width: 32, height: 32 }}
                                            contentFit="contain"
                                        />
                                    </View>
                                    <View className="ml-[10px] flex-1 justify-center">
                                        <Text className="text-[14px] font-medium text-[#4D4D4D]" numberOfLines={1}>
                                            {file.name}
                                        </Text>
                                    </View>
                                </View>
                                <TouchableOpacity className="p-2">
                                    <ImportCurve size={18} color="#808080" variant="Linear" />
                                </TouchableOpacity>
                            </View>
                        ))}
                    </View>
                </View>

                {/* Instructor Feedback Card */}
                <View className="bg-white border border-[#F2EEF4] p-5 rounded-[16px] mb-5 shadow-xs">
                    <Text className="text-[20px] font-semibold text-[#333333] mb-4">Instructor Feedback</Text>
                    {isEvaluated ? (
                        <View className="border-l-4 border-[#F3F4F6] pl-4 py-2 rounded-r-[8px]">
                            <Text className="text-[14px] text-[#4D4D4D] font-medium italic">"Good"</Text>
                        </View>
                    ) : (
                        <View
                            style={{ borderStyle: 'dashed' }}
                            className="border border-[#E5E7EB] rounded-[24px] py-10 px-6 items-center justify-center bg-white"
                        >
                            <View className="w-[50px] h-[50px] rounded-full bg-[#FFF7ED] items-center justify-center mb-3">
                                <Message2 size={24} color="#F67300" variant="Linear" />
                            </View>
                            <Text className="text-[18px] font-semibold text-[#333333] mb-1">No Feedback Yet</Text>
                            <Text className="text-[13px] text-[#626262] text-center px-4 leading-normal">
                                Instructor has not provided feedback for this assignment.
                            </Text>
                        </View>
                    )}
                </View>

                {/* Final Result Card */}
                <View className="bg-white border border-[#F2EEF4] p-5 rounded-[16px] mb-5 shadow-xs">
                    <Text className="text-[20px] font-semibold text-[#333333] mb-4">Final Result</Text>
                    {isEvaluated ? (
                        <View className="items-center justify-center py-6">
                            <Text className="text-[64px] font-semibold text-[#2A9A46] leading-none mb-3">
                                {assignment.mark ? assignment.mark.replace('%', '') : '50'}
                            </Text>
                            <View className="bg-[#2A9A46]/10 px-4 py-1.5 rounded-[40px]">
                                <Text className="text-[#2A9A46] text-[12px] font-bold tracking-wider">
                                    TOTAL POINTS
                                </Text>
                            </View>
                        </View>
                    ) : (
                        <LinearGradient
                            colors={['rgba(246, 115, 0, 0.05)', 'rgba(0, 0, 0, 0)']}
                            start={{ x: 0.5, y: 0 }}
                            end={{ x: 0.5, y: 1 }}
                            style={{
                                borderWidth: 1,
                                borderColor: '#FFF0E0',
                                borderRadius: 32,
                                padding: 32,
                                height: 310,
                                width: '100%',
                                alignItems: 'center',
                                justifyContent: 'center',
                            }}
                        >
                            <LinearGradient
                                colors={['#FE9A49', '#FC8F3C']}
                                start={{ x: 0, y: 0 }}
                                end={{ x: 1, y: 1 }}
                                style={{
                                    width: 80,
                                    height: 80,
                                    borderRadius: 40,
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    marginBottom: 16,
                                    shadowColor: '#F67300',
                                    shadowOffset: { width: 0, height: 6 },
                                    shadowOpacity: 0.3,
                                    shadowRadius: 10,
                                    elevation: 6,
                                }}
                                className="relative"
                            >
                                <Award size={36} color="white" variant="Linear" />
                                <View
                                    style={{
                                        width: 30,
                                        height: 30,
                                        borderRadius: 16,
                                        borderWidth: 2,
                                        borderColor: '#FFFFFF',
                                        backgroundColor: '#FFFFFF',
                                        shadowColor: '#000000',
                                        shadowOffset: { width: 0, height: 1 },
                                        shadowOpacity: 0.7,
                                        shadowRadius: 2,
                                        elevation: 2,
                                    }}
                                    className="absolute bottom-[-10px] right-0 justify-center items-center"
                                >
                                    <View className="w-3 h-3 bg-[#F67300] rounded-full" />
                                </View>
                            </LinearGradient>
                            <Text className="text-[20px] font-semibold text-[#333333] mb-2">Review Pending</Text>
                            <Text className="text-[14px] text-[#6A7282] text-center px-4 leading-[20px]">
                                Your submission was received. The instructor is carefully reviewing your work.{"\n"}
                                <Text className="text-[#F67300]/80 font-medium mt">Please check back soon!</Text>
                            </Text>
                        </LinearGradient>
                    )}
                </View>

                {/* Timeline Card */}
                <View className="bg-white border border-[#F2EEF4] p-5 rounded-[16px] mb-5 shadow-xs">
                    <Text className="text-[20px] font-semibold text-[#333333] mb-4">Timeline</Text>

                    {/* Submitted Event */}
                    <View className="flex-row">
                        <View className="items-center mr-4">
                            <View className="w-4 h-4 rounded-full bg-[#10B981] justify-center items-center">
                            </View>
                            <View className="w-[2px] h-12 bg-[#F3F4F6]" />
                        </View>
                        <View className="flex-1 pb-4">
                            <Text className="text-[14px] font-bold text-[#333333]">Submitted</Text>
                            <Text className="text-[12px] text-[#6A7282] font-medium  mt-0.5">
                                {isEvaluated ? "Jul 11, 2026 at 04:33 PM" : "Jul 17, 2026 at 01:04 PM"}
                            </Text>
                        </View>
                    </View>

                    {/* Evaluated Event */}
                    <View className="flex-row">
                        <View className="items-center mr-4">
                            <View className={`w-4 h-4 rounded-full ${isEvaluated ? 'bg-[#10B981]' : 'bg-[#D1D5DC]'} justify-center items-center`}>
                            </View>
                        </View>
                        <View className="flex-1">
                            <Text className="text-[14px] font-bold text-[#333333]">Evaluated</Text>
                            <Text className="text-[12px] text-[#6A7282] font-medium  mt-0.5">
                                {isEvaluated ? "Reviewed by Instructor" : "Awaiting Review"}
                            </Text>
                        </View>
                    </View>
                </View>

                {/* Back Button */}
                <TouchableOpacity
                    onPress={onBack}
                    className="w-full bg-[#FAFAFA] py-4 rounded-[16px] border border-[#F3F4F6] items-center justify-center flex-row mb-10"
                >
                    <ArrowLeft2 size={16} color="#4B5563" variant="Linear" className="mr-3" />
                    <Text className="text-[#6A7282] text-[16px] font-semibold">Back to Assignments</Text>
                </TouchableOpacity>
            </ScrollView>
        </View>
    );
}
