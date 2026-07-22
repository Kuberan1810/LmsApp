import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { ArrowLeft2, Calendar, DocumentText, TrendUp, Profile2User, Teacher, TaskSquare, ClipboardText } from 'iconsax-react-native';
import { Ionicons } from '@expo/vector-icons';
import { Sms } from 'iconsax-react-native';

type Status = 'present' | 'absent' | 'holiday' | 'weekend' | 'none';

const MOCK_HISTORY = [
  { id: 1, title: 'AI Agent Logic', status: 'On time', date: '12 Jan 2026', marks: '86' },
  { id: 2, title: 'AI Agent Logic', status: 'On time', date: '12 Jan 2026', marks: '86' },
  { id: 3, title: 'AI Agent Logic', status: 'On time', date: '12 Jan 2026', marks: '86' },
];

const MOCK_TESTS = [
  { id: 1, title: 'AI Agent Logic', status: 'Passed', date: '12 Jan 2026', score: '86' },
  { id: 2, title: 'AI Agent Logic', status: 'Passed', date: '12 Jan 2026', score: '86' },
];

const MOCK_ATTENDANCE = [
  { id: 1, code: 'AM101', date: '15', time: '09:30', title: 'AI / ML Frontier AI Engineer', duration: '09:30 - 10:30', status: 'Present' },
  { id: 2, code: 'AM101', date: '15', time: '11:00', title: 'Advanced Data Structures', duration: '11:00 - 12:00', status: 'Present' },
  { id: 3, code: 'AM101', date: '14', time: '09:30', title: 'AI / ML Frontier AI Engineer', duration: '09:30 - 10:30', status: 'Absent' },
];

const MOCK_ACTIVITY = [
  { id: 1, title: 'Submitted Test: HTML Test', date: '16 Jul 2026, 07:09', status: 'Submitted', type: 'submitted' },
  { id: 2, title: 'Sample', date: '14 Jul 2026, 17:15', status: 'Graded', type: 'graded' },
  { id: 3, title: 'Submitted Test: Add New Test', date: '14 Jul 2026, 11:47', status: 'Submitted', type: 'submitted' },
];

const STUDENT_STATS = [
  { title: 'Attendance', value: '95%', color: 'text-[#2A9A46]', icon: <Calendar size={24} color="#6B7280" variant="Linear" /> },
  { title: 'Avg Score', value: '85%', color: 'text-[#2A9A46]', icon: <TrendUp size={24} color="#6B7280" variant="Linear" /> },
  { title: 'Live Participation', value: '70%', color: 'text-[#3B82F6]', icon: <Profile2User size={24} color="#6B7280" variant="Linear" /> },
  { title: 'Classes', value: '10/14', color: 'text-[#2BB290]', icon: <Teacher size={24} color="#6B7280" variant="Linear" /> },
  { title: 'Tests Passed', value: '5 / 7', color: 'text-[#F67300]', icon: <ClipboardText size={24} color="#6B7280" variant="Linear" /> },
  { title: 'Assignments', value: '5', color: 'text-[#8B5CF6]', icon: <TaskSquare size={24} color="#6B7280" variant="Linear" /> },
];

