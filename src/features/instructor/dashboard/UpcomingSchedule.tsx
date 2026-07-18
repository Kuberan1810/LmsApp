import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import React, { useState } from 'react';
import { ArrowLeft2, ArrowRight2, Clock, Calendar, Edit2, Edit } from 'iconsax-react-native';

const DAYS = [
    { day: 'Sun', date: '12', isOff: true, fullDate: 'Sunday, Jul 12, 2026' },
    { day: 'Mon', date: '13', isOff: false, fullDate: 'Monday, Jul 13, 2026' },
    { day: 'Tue', date: '14', isOff: false, fullDate: 'Tuesday, Jul 14, 2026' },
    { day: 'Wed', date: '15', isOff: false, fullDate: 'Wednesday, Jul 15, 2026' },
    { day: 'Thu', date: '16', isOff: false, fullDate: 'Thursday, Jul 16, 2026' },
    { day: 'Fri', date: '17', isOff: false, fullDate: 'Friday, Jul 17, 2026' },
    { day: 'Sat', date: '18', isOff: false, fullDate: 'Saturday, Jul 18, 2026' },
];

const SCHEDULE_DATA: Record<string, any> = {
    '18': {
        title: 'Batch-B',
        subtitle: 'AA101 - AI-Python',
        time: '10:00 AM - 11:00 AM',
        dateLabel: 'Jul 18, 26',
    }
};

export default function UpcomingSchedule() {
    const [selectedDate, setSelectedDate] = useState('18');

    const selectedDayInfo = DAYS.find(d => d.date === selectedDate);
    const activeClass = SCHEDULE_DATA[selectedDate];

    return (
        <View className="bg-white rounded-[28px] p-6 mb-3 border border-[#F2EEF4] mt-5 mx-4">
            {/* Header  */}
            <View className="flex-row justify-between items-center mb-1">
                <Text className="text-[20px] font-semibold text-[#333333]">Upcoming Schedule</Text>
                <View className="flex-row space-x-2 gap-2">
                    <TouchableOpacity className="w-8 h-8 rounded-[6px] border border-[#F3F5F7] p-1.5 items-center justify-center">
                        <ArrowLeft2 size={16} color="#626262" />
                    </TouchableOpacity>
                    <TouchableOpacity className="w-8 h-8 rounded-[6px] border border-[#F3F5F7] p-1.5 items-center justify-center">
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
                {DAYS.map((d) => {
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
                            key={d.date}
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
        </View>
    );
}
