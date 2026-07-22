import React, { useState, useEffect, useRef } from 'react';
import { View, Text, Modal, TouchableOpacity, TextInput, ScrollView, Animated, Dimensions, PanResponder, StyleSheet } from 'react-native';
import { Image as ExpoImage } from 'expo-image';
import { Download, X } from 'lucide-react-native';
import { BlurView } from 'expo-blur';

export interface SubmissionData {
    studentId?: string;
    studentName?: string;
    submittedOn?: string;
    status?: string;
    grade?: string | number;
    notes?: string;
    fileName?: string;
    fileSize?: string;
}

interface ViewSubmissionModalProps {
    visible: boolean;
    submission?: SubmissionData | null;
    onClose: () => void;
    onUpdateGrade?: (grade: string, feedback: string) => void;
}

const { height } = Dimensions.get('window');

export default function ViewSubmissionModal({
    visible,
    submission,
    onClose,
    onUpdateGrade,
}: ViewSubmissionModalProps) {
    const studentName = submission?.studentName || 'Kuberan';
    const studentId = submission?.studentId || '10';
    const submittedOn = submission?.submittedOn || 'Jul 14, 2026, 05:15 PM';
    const status = submission?.status || 'Graded';
    const initialGrade = submission?.grade ? String(submission.grade) : '90';
    const notes = submission?.notes || '"This is my assignment work"';
    const fileName = submission?.fileName || 'Text_to_PDF_Onlinenotpad';

    const [marks, setMarks] = useState(initialGrade);
    const [feedback, setFeedback] = useState('');

    const [showModal, setShowModal] = useState(visible);
    const slideAnim = useRef(new Animated.Value(height)).current;
    const fadeAnim = useRef(new Animated.Value(0)).current;

    const panResponder = useRef(
        PanResponder.create({
            onStartShouldSetPanResponder: () => false,
            onStartShouldSetPanResponderCapture: () => false,
            onMoveShouldSetPanResponder: (_, gestureState) => {
                return Math.abs(gestureState.dy) > 2 && Math.abs(gestureState.dy) > Math.abs(gestureState.dx);
            },
            onMoveShouldSetPanResponderCapture: (_, gestureState) => {
                return Math.abs(gestureState.dy) > 2 && Math.abs(gestureState.dy) > Math.abs(gestureState.dx);
            },
            onPanResponderMove: (_, gestureState) => {
                if (gestureState.dy > 0) {
                    slideAnim.setValue(gestureState.dy);
                    const opacity = Math.max(0, 1 - (gestureState.dy / (height / 2)));
                    fadeAnim.setValue(opacity);
                }
            },
            onPanResponderRelease: (_, gestureState) => {
                if (gestureState.dy > 60 || gestureState.vy > 0.3) {
                    closeModal();
                } else {
                    Animated.parallel([
                        Animated.spring(slideAnim, {
                            toValue: 0,
                            useNativeDriver: true,
                            bounciness: 6,
                        }),
                        Animated.timing(fadeAnim, {
                            toValue: 1,
                            duration: 150,
                            useNativeDriver: true,
                        })
                    ]).start();
                }
            },
        })
    ).current;

    useEffect(() => {
        if (visible) {
            setShowModal(true);
            setMarks(submission?.grade ? String(submission.grade) : '90');
            setFeedback('');
            Animated.parallel([
                Animated.spring(slideAnim, {
                    toValue: 0,
                    useNativeDriver: true,
                    tension: 65,
                    friction: 11,
                }),
                Animated.timing(fadeAnim, {
                    toValue: 1,
                    duration: 300,
                    useNativeDriver: true,
                })
            ]).start();
        } else if (showModal) {
            closeModal();
        }
    }, [visible, submission]);

    const closeModal = () => {
        Animated.parallel([
            Animated.spring(slideAnim, {
                toValue: height,
                useNativeDriver: true,
                tension: 65,
                friction: 11,
            }),
            Animated.timing(fadeAnim, {
                toValue: 0,
                duration: 250,
                useNativeDriver: true,
            })
        ]).start(() => {
            setShowModal(false);
            onClose();
        });
    };

    const handleSaveGrade = () => {
        if (onUpdateGrade) {
            onUpdateGrade(marks, feedback);
        }
        closeModal();
    };

    if (!showModal) return null;

    return (
        <Modal
            visible={showModal}
            transparent
            animationType="none"
            onRequestClose={closeModal}
        >
            <Animated.View style={[StyleSheet.absoluteFill, { opacity: fadeAnim }]}>
                <BlurView intensity={20} tint="dark" style={StyleSheet.absoluteFill}>
                    <TouchableOpacity
                        style={StyleSheet.absoluteFill}
                        activeOpacity={1}
                        onPress={closeModal}
                    />
                </BlurView>
            </Animated.View>

            <Animated.View
                style={[
                    styles.drawerContainer,
                    { transform: [{ translateY: slideAnim }] }
                ]}
                {...panResponder.panHandlers}
            >
                <TouchableOpacity
                    style={{ flex: 1 }}
                    activeOpacity={1}
                    onPress={closeModal}
                />
                <View className="bg-white rounded-t-[30px] p-7 w-full max-h-[70%] shadow-2xl">

                    <ScrollView showsVerticalScrollIndicator={false}>
                        <View className="border-b border-[#F3F4F6] pb-6 mb-6">
                            <View className="flex-row items-center justify-between mb-2">
                                <View className="flex-row items-center gap-2.5">
                                    <Text className="text-[24px] font-bold text-[#1A1A1A]">View Submission</Text>
                                    <View className="bg-[#2A9A46]/10 px-3 py-0.5 rounded-full">
                                        <Text className="text-[#2A9A46] text-[14px] font-medium">{status}</Text>
                                    </View>
                                </View>
                            </View>

                            <Text className="text-[14px] text-[#626262]">
                                <Text className="font-semibold text-[#1A1A1A]">{studentName} ({studentId})</Text> · Submitted : {submittedOn}
                            </Text>
                        </View>

                        {/* Student Notes Section */}
                        <View className="mb-5">
                            <Text className="text-[18px] font-semibold text-[#333333] mb-4">Student Notes</Text>
                            <View className="bg-[#FFFBF7] border-l-[5px] border-[#F67300] rounded-r-[16px] rounded-l-[4px] p-6 flex-row items-start">
                                <Text className="text-[14px] text-[#4D4D4D] italic flex-1 leading-relaxed">
                                    {notes}
                                </Text>
                            </View>
                        </View>

                        {/* Submitted Files Section */}
                        <View className="mb-5">
                            <Text className="text-[18px] font-semibold text-[#333333] mb-4">Submitted Files</Text>
                            <View className="bg-white border border-[#F2EEF4] rounded-[20px] py-1 px-1 flex-row items-center justify-between">
                                <View className="flex-row items-center flex-1 mr-3">
                                    <View className="w-16 h-13 p-4 rounded-[20px] bg-[#FFF0F0] items-center justify-center mr-3">
                                        <ExpoImage
                                            source={require('../../../../../assets/images/pdficon.svg')}
                                            style={{ width: 24, height: 24 }}
                                            contentFit="contain"
                                        />
                                    </View>
                                    <View className="flex-1">
                                        <Text className="text-[14px] font-medium text-[#4D4D4D]" numberOfLines={1}>
                                            {fileName}
                                        </Text>

                                    </View>
                                </View>
                                <TouchableOpacity className="p-3 mr-1">
                                    <Download size={20} color="#808080" />
                                </TouchableOpacity>
                            </View>
                        </View>

                        {/* Grading & Feedback Section */}
                        <View className="mb-2">
                            <Text className="text-[18px] font-semibold text-[#333333] mb-3">Grading & Feedback</Text>

                            {/* Marks awarded */}
                            <Text className="text-[14px] text-[#626262] font-medium mb-2.5">Marks awarded (out of 100)</Text>
                            <View className="bg-[#F9F9F9] rounded-[12px] px-4 py-2.5 flex-row items-center w-[160px] mb-4">
                                <TextInput
                                    value={marks}
                                    onChangeText={setMarks}
                                    keyboardType="numeric"
                                    className="flex-1 text-[16px] font-medium text-[#1A1A1A] p-0"
                                />
                                <View className="border-l border-[#E5E7EB] pl-3 ml-2">
                                    <Text className="text-[14px] text-[#9CA3AF] font-medium">/100</Text>
                                </View>
                            </View>

                            {/* Instructor Feedback */}
                            <Text className="text-[14px] text-[#333333] font-medium mb-3">Instructor Feedback</Text>
                            <View className="bg-white border border-[#EEEEEE] rounded-[16px] p-3.5 min-h-[110px]">
                                <TextInput
                                    value={feedback}
                                    onChangeText={setFeedback}
                                    placeholder="Write your context and feedback here..."
                                    placeholderTextColor="#939393"
                                    multiline
                                    textAlignVertical="top"
                                    className="flex-1 text-[13px] text-[#333333] p-0 leading-relaxed text-left"
                                />
                            </View>
                        </View>

                        {/* Action Buttons */}
                        <View className="flex-row items-center justify-end gap-3 mt-6 pt-4 border-t border-[#F3F4F6]">
                            <TouchableOpacity
                                onPress={closeModal}
                                className="bg-white border border-[#E5E7EB] px-6 h-11 rounded-[12px] items-center justify-center"
                                activeOpacity={0.8}
                            >
                                <Text className="text-[#333333] font-semibold text-[15px]">Cancel</Text>
                            </TouchableOpacity>

                            <TouchableOpacity
                                onPress={handleSaveGrade}
                                className="bg-[#F67300] px-6 h-11 rounded-[12px] items-center justify-center shadow-xs"
                                activeOpacity={0.8}
                            >
                                <Text className="text-white font-semibold text-[15px]">Update Grade</Text>
                            </TouchableOpacity>
                        </View>
                    </ScrollView>
                </View>
            </Animated.View>
        </Modal>
    );
}

const styles = StyleSheet.create({
    drawerContainer: {
        flex: 1,
        justifyContent: 'flex-end',
    }
});