export default function StudentProfileScreen() {
  const router = useRouter();
  const { id } = useLocalSearchParams();
  const [activeTab, setActiveTab] = useState('Assignments');

  const dynamicName = id === 'BT011' ? 'Aarav' : id === 'BT012' ? 'Priya' : id === 'BT013' ? 'Rohan' : 'Name of the student';

  // Calendar State
  const [currentDate, setCurrentDate] = useState(new Date(2026, 0, 1)); // Jan 2026
  const [selectedDate, setSelectedDate] = useState<string | null>('15');

  const handlePrevMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
  };

  const handleNextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));
  };

  const generateDays = () => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    
    const firstDayOfMonth = new Date(year, month, 1);
    const startOffset = firstDayOfMonth.getDay(); 
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    
    const totalSlots = startOffset + daysInMonth <= 28 ? 28 : (startOffset + daysInMonth <= 35 ? 35 : 42);
    
    const daysArray = [];
    const DAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    
    for (let i = 0; i < totalSlots; i++) {
      const date = new Date(year, month, i - startOffset + 1);
      
      let status: Status = 'none';
      if (date.getMonth() !== month) {
         status = 'none'; 
      } else {
         const dayOfWeek = date.getDay();
         if (dayOfWeek === 0 || dayOfWeek === 6) {
            status = 'weekend';
         } else {
            const d = date.getDate();
            if (d === 15) status = 'holiday';
            else if (d === 14 || d === 18) status = 'absent';
            else if (d > 23 && year === 2026 && month === 0) status = 'none'; 
            else status = 'present';
         }
      }
      
      daysArray.push({
        day: DAYS[date.getDay()],
        date: date.getDate().toString().padStart(2, '0'),
        status,
        isCurrentMonth: date.getMonth() === month,
        fullDateObj: date
      });
    }
    return daysArray;
  };

  const calendarData = generateDays();
  const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  const monthTitle = `${monthNames[currentDate.getMonth()]} ${currentDate.getFullYear()}`;

  const getStatusStyles = (status: Status) => {
    switch (status) {
      case 'present': return { bg: '#DCFCE780', day: '#3EA465', date: '#3EA465', border: 'transparent' };
      case 'absent': return { bg: '#FEE2E280', day: '#CE1919', date: '#CE1919', border: 'transparent' };
      case 'holiday': return { bg: '#FFEDDD', day: '#FFBE85', date: '#FFBE85', border: 'transparent' };
      case 'weekend': return { bg: '#FFEDDD', day: '#333333', date: '#777777', border: 'transparent' };
      case 'none': default: return { bg: '#FFFFFF', day: '#333333', date: '#777777', border: '#E5E7EB' };
    }
  };

  const filteredAttendance = MOCK_ATTENDANCE.filter(a => a.date === selectedDate);

  return (
    <SafeAreaView className="flex-1 bg-[#FAFAFA]" edges={['top', 'left', 'right']}>
      {/* Header */}
      <View className="px-5 pt-4 pb-4 flex-row justify-between items-center bg-white border-b border-[#F2EEF4]">
        <View className="flex-row items-center">
          <TouchableOpacity onPress={() => router.back()} className="mr-3 p-1">
            <ArrowLeft2 size={24} color="#1F2937" />
          </TouchableOpacity>
          <Text className="text-[20px] font-medium text-[#333333]">Student Profile</Text>
        </View>
        <TouchableOpacity className="flex-row items-center border border-[#E2E8F0] px-3 py-1.5 rounded-lg bg-white">
          <DocumentText size={16} color="#4B5563" />
          <Text className="text-[#4B5563] text-[13px] font-medium ml-1.5">Export</Text>
        </TouchableOpacity>
      </View>

      <ScrollView className="flex-1" showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 60 }}>
        
        {/* Profile Card */}
        <View className="bg-white mx-5 mt-5 p-5 rounded-[24px] border border-[#F2EEF4] shadow-sm shadow-black/5">
          <View className="flex-row items-center mb-5">
            <View className="relative w-20 h-20 rounded-full mr-4 bg-[#FFF5ED]">
              <Image 
                source={{ uri: 'https://i.pravatar.cc/150?u=' + id }} 
                className="w-full h-full rounded-full"
                contentFit="cover"
              />
              <View className="absolute bottom-0 right-1 w-4 h-4 bg-[#2BB290] border-2 border-white rounded-full" />
            </View>
            <View className="flex-1">
              <Text className="text-[20px] font-bold text-[#1E1E2D] mb-1">{dynamicName}</Text>
              <Text className="text-[13px] text-[#6B7280] mb-2">Student Id : {id || 'N/A'}</Text>
              <View className="flex-row items-center mb-1">
                <Ionicons name="mail-outline" size={14} color="#8C8E90" />
                <Text className="text-[13px] text-[#6B7280] ml-2">indhu@gmail.com</Text>
              </View>
              <View className="flex-row items-center">
                <Ionicons name="call-outline" size={14} color="#8C8E90" />
                <Text className="text-[13px] text-[#6B7280] ml-2">+91 9876543210</Text>
              </View>
            </View>
          </View>
          
          <TouchableOpacity className="border border-[#F67300] py-2.5 rounded-xl flex-row items-center justify-center bg-white">
            <Sms size={16} color="#F67300" variant="Outline" />
            <Text className="text-[#F67300] font-medium ml-2">Message</Text>
          </TouchableOpacity>
        </View>

        {/* Stats */}
        <View className="mt-4">
          <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ paddingHorizontal: 20 }}>
            {STUDENT_STATS.map((stat, idx) => (
              <View key={idx} className="w-[160px] bg-white p-4 rounded-[20px] border border-[#F2EEF4] shadow-sm shadow-black/5 mr-4">
                <View className="flex-row justify-between items-start mb-2">
                  <Text className="text-[13px] font-medium text-[#6B7280]">{stat.title}</Text>
                </View>
                <View className="flex-row justify-between items-end mt-1">
                  <Text className={`text-[22px] font-bold ${stat.color}`}>{stat.value}</Text>
                  {stat.icon}
                </View>
              </View>
            ))}
          </ScrollView>
        </View>

        {/* Tabs */}
        <View className="flex-row mx-5 mt-6 bg-white rounded-full p-1 border border-[#F2EEF4] shadow-sm shadow-black/5 justify-between">
          {['Assignments', 'Tests', 'Attendance'].map((tab) => {
            const isActive = activeTab === tab;
            return (
              <TouchableOpacity 
                key={tab} 
                onPress={() => setActiveTab(tab)}
                className={`flex-1 py-2 rounded-full items-center ${isActive ? 'bg-[#F67300]' : 'bg-transparent'}`}
              >
                <Text className={`text-[14px] font-medium ${isActive ? 'text-white' : 'text-[#4B5563]'}`}>{tab}</Text>
              </TouchableOpacity>
            );
          })}
        </View>

        {/* Tab Content */}
        {activeTab === 'Assignments' && (
          <View className="mx-5 mt-6">
            <Text className="text-[14px] font-medium text-[#6B7280] mb-3">Assignment History</Text>
            {MOCK_HISTORY.map((item) => (
              <View key={item.id} className="bg-white min-h-[88px] px-5 py-4 rounded-[16px] border border-[#F2EEF4] mb-3 flex-row justify-between items-center shadow-sm shadow-black/5">
                <View className="flex-1">
                  <Text className="text-[15px] font-semibold text-[#1E1E2D] mb-4">{item.title}</Text>
                  <View className="flex-row items-center gap-3">
                    <View className="bg-[#2A9A46]/10 px-3 py-1 rounded-full">
                      <Text className="text-[#2A9A46] text-[12px] font-medium text-center">{item.status}</Text>
                    </View>
                    <Text className="text-[12px] text-[#8C8E90]">{item.date}</Text>
                  </View>
                </View>
                <View className="items-center justify-center">
                  <Text className="text-[20px] font-bold text-[#1E1E2D]">{item.marks}</Text>
                  <Text className="text-[11px] text-[#8C8E90] mt-0.5">Marks</Text>
                </View>
              </View>
            ))}
          </View>
        )}

        {activeTab === 'Tests' && (
          <View className="mx-5 mt-6">
            <Text className="text-[14px] font-medium text-[#6B7280] mb-3">Test History</Text>
            {MOCK_TESTS.map((item) => (
              <View key={item.id} className="bg-white min-h-[88px] px-5 py-4 rounded-[16px] border border-[#F2EEF4] mb-3 flex-row justify-between items-center shadow-sm shadow-black/5">
                <View className="flex-1">
                  <Text className="text-[15px] font-semibold text-[#1E1E2D] mb-4">{item.title}</Text>
                  <View className="flex-row items-center gap-3">
                    <View className="bg-[#2A9A46]/10 px-3 py-1 rounded-full">
                      <Text className="text-[#2A9A46] text-[12px] font-medium text-center">{item.status}</Text>
                    </View>
                    <Text className="text-[12px] text-[#8C8E90]">{item.date}</Text>
                  </View>
                </View>
                <View className="items-center justify-center">
                  <Text className="text-[20px] font-bold text-[#1E1E2D]">{item.score}</Text>
                  <Text className="text-[11px] text-[#8C8E90] mt-0.5">Score</Text>
                </View>
              </View>
            ))}
          </View>
        )}

        {activeTab === 'Attendance' && (
          <View className="mx-5 mt-6">
            <View className="flex-row justify-between mb-5">
                <View className="flex-1 bg-[#E8F8F0] rounded-[18px] p-4 items-center mr-3 border border-[#E8F8F0]">
                    <Text className="text-[#1DD75B] text-[24px] font-bold">18</Text>
                    <Text className="text-[#888] text-[12px] mt-0.5 text-center">Days Present</Text>
                </View>
                <View className="flex-1 bg-[#FDE8E8] rounded-[18px] p-4 items-center mr-3 border border-[#FDE8E8]">
                    <Text className="text-[#E61026] text-[24px] font-bold">2</Text>
                    <Text className="text-[#888] text-[12px] mt-0.5 text-center">Days Absent</Text>
                </View>
                <View className="flex-1 bg-[#EEF2FF] rounded-[18px] p-4 items-center border border-[#EEF2FF]">
                    <Text className="text-[#6366F1] text-[24px] font-bold">4</Text>
                    <Text className="text-[#888] text-[12px] mt-0.5 text-center">Leaves</Text>
                </View>
            </View>

            {/* Calendar */}
            <View className="bg-white rounded-[28px] p-5 border border-[#F2EEF4] mb-5 shadow-sm shadow-black/5">
                <View className="flex-row justify-between items-center mb-6">
                    <Text className="text-[20px] font-semibold text-[#333333] tracking-tight">Attendance</Text>
                </View>

                {/* Month Selector */}
                <View className="flex-row justify-center items-center mb-6">
                    <TouchableOpacity onPress={handlePrevMonth} className="bg-[#FFEDDD] w-[30px] h-[30px] items-center justify-center rounded-[8px]">
                        <Ionicons name="play" size={14} color="#F67300" style={{ transform: [{ rotate: '180deg' }] }} />
                    </TouchableOpacity>
                    <Text className="mx-6 font-semibold text-[14px] text-[#333333]">{monthTitle}</Text>
                    <TouchableOpacity onPress={handleNextMonth} className="bg-[#FFEDDD] w-[30px] h-[30px] items-center justify-center rounded-[8px]">
                        <Ionicons name="play" size={14} color="#F67300" />
                    </TouchableOpacity>
                </View>

                {/* Grid */}
                <View className="flex-row flex-wrap justify-between gap-y-3">
                    {calendarData.map((item, index) => {
                        const styles = getStatusStyles(item.status);
                        const isSelected = selectedDate === item.date && item.isCurrentMonth;
                        
                        return (
                            <TouchableOpacity 
                                key={index}
                                onPress={() => {
                                    if (item.isCurrentMonth && item.status !== 'none') {
                                        setSelectedDate(item.date);
                                    }
                                }}
                                activeOpacity={0.7}
                                style={{ 
                                    width: '13%', 
                                    aspectRatio: 44 / 43, 
                                    backgroundColor: styles.bg, 
                                    borderColor: isSelected ? styles.day : styles.border, 
                                    borderWidth: isSelected ? 1.5 : (item.status === 'none' ? 1 : 0) 
                                }}
                                className={`rounded-[14px] items-center justify-center py-1.5 gap-0.5 ${!item.isCurrentMonth ? 'opacity-30' : ''}`}
                            >
                                <Text style={{ color: styles.day }} className="text-[14px] font-semibold leading-none text-center">{item.day}</Text>
                                <Text style={{ color: styles.date }} className="text-[12px] font-medium leading-none text-center">{item.date}</Text>
                            </TouchableOpacity>
                        );
                    })}
                </View>

                {/* Legend */}
                <View className="flex-row justify-center items-center mt-8 gap-5">
                    <View className="flex-row items-center">
                        <View className="w-3.5 h-3.5 rounded-[4px] bg-[#3EA465] mr-2" />
                        <Text className="text-[14px] text-[#626262] font-medium">Present</Text>
                    </View>
                    <View className="flex-row items-center">
                        <View className="w-3.5 h-3.5 rounded-[4px] bg-[#CE1919] mr-2" />
                        <Text className="text-[14px] text-[#626262] font-medium">Absent</Text>
                    </View>
                    <View className="flex-row items-center">
                        <View className="w-3.5 h-3.5 rounded-[4px] bg-[#FFBE85] mr-2" />
                        <Text className="text-[14px] text-[#626262] font-medium">Holiday</Text>
                    </View>
                </View>
            </View>

            {/* Attendance List */}
            <View>
              <Text className="text-[14px] font-medium text-[#6B7280] mb-3 mt-2">
                Classes on {selectedDate ? `${selectedDate} ${monthTitle}` : 'Selected Date'}
              </Text>
              
              {filteredAttendance.length > 0 ? (
                filteredAttendance.map((item) => (
                    <View key={item.id} className="bg-white min-h-[88px] px-4 py-4 rounded-[16px] border border-[#F2EEF4] mb-3 flex-row items-center shadow-sm shadow-black/5 overflow-hidden">
                        <View className={`absolute left-0 top-0 bottom-0 w-1.5 ${item.status === 'Present' ? 'bg-[#2A9A46]' : 'bg-[#E61026]'}`} />
                        <View className="ml-2 mr-4 items-center border-r border-[#E2E8F0] pr-4">
                            <Text className="text-[12px] font-medium text-[#8C8E90]">{item.code}</Text>
                            <Text className="text-[14px] font-medium text-[#1E1E2D] mt-1">{item.time}</Text>
                        </View>
                        <View className="flex-1">
                            <Text className="text-[14px] font-medium text-[#1E1E2D] mb-3">{item.title}</Text>
                            <Text className="text-[12px] text-[#8C8E90]">{item.duration}</Text>
                        </View>
                        <View className={`px-3 py-1 rounded-full ml-2 ${item.status === 'Present' ? 'bg-[#2A9A46]/10' : 'bg-[#E61026]/10'}`}>
                            <Text className={`text-[12px] font-medium text-center ${item.status === 'Present' ? 'text-[#2A9A46]' : 'text-[#E61026]'}`}>
                                {item.status}
                            </Text>
                        </View>
                    </View>
                ))
              ) : (
                <View className="bg-white rounded-[16px] border border-[#F2EEF4] py-8 items-center shadow-sm shadow-black/5">
                   <Text className="text-[#8C8E90] text-[14px] font-medium">No classes scheduled for this day.</Text>
                </View>
              )}
            </View>
          </View>
        )}

        {/* Recent Activity */}
        <View className="mx-5 mt-6">
          <Text className="text-[14px] font-medium text-[#6B7280] mb-3">Recent Activity</Text>
          {MOCK_ACTIVITY.map((item) => {
            return (
              <View key={item.id} className="bg-white min-h-[88px] px-5 py-4 rounded-[16px] border border-[#F2EEF4] mb-3 flex-row justify-between items-center shadow-sm shadow-black/5">
                <View>
                  <Text className="text-[14px] font-medium text-[#333333] mb-4">{item.title}</Text>
                  <Text className="text-[12px] text-[#8C8E90]">{item.date}</Text>
                </View>
                <View className="bg-[#2A9A46]/10 px-3 py-1 rounded-full">
                  <Text className="text-[#2A9A46] text-[12px] font-medium text-center">
                    {item.status}
                  </Text>
                </View>
              </View>
            )
          })}
        </View>

      </ScrollView>
    </SafeAreaView>
  );
}
