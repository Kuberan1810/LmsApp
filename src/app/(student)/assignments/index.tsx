import { useTabBarScroll, useTabBarVisibility } from '@/context/TabBarVisibilityContext';
import AssignmentCard, { Assignment } from '@/features/student/assignments/AssignmentCard';
import EnrolledCourse, { MOCK_COURSES } from '@/features/student/assignments/EnrolledCourse';
import Header from '@/components/Student/Header';
import { router } from 'expo-router';
import { ArrowDown2, ArrowUp2, DocumentText, Filter } from 'iconsax-react-native';
import React, { useState } from 'react';
import {
  Text,
  TouchableOpacity,
  View
} from 'react-native';
import Animated from 'react-native-reanimated';
import { SafeAreaView } from 'react-native-safe-area-context';

export const MOCK_ASSIGNMENTS: Assignment[] = [
  {
    id: '1',
    title: 'Implement PDF-based Q&A using Vector Database',
    courseCode: 'AMIO1',
    courseName: 'AI / ML Frontier AI Engineer',
    description: 'Extract content from PDFs, store embeddings, and answer user queries using a Vector Database.',
    status: 'Submitted',
    dateStr: 'Jan 16, 12:05 PM',
    mark: '75%',
    submittedFiles: [{ name: 'task.png', size: '1.2MB' }],
    submissionNotes: 'Submission Notes',
  },
  {
    id: '2',
    title: 'Build Q&A System using RAG',
    courseCode: 'AMIO1',
    courseName: 'AI / ML Frontier AI Engineer',
    description: 'Building a Question-Answering (Q&A) system using Retrieval-Augmented Generation processes.',
    status: 'In Progress',
    dateStr: 'Jan 26, 1:57 PM',
  },
  {
    id: '3',
    title: 'Build Q&A System using RAG',
    courseCode: 'SS102',
    courseName: 'System Architecture',
    description: 'Building a Question-Answering (Q&A) system using Retrieval-Augmented Generation processes.',
    status: 'In Progress',
    dateStr: 'Jan 26, 1:57 PM',
  },
  {
    id: '4',
    title: 'Implement PDF-based Q&A using Vector Database',
    courseCode: 'SS102',
    courseName: 'System Architecture',
    description: 'Extract content from PDFs, store embeddings, and answer user queries using a Vector Database.',
    status: 'Submitted',
    dateStr: 'Jan 16, 2:05 PM',
    mark: '75%',
    submittedFiles: [{ name: 'task.png', size: '1.2MB' }],
    submissionNotes: 'Submission Notes',
  },
  {
    id: '5',
    title: 'Implement PDF-based Q&A using Vector Database',
    courseCode: 'SS102',
    courseName: 'System Architecture',
    description: 'Extract content from PDFs, store embeddings, and answer user queries using a Vector Database.',
    status: 'Overdue',
    dateStr: 'Jan 24',
  },
];

type FilterType = 'All' | 'In Progress' | 'Submitted' | 'Overdue';

