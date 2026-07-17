import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  Dimensions,
} from 'react-native';
import Animated from 'react-native-reanimated';
import { useTabBarScroll } from '@/context/TabBarVisibilityContext';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import AssignmentCard, { Assignment } from '@/features/student/assignments/AssignmentCard';
import AssignmentDetail from '@/features/student/assignments/AssignmentDetail';
import SubmitAssignment from '@/features/student/assignments/SubmitAssignment';
import SubmissionSuccess from '@/features/student/assignments/SubmissionSuccess';
import Header from '@/features/student/assignments/Header';
import EnrolledCourse, { MOCK_COURSES, Course } from '@/features/student/assignments/EnrolledCourse';

const MOCK_ASSIGNMENTS: Assignment[] = [
  {
    id: '1',
    title: 'Implement PDF-based Q&A using Vector Database',
    courseCode: 'AMIO1',
    courseName: 'AI / ML Frontier AI Engineer',
    description: 'Extract content from PDFs, store embeddings, and answer user queries using a Vector Database.',
    status: 'Submitted',
    dateStr: 'Jan 16, 12:05 PM',
    mark: '75%',
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

  const [activeFilter, setActiveFilter] = useState<FilterType>('All');
  const [showStatusDropdown, setShowStatusDropdown] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState<string | null>(null);

  const [assignments, setAssignments] = useState<Assignment[]>(MOCK_ASSIGNMENTS);
  const [currentView, setCurrentView] = useState<'list' | 'detail' | 'submit' | 'success'>('list');
  const [selectedAssignment, setSelectedAssignment] = useState<Assignment | null>(null);

  const handleCoursePress = (courseCode: string) => {
    if (selectedCourse === courseCode) {
      setSelectedCourse(null);
    } else {
      setSelectedCourse(courseCode);
    }
  };

  const handleAssignmentPress = (assignment: Assignment) => {
    setSelectedAssignment(assignment);
    setCurrentView('detail');
  };

  const handleSubmissionSuccess = () => {
    if (selectedAssignment) {
      setAssignments((prevAssignments) =>
        prevAssignments.map((a) =>
          a.id === selectedAssignment.id ? { ...a, status: 'Submitted', mark: undefined } : a
        )
      );
      setSelectedAssignment((prev) => prev ? { ...prev, status: 'Submitted' } : null);
    }
    setCurrentView('success');
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

  if (currentView === 'detail' && selectedAssignment) {
    return (
      <SafeAreaView className="flex-1 bg-[#FAFAFA]" edges={['top', 'left', 'right']}>
        <AssignmentDetail
          assignment={selectedAssignment}
          onBack={() => setCurrentView('list')}
          onSubmit={() => setCurrentView('submit')}
        />
      </SafeAreaView>
    );
  }

  if (currentView === 'submit' && selectedAssignment) {
    return (
      <SafeAreaView className="flex-1 bg-[#FAFAFA]" edges={['top', 'left', 'right']}>
        <SubmitAssignment
          assignment={selectedAssignment}
          onBack={() => setCurrentView('detail')}
          onSuccess={handleSubmissionSuccess}
        />
      </SafeAreaView>
    );
  }

  if (currentView === 'success' && selectedAssignment) {
    return (
      <SafeAreaView className="flex-1 bg-[#FAFAFA]" edges={['top', 'left', 'right']}>
        <SubmissionSuccess
          assignment={selectedAssignment}
          onViewSubmission={() => setCurrentView('detail')}
          onBackToDashboard={() => setCurrentView('list')}
        />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView className="flex-1 bg-[#FAFAFA]" edges={['top', 'left', 'right']}>
      {/* header */}
      <Header onBackPress={() => router.back()} showSearchAndNotify />

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

        <View className="mx-5 bg-white border border-[#F2EEF4] rounded-[10px] px-4 py-3 mb-4 flex-row justify-between items-center">
          <Text className="text-[14px] font-medium text-[#333333] pr-4 flex-1" numberOfLines={2}>
            {selectedCourse
              ? `${selectedCourse} - ${MOCK_COURSES.find((c) => c.code === selectedCourse)?.name}`
              : (activeFilter === 'All' ? 'All Assignments' : `${activeFilter} Assignments`)}
          </Text>

          <TouchableOpacity
            onPress={() => setShowStatusDropdown(!showStatusDropdown)}
            className="flex-row items-center bg-white border border-[#F2EEF4] px-3.5 py-1.5 rounded-full"
          >
            <Ionicons name="options-outline" size={14} color="#4B5563" style={{ marginRight: 6 }} />
            <Text className="text-[#333333] text-xs font-semibold mr-1">Status</Text>
          </TouchableOpacity>
        </View>

        {showStatusDropdown && (
          <View className="mx-5 mb-5 bg-white border border-[#F2EEF4] rounded-2xl p-2 flex-row flex-wrap justify-between">
            {(['All', 'In Progress', 'Submitted', 'Overdue'] as FilterType[]).map((filter) => (
              <TouchableOpacity
                key={filter}
                onPress={() => {
                  setActiveFilter(filter);
                  setShowStatusDropdown(false);
                }}
                className={`px-4 py-2 rounded-xl mb-1 mt-1 ${activeFilter === filter ? 'bg-[#EE8B3A]' : 'bg-gray-50'}`}
                style={{ width: '48%' }}
              >
                <Text
                  className={`text-center text-xs font-bold ${activeFilter === filter ? 'text-white' : 'text-gray-600'}`}
                >
                  {filter}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        )}


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
                <Ionicons name="document-text-outline" size={48} color="#9CA3AF" />
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