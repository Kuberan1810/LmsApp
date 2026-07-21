import { Stack, router } from 'expo-router';
import { ArrowLeft2 } from 'iconsax-react-native';
import { Edit2, Calendar, Image as ImageIcon, Square, CheckSquare, X, ChevronDown, ClipboardCheck, Trash2, Circle, CircleDot, Check, ChevronUp } from 'lucide-react-native';
import CustomDropdown from '../../components/Instructor/CustomDropdown';
import { useState } from 'react';
import { ScrollView, Text, TextInput, TouchableOpacity, View, Switch } from 'react-native';

export default function TestDetailsScreen() {
  const [isRequired, setIsRequired] = useState(false);
  const [questionType, setQuestionType] = useState('short_answer');
  const [isAnswerKeyMode, setIsAnswerKeyMode] = useState(false);
  const [points, setPoints] = useState('0');

  const questionTypeOptions = [
    { label: 'Short answer', value: 'short_answer' },
    { label: 'Long answer', value: 'long_answer' },
    { label: 'Multiple choice', value: 'multiple_choice' },
    { label: 'Checkboxes', value: 'checkboxes' },
  ];
  
  type Option = { id: string; text: string; checked: boolean };
  const [options, setOptions] = useState<Option[]>([
    { id: '1', text: 'AI is', checked: false }
  ]);

  const addOption = () => {
    setOptions(prev => [...prev, { id: Math.random().toString(), text: `Option ${prev.length + 1}`, checked: false }]);
  };

  const toggleOption = (id: string) => {
    setOptions(prev => prev.map(opt => opt.id === id ? { ...opt, checked: !opt.checked } : opt));
  };
  
  const updateOptionText = (id: string, text: string) => {
    setOptions(prev => prev.map(opt => opt.id === id ? { ...opt, text } : opt));
  };

  const removeOption = (id: string) => {
    setOptions(prev => prev.filter(opt => opt.id !== id));
  };

  return (
    <View className="flex-1 bg-[#F9FAFB]">
      <Stack.Screen options={{ headerShown: false }} />

      {/* Header */}
      <View className="pt-16 pb-4 px-5 flex-row items-center">
        <TouchableOpacity onPress={() => router.back()} className="mr-2 p-1">
          <ArrowLeft2 size={24} color="#111827" />
        </TouchableOpacity>
        
        <View className="flex-row items-center">
          <Text className="text-xl font-medium text-[#111827] mr-2">Test name</Text>
          <Edit2 size={14} color="#9CA3AF" />
        </View>

        <View className="ml-4 bg-[#FFEDD5] px-3 py-1 rounded-full">
          <Text className="text-[#F97316] text-xs font-medium">Batch 02</Text>
        </View>
      </View>

      <ScrollView className="flex-1 px-5" showsVerticalScrollIndicator={false}>
        
        {/* Date & Time Row */}
        <View className="flex-row justify-between mb-8 mt-2">
          {/* Due Date */}
          <View className="bg-white rounded-2xl p-4 flex-1 mr-3 flex-row items-center justify-between">
            <View>
              <Text className="text-sm font-medium text-[#4B5563] mb-1">Due date</Text>
              <Text className="text-[#9CA3AF] text-sm">12/01/2026</Text>
            </View>
            <Calendar size={20} color="#9CA3AF" strokeWidth={1.5} />
          </View>

          {/* Due Time */}
          <View className="bg-white rounded-2xl p-4 flex-1 ml-3 flex-row items-center justify-between">
            <View>
              <Text className="text-sm font-medium text-[#4B5563] mb-1">Due Time(IST)</Text>
              <Text className="text-[#9CA3AF] text-sm">11:59 pm</Text>
            </View>
            <Calendar size={20} color="#9CA3AF" strokeWidth={1.5} />
          </View>
        </View>

        {/* Description Card */}
        <View className="bg-white rounded-[24px] p-5 mb-5">
          <Text className="text-[18px] text-[#1F2937] mb-4">Description:</Text>
          <View className="border border-[#E5E7EB] rounded-2xl p-4 min-h-[120px]">
            <TextInput
              multiline
              textAlignVertical="top"
              placeholder="Enter description here..."
              placeholderTextColor="#9CA3AF"
              className="text-[#4B5563] text-[14px] leading-5 flex-1"
            >
              AI Agents are systems that use LLMs to plan, act, and collaborate autonomously. LangChain builds tool-using agents for workflows and RAG. CrewAI enables role-based multi-agent teamwork. AutoGen focuses on conversation-driven agents that interact with each other and humans to solve complex tasks.
            </TextInput>
          </View>
        </View>

        {/* Question Builder Card */}
        <View className="bg-white rounded-[24px] p-5 mb-8">
          {/* Question Header */}
          {!isAnswerKeyMode ? (
            <View className="flex-row items-center justify-between mb-6">
              <View className="flex-row items-center justify-between flex-1 pr-4">
                <Text className="text-base text-[#1F2937] font-medium">1. Question</Text>
                <TouchableOpacity>
                  <ImageIcon size={18} color="#9CA3AF" />
                </TouchableOpacity>
              </View>
              <View className="w-[180px] z-50">
                <CustomDropdown
                  value={questionType}
                  onChange={setQuestionType}
                  options={questionTypeOptions}
                />
              </View>
            </View>
          ) : (
            <View className="mb-6">
              <View className="flex-row items-center mb-6">
                <ClipboardCheck size={18} color="#4B5563" className="mr-2" />
                <Text className="text-[#4B5563] text-base font-medium">Choose correct answers:</Text>
              </View>
              <View className="flex-row items-center justify-between">
                <Text className="text-base text-[#1F2937] font-medium">1. Question</Text>
                <View className="flex-row items-center">
                  <View className="border-b border-[#D1D5DB] flex-row items-center justify-between w-12 px-1 mr-2 pb-1">
                    <TextInput
                      value={points}
                      onChangeText={setPoints}
                      keyboardType="numeric"
                      className="text-base text-[#1F2937] p-0 flex-1 text-center h-6"
                    />
                    <View>
                      <ChevronUp size={10} color="#9CA3AF" />
                      <ChevronDown size={10} color="#9CA3AF" />
                    </View>
                  </View>
                  <Text className="text-[#374151] text-base">Points</Text>
                </View>
              </View>
            </View>
          )}

          {/* Answer Area */}
          <View className="mb-6">
            {questionType === 'short_answer' && (
              <View className="border border-[#E5E7EB] rounded-2xl p-4 min-h-[120px]">
                <TextInput
                  multiline
                  textAlignVertical="top"
                  placeholder="Answer 50 words"
                  placeholderTextColor="#9CA3AF"
                  className="text-[#4B5563] text-[14px] leading-5 flex-1"
                />
              </View>
            )}
            {questionType === 'long_answer' && (
              <View className="border border-[#E5E7EB] rounded-2xl p-4 min-h-[120px]">
                <TextInput
                  multiline
                  textAlignVertical="top"
                  placeholder="Answer 250 words"
                  placeholderTextColor="#9CA3AF"
                  className="text-[#4B5563] text-[14px] leading-5 flex-1"
                />
              </View>
            )}
            {(questionType === 'multiple_choice' || questionType === 'checkboxes') && (
              <>
                {options.map((opt) => (
                  <View key={opt.id} className={`flex-row items-center mb-4 ${isAnswerKeyMode && opt.checked ? 'bg-[#ECFDF5] p-2 rounded-lg' : ''}`}>
                    <TouchableOpacity className="mr-4" onPress={() => toggleOption(opt.id)}>
                      {questionType === 'checkboxes' ? (
                        opt.checked ? (
                          isAnswerKeyMode ? (
                            <View className="w-5 h-5 bg-[#22C55E] rounded flex items-center justify-center">
                              <Check size={14} color="#FFFFFF" strokeWidth={3} />
                            </View>
                          ) : (
                            <View className="w-5 h-5 bg-[#F67300] rounded flex items-center justify-center">
                              <Check size={14} color="#FFFFFF" strokeWidth={3} />
                            </View>
                          )
                        ) : (
                          <View className="w-5 h-5 rounded border-[2px] border-[#D1D5DB]" />
                        )
                      ) : (
                        opt.checked ? (
                          isAnswerKeyMode ? (
                            <View className="w-5 h-5 bg-[#22C55E] rounded flex items-center justify-center">
                              <Check size={14} color="#FFFFFF" strokeWidth={3} />
                            </View>
                          ) : (
                            <View className="w-5 h-5 rounded-full border-[2px] border-[#F67300] items-center justify-center">
                              <View className="w-2.5 h-2.5 rounded-full bg-[#F67300]" />
                            </View>
                          )
                        ) : (
                          <View className="w-5 h-5 rounded-full border-[2px] border-[#D1D5DB]" />
                        )
                      )}
                    </TouchableOpacity>
                    <View className={`flex-1 flex-row items-center ${!isAnswerKeyMode ? 'border-b border-[#9CA3AF] pb-1' : ''} mr-4`}>
                      <TextInput
                        value={opt.text}
                        onChangeText={(text) => updateOptionText(opt.id, text)}
                        editable={!isAnswerKeyMode}
                        pointerEvents={isAnswerKeyMode ? "none" : "auto"}
                        className={`flex-1 text-base p-0 ${isAnswerKeyMode ? 'text-[#374151]' : 'text-[#1F2937]'}`}
                      />
                    </View>
                    {!isAnswerKeyMode ? (
                      <View className="flex-row items-center">
                        <ImageIcon size={18} color="#9CA3AF" className="mr-3" />
                        <TouchableOpacity onPress={() => removeOption(opt.id)}>
                          <X size={18} color="#9CA3AF" />
                        </TouchableOpacity>
                      </View>
                    ) : (
                      opt.checked && <Check size={20} color="#22C55E" />
                    )}
                  </View>
                ))}
                {!isAnswerKeyMode && (
                  <TouchableOpacity className="mb-2 mt-2" onPress={addOption}>
                    <Text className="text-[#F67300] text-sm font-medium">Add option</Text>
                  </TouchableOpacity>
                )}
              </>
            )}
          </View>

          {/* Footer Actions */}
          {!isAnswerKeyMode ? (
            <View className="flex-row items-center justify-between pt-2">
              <TouchableOpacity className="flex-row items-center" onPress={() => setIsAnswerKeyMode(true)}>
                <ClipboardCheck size={16} color="#F67300" className="mr-2" />
                <Text className="text-[#F67300] text-sm font-medium">Answer Key</Text>
              </TouchableOpacity>

              <View className="flex-row items-center">
                <TouchableOpacity className="mr-4">
                  <Trash2 size={16} color="#9CA3AF" />
                </TouchableOpacity>
                <Text className="text-[#374151] text-sm font-medium mr-2">Required</Text>
                <Switch
                  trackColor={{ false: '#E5E7EB', true: '#FED7AA' }}
                  thumbColor={isRequired ? '#F67300' : '#FFFFFF'}
                  ios_backgroundColor="#E5E7EB"
                  onValueChange={setIsRequired}
                  value={isRequired}
                  style={{ transform: [{ scaleX: 0.8 }, { scaleY: 0.8 }] }}
                />
              </View>
            </View>
          ) : (
            <View className="flex-row items-center justify-end pt-2">
              <TouchableOpacity 
                className="bg-[#F67300] px-8 py-2.5 rounded-xl"
                onPress={() => setIsAnswerKeyMode(false)}
              >
                <Text className="text-white font-medium text-base">Done</Text>
              </TouchableOpacity>
            </View>
          )}
        </View>

        <View className="h-10" />

      </ScrollView>
    </View>
  );
}
