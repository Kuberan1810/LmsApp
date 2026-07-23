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
            onStartShouldSetPanResponder: () => true,
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
                    Animated.parallel([
                        Animated.spring(slideAnim, {
                            toValue: height,
                            useNativeDriver: true,
                            velocity: gestureState.vy,
                            damping: 20,
                            mass: 0.6,
                            stiffness: 100,
                        }),
                        Animated.timing(fadeAnim, {
                            toValue: 0,
                            duration: 150,
                            useNativeDriver: true,
                        })
                    ]).start(() => {
                        setShowModal(false);
                        onClose();
                    });
                } else {
                    Animated.parallel([
                        Animated.spring(slideAnim, {
                            toValue: 0,
                            useNativeDriver: true,
                            bounciness: 6,
                        }),
                        Animated.timing(fadeAnim, {
                            toValue: 1,
                            duration: 200,
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
            slideAnim.setValue(height);
            fadeAnim.setValue(0);
            Animated.parallel([
                Animated.spring(slideAnim, {
                    toValue: 0,
                    useNativeDriver: true,
                    damping: 20,
                    mass: 0.8,
                    stiffness: 100,
                }),
                Animated.timing(fadeAnim, {
                    toValue: 1,
                    duration: 250,
                    useNativeDriver: true,
                })
            ]).start();
        } else if (showModal) {
            Animated.parallel([
                Animated.timing(slideAnim, {
                    toValue: height,
                    duration: 250,
                    useNativeDriver: true,
                }),
                Animated.timing(fadeAnim, {
                    toValue: 0,
                    duration: 250,
                    useNativeDriver: true,
                })
            ]).start(() => setShowModal(false));
        }
    }, [visible, submission]);

    const closeModal = () => {
        Animated.parallel([
            Animated.spring(slideAnim, {
                toValue: height,
                useNativeDriver: true,
                damping: 20,
                mass: 0.6,
                stiffness: 100,
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
            <View style={styles.overlay}>
                <Animated.View style={[styles.backdrop, { opacity: fadeAnim }]}>
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
                        styles.modalContainer,
                        { transform: [{ translateY: slideAnim }] }
                    ]}
                >
                    <View style={styles.dragArea} {...panResponder.panHandlers}>
                        <View style={styles.dragHandle} />
                    </View>

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
                            <View className="flex-row items-center justify-between bg-white border border-[#E5E7EB] rounded-[16px] p-4">
                                <View className="flex-row items-center gap-3">
                                    <View className="bg-[#FFF5ED] p-2.5 rounded-[12px]">
                                        <ExpoImage
                                            source={require('@/assets/images/pdficon.svg')}
                                            style={{ width: 24, height: 24 }}
                                            contentFit="contain"
                                        />
                                    </View>
                                    <View>
                                        <Text className="text-[14px] font-semibold text-[#1A1A1A] max-w-[200px]" numberOfLines={1}>
                                            {fileName}
                                        </Text>
                                        <Text className="text-[12px] text-[#808080]">PDF File</Text>
                                    </View>
                                </View>

                                <TouchableOpacity
                                    className="bg-[#FFF5ED] p-2.5 rounded-full"
                                    activeOpacity={0.7}
                                >
                                    <Download size={20} color="#F67300" />
                                </TouchableOpacity>
                            </View>
                        </View>

                        {/* Evaluation Form */}
                        <View className="mb-6">
                            <Text className="text-[18px] font-semibold text-[#333333] mb-4">Evaluation</Text>

                            {/* Grade Input */}
                            <View className="mb-4">
                                <Text className="text-[14px] font-medium text-[#4D4D4D] mb-2">Grade (out of 100)</Text>
                                <TextInput
                                    value={marks}
                                    onChangeText={setMarks}
                                    keyboardType="numeric"
                                    className="bg-white border border-[#E5E7EB] rounded-[12px] px-4 h-12 text-[15px] text-[#1A1A1A] font-medium focus:border-[#F67300]"
                                    placeholder="Enter grade"
                                />
                            </View>

                            {/* Feedback Input */}
                            <View>
                                <Text className="text-[14px] font-medium text-[#4D4D4D] mb-2">Feedback Notes</Text>
                                <TextInput
                                    value={feedback}
                                    onChangeText={setFeedback}
                                    multiline
                                    numberOfLines={4}
                                    textAlignVertical="top"
                                    className="bg-white border border-[#E5E7EB] rounded-[12px] p-4 min-h-[100px] text-[15px] text-[#1A1A1A] focus:border-[#F67300]"
                                    placeholder="Add feedback notes for the student..."
                                />
                            </View>
                        </View>

                        {/* Action Buttons */}
                        <View className="flex-row items-center justify-end gap-3 mt-2 mb-10 pt-4 border-t border-[#F3F4F6]">
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
                </Animated.View>
            </View>
        </Modal>
    );
}

const styles = StyleSheet.create({
    overlay: {
        flex: 1,
        justifyContent: 'flex-end',
    },
    backdrop: {
        ...StyleSheet.absoluteFill,
    },
    modalContainer: {
        backgroundColor: '#FFFFFF',
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        paddingTop: 4,
        paddingHorizontal: 28, // matches p-7 (28px)
        height: height * 0.7, // matches max-h-[70%]
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: -4,
        },
        shadowOpacity: 0.1,
        shadowRadius: 12,
        elevation: 20,
    },
    dragArea: {
        width: '100%',
        paddingVertical: 12,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'transparent',
    },
    dragHandle: {
        width: 48,
        height: 5,
        borderRadius: 3,
        backgroundColor: '#E5E7EB',
    },
});
