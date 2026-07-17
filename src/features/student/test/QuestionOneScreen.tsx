import { useState } from 'react';
import { ScrollView, StatusBar, Text, TouchableOpacity, View } from 'react-native';
import { Feather } from '@expo/vector-icons';
import React from 'react';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import GoBack from '@/components/GoBack';
import BtnMainCom from '@/components/BtnMainComp';

export default function QuestionOneScreen() {
  const router = useRouter();
  const [selectedOption, setSelectedOption] = useState('');

  const options = [
    'Data Science',
    'Web Development',
    'Artificial Intelligence',
    'Cloud Computing',
  ];

  return (
    <SafeAreaView className="flex-1 bg-[#FAFAFA]" edges={['top', 'left', 'right']}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 60, paddingHorizontal: 18 }}
      >
        <StatusBar backgroundColor="#FAFAFA" barStyle="dark-content" />

        {/* HEADER */}
        <View className="flex-row justify-between items-center mt-5">
          <GoBack />

          <View className="flex-row items-center">
            <Feather name="clock" size={16} color="#333" />
            <Text className="text-[#444] text-[13px] ml-1.5 mr-3.5 font-medium">
              00:20:00
            </Text>

            <TouchableOpacity className="bg-[#FFE8D5] px-4 py-2.5 rounded-xl">
              <Text className="text-[#EE8B3A] text-[13px] font-bold">
                Finish Test
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* PAGINATION */}
        <View className="flex-row justify-center items-center my-9">
          <Feather name="chevron-left" size={20} color="#444" />

          <TouchableOpacity className="w-9 h-9 border border-[#EE8B3A] rounded-xl justify-center items-center mx-1.5 bg-[#EE8B3A]/10">
            <Text className="text-[#EE8B3A] text-[16px] font-bold">1</Text>
          </TouchableOpacity>

          <TouchableOpacity className="w-9 h-9 border border-[#E5E5E5] rounded-xl justify-center items-center mx-1.5 bg-white">
            <Text className="text-[#333] text-[16px] font-semibold">2</Text>
          </TouchableOpacity>

          <TouchableOpacity className="w-9 h-9 border border-[#E5E5E5] rounded-xl justify-center items-center mx-1.5 bg-white">
            <Text className="text-[#333] text-[16px] font-semibold">3</Text>
          </TouchableOpacity>

          <Feather name="chevron-right" size={20} color="#444" />
        </View>

        {/* ATTEMPTED */}
        <Text className="self-end text-[#333] font-medium mb-3 text-[14px]">
          Attempted 0/20
        </Text>

        {/* QUESTION CARD */}
        <View className="bg-white rounded-2xl p-5 border border-[#F2EEF4] shadow-sm mb-6">
          <View className="flex-row justify-between items-center mb-3">
            <Text className="text-[#111] text-[16px] font-bold">
              Question 1
            </Text>
            <Feather name="bookmark" size={16} color="#666" />
          </View>

          <Text className="text-[#333] text-[18px] font-medium leading-7">
            Machine Learning is a subset of which field?
          </Text>
        </View>

        {/* OPTION HEADER */}
        <View className="flex-row justify-between items-center mt-2 mb-4">
          <Text className="text-[#808080] text-[14px] font-medium">
            Select an Option
          </Text>

          <TouchableOpacity className="border border-[#F2EEF4] bg-white px-3 py-2 rounded-xl">
            <Text className="text-[#666] text-[12px] font-semibold">
              Clear Response
            </Text>
          </TouchableOpacity>
        </View>

        {/* OPTIONS */}
        {options.map((item, index) => (
          <TouchableOpacity
            key={index}
            className="bg-white border border-[#F2EEF4] rounded-2xl py-5 px-4 mb-3"
            onPress={() => setSelectedOption(item)}
          >
            <View className="flex-row items-center">
              <View className="w-5 h-5 rounded-full border-[1.5px] border-[#999] justify-center items-center mr-3.5">
                {selectedOption === item && (
                  <View className="w-2.5 h-2.5 rounded-full bg-[#EE8B3A]" />
                )}
              </View>
              <Text className="text-[#333] text-[15px] font-medium">{item}</Text>
            </View>
          </TouchableOpacity>
        ))}

        {/* NEXT BUTTON */}
        <BtnMainCom
          title="Next"
          onPress={() => router.push('/(student)/tests/question-two')}
        />
      </ScrollView>
    </SafeAreaView>
  );
}