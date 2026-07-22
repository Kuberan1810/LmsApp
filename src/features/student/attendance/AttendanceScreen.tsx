import React, { useState } from 'react';
import {
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Entypo } from '@expo/vector-icons';
import { Clock, TickCircle, CloseCircle, Calendar, InfoCircle } from 'iconsax-react-native';
import GoBack from '@/components/GoBack';
import Header from '@/components/Student/Header';
import { push, router } from 'expo-router/build/global-state/router';

// ─── Types ───────────────────────────────────────────────────────────────────

type AttendanceStatus = 'present' | 'absent' | 'holiday' | 'weekend' | 'none';

interface DayRecord {
  dayName: string;
  date: string;
  month: string;
  fullDate: string;
  status: AttendanceStatus;
  checkIn?: string;
  checkOut?: string;
  totalHours?: string;
}

// ─── Mock Data ────────────────────────────────────────────────────────────────

const MONTHS = [
  'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
  'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec',
];

const ATTENDANCE_DATA: DayRecord[] = [
  { dayName: 'Mon', date: '21', month: 'Jul', fullDate: 'Mon, 21 Jul 2025', status: 'present', checkIn: '09:02 AM', checkOut: '05:45 PM', totalHours: '8h 43m' },
  { dayName: 'Tue', date: '22', month: 'Jul', fullDate: 'Tue, 22 Jul 2025', status: 'present', checkIn: '09:10 AM', checkOut: '06:00 PM', totalHours: '8h 50m' },
  { dayName: 'Wed', date: '23', month: 'Jul', fullDate: 'Wed, 23 Jul 2025', status: 'present', checkIn: '09:00 AM', checkOut: '05:30 PM', totalHours: '8h 30m' },
  { dayName: 'Thu', date: '24', month: 'Jul', fullDate: 'Thu, 24 Jul 2025', status: 'present', checkIn: '10:15 AM', checkOut: '06:30 PM', totalHours: '8h 15m' },
  { dayName: 'Fri', date: '25', month: 'Jul', fullDate: 'Fri, 25 Jul 2025', status: 'absent', checkIn: undefined, checkOut: undefined },
  { dayName: 'Sat', date: '26', month: 'Jul', fullDate: 'Sat, 26 Jul 2025', status: 'weekend' },
  { dayName: 'Sun', date: '27', month: 'Jul', fullDate: 'Sun, 27 Jul 2025', status: 'weekend' },
  { dayName: 'Mon', date: '28', month: 'Jul', fullDate: 'Mon, 28 Jul 2025', status: 'present', checkIn: '08:55 AM', checkOut: '05:40 PM', totalHours: '8h 45m' },
  { dayName: 'Tue', date: '29', month: 'Jul', fullDate: 'Tue, 29 Jul 2025', status: 'present', checkIn: '09:03 AM', checkOut: '05:50 PM', totalHours: '8h 47m' },
  { dayName: 'Wed', date: '30', month: 'Jul', fullDate: 'Wed, 30 Jul 2025', status: 'present', checkIn: '09:00 AM', checkOut: '05:35 PM', totalHours: '8h 35m' },
  { dayName: 'Thu', date: '31', month: 'Jul', fullDate: 'Thu, 31 Jul 2025', status: 'holiday' },
  { dayName: 'Fri', date: '01', month: 'Aug', fullDate: 'Fri, 01 Aug 2025', status: 'present', checkIn: '09:08 AM', checkOut: '05:55 PM', totalHours: '8h 47m' },
  { dayName: 'Sat', date: '02', month: 'Aug', fullDate: 'Sat, 02 Aug 2025', status: 'weekend' },
  { dayName: 'Sun', date: '03', month: 'Aug', fullDate: 'Sun, 03 Aug 2025', status: 'weekend' },
  { dayName: 'Mon', date: '04', month: 'Aug', fullDate: 'Mon, 04 Aug 2025', status: 'present', checkIn: '09:00 AM', checkOut: '05:45 PM', totalHours: '8h 45m' },
  { dayName: 'Tue', date: '05', month: 'Aug', fullDate: 'Tue, 05 Aug 2025', status: 'absent' },
  { dayName: 'Wed', date: '06', month: 'Aug', fullDate: 'Wed, 06 Aug 2025', status: 'present', checkIn: '09:05 AM', checkOut: '06:00 PM', totalHours: '8h 55m' },
  { dayName: 'Thu', date: '07', month: 'Aug', fullDate: 'Thu, 07 Aug 2025', status: 'present', checkIn: '08:58 AM', checkOut: '05:40 PM', totalHours: '8h 42m' },
];

