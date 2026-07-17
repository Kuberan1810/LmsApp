import {
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import { Feather } from '@expo/vector-icons';
import React, { useState, useEffect } from 'react';
import { router } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import GoBack from '@/components/GoBack';

// ─── Sub-components ─────────────────────────────────────────────────────────

const StatItem = ({ label, value }: { label: string; value: string }) => (
    <View>
        <Text className="text-[#A3A3A3] text-[13px] mb-1.5">{label}</Text>
        <Text className="text-white text-[15px] font-semibold">{value}</Text>
    </View>
);

const TimerDigit = ({
    value,
    label,
    showColon = true,
}: {
    value: string;
    label: string;
    showColon?: boolean;
}) => (
    <View className="flex-row items-start">
        <View className="items-center w-[54px]">
            <Text className="text-[#FF7A00] text-[30px] font-semibold leading-none mb-1">{value}</Text>
            <Text className="text-[#555] text-[12px] font-medium mt-1">{label}</Text>
        </View>
        {showColon && (
            <View className="justify-start pt-1.5 mx-1">
                <Text className="text-[#FF7A00] text-[22px] font-bold leading-none">:</Text>
            </View>
        )}
    </View>
);

// ─── Data ────────────────────────────────────────────────────────────────────

const TEST_INFO = {
    studentName: 'Kuberan S',
    testName: 'React Fundamentals',
    questionCount: '20 Questions',
    totalMarks: '100',
    timeDuration: '40 Minutes',
    scheduledAt: '10:00 am , Jan 24 , 2026',
};

const INSTRUCTIONS_SLIDES = [
    {
        type: 'timer_white',
        title: 'Your test is scheduled to begin at:',
        desc: '',
    },
    {
        type: 'info',
        title: 'Internet Connectivity',
        desc: 'Ensure that you have a stable internet connection with a minimum speed 256 kbps',
    },
    {
        type: 'info',
        title: "Don't Press F5",
        desc: "Don't refresh the webpage during the test time. This will lead to immediate submission of your responses.",
    },
];

// ─── Main Component ──────────────────────────────────────────────────────────

export default function TestCard() {
    const [slide, setSlide] = useState(0);
    const [timeLeft, setTimeLeft] = useState(5);

    // Countdown
    useEffect(() => {
        if (timeLeft > 0) {
            const t = setTimeout(() => setTimeLeft(v => v - 1), 1000);
            return () => clearTimeout(t);
        }
    }, [timeLeft]);


    const prevSlide = () => setSlide(s => (s === 0 ? INSTRUCTIONS_SLIDES.length - 1 : s - 1));
    const nextSlide = () => setSlide(s => (s + 1) % INSTRUCTIONS_SLIDES.length);

    const isTimerDone = timeLeft === 0;
    const isTimerSlide = INSTRUCTIONS_SLIDES[slide].type === 'timer_white';

    return (
        <SafeAreaView className="flex-1 bg-[#1A1A1A]" edges={['top', 'left', 'right']}>
            <StatusBar backgroundColor="#1A1A1A" barStyle="light-content" />

            <ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{ paddingBottom: 60 }}
            >

                {/* ── HEADER ── */}
                <View className="px-6 pt-2 pb-14">
                    <View className="mt-1 mb-6 items-start">
                        <GoBack color="white" variant='card'  />
                    </View>

                    <Text className="text-white text-[22px] font-medium mb-5">
                        Hi {TEST_INFO.studentName},
                    </Text>
                    <Text className="text-[#A3A3A3] text-[15px] mb-1">Welcome to</Text>
                    <Text className="text-[#FF7A00] text-[28px] font-semibold mb-10">
                        {TEST_INFO.testName}
                    </Text>

                    <View className="flex-row justify-between pr-4">
                        <StatItem label="Question Count" value={TEST_INFO.questionCount} />
                        <StatItem label="Total Marks" value={TEST_INFO.totalMarks} />
                        <StatItem label="Time Duration" value={TEST_INFO.timeDuration} />
                    </View>
                </View>

                {/* ── CARD AREA ── */}
                <View className="px-5 mt-2">

                    {/* Glow blobs — always rendered, always same className count */}
                    <View style={StyleSheet.absoluteFill} className="items-center justify-center" pointerEvents="none">
                        <View className="w-[320px] h-[320px] bg-[#EE8B3A] rounded-full opacity-30 absolute -top-16 -left-16" />
                        <View className="w-[280px] h-[280px] bg-[#EE8B3A] rounded-full opacity-25 absolute bottom-8 -right-12" />
                    </View>

                    {/*
                     * KEY FIX: Both slide types are ALWAYS in the React tree.
                     * We toggle `display: 'none'` via StyleSheet so NativeWind
                     * always sees the same number of className hooks → no crash.
                     */}

                    {/* ── TIMER SLIDE ── */}
                    <View style={isTimerSlide ? undefined : hidden}>
                        <View className="bg-white rounded-[20px] py-10 px-6 min-h-[270px]   justify-center relative">

                            <Text className="text-[#666] text-[13px] text-center mb-3">
                                {INSTRUCTIONS_SLIDES[0].title}
                            </Text>
                            <Text className="text-[#222] text-[16px] font-semibold text-center mb-8">
                                {TEST_INFO.scheduledAt}
                            </Text>

                            <View className="flex-row justify-center items-center mb-6">
                                <Feather name="clock" size={15} color="#333" />
                                <Text className="text-[#333] text-[15px] font-medium ml-2">
                                    Time Remaining
                                </Text>
                            </View>

                            {/* Countdown digits */}
                            <View className="flex-row justify-center items-center mb-10">
                                <TimerDigit value="00" label="Days" />
                                <TimerDigit value="00" label="Hours" />
                                <TimerDigit value="00" label="Minutes" />
                                <TimerDigit
                                    value={timeLeft.toString().padStart(2, '0')}
                                    label="Seconds"
                                    showColon={false}
                                />
                            </View>



                            {/* Chevrons */}
                            <View style={styles.chevronRightWrap} pointerEvents="box-none">
                                <TouchableOpacity style={styles.chevronBtn} onPress={nextSlide}>
                                    <Feather name="chevron-right" size={22} color="#999" />
                                </TouchableOpacity>
                            </View>
                            <View style={styles.chevronLeftWrap} pointerEvents="box-none">
                                <TouchableOpacity style={styles.chevronBtn} onPress={prevSlide}>
                                    <Feather name="chevron-left" size={22} color="#999" />
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>

                    {/* ── INFO SLIDES ── */}
                    <View style={!isTimerSlide ? undefined : hidden}>
                        <View className="bg-white rounded-[20px] py-10 px-6c min-h-[270px]  justify-center relative">

                            <View className="items-center px-6">
                                <Text className="text-[#222] text-[18px] font-semibold text-center mb-3">
                                    {INSTRUCTIONS_SLIDES[slide].title}
                                </Text>
                                <Text className="text-[#666] text-[14px] text-center leading-6 max-w-[260px]">
                                    {INSTRUCTIONS_SLIDES[slide].desc}
                                </Text>
                            </View>

                            {/* Chevrons */}
                            <View style={styles.chevronRightWrap} pointerEvents="box-none">
                                <TouchableOpacity style={styles.chevronBtn} onPress={nextSlide}>
                                    <Feather name="chevron-right" size={22} color="#999" />
                                </TouchableOpacity>
                            </View>
                            <View style={styles.chevronLeftWrap} pointerEvents="box-none">
                                <TouchableOpacity style={styles.chevronBtn} onPress={prevSlide}>
                                    <Feather name="chevron-left" size={22} color="#999" />
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>

                    {/* ── START BUTTON (below ALL cards) ── */}
                    <View className="items-center mt-6">
                        <TouchableOpacity
                            style={isTimerDone ? btn.active : btn.disabled}
                            disabled={!isTimerDone}
                            onPress={() => router.push('/(student)/tests/question-one')}
                            activeOpacity={0.85}
                        >
                            <Text style={isTimerDone ? btn.textActive : btn.textDisabled}>
                                Start Test
                            </Text>
                        </TouchableOpacity>
                    </View>

                    {/* ── HINT ── */}
                    <Text className="text-[#888] text-center text-[12.5px] mt-4 px-10 leading-5">
                        The start button will activate automatically when the countdown reaches zero
                    </Text>

                    {/* Dot indicators */}
                    <View className="flex-row justify-center items-center mt-5 gap-2">
                        {INSTRUCTIONS_SLIDES.map((_, i) => (
                            <View
                                key={i}
                                style={i === slide ? dot.active : dot.inactive}
                            />
                        ))}
                    </View>

                </View>
            </ScrollView>
        </SafeAreaView>
    );
}

