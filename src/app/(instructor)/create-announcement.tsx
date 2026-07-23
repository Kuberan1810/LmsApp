import CustomDropdown from '@/components/Instructor/CustomDropdown';
import { Stack, router } from 'expo-router';
import { ArrowLeft2, ArrowDown2 } from 'iconsax-react-native';
import { Bell } from 'lucide-react-native';
import { useState } from 'react';
import { ScrollView, Text, TextInput, TouchableOpacity, View } from 'react-native';

export default function CreateAnnouncementScreen() {
  const [courseName, setCourseName] = useState('');
  const [batchId, setBatchId] = useState('');
  const [topic, setTopic] = useState('');
  const [message, setMessage] = useState('');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('New Announcement');

  const DUMMY_COURSES = [
    { label: 'Am101 - Math', value: 'Am101' },
    { label: 'Ph202 - Physics', value: 'Ph202' },
  ];

  return (
    <View className="flex-1 bg-[#F9FAFB]">
      <Stack.Screen options={{ headerShown: false }} />

      {/* Orange Header Section */}
      <View
        className="bg-[#F67300] pt-16 pb-5 px-5 items-center"
        style={{
          borderBottomLeftRadius: 32,
          borderBottomRightRadius: 32,
          shadowColor: '#000',
          shadowOffset: { width: 0, height: 8 },
          shadowOpacity: 0.25,
          shadowRadius: 10,
          elevation: 8,
          gap: 20
        }}
      >
        {/* Back Button */}
         <TouchableOpacity
          onPress={() => router.back()}
          className="absolute top-16 left-6 z-10 w-11 h-11 rounded-full items-center justify-center bg-[#FAFAFA]/10 border border-[#F2EEF4]/30 backdrop-blur-sm"
        >
          <ArrowLeft2 size={20} color="#ffffffff" variant="Linear" />
        </TouchableOpacity>

        {/* Icon & Title */}
        <View className="items-center mt-4">
          <View className="w-[60px] h-[60px] bg-white/20 rounded-[20px] items-center justify-center mb-4">
            <Bell size={32} color="#FFFFFF" strokeWidth={1.5} />
          </View>

          <Text className="text-white text-[22px] font-bold">Announcement</Text>
          <Text className="text-white text-sm">Send an update to all your students instantly.</Text>
        </View>
      </View>

      {/* Form Section */}
      <ScrollView 
        className="flex-1 px-6 pt-8" 
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ flexGrow: 1, paddingBottom: 40 }}
      >
        <View className="flex-1">
          <View className="mb-6 z-50">
            <TouchableOpacity 
              className="flex-row items-center"
              onPress={() => setIsDropdownOpen(!isDropdownOpen)}
            >
              <Text className="text-xl font-bold text-[#1F2937] mr-2">{activeTab}</Text>
              <ArrowDown2 size={24} color="#1F2937" variant="Outline" />
            </TouchableOpacity>

            {isDropdownOpen && (
              <View className="mt-3">
                <TouchableOpacity onPress={() => {
                  setActiveTab(activeTab === 'New Announcement' ? 'Past announcements' : 'New Announcement');
                  setIsDropdownOpen(false);
                }}>
                  <Text className="text-[16px] text-[#4B5563] font-medium">
                    {activeTab === 'New Announcement' ? 'Past announcements' : 'New Announcement'}
                  </Text>
                </TouchableOpacity>
              </View>
            )}
          </View>

        <View className="mb-5">
          <Text className="text-sm font-medium text-[#4B5563] mb-2">Course Name / ID</Text>
          <CustomDropdown
            value={courseName}
            onChange={setCourseName}
            options={DUMMY_COURSES}
            placeholder="E.g Am101"
            className="bg-white border border-[#D3D3D3] rounded-[10px] h-[45px] px-[15px] text-[14px] text-[#1F2937]"
          />
        </View>

        <View className="mb-5">
          <Text className="text-sm font-medium text-[#4B5563] mb-2">Batch ID</Text>
          <TextInput
            value={batchId}
            onChangeText={setBatchId}
            placeholder="E.g. Batch-01"
            placeholderTextColor="#9CA3AF"
            className="bg-white border border-[#D3D3D3] rounded-[10px] h-[45px] px-[15px] text-[14px] text-[#1F2937]"
          />
        </View>

        <View className="mb-5">
          <Text className="text-sm font-medium text-[#4B5563] mb-2">Topic</Text>
          <TextInput
            value={topic}
            onChangeText={setTopic}
            placeholder="E.g. Test Delay"
            placeholderTextColor="#9CA3AF"
            className="bg-white border border-[#D3D3D3] rounded-[10px] h-[45px] px-[15px] text-[14px] text-[#1F2937]"
          />
        </View>

        <View className="mb-8">
          <Text className="text-sm font-medium text-[#4B5563] mb-2">Message</Text>
          <TextInput
            value={message}
            onChangeText={setMessage}
            placeholder="Type your message here..."
            placeholderTextColor="#9CA3AF"
            multiline
            textAlignVertical="top"
            className="bg-white border border-[#D3D3D3] rounded-[10px] px-[15px] py-3.5 text-[14px] text-[#1F2937] min-h-[120px]"
          />
        </View>
        </View>

        {/* Buttons */}
        <View className="flex-row items-center justify-between mt-4">
          <TouchableOpacity
            onPress={() => router.back()}
            className="flex-1 py-4 rounded-xl border border-[#E5E7EB] bg-white items-center justify-center mr-3"
          >
            <Text className="text-[#374151] font-semibold text-base">Cancel</Text>
          </TouchableOpacity>

          <TouchableOpacity
            className="flex-1 py-4 rounded-xl bg-[#F67300] items-center justify-center ml-3"
          >
            <Text className="text-white font-semibold text-base">Post</Text>
          </TouchableOpacity>
        </View>

      </ScrollView>
    </View>
  );
}