// ─── Helpers ──────────────────────────────────────────────────────────────────

const statusConfig = {
  present: { bg: '#E8F8F0', color: '#1DD75B', label: 'Present', Icon: TickCircle },
  absent: { bg: '#FDE8E8', color: '#E61026', label: 'Absent', Icon: CloseCircle },
  late: { bg: '#FFF3E8', color: '#EE8B3A', label: 'Late', Icon: Clock },
  holiday: { bg: '#FFEDDD', color: '#FFBE85', label: 'Holiday', Icon: Calendar },
  weekend: { bg: '#F5F5F5', color: '#AAAAAA', label: 'Weekend', Icon: InfoCircle },
  none: { bg: '#FFFFFF', color: '#CCCCCC', label: 'No Data', Icon: InfoCircle },
};

function calcSummary(data: DayRecord[]) {
  const workdays = data.filter(d => d.status !== 'weekend');
  const present = workdays.filter(d => d.status === 'present').length;
  const absent = workdays.filter(d => d.status === 'absent').length;
  const holiday = workdays.filter(d => d.status === 'holiday').length;
  const pct = workdays.length > 0 ? Math.round((present / (workdays.length - holiday)) * 100) : 0;
  return { present, absent, holiday, total: workdays.length - holiday, pct };
}

// ─── Sub-components ───────────────────────────────────────────────────────────

function CalendarDot({ status }: { status: AttendanceStatus }) {
  const cfg = statusConfig[status] ?? statusConfig.none;
  return (
    <View style={{ backgroundColor: cfg.bg }} className="w-[13%] aspect-square rounded-[14px] items-center justify-center">
      <Text style={{ color: cfg.color }} className="text-[11px] font-medium leading-none mb-0.5">
        {/* empty — just colored dot */}
      </Text>
    </View>
  );
}

function SummaryChip({ label, value, color, bg }: { label: string; value: number; color: string; bg: string }) {
  return (
    <View style={{ backgroundColor: bg }} className="flex-1 rounded-[18px] p-4 items-center mx-1">
      <Text style={{ color }} className="text-[24px] font-bold">{value}</Text>
      <Text className="text-[#888] text-[12px] mt-0.5 text-center">{label}</Text>
    </View>
  );
}

function DetailRow({ record }: { record: DayRecord }) {
  const cfg = statusConfig[record.status] ?? statusConfig.none;
  const StatusIcon = cfg.Icon;

  if (record.status === 'weekend') return null;

  return (
    <View className="flex-row items-center py-4 border-b border-[#F5F5F5]">
      {/* Date pill */}
      <View style={{ backgroundColor: cfg.bg }} className="w-14 h-14 rounded-[16px] items-center justify-center mr-4">
        <Text style={{ color: cfg.color }} className="text-[11px] font-semibold">{record.dayName}</Text>
        <Text style={{ color: cfg.color }} className="text-[17px] font-bold leading-tight">{record.date}</Text>
      </View>

      {/* Info */}
      <View className="flex-1">
        <View className="flex-row items-center gap-2 mb-1">
          <StatusIcon size={14} color={cfg.color} variant="Bold" />
          <Text style={{ color: cfg.color }} className="text-[13px] font-semibold">{cfg.label}</Text>
        </View>

        {record.checkIn ? (
          <View className="flex-row items-center gap-4">
            <View className="flex-row items-center gap-1">
              <Clock size={12} color="#999" />
              <Text className="text-[#555] text-[12px]">In: <Text className="font-semibold text-[#222]">{record.checkIn}</Text></Text>
            </View>
            <View className="flex-row items-center gap-1">
              <Clock size={12} color="#999" />
              <Text className="text-[#555] text-[12px]">Out: <Text className="font-semibold text-[#222]">{record.checkOut}</Text></Text>
            </View>
          </View>
        ) : (
          <Text className="text-[#BBBBBB] text-[12px]">
            {record.status === 'holiday' ? 'Public Holiday' : 'No record'}
          </Text>
        )}
      </View>

      {/* Total hours */}
      {record.totalHours && (
        <View className="bg-[#F5F5F5] px-3 py-1.5 rounded-xl">
          <Text className="text-[#444] text-[12px] font-semibold">{record.totalHours}</Text>
        </View>
      )}
    </View>
  );
}