export default function AssignmentsScreen() {
  const scrollHandler = useTabBarScroll();
  const { setIsTabBarVisible } = useTabBarVisibility();

  const [activeFilter, setActiveFilter] = useState<FilterType>('All');
  const [showStatusDropdown, setShowStatusDropdown] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState<string | null>(null);

  const [assignments, setAssignments] = useState<Assignment[]>(MOCK_ASSIGNMENTS);

  const handleCoursePress = (courseCode: string) => {
    if (selectedCourse === courseCode) {
      setSelectedCourse(null);
    } else {
      setSelectedCourse(courseCode);
    }
  };

  const handleAssignmentPress = (assignment: Assignment) => {
    if (assignment.status === 'Submitted') {
      router.push(`/(student)/assignments/view/${assignment.id}` as any);
    } else {
      router.push(`/(student)/assignments/${assignment.id}` as any);
    }
  };

  const getFilteredAssignments = () => {
    let data = assignments;
    if (selectedCourse) {
      data = data.filter((a) => a.courseCode === selectedCourse);
    }
    if (activeFilter === 'All') {
      return data;
    }
    return data.filter((a) => a.status === activeFilter);
  };

  const filteredData = getFilteredAssignments();

  const sections: { title: string; status: 'In Progress' | 'Submitted' | 'Overdue'; items: Assignment[] }[] = [
    {
      title: 'In Progress',
      status: 'In Progress',
      items: filteredData.filter((a) => a.status === 'In Progress'),
    },
    {
      title: 'Submitted',
      status: 'Submitted',
      items: filteredData.filter((a) => a.status === 'Submitted'),
    },
    {
      title: 'Overdue',
      status: 'Overdue',
      items: filteredData.filter((a) => a.status === 'Overdue'),
    },
  ];



  return (
    <SafeAreaView className="flex-1 bg-[#FAFAFA]" edges={['top', 'left', 'right']}>
      <View className="mb-2">
        <Header title="Assignments" />
      </View>

      <Animated.ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 100 }}
        onScroll={scrollHandler}
        scrollEventThrottle={16}
      >
        {/* EnrolledCourse */}
        <EnrolledCourse
          selectedCourse={selectedCourse}
          onCoursePress={handleCoursePress}
        />

        <View style={{ zIndex: 10 }} className="mx-5 bg-white border border-[#F2EEF4] rounded-[10px] px-4 py-3 mb-4 flex-row justify-between items-center relative">
          <Text className="text-[14px] font-medium text-[#333333] pr-4 flex-1" numberOfLines={2}>
            {selectedCourse
              ? `${selectedCourse} - ${MOCK_COURSES.find((c) => c.code === selectedCourse)?.name}`
              : (activeFilter === 'All' ? 'All Assignments' : `${activeFilter} Assignments`)}
          </Text>

          <View className="relative">
            <TouchableOpacity
              onPress={() => setShowStatusDropdown(!showStatusDropdown)}
              className="flex-row items-center bg-white border border-[#F2EEF4] px-3.5 py-1.5 rounded-full"
            >
              <Filter size={14} color="#4B5563" variant="Linear" style={{ marginRight: 6 }} />
              <Text className="text-[#333333] text-xs font-semibold mr-1">Status</Text>
              {showStatusDropdown ? (
                <ArrowUp2 size={14} color="#4B5563" variant="Linear" />
              ) : (
                <ArrowDown2 size={14} color="#4B5563" variant="Linear" />
              )}
            </TouchableOpacity>

            {showStatusDropdown && (
              <View
                style={{
                  position: 'absolute',
                  top: 36,
                  right: 0,
                  width: 140,
                  zIndex: 100,
                  elevation: 5,
                  shadowColor: '#000000',
                  shadowOffset: { width: 0, height: 2 },
                  shadowOpacity: 0.1,
                  shadowRadius: 4,
                }}
                className="bg-white border border-[#F2EEF4] rounded-xl overflow-hidden"
              >
                {(['All', 'In Progress', 'Submitted', 'Overdue'] as FilterType[]).map((filter) => (
                  <TouchableOpacity
                    key={filter}
                    onPress={() => {
                      setActiveFilter(filter);
                      setShowStatusDropdown(false);
                    }}
                    className={`flex-row justify-between items-center px-3.5 py-2.5 ${activeFilter === filter ? 'bg-[#EE8B3A]/5' : ''
                      }`}
                  >
                    <Text
                      className={`text-xs ${activeFilter === filter ? 'text-[#EE8B3A] font-bold' : 'text-gray-600 font-medium'
                        }`}
                    >
                      {filter}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            )}
          </View>
        </View>


        {/* Assignment Lists  */}
        <View className="px-5">
          {activeFilter === 'All' ? (
            sections.map((section) => {
              if (section.items.length === 0) return null;

              return (
                <View key={section.title}>
                  {section.items.map((assignment) => (
                    <AssignmentCard
                      key={assignment.id}
                      assignment={assignment}
                      onPress={handleAssignmentPress}
                    />
                  ))}
                </View>
              );
            })
          ) : (
            filteredData.length > 0 ? (
              filteredData.map((assignment) => (
                <AssignmentCard
                  key={assignment.id}
                  assignment={assignment}
                  onPress={handleAssignmentPress}
                />
              ))
            ) : (
              // Empty State
              <View className="bg-white border border-[#F2EEF4] rounded-2xl p-10 items-center justify-center mt-4 shadow-sm">
                <DocumentText size={48} color="#9CA3AF" variant="Linear" />
                <Text className="text-gray-800 font-semibold mt-4 text-base">No assignments found</Text>
                <Text className="text-gray-400 text-xs text-center mt-1">
                  There are no {activeFilter.toLowerCase()} assignments currently.
                </Text>
              </View>
            )
          )}
        </View>


      </Animated.ScrollView>

    </SafeAreaView>
  );
}