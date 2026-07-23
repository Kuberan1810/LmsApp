import DateTimePicker from '@react-native-community/datetimepicker';
import * as DocumentPicker from 'expo-document-picker';
import { LinearGradient } from 'expo-linear-gradient';
import { router, useLocalSearchParams } from 'expo-router';
import { Calendar2, Clock, CloseCircle, Refresh, TickCircle, Trash } from 'iconsax-react-native';
import { useEffect, useRef, useState } from 'react';
import { Animated as RNAnimated, Easing as RNEasing, ScrollView, Switch, Text, TextInput, TouchableOpacity, View } from 'react-native';
import CustomDropdown from '../../components/Instructor/CustomDropdown';
import UploadModalHeader from '../../components/Instructor/UploadModalHeader';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function TestDetailsScreen() {
  const params = useLocalSearchParams<{ title?: string; batch?: string }>();
  const [testTitle, setTestTitle] = useState(params.title || 'Test name');
  const [batchName, setBatchName] = useState(params.batch || 'Batch 02');

  useEffect(() => {
    if (params.title) setTestTitle(params.title);
    if (params.batch) setBatchName(params.batch);
  }, [params.title, params.batch]);
  const [description, setDescription] = useState('');

  const questionTypeOptions = [
    { label: 'Short answer', value: 'short_answer' },
    { label: 'Long answer', value: 'long_answer' },
    { label: 'Multiple choice', value: 'multiple_choice' },
    { label: 'Checkboxes', value: 'checkboxes' },
  ];

  type Option = { id: string; text: string; checked: boolean };
  type Question = {
    id: string;
    text: string;
    type: string;
    isRequired: boolean;
    points: string;
    isAnswerKeyMode: boolean;
    options: Option[];
  };

  const [questions, setQuestions] = useState<Question[]>([
    { id: Math.random().toString(), text: '', type: 'short_answer', isRequired: false, points: '', isAnswerKeyMode: false, options: [{ id: Math.random().toString(), text: 'Option 1', checked: false }] }
  ]);

  const addQuestion = () => {
    setQuestions(prev => [
      ...prev,
      { id: Math.random().toString(), text: '', type: 'multiple_choice', isRequired: false, points: '', isAnswerKeyMode: false, options: [{ id: Math.random().toString(), text: 'Option 1', checked: false }] }
    ]);
  };

  const updateQuestion = (id: string, updates: Partial<Question>) => {
    setQuestions(prev => prev.map(q => q.id === id ? { ...q, ...updates } : q));
  };

  const removeQuestion = (id: string) => {
    setQuestions(prev => prev.filter(q => q.id !== id));
  };

  const addOption = (questionId: string) => {
    setQuestions(prev => prev.map(q => {
      if (q.id === questionId) {
        return { ...q, options: [...q.options, { id: Math.random().toString(), text: `Option ${q.options.length + 1}`, checked: false }] };
      }
      return q;
    }));
  };

  const toggleOption = (questionId: string, optionId: string) => {
    setQuestions(prev => prev.map(q => {
      if (q.id === questionId) {
        return {
          ...q,
          options: q.options.map(opt => opt.id === optionId ? { ...opt, checked: !opt.checked } : opt)
        };
      }
      return q;
    }));
  };

  const updateOptionText = (questionId: string, optionId: string, text: string) => {
    setQuestions(prev => prev.map(q => {
      if (q.id === questionId) {
        return {
          ...q,
          options: q.options.map(opt => opt.id === optionId ? { ...opt, text } : opt)
        };
      }
      return q;
    }));
  };

  const removeOption = (questionId: string, optionId: string) => {
    setQuestions(prev => prev.map(q => {
      if (q.id === questionId) {
        return { ...q, options: q.options.filter(opt => opt.id !== optionId) };
      }
      return q;
    }));
  };

  const [isUploadingDoc, setIsUploadingDoc] = useState(false);
  const spinValue = useRef(new RNAnimated.Value(0)).current;

  useEffect(() => {
    if (isUploadingDoc) {
      RNAnimated.loop(
        RNAnimated.timing(spinValue, {
          toValue: 1,
          duration: 1500,
          easing: RNEasing.linear,
          useNativeDriver: true,
        })
      ).start();
    } else {
      spinValue.setValue(0);
      spinValue.stopAnimation();
    }
  }, [isUploadingDoc]);

  const spin = spinValue.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  const [date, setDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showTimePicker, setShowTimePicker] = useState(false);

  const onChangeDate = (event: any, selectedDate?: Date) => {
    setShowDatePicker(false);
    if (selectedDate) setDate(selectedDate);
  };

  const onChangeTime = (event: any, selectedDate?: Date) => {
    setShowTimePicker(false);
    if (selectedDate) setDate(selectedDate);
  };

  const formattedDate = date.toLocaleDateString('en-GB', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric'
  });

  const formattedTime = date.toLocaleTimeString('en-US', {
    hour: 'numeric',
    minute: '2-digit',
    hour12: true
  });

  const handleAutoGenerate = async () => {
    try {
      const result = await DocumentPicker.getDocumentAsync({
        type: ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document', 'image/*'],
        copyToCacheDirectory: true,
      });

      if (!result.canceled) {
        setIsUploadingDoc(true);
        // Mock processing time, then automatically add a new generated question
        setTimeout(() => {
          setIsUploadingDoc(false);
          setQuestions(prev => [
            ...prev,
            { id: Math.random().toString(), text: 'Generated: What is AI?', type: 'multiple_choice', isRequired: true, points: '5', isAnswerKeyMode: false, options: [{ id: Math.random().toString(), text: 'Artificial Intelligence', checked: true }, { id: Math.random().toString(), text: 'Apple Inc.', checked: false }] }
          ]);
        }, 3000);
      }
    } catch (error) {
      console.log('Error picking document:', error);
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-[#F9FAFB]">

      {/* Header */}
      <UploadModalHeader
        title=""
        onBackPress={() => router.back()}
        showSearch={false}
        showNotification={false}
        showProfile={false}
        titleAlign="left"
      />

      <ScrollView className="flex-1 px-5" showsVerticalScrollIndicator={false}>

        {/* Date & Time Row */}
        <View className="flex-row justify-between mb-8 mt-2">
          {/* Due Date */}
          <TouchableOpacity
            onPress={() => setShowDatePicker(true)}
            className="bg-white border border-[#D3D3D3] rounded-2xl p-4 flex-1 mr-3 flex-row items-center justify-between"
          >
            <View>
              <Text className="text-sm font-medium text-[#4B5563] mb-1">Due date</Text>
              <Text className="text-[#9CA3AF] text-sm">{formattedDate}</Text>
            </View>
            <Calendar2 size={20} color="#9CA3AF" variant="Linear" />
          </TouchableOpacity>

          {/* Due Time */}
          <TouchableOpacity
            onPress={() => setShowTimePicker(true)}
            className="bg-white border border-[#D3D3D3] rounded-2xl p-4 flex-1 ml-3 flex-row items-center justify-between"
          >
            <View>
              <Text className="text-sm font-medium text-[#4B5563] mb-1">Due Time(IST)</Text>
              <Text className="text-[#9CA3AF] text-sm">{formattedTime}</Text>
            </View>
            <Clock size={20} color="#9CA3AF" variant="Linear" />
          </TouchableOpacity>
        </View>

        {showDatePicker && (
          <DateTimePicker
            value={date}
            mode="date"
            display="default"
            onChange={onChangeDate}
          />
        )}

        {showTimePicker && (
          <DateTimePicker
            value={date}
            mode="time"
            display="default"
            onChange={onChangeTime}
          />
        )}

        {/* Description Card */}
        <View className="bg-white border border-[#D3D3D3] rounded-[24px] p-5 mb-5">
          <Text className="text-[18px] text-[#1F2937] mb-4">Description:</Text>
          <View className="border border-[#E5E7EB] rounded-2xl p-4 min-h-[120px]">
            <TextInput
              multiline
              textAlignVertical="top"
              placeholder="Enter description here..."
              placeholderTextColor="#9CA3AF"
              className="text-[#4B5563] text-[14px] leading-5 flex-1"
              value={description}
              onChangeText={setDescription}
            />
          </View>
        </View>

        {/* Questions Loop */}
        {questions.map((q, index) => (
          <View key={q.id} className="bg-white border border-[#D3D3D3] rounded-[24px] p-5 mb-8">
            {/* NORMAL MODE (Always visible) */}
            {/* Question Header */}
            <View className="flex-row items-center justify-between mb-4">
              <View className="flex-row items-center flex-1 mr-4">
                <Text className="text-base text-[#1F2937] font-semibold mr-2">{index + 1}.</Text>
                <TextInput
                  value={q.text}
                  onChangeText={(val) => updateQuestion(q.id, { text: val })}
                  placeholder="Question"
                  placeholderTextColor="#9CA3AF"
                  className="flex-1 text-base text-[#1F2937] font-medium"
                />
              </View>
              <View className="w-[135px] z-50">
                <CustomDropdown
                  value={q.type}
                  onChange={(val) => updateQuestion(q.id, { type: val })}
                  options={questionTypeOptions}
                />
              </View>
            </View>

            {/* Answer Area (Normal) */}
            <View className="mb-4">
              {(q.type === 'short_answer' || q.type === 'long_answer') && (
                <View className="border border-[#E5E7EB] rounded-lg px-4 py-2 bg-[#FAFAFA]">
                  <Text className="text-[#9CA3AF] text-[14px]">
                    {q.type === 'short_answer' ? 'Answer max 50 words' : 'Answer max 250 words'}
                  </Text>
                </View>
              )}
              {(q.type === 'multiple_choice' || q.type === 'checkboxes') && (
                <>
                  {q.options.map((opt) => (
                    <View key={opt.id} className="flex-row items-center mb-4">
                      <View className="mr-3">
                        {q.type === 'checkboxes' ? (
                          <View className="w-5 h-5 rounded border-[2px] border-[#D1D5DB]" />
                        ) : (
                          <View className="w-5 h-5 rounded-full border-[2px] border-[#D1D5DB]" />
                        )}
                      </View>
                      <View className="flex-1 flex-row items-center border-b border-transparent pb-1 mr-4">
                        <TextInput
                          value={opt.text}
                          onChangeText={(text) => updateOptionText(q.id, opt.id, text)}
                          className="flex-1 text-base p-0 text-[#1F2937]"
                          placeholder={`Option`}
                          placeholderTextColor="#9CA3AF"
                        />
                      </View>
                      <TouchableOpacity onPress={() => removeOption(q.id, opt.id)}>
                        <CloseCircle size={18} color="#9CA3AF" variant="Linear" />
                      </TouchableOpacity>
                    </View>
                  ))}
                  <TouchableOpacity className="mt-2" onPress={() => addOption(q.id)}>
                    <Text className="text-[#F67300] text-sm font-medium">+ Add option</Text>
                  </TouchableOpacity>
                </>
              )}
            </View>

            {/* Footer Actions */}
            <View className="flex-row items-center justify-between mt-4">
              <TouchableOpacity onPress={() => updateQuestion(q.id, { isAnswerKeyMode: true })}>
                <Text className="text-[#F67300] text-sm font-medium">Answer Key</Text>
              </TouchableOpacity>

              <View className="flex-row items-center">
                {questions.length > 1 && (
                  <TouchableOpacity className="mr-4" onPress={() => removeQuestion(q.id)}>
                    <Trash size={18} color="#9CA3AF" variant="Linear" />
                  </TouchableOpacity>
                )}
                <Text className="text-[#374151] text-sm mr-2">Required</Text>
                <Switch
                  trackColor={{ false: '#E5E7EB', true: '#FED7AA' }}
                  thumbColor={q.isRequired ? '#F67300' : '#FFFFFF'}
                  ios_backgroundColor="#E5E7EB"
                  onValueChange={(val) => updateQuestion(q.id, { isRequired: val })}
                  value={q.isRequired}
                  style={{ transform: [{ scaleX: 0.8 }, { scaleY: 0.8 }] }}
                />
              </View>
            </View>

            {/* ANSWER KEY MODE (EXPANDABLE) */}
            {q.isAnswerKeyMode && (
              <View className="mt-6 border border-[#E5E5E5] rounded-xl p-4 bg-white">
                {(q.type === 'short_answer' || q.type === 'long_answer') && (
                  <>
                    {/* HEADER ROW */}
                    <View className="flex-row justify-between items-center mb-4">
                      <Text className="text-sm font-medium text-[#1F2937]">Enter the key words</Text>
                      <View className="flex-row items-center">
                        <TextInput
                          value={q.points}
                          onChangeText={(val) => updateQuestion(q.id, { points: val })}
                          placeholder="0"
                          placeholderTextColor="#9CA3AF"
                          keyboardType="numeric"
                          className="w-16 border border-[#E5E5E5] rounded px-2 py-1 text-sm text-center mr-2"
                        />
                        <Text className="text-[#4B5563] text-sm">Points</Text>
                      </View>
                    </View>

                    {/* TEXTAREA */}
                    <TextInput
                      multiline
                      value={q.options[0]?.text || ''}
                      onChangeText={(text) => updateOptionText(q.id, q.options[0]?.id || '1', text)}
                      placeholder="Enter keywords or sample answer"
                      placeholderTextColor="#9CA3AF"
                      className="w-full border border-[#E5E5E5] rounded-lg px-4 py-3 text-sm mb-4 min-h-[80px]"
                      textAlignVertical="top"
                    />

                    {/* DONE BUTTON */}
                    <View className="flex-row justify-end">
                      <TouchableOpacity
                        className="bg-[#F67300] px-6 py-2 rounded-full"
                        onPress={() => updateQuestion(q.id, { isAnswerKeyMode: false })}
                      >
                        <Text className="text-white font-medium text-sm">Done</Text>
                      </TouchableOpacity>
                    </View>
                  </>
                )}

                {(q.type === 'multiple_choice' || q.type === 'checkboxes') && (
                  <>
                    {/* HEADER ROW */}
                    <View className="flex-row justify-between items-center mb-4">
                      <Text className="text-sm font-medium text-[#1F2937]">Choose correct answers:</Text>
                      <View className="flex-row items-center">
                        <TextInput
                          value={q.points}
                          onChangeText={(val) => updateQuestion(q.id, { points: val })}
                          placeholder="0"
                          placeholderTextColor="#9CA3AF"
                          keyboardType="numeric"
                          className="w-16 border border-[#E5E5E5] rounded px-2 py-1 text-sm text-center mr-2"
                        />
                        <Text className="text-[#4B5563] text-sm">Points</Text>
                      </View>
                    </View>

                    {/* OPTIONS */}
                    {q.options.map((opt) => (
                      <TouchableOpacity
                        key={opt.id}
                        onPress={() => toggleOption(q.id, opt.id)}
                        className={`flex-row items-center p-3 rounded-lg mb-1 ${opt.checked ? 'bg-[#EAF7EE]' : ''}`}
                      >
                        <View className="mr-3">
                          {q.type === 'checkboxes' ? (
                            <View className={`w-5 h-5 rounded border ${opt.checked ? 'border-transparent bg-[#22C55E]' : 'border-[#D1D5DB]'} items-center justify-center`}>
                              {opt.checked && <TickCircle size={14} color="#FFFFFF" variant="Linear" />}
                            </View>
                          ) : (
                            <View className={`w-5 h-5 rounded-full border ${opt.checked ? 'border-transparent bg-[#22C55E]' : 'border-[#D1D5DB]'} items-center justify-center`}>
                              {opt.checked && <TickCircle size={14} color="#FFFFFF" variant="Linear" />}
                            </View>
                          )}
                        </View>
                        <Text className="flex-1 text-[#1F2937] text-base">{opt.text || 'Option'}</Text>
                        {opt.checked && <TickCircle size={18} color="#22C55E" variant="Linear" />}
                      </TouchableOpacity>
                    ))}

                    {/* DONE BUTTON */}
                    <View className="flex-row justify-end mt-4">
                      <TouchableOpacity
                        className="bg-[#F67300] px-6 py-2 rounded-full"
                        onPress={() => updateQuestion(q.id, { isAnswerKeyMode: false })}
                      >
                        <Text className="text-white font-medium text-sm">Done</Text>
                      </TouchableOpacity>
                    </View>
                  </>
                )}
              </View>
            )}
          </View>
        ))}

        <View className="flex-row items-center mt-2 mb-2">
          <TouchableOpacity onPress={addQuestion} className="flex-row items-center mr-4 p-2">
            <Text className="text-[#F67300] font-bold text-sm">+ Add Question</Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={handleAutoGenerate}
            disabled={isUploadingDoc}
            className={`flex-row items-center justify-center px-4 py-3 rounded-xl border ${isUploadingDoc ? 'border-transparent bg-white' : 'border-[#E5E7EB] bg-white'} relative overflow-hidden`}
          >
            {isUploadingDoc && (
              <RNAnimated.View
                style={{
                  position: 'absolute',
                  width: '300%',
                  height: '500%',
                  transform: [{ rotate: spin }],
                }}
              >
                <LinearGradient
                  colors={['transparent', '#F67300']}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 1 }}
                  style={{ flex: 1 }}
                />
              </RNAnimated.View>
            )}
            {isUploadingDoc && (
              <View className="absolute inset-[2px] bg-white rounded-[10px] z-0" />
            )}

            <View className="flex-row items-center z-10">
              <RNAnimated.View style={isUploadingDoc ? { transform: [{ rotate: spin }] } : {}}>
                <Refresh size={18} color="#F67300" className="mr-2" />
              </RNAnimated.View>
              <Text className="text-[#374151] font-semibold text-sm">
                {isUploadingDoc ? 'Generating...' :  '  Auto-generate from Doc'}
              </Text>
            </View> 
          </TouchableOpacity>
        </View>

        {/* Cancel / Publish Buttons */}
        <View className="flex-row justify-end mt-8 mb-10">
          <TouchableOpacity onPress={() => router.back()} className="px-8 py-3 rounded-xl border border-[#E5E7EB] bg-white mr-3">
            <Text className="text-[#374151] font-medium text-base">Cancel</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => router.replace('/(instructor)/dashboard' as any)} className="px-8 py-3 rounded-xl bg-[#F67300]">
            <Text className="text-white font-medium text-base">Publish Test</Text>
          </TouchableOpacity>
        </View>

      </ScrollView>
    </SafeAreaView>
  );
}