// ─── Main Screen ──────────────────────────────────────────────────────────────

export default function AttendanceScreen() {
  const [currentMonthIndex, setCurrentMonthIndex] = useState(6); // Jul
  const [selectedDay, setSelectedDay] = useState<DayRecord | null>(null);
  const [activeTab, setActiveTab] = useState<'calendar' | 'details'>('calendar');

  const monthName = MONTHS[currentMonthIndex];
  const year = 2025;

  const summary = calcSummary(ATTENDANCE_DATA);

  const prevMonth = () => setCurrentMonthIndex(i => (i === 0 ? 11 : i - 1));
  const nextMonth = () => setCurrentMonthIndex(i => (i === 11 ? 0 : i + 1));

  // Build 4, 5, or 6-week grid
  const startOffset = new Date(year, currentMonthIndex, 1).getDay();
  const daysInMonth = new Date(year, currentMonthIndex + 1, 0).getDate();
  const totalSlots = startOffset + daysInMonth <= 28 ? 28 : (startOffset + daysInMonth <= 35 ? 35 : 42);

  const calendarCells: DayRecord[] = [];
  const DAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  
  for (let i = 0; i < totalSlots; i++) {
    const dateObj = new Date(year, currentMonthIndex, i - startOffset + 1);
    const dayOfWeek = dateObj.getDay();
    
    if (dateObj.getMonth() !== currentMonthIndex) {
      calendarCells.push({
        dayName: DAYS[dayOfWeek],
        date: String(dateObj.getDate()).padStart(2, '0'),
        month: MONTHS[dateObj.getMonth()],
        fullDate: '',
        status: 'none'
      });
    } else {
      const padded = String(dateObj.getDate()).padStart(2, '0');
      const found = ATTENDANCE_DATA.find(r => r.date === padded && r.month === monthName);
      
      const defaultStatus = (dayOfWeek === 0 || dayOfWeek === 6) ? 'weekend' : 'none';
      
      calendarCells.push(found ?? {
        dayName: DAYS[dayOfWeek],
        date: padded,
        month: monthName,
        fullDate: '',
        status: defaultStatus,
      });
    }
  }

  const weekDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  const detailRecords = ATTENDANCE_DATA.filter(r => r.month === monthName && r.status !== 'weekend');

  return (
    <SafeAreaView className="flex-1 bg-[#F7F7FB]" edges={['top', 'left', 'right']}>
      <StatusBar backgroundColor="#F7F7FB" barStyle="dark-content" />
      <Header
        title='Attendance'
        onBackPress={() => router.back()}
        showSearch={false}
        showNotification={false}
        titleAlign="center"
      />
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 80 }}>


        <View className="px-5 pt-3 pb-4 bg-[#F7F7FB]">


          {/* Tabs */}
          <View className="flex-row bg-white rounded-[14px] p-1 border border-[#F2EEF4]">
            {(['calendar', 'details'] as const).map(tab => (
              <TouchableOpacity
                key={tab}
                onPress={() => setActiveTab(tab)}
                style={tab === activeTab ? styles.tabActive : undefined}
                className={`flex-1 py-2.5 rounded-[11px] items-center`}
              >
                <Text style={{ color: tab === activeTab ? '#FFFFFF' : '#999' }}
                  className="text-[13px] font-semibold capitalize">
                  {tab === 'calendar' ? 'Calendar' : 'Daily Log'}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* ── SUMMARY CARDS ── */}
        <View className="flex-row px-4 mb-5">
          <SummaryChip label="Present" value={summary.present} color="#1DD75B" bg="#E8F8F0" />
          <SummaryChip label="Absent" value={summary.absent} color="#E61026" bg="#FDE8E8" />
          <SummaryChip label="Attendance" value={summary.pct} color="#6366F1" bg="#EEF2FF" />
        </View>

        {activeTab === 'calendar' ? (
          <>
            {/* ── CALENDAR CARD ── */}
            <View className="mx-5 bg-white rounded-[24px] p-5 border border-[#F2EEF4]">

              {/* Month navigator */}
              <View className="flex-row justify-between items-center mb-5">
                <TouchableOpacity onPress={prevMonth} className="bg-[#F5F5F5] p-2 rounded-xl">
                  <Entypo name="triangle-left" size={16} color="#555" />
                </TouchableOpacity>
                <Text className="text-[16px] font-bold text-[#1E1E2D]">{monthName} {year}</Text>
                <TouchableOpacity onPress={nextMonth} className="bg-[#F5F5F5] p-2 rounded-xl">
                  <Entypo name="triangle-right" size={16} color="#555" />
                </TouchableOpacity>
              </View>

              {/* Calendar grid */}
              <View className="flex-row flex-wrap justify-between gap-y-3 mt-4">
                {calendarCells.map((cell, idx) => {
                  const getStatusStyles = (status: AttendanceStatus) => {
                    switch (status) {
                      case 'present': return { bg: '#DCFCE780', day: '#3EA465', date: '#3EA465', border: 'transparent' };
                      case 'absent': return { bg: '#FEE2E280', day: '#CE1919', date: '#CE1919', border: 'transparent' };
                      case 'holiday': return { bg: '#FFEDDD', day: '#FFBE85', date: '#FFBE85', border: 'transparent' };
                      case 'weekend': return { bg: '#FFEDDD', day: '#333333', date: '#777777', border: 'transparent' };
                      case 'none':
                      default: return { bg: '#FFFFFF', day: '#333333', date: '#777777', border: '#E5E7EB' };
                    }
                  };
                  
                  const styles = getStatusStyles(cell.status);
                  const isSelected = selectedDay?.date === cell.date && selectedDay?.month === cell.month && cell.status !== 'none';
                  const isCurrentMonth = cell.month === monthName;
                  
                  return (
                    <TouchableOpacity
                      key={idx}
                      onPress={() => {
                        if (isCurrentMonth && cell.status !== 'none') {
                          setSelectedDay(isSelected ? null : cell);
                        }
                      }}
                      activeOpacity={0.7}
                      style={{
                        width: '13%', 
                        aspectRatio: 44 / 43,
                        backgroundColor: isSelected ? styles.day : styles.bg,
                        borderColor: isSelected ? styles.day : styles.border,
                        borderWidth: isSelected ? 1.5 : (cell.status === 'none' ? 1 : 0),
                      }}
                      className={`rounded-[14px] items-center justify-center py-1.5 gap-0.5 ${!isCurrentMonth ? 'opacity-30' : ''}`}
                    >
                      <Text style={{ color: isSelected ? '#FFF' : styles.day }} className="text-[14px] font-semibold leading-none text-center">
                        {cell.dayName}
                      </Text>
                      <Text style={{ color: isSelected ? '#FFF' : styles.date }} className="text-[12px] font-medium leading-none text-center">
                        {cell.date}
                      </Text>
                    </TouchableOpacity>
                  );
                })}
              </View>

              {/* Legend */}
              <View className="flex-row justify-center flex-wrap gap-4 mt-5">
                {(['present', 'absent', 'holiday'] as AttendanceStatus[]).map(s => {
                  const cfg = statusConfig[s];
                  return (
                    <View key={s} className="flex-row items-center gap-1.5">
                      <View style={{ backgroundColor: cfg.color }} className="w-2.5 h-2.5 rounded-[3px]" />
                      <Text className="text-[12px] text-[#888]">{cfg.label}</Text>
                    </View>
                  );
                })}
              </View>
            </View>

            {/* ── SELECTED DAY DETAIL ── */}
            {selectedDay && selectedDay.status !== 'weekend' && (
              <View className="mx-5 mt-4 bg-white rounded-[20px] p-5 border border-[#F2EEF4]">
                <Text className="text-[14px] font-bold text-[#1E1E2D] mb-4">{selectedDay.fullDate}</Text>

                {/* Status badge */}
                {(() => {
                  const cfg = statusConfig[selectedDay.status];
                  const Icon = cfg.Icon;
                  return (
                    <View style={{ backgroundColor: cfg.bg }} className="flex-row items-center gap-2 self-start px-4 py-2 rounded-full mb-4">
                      <Icon size={16} color={cfg.color} variant="Bold" />
                      <Text style={{ color: cfg.color }} className="text-[13px] font-semibold">{cfg.label}</Text>
                    </View>
                  );
                })()}

                {selectedDay.checkIn ? (
                  <View className="flex-row gap-3">
                    <View className="flex-1 bg-[#F7F7FB] rounded-[16px] p-4">
                      <Text className="text-[#999] text-[12px] mb-1">Check-In Time</Text>
                      <Text className="text-[#1E1E2D] text-[18px] font-bold">{selectedDay.checkIn}</Text>
                    </View>
                    <View className="flex-1 bg-[#F7F7FB] rounded-[16px] p-4">
                      <Text className="text-[#999] text-[12px] mb-1">Check-Out Time</Text>
                      <Text className="text-[#1E1E2D] text-[18px] font-bold">{selectedDay.checkOut}</Text>
                    </View>
                  </View>
                ) : (
                  <Text className="text-[#BBBBBB] text-[13px]">
                    {selectedDay.status === 'holiday' ? 'Public Holiday — no attendance required' : 'No check-in/check-out recorded for this day'}
                  </Text>
                )}

                {selectedDay.totalHours && (
                  <View className="mt-3 bg-[#F0FDF4] rounded-[14px] p-4 flex-row items-center justify-between">
                    <Text className="text-[#555] text-[13px]">Total Hours</Text>
                    <Text className="text-[#1DD75B] text-[16px] font-bold">{selectedDay.totalHours}</Text>
                  </View>
                )}
              </View>
            )}
          </>
        ) : (
          /* ── DAILY LOG ── */
          <View className="mx-5 bg-white rounded-[24px] px-5 border border-[#F2EEF4]">

            {/* Month navigator */}
            <View className="flex-row justify-between items-center py-4 border-b border-[#F5F5F5]">
              <TouchableOpacity onPress={prevMonth} className="bg-[#F5F5F5] p-2 rounded-xl">
                <Entypo name="triangle-left" size={16} color="#555" />
              </TouchableOpacity>
              <Text className="text-[15px] font-bold text-[#1E1E2D]">{monthName} {year}</Text>
              <TouchableOpacity onPress={nextMonth} className="bg-[#F5F5F5] p-2 rounded-xl">
                <Entypo name="triangle-right" size={16} color="#555" />
              </TouchableOpacity>
            </View>

            {detailRecords.length === 0 ? (
              <View className="py-12 items-center">
                <Text className="text-[#CCC] text-[15px]">No records for {monthName}</Text>
              </View>
            ) : (
              detailRecords.map((r, i) => <DetailRow key={i} record={r} />)
            )}
          </View>
        )}

      </ScrollView>
    </SafeAreaView>
  );
}

// ─── Styles ───────────────────────────────────────────────────────────────────

const styles = StyleSheet.create({
  tabActive: { backgroundColor: '#F67300' },
});
