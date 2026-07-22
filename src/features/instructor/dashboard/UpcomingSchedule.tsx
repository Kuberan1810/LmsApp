import { View, Text, TouchableOpacity, ScrollView, Modal, TextInput } from 'react-native';
import React, { useState } from 'react';
import { ArrowLeft2, ArrowRight2, Clock, Calendar, Edit2, Edit } from 'iconsax-react-native';

const getDaysOfWeek = (offset: number) => {
    const baseDate = new Date(2026, 6, 12); // Sunday, Jul 12, 2026
    baseDate.setDate(baseDate.getDate() + offset * 7);

    const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    const fullDayNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

    return Array.from({ length: 7 }, (_, i) => {
        const d = new Date(baseDate);
        d.setDate(baseDate.getDate() + i);
        const dateStr = String(d.getDate());
        const monthStr = monthNames[d.getMonth()];
        const yearStr = d.getFullYear();

        return {
            day: dayNames[d.getDay()],
            date: dateStr,
            isOff: d.getDay() === 0,
            fullDate: `${fullDayNames[d.getDay()]}, ${monthStr} ${d.getDate()}, ${yearStr}`,
        };
    });
};

const SCHEDULE_DATA: Record<string, any> = {
    '18': {
        title: 'Batch-B',
        subtitle: 'AA101 - AI-Python',
        time: '10:00 AM - 11:00 AM',
        dateLabel: 'Jul 18, 26',
    }
};

