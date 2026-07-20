import Header from '@/components/Instructor/InstructorHeader';
import { Image as ExpoImage } from 'expo-image';
import { DocumentUpload, Link, Maximize } from 'iconsax-react-native';
import { Calendar } from 'lucide-react-native';
import { ScrollView, Text, TouchableOpacity, View } from 'react-native';

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

export interface AssignmentData {
    id?: string;
    title?: string;
    status?: string;
    dueDate?: string;
    courseCode?: string;
    courseName?: string;
    description?: string;
    objective?: string;
    expectedOutcome?: string;
}

interface AssignmentsProps {
    assignment?: AssignmentData;
    onBack?: () => void;
    onReview?: () => void;
    onEdit?: () => void;
}

export default function Assignments({ assignment, onBack, onReview, onEdit }: AssignmentsProps) {
    const title = assignment?.title || 'Build Q&A system using RAG';
    const status = assignment?.status || 'In Progress';
    const dueDate = assignment?.dueDate || 'Jan 26 , 11:59 PM';
    const courseCode = assignment?.courseCode || 'AM101';
    const courseName = assignment?.courseName || 'AI / ML Frontier Ai Engineer';

    const description =
        assignment?.description ||
        'Build a Question Answering (Q&A) system using Retrieval-Augmented Generation (RAG). In this assignment, you will combine a language model with external knowledge sources to generate more accurate and context-aware answers instead of relying only on the model\'s memory.';

    const objective =
        assignment?.objective ||
        'Design and implement a basic retrieval pipeline that searches relevant information, passes it as context to the language model, and produces meaningful responses.';

    const expectedOutcome =
        assignment?.expectedOutcome ||
        'A working RAG-based Q&A system that can answer questions accurately using provided data, demonstrating the practical application of AI in learning platforms.';

    return (
        <View className="flex-1 bg-[#FAFAFA]">
            {/* Header */}
            <Header title="Assignment" onBackPress={onBack} />

            <ScrollView
                className="flex-1 px-5 pt-2"
                contentContainerStyle={{ paddingBottom: 100 }}
                showsVerticalScrollIndicator={false}
            >
                <View className="bg-white rounded-[20px] p-5 mb-4 border border-[#F2EEF4] shadow-xs">
                    <Text className="text-[20px] font-bold text-[#0B1C30] mb-2.5">{title}</Text>

                    <View className="flex-row items-center gap-3 mb-2.5">
                        <View className="bg-[#FFF3E0] px-3 py-1 rounded-full">
                            <Text className="text-[#F67300] text-[12px] font-semibold">{status}</Text>
                        </View>
                        <View className="flex-row items-center">
                            <Calendar size={14} color="#6A7282" />
                            <Text className="text-[13px] text-[#6A7282] ml-1.5 font-medium">
                                Due {dueDate}
                            </Text>
                        </View>
                    </View>

                    <Text className="text-[13px] text-[#6A7282] mb-5 font-medium">
                        {courseCode} - {courseName}
                    </Text>

                    {/* Description */}
                    <View className="mb-4">
                        <Text className="text-[15px] font-semibold text-[#333333] mb-1.5">Description:</Text>
                        <Text className="text-[13px] text-[#626262] leading-relaxed">{description}</Text>
                    </View>

                    {/* Objective */}
                    <View className="mb-4">
                        <Text className="text-[15px] font-semibold text-[#333333] mb-1.5">Objective:</Text>
                        <Text className="text-[13px] text-[#626262] leading-relaxed">{objective}</Text>
                    </View>

                    {/* Expected Outcome */}
                    <View>
                        <Text className="text-[15px] font-semibold text-[#333333] mb-1.5">Expected Outcome:</Text>
                        <Text className="text-[13px] text-[#626262] leading-relaxed">{expectedOutcome}</Text>
                    </View>
                </View>

                {/* Resources Card Wrapper */}
                <View className="bg-white border border-[#F2EEF4] p-4 rounded-[10px] mb-5">
                    <Text className="text-[20px] font-medium text-[#333333] mb-4">Resources</Text>

                    {/* Resources List */}
                    {[
                        {
                            title: 'Project_Guidelines.pdf',
                            subtitle: '2.4MB',
                            iconBg: 'bg-[#FEE2E2]',
                            actionIcon: <DocumentUpload size={18} color="#808080" variant="Linear" />,
                        },
                        {
                            title: 'RAG Architecture Overview',
                            subtitle: 'external-link.com',
                            iconBg: 'bg-blue-50',
                            actionIcon: <Maximize size={18} color="#808080" variant="Linear" />,
                        }
                    ].map((res, index, arr) => {
                        const ext = res.title.split('.').pop()?.toLowerCase();
                        const isFile = ['pdf', 'doc', 'docx', 'xls', 'xlsx'].includes(ext || '');

                        return (
                            <View
                                key={index}
                                style={{
                                    borderWidth: 0.5,
                                    borderColor: '#F2EEF4',
                                    shadowColor: '#F2EEF4',
                                    shadowOffset: { width: 0, height: 4 },
                                    shadowOpacity: 0.25,
                                    shadowRadius: 4,
                                    elevation: 3,
                                    height: 77,
                                }}
                                className={`flex-row justify-between items-center bg-white pl-1 py-1 pr-5 rounded-[15px] ${index < arr.length - 1 ? 'mb-3.5' : ''
                                    }`}
                            >
                                <View className="flex-row items-center flex-1 pr-2">
                                    {isFile ? (
                                        <View
                                            style={{ width: 76, height: 69 }}
                                            className={`rounded-[24px] ${res.iconBg} justify-center items-center`}
                                        >
                                            <ExpoImage
                                                source={getFileIconSource(res.title)}
                                                style={{ width: 32, height: 32 }}
                                                contentFit="contain"
                                            />
                                        </View>
                                    ) : (
                                        <View
                                            style={{ width: 76, height: 69 }}
                                            className={`rounded-[24px] ${res.iconBg} justify-center items-center`}
                                        >
                                            <Link size={24} color="#3B82F6" variant="Linear" />
                                        </View>
                                    )}
                                    <View className="ml-[10px] flex-1 justify-center">
                                        <Text className="text-[15px] font-medium text-[#333333]" numberOfLines={1}>
                                            {res.title}
                                        </Text>
                                        <Text className="text-[12px] text-[#808080] mt-0.5">{res.subtitle}</Text>
                                    </View>
                                </View>
                                <TouchableOpacity className="p-1">
                                    {res.actionIcon}
                                </TouchableOpacity>
                            </View>
                        );
                    })}
                </View>

                {/* Bottom Action Buttons */}
                <View className="flex-row gap-3 mt-1 mb-6">
                    <TouchableOpacity
                        onPress={onReview}
                        className="flex-1 h-12 rounded-[14px] bg-[#F67300] items-center justify-center"
                        activeOpacity={0.8}
                    >
                        <Text className="text-white text-[15px] font-semibold">Review Assignment</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        onPress={onEdit}
                        className="flex-1 h-12 rounded-[14px] bg-[#F67300] items-center justify-center"
                        activeOpacity={0.8}
                    >
                        <Text className="text-white text-[15px] font-semibold">Edit Assignment</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </View>
    );
}
