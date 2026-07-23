import React from 'react';
import { View, Text, TouchableOpacity, ScrollView, Modal, Animated, PanResponder, Dimensions, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { CloseCircle, TickCircle } from 'iconsax-react-native';

const { height } = Dimensions.get('window');

const MOCK_REVIEW = {
  status: 'Submitted',
  date: 'July 11, 2026',
  time: '10:21 AM',
  points: 12,
  questions: [
    { id: 1, text: "What does HTML stand for?", status: "INCORRECT", studentAnswer: "Home Text Markup Language", correctAnswer: "Hyper Text Markup Language" },
    { id: 2, text: "Which HTML tag is used to create a hyperlink?", status: "CORRECT", studentAnswer: "<a href>" },
    { id: 3, text: "Which CSS property changes the text color?", status: "CORRECT", studentAnswer: "color" },
    { id: 4, text: "Which selector selects an element by its ID?", status: "CORRECT", studentAnswer: "#container" },
    { id: 5, text: "Which property controls the spacing inside an element?", status: "CORRECT", studentAnswer: "padding" },
    { id: 6, text: "Is HTML a programming language?", status: "CORRECT", studentAnswer: "False" },
    { id: 7, text: "Is CSS used for styling web pages?", status: "CORRECT", studentAnswer: "True" },
    { id: 8, text: "Should every HTML page contain a <body> tag?", status: "CORRECT", studentAnswer: "True" },
    { id: 9, text: "Does the <img> tag require a source attribute?", status: "CORRECT", studentAnswer: "True" },
  ]
};

interface PerformanceReviewModalProps {
  visible: boolean;
  student: { name: string; id: string } | null;
  onClose: () => void;
}

export default function PerformanceReviewModal({ visible, student, onClose }: PerformanceReviewModalProps) {
  const [showModal, setShowModal] = React.useState(visible);
  const slideAnim = React.useRef(new Animated.Value(height)).current;
  const fadeAnim = React.useRef(new Animated.Value(0)).current;

  const panResponder = React.useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true, 
      onStartShouldSetPanResponderCapture: () => false, 
      onMoveShouldSetPanResponder: (_, gestureState) => {
        return Math.abs(gestureState.dy) > 2 && Math.abs(gestureState.dy) > Math.abs(gestureState.dx);
      },
      onMoveShouldSetPanResponderCapture: (_, gestureState) => {
        return Math.abs(gestureState.dy) > 2 && Math.abs(gestureState.dy) > Math.abs(gestureState.dx);
      },
      onPanResponderMove: (_, gestureState) => {
        if (gestureState.dy > 0) {
          slideAnim.setValue(gestureState.dy);
          const opacity = Math.max(0, 1 - (gestureState.dy / (height / 2)));
          fadeAnim.setValue(opacity);
        }
      },
      onPanResponderRelease: (_, gestureState) => {
        if (gestureState.dy > 60 || gestureState.vy > 0.3) {
          Animated.parallel([
            Animated.spring(slideAnim, {
              toValue: height,
              useNativeDriver: true,
              velocity: gestureState.vy,
              damping: 20,
              mass: 0.6,
              stiffness: 100,
            }),
            Animated.timing(fadeAnim, {
              toValue: 0,
              duration: 150,
              useNativeDriver: true,
            })
          ]).start(() => {
            onClose();
          });
        } else {
          Animated.parallel([
            Animated.spring(slideAnim, {
              toValue: 0,
              useNativeDriver: true,
              bounciness: 6,
            }),
            Animated.timing(fadeAnim, {
              toValue: 1,
              duration: 200,
              useNativeDriver: true,
            })
          ]).start();
        }
      },
    })
  ).current;

  React.useEffect(() => {
    if (visible) {
      setShowModal(true);
      slideAnim.setValue(height);
      fadeAnim.setValue(0);
      Animated.parallel([
        Animated.spring(slideAnim, {
          toValue: 0,
          useNativeDriver: true,
          damping: 20,
          mass: 0.8,
          stiffness: 100,
        }),
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 250,
          useNativeDriver: true,
        })
      ]).start();
    } else {
      Animated.parallel([
        Animated.timing(slideAnim, {
          toValue: height,
          duration: 250,
          useNativeDriver: true,
        }),
        Animated.timing(fadeAnim, {
          toValue: 0,
          duration: 250,
          useNativeDriver: true,
        })
      ]).start(() => setShowModal(false));
    }
  }, [visible]);

  return (
    <Modal
      visible={showModal}
      transparent
      animationType="none"
      onRequestClose={onClose}
    >
      <View style={styles.overlay}>
        <Animated.View style={[styles.backdrop, { opacity: fadeAnim }]}>
          <TouchableOpacity
            style={styles.backdropTouch}
            activeOpacity={1}
            onPress={onClose}
          />
        </Animated.View>

        <Animated.View
          {...panResponder.panHandlers}
          style={[
            styles.modalContainer,
            { transform: [{ translateY: slideAnim }] }
          ]}
        >
          <View style={styles.dragArea}>
            <View style={styles.dragHandle} />
          </View>

          {/* Modal Header */}
          <View className="flex-row items-center justify-between pb-5 border-b border-[#E2E8F0]">
            <View className="flex-row items-center">
              <Text className="text-[18px] font-bold text-[#1E1E2D] mr-3">Performance Review</Text>
              <View className="bg-[#2A9A46]/10 px-2 py-1 rounded-full">
                <Text className="text-[10px] font-bold text-[#2A9A46] uppercase tracking-wider">Submitted</Text>
              </View>
            </View>
            <TouchableOpacity onPress={onClose} className="p-1">
              <Ionicons name="close" size={24} color="#6B7280" />
            </TouchableOpacity>
          </View>

          <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 40, paddingTop: 16 }}>
            {/* Student Profile Card */}
            <View className="bg-white border border-[#E2E8F0] rounded-[20px] p-5 mb-6">
              <Text className="text-[18px] font-bold text-[#1E1E2D] mb-1">{student?.name}</Text>
              <View className="flex-row items-center mb-4">
                <Text className="text-[12px] text-[#6B7280]">ID: <Text className="font-bold text-[#F67300]">{student?.id}</Text></Text>
                <View className="w-1 h-1 bg-[#D1D5DB] rounded-full mx-2" />
                <Text className="text-[12px] font-medium text-[#4B5563]">{MOCK_REVIEW.status}</Text>
                <View className="w-1 h-1 bg-[#D1D5DB] rounded-full mx-2" />
                <Text className="text-[12px] text-[#808080]">{MOCK_REVIEW.date} · {MOCK_REVIEW.time}</Text>
              </View>
              
              <View className="bg-white border border-[#F2EEF4] rounded-[16px] py-4 items-center">
                <Text className="text-[28px] font-black text-[#F67300]">{MOCK_REVIEW.points}</Text>
                <Text className="text-[11px] font-black text-[#6B7280] uppercase tracking-widest mt-1">Points</Text>
              </View>
            </View>

            {/* Q&A Section */}
            <Text className="text-[13px] font-bold text-[#6B7280] tracking-widest uppercase mb-4">Questions & Answers</Text>
            
            <View className="gap-4 mb-6">
              {MOCK_REVIEW.questions.map((q, i) => {
                const isCorrect = q.status === 'CORRECT';
                return (
                  <View key={q.id} className="bg-white border border-[#E2E8F0] rounded-[20px] p-4">
                    {/* Question Header */}
                    <View className="flex-row items-start justify-between mb-4">
                      <Text className="flex-1 text-[15px] font-bold text-[#1E1E2D] leading-6 mr-3">
                        {i + 1}. {q.text}
                      </Text>
                      <View className={`px-2 py-1 rounded-full flex-row items-center border ${
                        isCorrect ? 'bg-[#2A9A46]/10 border-[#2A9A46]/20' : 'bg-[#FB2C36]/10 border-[#FB2C36]/20'
                      }`}>
                        {isCorrect ? (
                          <TickCircle size={12} color="#2A9A46" variant="Linear" style={{ marginRight: 4 }}/>
                        ) : (
                          <CloseCircle size={12} color="#FB2C36" variant="Linear" style={{ marginRight: 4 }}/>
                        )}
                        <Text className={`text-[10px] font-black tracking-wider ${
                          isCorrect ? 'text-[#2A9A46]' : 'text-[#FB2C36]'
                        }`}>{q.status}</Text>
                      </View>
                    </View>
                    
                    {/* Student Answer */}
                    <View className={`rounded-[16px] p-4 mb-2 border flex-row items-center justify-between ${
                      isCorrect ? 'bg-[#2A9A46]/5 border-[#2A9A46]/20' : 'bg-[#FB2C36]/5 border-[#FB2C36]/20'
                    }`}>
                      <View className="flex-1">
                        <Text className="text-[10px] font-black text-[#6B7280] uppercase tracking-widest mb-1">Student Answer</Text>
                        <Text className={`text-[14px] font-semibold ${isCorrect ? 'text-[#2A9A46]' : 'text-[#E7000B]'}`}>
                          {q.studentAnswer}
                        </Text>
                      </View>
                      {isCorrect ? (
                        <Ionicons name="checkmark" size={18} color="#2A9A46" />
                      ) : (
                        <Ionicons name="close" size={18} color="#E7000B" />
                      )}
                    </View>

                    {/* Correct Answer (if wrong) */}
                    {!isCorrect && q.correctAnswer && (
                      <View className="rounded-[16px] p-4 border bg-[#2A9A46]/5 border-[#2A9A46]/20 flex-row items-center justify-between mt-1">
                          <View className="flex-1">
                          <Text className="text-[10px] font-black text-[#2A9A46] uppercase tracking-widest mb-1">Correct Answer</Text>
                          <Text className="text-[14px] font-semibold text-[#2A9A46]">
                            {q.correctAnswer}
                          </Text>
                        </View>
                      </View>
                    )}
                  </View>
                )
              })}
            </View>

            <TouchableOpacity 
              onPress={onClose}
              className="bg-[#F67300] py-4 rounded-2xl items-center mb-8"
            >
              <Text className="text-white font-bold text-[16px]">Close Review</Text>
            </TouchableOpacity>

          </ScrollView>
        </Animated.View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  backdrop: {
    ...StyleSheet.absoluteFill,
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
  },
  backdropTouch: {
    flex: 1,
  },
  modalContainer: {
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 32,
    borderTopRightRadius: 32,
    paddingTop: 4,
    paddingHorizontal: 24,
    height: height * 0.9,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: -4,
    },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 20,
  },
  dragArea: {
    width: '100%',
    paddingVertical: 12,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 8,
    backgroundColor: 'transparent',
  },
  dragHandle: {
    width: 48,
    height: 5,
    borderRadius: 3,
    backgroundColor: '#E5E7EB',
  },
});