export default function UpcomingSchedule() {
    const [weekOffset, setWeekOffset] = useState(0);
    const [selectedDate, setSelectedDate] = useState('18');
    const [scheduleData, setScheduleData] = useState<Record<string, any>>(SCHEDULE_DATA);
    
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [editDate, setEditDate] = useState('');
    const [editTimeRange, setEditTimeRange] = useState('');

    const days = getDaysOfWeek(weekOffset);
    const selectedDayInfo = days.find(d => d.date === selectedDate);
    const activeClass = scheduleData[selectedDate];

    const handleOpenEdit = () => {
        if (activeClass) {
            setEditDate(activeClass.dateLabel);
            setEditTimeRange(activeClass.time);
            setIsEditModalOpen(true);
        }
    };

    const handleSave = () => {
        if (!activeClass) return;
        setScheduleData(prev => ({
            ...prev,
            [selectedDate]: {
                ...prev[selectedDate],
                time: editTimeRange,
                dateLabel: editDate,
            }
        }));
        setIsEditModalOpen(false);
    };

    const handlePrevWeek = () => {
        const newOffset = weekOffset - 1;
        const newDays = getDaysOfWeek(newOffset);
        const currentIndex = days.findIndex(d => d.date === selectedDate);
        const targetIndex = currentIndex !== -1 ? currentIndex : 0;
        setWeekOffset(newOffset);
        setSelectedDate(newDays[targetIndex].date);
    };

    const handleNextWeek = () => {
        const newOffset = weekOffset + 1;
        const newDays = getDaysOfWeek(newOffset);
        const currentIndex = days.findIndex(d => d.date === selectedDate);
        const targetIndex = currentIndex !== -1 ? currentIndex : 0;
        setWeekOffset(newOffset);
        setSelectedDate(newDays[targetIndex].date);
    };

    return (
        <View className="bg-white rounded-[28px] p-6 mb-3 border border-[#F2EEF4] mt-5 mx-4">
            {/* Header  */}
            <View className="flex-row justify-between items-center mb-1">
                <Text className="text-[20px] font-semibold text-[#333333]">Upcoming Schedule</Text>
                <View className="flex-row space-x-2 gap-2">
                    <TouchableOpacity
                        onPress={handlePrevWeek}
                        className="w-8 h-8 rounded-[6px] border border-[#F3F5F7] p-1.5 items-center justify-center bg-white"
                        activeOpacity={0.7}
                    >
                        <ArrowLeft2 size={16} color="#626262" />
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={handleNextWeek}
                        className="w-8 h-8 rounded-[6px] border border-[#F3F5F7] p-1.5 items-center justify-center bg-white"
                        activeOpacity={0.7}
                    >
                        <ArrowRight2 size={16} color="#626262" />
                    </TouchableOpacity>
                </View>
            </View>

            {/*  Subheading */}
            <Text className="text-[16px] text-[#626262] mb-4">
                {selectedDayInfo ? selectedDayInfo.fullDate : 'Tuesday, Jul 14, 2026'}
            </Text>

            {/* Date Selector */}
            <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                className="mb-4"
                contentContainerStyle={{ gap: 8 }}
            >
                {days.map((d) => {
                    const isSelected = d.date === selectedDate;
                    let bgClass = 'bg-white border border-[#E5E7EB]';
                    let textClass = 'text-[#4A5565] font-semibold';
                    let dateClass = 'text-[#4A5565] font-semibold';

                    if (d.isOff) {
                        bgClass = isSelected ? 'bg-[#FFF5F5] border border-[#FCE7E7]' : 'bg-[#FDF2F2]';
                        textClass = 'text-[#DC2626] font-semibold';
                        dateClass = 'text-[#DC2626] font-semibold';
                    } else if (isSelected) {
                        bgClass = 'bg-[#FFEAD8] border border-[#F67300]';
                        textClass = 'text-[#EE8B3A] font-semibold';
                        dateClass = 'text-[#EE8B3A] font-semibold';
                    }

                    return (
                        <TouchableOpacity
                            key={`${d.day}-${d.date}`}
                            onPress={() => setSelectedDate(d.date)}
                            className={`w-12 h-12 rounded-[12px] items-center justify-center ${bgClass}`}
                            activeOpacity={0.8}
                        >
                            <Text className={`text-[10px] ${textClass}`}>{d.day}</Text>
                            <Text className={`text-[10px] mt-1 ${dateClass}`}>{d.date}</Text>
                        </TouchableOpacity>
                    );
                })}
            </ScrollView>

            {/* Content */}
            {activeClass ? (
                <View className="bg-[#FAFAFA] border border-[#F2EEF4] rounded-[16px] p-5">
                    <Text className="text-[16px] font-semibold text-[#333333]">{activeClass.title}</Text>
                    <Text className="text-[14px] text-[#6A7282] mt-0.5">{activeClass.subtitle}</Text>

                    <View className="flex-row items-center mt-4 mb-5 gap-4">
                        <View className="flex-row items-center">
                            <View className="w-[30px] h-[30px] rounded-[8px] bg-white border border-[#F3F5F7] items-center justify-center">
                                <Clock size={14} color="#A0A0A0" />
                            </View>
                            <Text className="text-[12px] text-[#626262] ml-2">{activeClass.time}</Text>
                        </View>

                        <View className="flex-row items-center">
                            <View className="w-[30px] h-[30px] rounded-[8px] bg-white border border-[#F3F5F7] items-center justify-center">
                                <Calendar size={14} color="#A0A0A0" />
                            </View>
                            <Text className="text-[12px] text-[#626262] ml-2">{activeClass.dateLabel}</Text>
                        </View>
                    </View>

                    {/* Buttons Row */}
                    <View className="flex-row items-center gap-3">
                        <TouchableOpacity
                            onPress={handleOpenEdit}
                            className="w-12 h-10 rounded-xl border border-[#E2E8F0] items-center justify-center"
                            activeOpacity={0.7}
                        >
                            <Edit size={18} color="#555" />
                        </TouchableOpacity>

                        <TouchableOpacity
                            className="flex-1 h-10 bg-[#F67300] rounded-[12px] items-center justify-center"
                            activeOpacity={0.8}
                        >
                            <Text className="text-white text-[14px] font-semibold">Start</Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            className="flex-1 h-10 bg-[#FFA2A2] rounded-[12px] items-center justify-center"
                            activeOpacity={0.8}
                        >
                            <Text className="text-white text-[14px] font-semibold">End</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            ) : (
                <View className="py-2 px-1">
                    <Text className="text-[14px] text-[#6A7282]">
                        No live classes currently active.
                    </Text>
                </View>
            )}

            {/* Edit Modal */}
            <Modal
            visible={isEditModalOpen}
            transparent
            animationType="fade"
            onRequestClose={() => setIsEditModalOpen(false)}
        >
            <View className="flex-1 bg-black/40 items-center justify-center px-6">
                <View className="bg-white rounded-[24px] p-6 w-full max-w-[320px] shadow-lg">
                    <Text className="text-[20px] font-semibold text-[#0B1C30] mb-4">Edit Schedule</Text>

                    {/* Date field */}
                    <View className="mb-4">
                        <Text className="text-[14px] font-semibold text-[#626262] mb-1.5">Date</Text>
                        <View className="flex-row items-center border border-[#E2E8F0] rounded-[12px] px-3.5 h-11 bg-[#FFFFFF]">
                            <TextInput
                                value={editDate}
                                onChangeText={setEditDate}
                                placeholder="DD-MM-YYYY"
                                placeholderTextColor="#A0A0AB"
                                className="flex-1 text-[14px] text-[#626262]"
                            />
                            <Calendar size={16} color="#626262" />
                        </View>
                    </View>

                    {/* Time Range field */}
                    <View className="mb-6">
                        <Text className="text-[14px] font-semibold text-[#626262] mb-1.5">Time Range</Text>
                        <View className="flex-row items-center border border-[#E2E8F0] rounded-[12px] px-3.5 h-11 bg-[#FFFFFF]">
                            <TextInput
                                value={editTimeRange}
                                onChangeText={setEditTimeRange}
                                placeholder="HH:MM AM/PM - HH:MM AM/PM"
                                placeholderTextColor="#626262"
                                className="flex-1 text-[14px] text-[#626262]"
                            />
                        </View>
                    </View>

                    {/* Action Buttons */}
                    <View className="flex-row gap-3">
                        <TouchableOpacity
                            onPress={() => setIsEditModalOpen(false)}
                            className="flex-1 h-11 rounded-[12px] border border-[#E5E7EB] items-center justify-center bg-white"
                            activeOpacity={0.7}
                        >
                            <Text className="text-[#0B1C30] text-[14px] font-semibold">Cancel</Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            onPress={handleSave}
                            className="flex-1 h-11 rounded-[12px] bg-[#F67300] items-center justify-center"
                            activeOpacity={0.8}
                        >
                            <Text className="text-white text-[14px] font-semibold">Save</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </Modal>
    </View>
  );
}
