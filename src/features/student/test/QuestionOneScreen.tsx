import GoBack from '@/components/GoBack';
import { useTabBarVisibility } from '@/context/TabBarVisibilityContext';
import { Feather } from '@expo/vector-icons';
import { router } from 'expo-router';
import { Clock, ArrowRight2, ArrowLeft2 } from 'iconsax-react-native';
import React, { useEffect, useRef, useState } from 'react';
import { Bookmark, BookmarkOff, ChevronLeft, ChevronRight, AlertCircle } from "lucide-react-native";
import {
  ScrollView,
  StatusBar,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Alert,
  BackHandler,
} from 'react-native';
import { withTiming } from 'react-native-reanimated';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Modal } from 'react-native';

// ─── Data ─────────────────────────────────────────────────────────────────────

type QuestionType = 'mcq' | 'checkbox' | 'shortanswer' | 'longanswer';

interface Question {
  id: number;
  type: QuestionType;
  question: string;
  options?: string[];
  correct?: number | number[]; // Optional for this UI
}

const QUESTIONS: Question[] = [
  {
    id: 1,
    type: 'mcq',
    question: 'What does HTML stand for?',
    options: [
      'Hyper Text Markup Language',
      'High Text Machine Language',
      'Hyper Tool Multi Language',
      'Home Text Markup Language',
    ],
  },
  {
    id: 2,
    type: 'checkbox',
    question: 'Which of the following are JavaScript frameworks or libraries? (Select all that apply)',
    options: ['Django', 'Laravel', 'React', 'Vue', 'Spring Boot'],
  },
  {
    id: 3,
    type: 'shortanswer',
    question: 'What does CSS stand for?',
  },
  {
    id: 4,
    type: 'longanswer',
    question: 'Explain how React works under the hood (Virtual DOM, reconciliation, etc.).',
  },
  {
    id: 5,
    type: 'mcq',
    question: 'What is the correct way to declare a variable in modern JavaScript?',
    options: [
      'variable x = 5',
      'let x = 5',
      'x := 5',
      'declare x = 5',
    ],
  },

];

const TOTAL_SECONDS = 60 * 60; // 60 minutes
const ORANGE = '#F67300';

// ─── Helpers ──────────────────────────────────────────────────────────────────

function formatTime(secs: number) {
  const m = Math.floor(secs / 60).toString().padStart(2, '0');
  const s = (secs % 60).toString().padStart(2, '0');
  return `${m}:${s}`;
}

// ─── Options Component ────────────────────────────────────────────────────────

function OptionRow({
  label,
  selected,
  onPress,
  type,
}: {
  label: string;
  selected: boolean;
  onPress: () => void;
  type: 'radio' | 'checkbox';
}) {
  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.75}
      className={`flex-row items-center rounded-[14px] py-[16px] px-4 mb-3 border-[1.5px] ${
        selected ? 'bg-[#FFF7F0] border-[#F67300]' : 'bg-[#fff] border-[#EFEFEF]'
      }`}
    >
      {/* Icon (Radio or Checkbox) */}
      <View
        className={`w-[22px] h-[22px] items-center justify-center mr-3.5 ${
          type === 'radio' ? 'rounded-[11px]' : 'rounded-[6px]'
        } border-2 ${
          selected
            ? type === 'radio'
              ? 'border-[#F67300]'
              : 'border-[#F67300] bg-[#F67300]'
            : 'border-[#CCC] bg-transparent'
        }`}
      >
        {selected && type === 'radio' && (
          <View className="w-[11px] h-[11px] rounded-[6px] bg-[#F67300]" />
        )}
        {selected && type === 'checkbox' && (
          <Feather name="check" size={14} color="#FFF" />
        )}
      </View>

      <Text
        className={`text-[15px] flex-1 ${
          selected ? 'text-[#333] font-semibold' : 'text-[#444]'
        }`}
      >
        {label}
      </Text>
    </TouchableOpacity>
  );
}

