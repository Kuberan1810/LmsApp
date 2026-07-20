import { View, Text, ScrollView, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import React, { useState } from 'react';
import Header from '@/components/Student/Header';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import Svg, { Circle, G, Defs, LinearGradient, Stop } from 'react-native-svg';
import { TrendUp, TickCircle, CloseCircle, MinusCirlce, ArrowLeft2, ArrowDown2, ArrowUp2 } from 'iconsax-react-native';

const MOCK_RESULTS = [
  {
    id: 1,
    question: 'What does HTML stand for?',
    status: 'Wrong',
    marks: '0/2 marks',
    yourAnswer: 'Home Text Markup Language',
    correctAnswer: 'Hyper Text Markup Language',
  },
  {
    id: 2,
    question: 'Which HTML tag is used to create a hyperlink?',
    status: 'Correct',
    marks: '2/2 marks',
    yourAnswer: '<a href>',
    correctAnswer: null,
  },
  {
    id: 3,
    question: 'Which CSS property changes the text color?',
    status: 'Correct',
    marks: '2/2 marks',
    yourAnswer: 'color',
    correctAnswer: null,
  },
  {
    id: 4,
    question: 'Which selector selects an element by its ID?',
    status: 'Correct',
    marks: '2/2 marks',
    yourAnswer: '#container',
    correctAnswer: null,
  },
];

const { width } = Dimensions.get('window');
// Calculate width for 2 columns with gap
const statCardWidth = (width - 40 - 40 - 12) / 2; // (screenWidth - paddingHorizontal(20) - innerCardPadding(20) - gap(12)) / 2

export default function TestResultScreen() {
  const router = useRouter();
  const [activeFilter, setActiveFilter] = useState('All (9)');
  const [expanded, setExpanded] = useState<Record<number, boolean>>({
    1: true,
    2: true,
    3: true,
    4: true,
  });

  const toggleExpand = (id: number) => {
    setExpanded(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const filters = ['All (9)', 'Correct (8)', 'Wrong (1)', 'Skipped (0)'];

  // Donut Chart logic for 86%
  const radius = 56;
  const strokeWidth = 9.33;
  const circumference = 2 * Math.PI * radius;
  const progressOffset = circumference - (0.86 * circumference);

  return (
    <SafeAreaView className="flex-1 bg-[#FAFAFA]" edges={['top', 'left', 'right']}>
      <Header
        title="Test Result"
        onBackPress={() => router.back()}
        showSearch={false}
        showNotification={false}
        titleAlign="center"
      />

      <ScrollView 
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: 20, paddingBottom: 100, paddingTop: 10 }}
      >
        {/* ── BIG OUTER CARD ── */}
        <View className="bg-white rounded-[32px] p-6 mb-8 border border-[#E2E8F0]">
          
          {/* TOP SECTION: Donut & Details */}
          <View className="flex-row items-center mb-8">
            {/* Donut Chart */}
            <View className="relative items-center justify-center mr-5">
              <Svg width={radius * 2 + strokeWidth * 2} height={radius * 2 + strokeWidth * 2} viewBox={`0 0 ${radius * 2 + strokeWidth * 2} ${radius * 2 + strokeWidth * 2}`}>
                <Defs>
                  <LinearGradient id="grad" x1="0" y1="0" x2="1" y2="1">
                    <Stop offset="0" stopColor="#2A9A46" stopOpacity="1" />
                    <Stop offset="1" stopColor="#1F7A35" stopOpacity="1" />
                  </LinearGradient>
                </Defs>
                <G rotation="-90" origin={`${radius + strokeWidth}, ${radius + strokeWidth}`}>
                  <Circle cx={radius + strokeWidth} cy={radius + strokeWidth} r={radius} stroke="#F0F0F0" strokeWidth={strokeWidth} fill="transparent" />
                  <Circle 
                    cx={radius + strokeWidth} cy={radius + strokeWidth} r={radius} 
                    stroke="url(#grad)" strokeWidth={strokeWidth} fill="transparent" 
                    strokeDasharray={circumference}
                    strokeDashoffset={progressOffset}
                    strokeLinecap="round"
                  />
                </G>
              </Svg>
              <View className="absolute items-center justify-center">
                <Text className="text-[26px] font-bold text-[#333]">86%</Text>
                <Text className="text-[10px] font-bold text-[#2A9A46] tracking-wide mt-1">GRADE A</Text>
              </View>
            </View>

            {/* Details */}
            <View className="flex-1">
              <Text className="font-black text-[#F67300] uppercase mb-1" style={{ fontSize: 10, letterSpacing: 1, lineHeight: 15 }}>PERFORMANCE SUMMARY</Text>
              <Text className="font-bold text-[#333333] mb-1" style={{ fontSize: 24, letterSpacing: -0.6, lineHeight: 32 }}>Sample</Text>
              <Text className="font-medium text-[#626262]" style={{ fontSize: 14, lineHeight: 20 }}>9 Questions · 14 Total Marks</Text>
            </View>
          </View>

          {/* ── STATS GRID ── */}
          <View className="flex-row flex-wrap justify-between gap-y-3">
            {/* Score */}
            <View style={{ width: statCardWidth, height: 152 }} className="bg-white border border-[#E2E8F0] rounded-[28px] p-5 justify-between">
              <View className="w-10 h-10 rounded-2xl bg-[#FFF3E8] items-center justify-center">
                <TrendUp size={20} color="#F67300" variant="Bold" />
              </View>
              <View>
                <Text className="font-semibold text-[#767676] mb-1" style={{ fontSize: 16, lineHeight: 24 }}>Score</Text>
                <Text className="font-bold text-[#333333] mb-1" style={{ fontSize: 18, lineHeight: 28 }}>12/14</Text>
                <Text className="font-medium text-[#767676]" style={{ fontSize: 12, lineHeight: 12 }}>Grade A (85.71%)</Text>
              </View>
            </View>

            {/* Correct */}
            <View style={{ width: statCardWidth, height: 152 }} className="bg-white border border-[#E2E8F0] rounded-[28px] p-5 justify-between">
              <View className="w-10 h-10 rounded-2xl bg-[#E8F8F0] items-center justify-center">
                <TickCircle size={20} color="#1DD75B" variant="Bold" />
              </View>
              <View>
                <Text className="font-semibold text-[#767676] mb-1" style={{ fontSize: 16, lineHeight: 24 }}>Correct</Text>
                <View className="flex-row items-baseline gap-1.5 mb-1">
                  <Text className="font-bold text-[#333333]" style={{ fontSize: 18, lineHeight: 28 }}>8</Text>
                  <Text className="font-medium text-[#767676]" style={{ fontSize: 12, lineHeight: 12 }}>89% of test</Text>
                </View>
              </View>
            </View>

            {/* Wrong */}
            <View style={{ width: statCardWidth, height: 152 }} className="bg-white border border-[#E2E8F0] rounded-[28px] p-5 justify-between">
              <View className="w-10 h-10 rounded-2xl bg-[#FDE8E8] items-center justify-center">
                <CloseCircle size={20} color="#E61026" variant="Bold" />
              </View>
              <View>
                <Text className="font-semibold text-[#767676] mb-1" style={{ fontSize: 16, lineHeight: 24 }}>Wrong</Text>
                <View className="flex-row items-baseline gap-1.5 mb-1">
                  <Text className="font-bold text-[#333333]" style={{ fontSize: 18, lineHeight: 28 }}>1</Text>
                  <Text className="font-medium text-[#767676]" style={{ fontSize: 12, lineHeight: 12 }}>11% of test</Text>
                </View>
              </View>
            </View>

            {/* Skipped */}
            <View style={{ width: statCardWidth, height: 152 }} className="bg-white border border-[#E2E8F0] rounded-[28px] p-5 justify-between">
              <View className="w-10 h-10 rounded-2xl bg-[#F5F5F5] items-center justify-center">
                <MinusCirlce size={20} color="#888" variant="Bold" />
              </View>
              <View>
                <Text className="font-semibold text-[#767676] mb-1" style={{ fontSize: 16, lineHeight: 24 }}>Skipped</Text>
                <View className="flex-row items-baseline gap-1.5 mb-1">
                  <Text className="font-bold text-[#333333]" style={{ fontSize: 18, lineHeight: 28 }}>0</Text>
                  <Text className="font-medium text-[#767676]" style={{ fontSize: 12, lineHeight: 12 }}>0% of test</Text>
                </View>
              </View>
            </View>
          </View>
        </View>

        {/* ── TEST RESULT TITLE & FILTERS ── */}
        <Text className="font-bold text-[#333333] mb-1" style={{ fontSize: 20, lineHeight: 36 }}>Test Result</Text>
        <Text className="font-normal text-[#626262] mb-5" style={{ fontSize: 18, lineHeight: 28 }}>Choose a test to view details and start when scheduled.</Text>

        <View className="mb-6 flex-row bg-[#FAFAFA] rounded-[16px] border border-[#E2E8F0] p-1.5 self-start">
          {filters.map((filter) => {
            const isSelected = activeFilter === filter;
            return (
              <TouchableOpacity
                key={filter}
                onPress={() => setActiveFilter(filter)}
                className={`px-5 py-2.5 rounded-[12px] flex-row items-center justify-center mr-1 last:mr-0 ${
                  isSelected ? 'bg-white' : ''
                }`}
                style={isSelected ? {
                  shadowColor: '#000',
                  shadowOffset: { width: 0, height: 1 },
                  shadowOpacity: 0.1,
                  shadowRadius: 3,
                  elevation: 2,
                } : {}}
              >
                <Text className="font-bold" style={{
                  fontSize: 12,
                  lineHeight: 16,
                  color: isSelected ? '#FF6900' : '#62748E',
                }}>
                  {filter}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>

        {/* ── QUESTION LIST ── */}
        {MOCK_RESULTS.map((item, index) => {
          const isExpanded = expanded[item.id];
          const isWrong = item.status === 'Wrong';
          const isCorrect = item.status === 'Correct';
          const isSkipped = item.status === 'Skipped';

          return (
            <View key={item.id} className="bg-white rounded-[20px] p-5 mb-4 border border-[#F2EEF4] shadow-sm">
              <TouchableOpacity onPress={() => toggleExpand(item.id)} className="flex-row justify-between items-start mb-3" activeOpacity={0.7}>
                <View className="flex-row items-center flex-1">
                  {/* Number Badge */}
                  <View className={`w-8 h-8 rounded-[8px] items-center justify-center mr-3 ${
                    isWrong ? 'bg-[#FEE2E2]' : isCorrect ? 'bg-[#E8F8F0]' : 'bg-[#F5F5F5]'
                  }`}>
                    <Text className="font-black" style={{
                      fontSize: 12,
                      lineHeight: 16,
                      color: isWrong ? '#FB2C36' : isCorrect ? '#2A9A46' : '#888'
                    }}>{item.id}</Text>
                  </View>

                  <View className="flex-1 flex-row items-center justify-between">
                    <View className="flex-row items-center gap-2">
                      <Text className="font-black text-[#F67300] uppercase" style={{ fontSize: 10, lineHeight: 15, letterSpacing: 1 }}>QUESTION {item.id}</Text>
                      <View className={`flex-row items-center px-2 py-0.5 rounded-full ${
                        isWrong ? 'bg-[#FDE8E8]' : isCorrect ? 'bg-[#E8F8F0]' : 'bg-[#F5F5F5]'
                      }`}>
                        {isWrong && <CloseCircle size={12} color="#FB2C36" variant="Bold" style={{ marginRight: 4 }} />}
                        {isCorrect && <TickCircle size={12} color="#2A9A46" variant="Bold" style={{ marginRight: 4 }} />}
                        <Text className="font-black uppercase" style={{
                          fontSize: 9,
                          lineHeight: 13.5,
                          letterSpacing: 0.45,
                          color: isWrong ? '#FB2C36' : isCorrect ? '#2A9A46' : '#888'
                        }}>{item.status}</Text>
                      </View>
                    </View>
                    <Text className="font-bold text-[#626262]" style={{ fontSize: 12, lineHeight: 16 }}>{item.marks}</Text>
                  </View>
                </View>
                <View className="pt-2 pl-2">
                  {isExpanded ? <ArrowUp2 size={16} color="#AAA" /> : <ArrowDown2 size={16} color="#AAA" />}
                </View>
              </TouchableOpacity>

              {isExpanded && (
                <View>
                  <Text className="font-semibold text-[#333] mb-4" style={{ fontSize: 15, lineHeight: 20.63 }}>
                    {item.question}
                  </Text>

                  {/* Your Answer */}
                  <View className="rounded-[12px] p-4 mb-2 border" style={{
                    backgroundColor: isWrong ? 'rgba(251,44,54,0.05)' : isCorrect ? 'rgba(42,154,70,0.05)' : '#FAFAFA',
                    borderColor: isWrong ? 'rgba(255,100,103,0.4)' : isCorrect ? 'rgba(42,154,70,0.4)' : '#F2EEF4',
                  }}>
                    <View className="flex-row justify-between items-center mb-2">
                      <Text className="font-black text-[#626262] uppercase" style={{ fontSize: 11, lineHeight: 16.5, letterSpacing: 0.55 }}>YOUR ANSWER</Text>
                      <View className="px-2 py-1 flex-row items-center">
                        {isWrong && <CloseCircle size={12} color="#FB2C36" variant="Bold" style={{ marginRight: 4 }} />}
                        {isCorrect && <TickCircle size={12} color="#2A9A46" variant="Bold" style={{ marginRight: 4 }} />}
                        <Text className="font-black" style={{
                          fontSize: 10,
                          lineHeight: 15,
                          color: isWrong ? '#FB2C36' : isCorrect ? '#2A9A46' : '#888'
                        }}>{isSkipped ? 'Skipped' : item.status}</Text>
                      </View>
                    </View>
                    <Text className="font-semibold" style={{
                      fontSize: 14,
                      lineHeight: 21,
                      color: isWrong ? '#E7000B' : isCorrect ? '#2A9A46' : '#888'
                    }}>
                      {item.yourAnswer || 'No answer provided'}
                    </Text>
                  </View>

                  {/* Correct Answer (if wrong or skipped) */}
                  {(isWrong || isSkipped) && item.correctAnswer && (
                    <View className="rounded-[12px] p-4 border" style={{
                      backgroundColor: 'rgba(42,154,70,0.05)',
                      borderColor: 'rgba(42,154,70,0.4)',
                    }}>
                      <View className="flex-row justify-between items-center mb-2">
                        <Text className="font-black text-[#626262] uppercase" style={{ fontSize: 11, lineHeight: 16.5, letterSpacing: 0.55 }}>CORRECT ANSWER</Text>
                        <View className="bg-[#E8F8F0] px-2 py-1 rounded-full flex-row items-center">
                          <Text className="font-black text-[#2A9A46]" style={{ fontSize: 10, lineHeight: 15 }}>Correct Answer</Text>
                        </View>
                      </View>
                      <Text className="font-semibold text-[#2A9A46]" style={{ fontSize: 14, lineHeight: 21 }}>{item.correctAnswer}</Text>
                    </View>
                  )}
                </View>
              )}
            </View>
          );
        })}
      </ScrollView>

      {/* ── BOTTOM ACTION BAR ── */}
      <View className="absolute bottom-6 right-6">
        <TouchableOpacity 
          onPress={() => router.replace('/(student)/tests')}
          className="bg-[#F67300] px-6 py-4 rounded-full flex-row items-center shadow-lg shadow-[#F67300]/30"
          activeOpacity={0.8}
        >
          <ArrowLeft2 size={18} color="#FFF" />
          <Text className="text-white font-semibold text-[15px] ml-2">Back to Tests</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
