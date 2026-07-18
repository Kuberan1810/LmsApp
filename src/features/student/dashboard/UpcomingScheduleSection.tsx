import { View, Text } from 'react-native';
import React from 'react';
import ScheduleCard from './ScheduleCard';
import BtnCom from '../../../components/BtnCom';

const SCHEDULE_DATA = [
  {
    id: '1',
    title: 'AM101 - AI / ML Frontier AI Engineer',
    time: '9:00 - 10:00 am',
    date: 'Jan 15, 26',
    instructorName: 'Ms Samantha William',
    status: 'join' as const,
  },
  {
    id: '2',
    title: 'SS102 - System and Software System Pro',
    time: '9:00 - 10:00 am',
    date: 'Jan 15, 26',
    instructorName: 'Ms Samantha William',
    status: 'soon' as const,
  }
];

export default function UpcomingScheduleSection() {
  return (
    <View className="bg-white mx-5 mt-6 rounded-3xl p-5 border border-[#F2EEF4]">
      <View className="flex-row justify-between items-start mb-6">
        <View>
          <Text className="text-[20px] font-semibold text-[#333333] mb-1">Upcoming Schedule</Text>
          <Text className="text-[12px] text-[#626262]">Friday, 15 Jan, 2024</Text>
        </View>
        <BtnCom label="View all" />
      </View>

      <View>
        {SCHEDULE_DATA.map((item) => (
          <ScheduleCard 
            key={item.id}
            title={item.title}
            time={item.time}
            date={item.date}
            instructorName={item.instructorName}
            status={item.status}
          />
        ))}
      </View>
    </View>
  );
}