// ─── Screen ───────────────────────────────────────────────────────────────────

export default function QuestionOneScreen() {
  const [currentQ, setCurrentQ] = useState(0);
  const [pageGroup, setPageGroup] = useState(0);
  const [answers, setAnswers] = useState<any[]>(new Array(QUESTIONS.length).fill(null));
  const [marked, setMarked] = useState<boolean[]>(new Array(QUESTIONS.length).fill(false));
  const [timeLeft, setTimeLeft] = useState(TOTAL_SECONDS);

  // Sync pageGroup when currentQ changes
  useEffect(() => {
    setPageGroup(Math.floor(currentQ / 5));
  }, [currentQ]);

  // Hide bottom tab bar while inside the test
  const { tabBarOffset } = useTabBarVisibility();
  useEffect(() => {
    tabBarOffset.value = withTiming(120, { duration: 200 });
    return () => {
      tabBarOffset.value = withTiming(0, { duration: 200 });
    };
  }, []);

  const [showBackAlert, setShowBackAlert] = useState(false);

  const handleBack = () => {
    setShowBackAlert(true);
    return true; // Prevents default hardware back button behavior
  };

  useEffect(() => {
    const backHandler = BackHandler.addEventListener('hardwareBackPress', handleBack);
    return () => backHandler.remove();
  }, []);

  // Countdown timer
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  useEffect(() => {
    timerRef.current = setInterval(() => {
      setTimeLeft((t) => (t > 0 ? t - 1 : 0));
    }, 1000);
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, []);

  const q = QUESTIONS[currentQ];
  const selectedOption = answers[currentQ];
  const isMarked = marked[currentQ];
  
  // Calculate attempted based on empty arrays/strings as well
  const attempted = answers.filter((a) => {
    if (a === null || a === undefined) return false;
    if (typeof a === 'string' && a.trim() === '') return false;
    if (Array.isArray(a) && a.length === 0) return false;
    return true;
  }).length;

  const selectMcqOption = (idx: number) => {
    setAnswers((prev) => {
      const copy = [...prev];
      copy[currentQ] = idx;
      return copy;
    });
  };

  const toggleCheckboxOption = (idx: number) => {
    setAnswers((prev) => {
      const copy = [...prev];
      const currentArr = Array.isArray(copy[currentQ]) ? copy[currentQ] : [];
      if (currentArr.includes(idx)) {
        copy[currentQ] = currentArr.filter((i: number) => i !== idx);
        if (copy[currentQ].length === 0) copy[currentQ] = null;
      } else {
        copy[currentQ] = [...currentArr, idx];
      }
      return copy;
    });
  };

  const updateTextAnswer = (text: string) => {
    setAnswers((prev) => {
      const copy = [...prev];
      copy[currentQ] = text;
      return copy;
    });
  };

  const clearChoice = () => {
    setAnswers((prev) => {
      const copy = [...prev];
      copy[currentQ] = null;
      return copy;
    });
  };

  const toggleMark = () => {
    setMarked((prev) => {
      const copy = [...prev];
      copy[currentQ] = !copy[currentQ];
      return copy;
    });
  };

  const goNext = () => {
    if (currentQ < QUESTIONS.length - 1) setCurrentQ((q) => q + 1);
  };

  const goPrev = () => {
    if (currentQ > 0) setCurrentQ((q) => q - 1);
  };

  const isLast = currentQ === QUESTIONS.length - 1;
  const maxGroup = Math.ceil(QUESTIONS.length / 5) - 1;

  // Determine if we have an answer for the current question
  const hasAnswer = () => {
    if (selectedOption === null || selectedOption === undefined) return false;
    if (typeof selectedOption === 'string' && selectedOption.trim() === '') return false;
    if (Array.isArray(selectedOption) && selectedOption.length === 0) return false;
    return true;
  };

  return (
    <SafeAreaView className="flex-1 bg-white" edges={['top', 'left', 'right']}>
      <StatusBar backgroundColor="#FFFFFF" barStyle="dark-content" />

      {/* ── TOP HEADER ── */}
      <View className="flex-row items-center px-5 py-3 border-b border-[#F2EEF4] bg-white gap-2.5">
        <GoBack onPress={handleBack} />
        <View className="flex-1 items-center">
          <Text className="text-[15px] font-semibold text-[#1E1E2D]">React Fundamentals</Text>
          <Text className="text-[11px] text-[#999] mt-[1px]">Sample Test</Text>
        </View>
        {/* Timer pill in header */}
        <View className="flex-row items-center gap-1.5 bg-[#FFF0E5] px-3.5 py-[9px] rounded-[24px]">
          <Clock size={14} color={ORANGE} variant="Bold" />
          <Text className="text-[15px] font-bold text-[#F67300]">{formatTime(timeLeft)}</Text>
        </View>
      </View>

      {/* ── QUESTION PAGINATION ── */}
      <View className="flex-row items-center justify-center py-6 px-5 border-b border-[#F2EEF4] bg-white gap-2">
        <TouchableOpacity
          onPress={() => setPageGroup(g => Math.max(0, g - 1))}
          disabled={pageGroup === 0}
          className={`w-9 h-9 items-center justify-center ${pageGroup === 0 ? 'opacity-30' : ''}`}
        >
          <Feather name="chevron-left" size={20} color="#444" />
        </TouchableOpacity>

        <View className="flex-row gap-2 flex-shrink flex-wrap justify-center">
          {Array.from({ length: Math.min(5, QUESTIONS.length - pageGroup * 5) }).map((_, idx) => {
            const i = pageGroup * 5 + idx;
            const isCurrent = i === currentQ;
            const ans = answers[i];
            const isAnswered = ans !== null && ans !== undefined && (typeof ans === 'string' ? ans.trim() !== '' : (Array.isArray(ans) ? ans.length > 0 : true));
            const isBookmark = marked[i];

            let boxClasses = 'w-[38px] h-[38px] rounded-[10px] border-[1.5px] items-center justify-center ';
            let textClasses = 'text-[14px] font-bold ';

            if (isCurrent) {
              boxClasses += 'border-[#F67300] bg-[#FFF7F0]';
              textClasses += 'text-[#F67300]';
            } else if (isAnswered) {
              boxClasses += 'border-[#1DD75B] bg-[#1DD75B]';
              textClasses += 'text-white';
            } else if (isBookmark) {
              boxClasses += 'border-[#6366F1] bg-[#6366F1]';
              textClasses += 'text-white';
            } else {
              boxClasses += 'border-[#E5E5E5] bg-white';
              textClasses += 'text-[#444]';
            }

            return (
              <TouchableOpacity
                key={i}
                onPress={() => setCurrentQ(i)}
                className={boxClasses}
              >
                <Text className={textClasses}>{i + 1}</Text>
              </TouchableOpacity>
            );
          })}
        </View>

        <TouchableOpacity
          onPress={() => setPageGroup(g => Math.min(maxGroup, g + 1))}
          disabled={pageGroup === maxGroup}
          className={`w-9 h-9 items-center justify-center ${
            pageGroup === maxGroup ? 'opacity-30' : ''
          }`}
        >
          <Feather name="chevron-right" size={20} color="#444" />
        </TouchableOpacity>
      </View>

      {/* ── MAIN CONTENT ── */}
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: 20, paddingTop: 24, paddingBottom: 32 }}
        keyboardShouldPersistTaps="handled"
      >
        {/* ASSESSMENT label + Mark for Revisit */}
        <View className="flex-row justify-between items-center mb-4">
          <View>
            <Text className="text-[#F67300] text-[12px] font-bold tracking-[1px] mb-0.5">ASSESSMENT</Text>
            <Text className="text-[26px] font-bold text-[#333] mb-4">
              Question {currentQ + 1}
            </Text>
          </View>
          <TouchableOpacity
            onPress={toggleMark}
            className="flex-row items-center gap-[5px] bg-[#F9FAFB] px-4 py-[9px] rounded-[20px] border border-[#F3F4F6]"
          >
            {isMarked ? (
              <BookmarkOff size={14} fill={ORANGE} color={ORANGE} />
            ) : (
              <Bookmark size={14} color="#888" />
            )}
            <Text
              className={`text-[13px] font-semibold ${
                isMarked ? 'text-[#F67300]' : 'text-[#888]'
              }`}
            >
              {isMarked ? 'Marked' : 'Mark for Revisit'}
            </Text>
          </TouchableOpacity>
        </View>

        {/* Question text */}
        <Text className="text-[16px] text-[#333] leading-[26px] mb-10">{q.question}</Text>

        {/* ─── DYNAMIC INPUT TYPES ─── */}
        
        {/* OPTIONS header (only for choices) */}
        {(q.type === 'mcq' || q.type === 'checkbox') && (
          <View className="flex-row justify-between items-center mb-5">
            <Text className="text-[11px] font-bold tracking-[1.2px] text-[#99A1AF]">OPTIONS</Text>
            {hasAnswer() && (
              <TouchableOpacity onPress={clearChoice}>
                <Text className="text-[11px] font-semibold tracking-[1.2px] text-[#99A1AF]">CLEAR CHOICE</Text>
              </TouchableOpacity>
            )}
          </View>
        )}

        {q.type === 'mcq' &&
          q.options?.map((opt, idx) => (
            <OptionRow
              key={idx}
              label={opt}
              selected={selectedOption === idx}
              onPress={() => selectMcqOption(idx)}
              type="radio"
            />
          ))}

        {q.type === 'checkbox' &&
          q.options?.map((opt, idx) => {
            const isSelected = Array.isArray(selectedOption) && selectedOption.includes(idx);
            return (
              <OptionRow
                key={idx}
                label={opt}
                selected={isSelected}
                onPress={() => toggleCheckboxOption(idx)}
                type="checkbox"
              />
            );
          })}

        {q.type === 'shortanswer' && (
          <View>
            <View className="flex-row justify-between items-center mb-3">
              <Text className="text-[11px] font-bold tracking-[1.2px] text-[#99A1AF]">YOUR ANSWER</Text>
              {hasAnswer() && (
                <TouchableOpacity onPress={clearChoice}>
                  <Text className="text-[11px] font-semibold tracking-[1.2px] text-[#99A1AF]">CLEAR</Text>
                </TouchableOpacity>
              )}
            </View>
            <TextInput
              value={typeof selectedOption === 'string' ? selectedOption : ''}
              onChangeText={updateTextAnswer}
              placeholder="Type your answer here..."
              placeholderTextColor="#AAA"
              multiline={true}
              textAlignVertical="top"
              maxLength={100}
              className="bg-[#FAFAFA] border-[1.5px] border-[#EFEFEF] rounded-[14px] px-5 py-4 text-[15px] text-[#333] min-h-[55px]"
            />
            <Text className="text-right text-[11px] text-[#AAA] mt-2">
              {(typeof selectedOption === 'string' ? selectedOption.length : 0)} / 100
            </Text>
          </View>
        )}

        {q.type === 'longanswer' && (
          <View>
            <View className="flex-row justify-between items-center mb-3">
              <Text className="text-[11px] font-bold tracking-[1.2px] text-[#99A1AF]">YOUR DETAILED ANSWER</Text>
              {hasAnswer() && (
                <TouchableOpacity onPress={clearChoice}>
                  <Text className="text-[11px] font-semibold tracking-[1.2px] text-[#99A1AF]">CLEAR</Text>
                </TouchableOpacity>
              )}
            </View>
            <TextInput
              value={typeof selectedOption === 'string' ? selectedOption : ''}
              onChangeText={updateTextAnswer}
              placeholder="Type your detailed answer here..."
              placeholderTextColor="#AAA"
              multiline
              maxLength={1000}
              textAlignVertical="top"
              className="bg-[#FAFAFA] border-[1.5px] border-[#EFEFEF] rounded-[14px] px-5 py-4 text-[15px] text-[#333] min-h-[140px]"
            />
            <Text className="text-right text-[11px] text-[#AAA] mt-2">
              {(typeof selectedOption === 'string' ? selectedOption.length : 0)} / 1000
            </Text>
          </View>
        )}

        {/* Attempted counter */}
        <Text className="text-[13px] text-[#888] font-medium mb-5 mt-6">
          Attempted {attempted}/{QUESTIONS.length}
        </Text>

        {/* Prev / Next */}
        <View className="flex-row items-center gap-2.5">
          {currentQ > 0 && (
            <TouchableOpacity
              onPress={goPrev}
              className="flex-row items-center justify-center gap-2 px-5 py-[13px] rounded-xl border-[1.5px] border-[#E5E5E5]"
            >
              <ChevronLeft size={16} color="#4d4d4d" />
              <Text className="text-[14px] font-semibold text-[#4d4d4d]">Previous</Text>
            </TouchableOpacity>
          )}
          <View className="flex-1" />
          <TouchableOpacity
            onPress={isLast ? () => router.push('/(student)/tests/question-two') : goNext}
            className="flex-row items-center justify-center gap-2 px-7 py-[13px] rounded-xl bg-[#F67300]"
          >
            <Text className="text-[14px] font-bold text-white">
              {isLast ? 'Submit Test' : 'Next'}
            </Text>
            {!isLast && <ChevronRight size={16} color="white" />}
          </TouchableOpacity>
        </View>
      </ScrollView>

      {/* ── STICKY BOTTOM BAR ── */}
      <View className="flex-row items-center px-5 py-3.5 border-t border-[#F2EEF4] bg-white gap-3">
        {/* Test info */}
        <View className="flex-1">
          <Text className="text-[14px] font-semibold text-[#1E1E2D]">React Fundamentals</Text>
          <Text className="text-[12px] text-[#999] mt-[1px]">Sample Test</Text>
        </View>

        {/* Finish */}
        <TouchableOpacity
          onPress={() => router.push('/(student)/tests/question-two')}
          className="bg-[#F67300] px-5 py-[11px] rounded-[24px]"
          activeOpacity={0.85}
        >
          <Text className="text-[14px] font-bold text-white">Finish Test</Text>
        </TouchableOpacity>
      </View>

      {/* ── SIMPLE CLEAN BACK ALERT MODAL ── */}
      <Modal visible={showBackAlert} transparent animationType="fade" statusBarTranslucent>
        <View className="flex-1 bg-black/40 items-center justify-center px-6">
          <View className="bg-white rounded-3xl px-6 py-8 w-full max-w-[320px] items-center">
            
            <Text className="text-[20px] font-semibold text-[#111] mb-3 text-center">
              Submit Test?
            </Text>
            <Text className="text-[14px] text-[#555] text-center mb-6 leading-5">
              If you go back, your test will be submitted automatically.
            </Text>
            
            <View className="flex-row w-full gap-3">
              <TouchableOpacity
                activeOpacity={0.7}
                onPress={() => setShowBackAlert(false)}
                className="flex-1 py-3 rounded-xl bg-[#F5F5F5] items-center justify-center"
              >
                <Text className="text-[14px] font-semibold text-[#444]">Cancel</Text>
              </TouchableOpacity>
              
              <TouchableOpacity
                activeOpacity={0.7}
                onPress={() => {
                  setShowBackAlert(false);
                  router.back();
                }}
                className="flex-1 py-3 rounded-xl bg-[#F67300] items-center justify-center"
              >
                <Text className="text-[14px] font-semibold text-white">Submit</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

    </SafeAreaView>
  );
}