// ─── StyleSheet (only for things that are truly dynamic) ─────────────────────

const hidden = StyleSheet.create({ h: { display: 'none' } }).h;

const styles = StyleSheet.create({
    // Wrapper: full-height strip pinned to left/right edge, centered vertically
    chevronRightWrap: { position: 'absolute', right: 12, top: 0, bottom: 0, justifyContent: 'center' },
    chevronLeftWrap:  { position: 'absolute', left: 12,  top: 0, bottom: 0, justifyContent: 'center' },
    // The actual tappable icon box
    chevronBtn: { padding: 6, borderRadius: 8, borderWidth: 1, borderColor: '#F2EEF4', backgroundColor: '#FAFAFA' },
});

const btn = StyleSheet.create({
    active:       { backgroundColor: '#F67300', borderRadius: 12, alignSelf: 'center' },
    disabled:     { backgroundColor: '#F4F4F4', borderRadius: 12, alignSelf: 'center' },
    textActive:   { color: '#FFFFFF', fontSize: 15, fontWeight: '400', paddingHorizontal: 40, paddingVertical: 12 },
    textDisabled: { color: '#999999', fontSize: 15, fontWeight: '400', paddingHorizontal: 40, paddingVertical: 12 },
});

const dot = StyleSheet.create({
    active:   { width: 24, height: 8, backgroundColor: '#FF7A00', borderRadius: 999 },
    inactive: { width: 8,  height: 8, backgroundColor: '#444',    borderRadius: 999 },
});