import React, { useEffect, useRef, useState } from 'react';
import { View, Text, Modal, TouchableOpacity, Animated, Dimensions, PanResponder, StyleSheet } from 'react-native';
import { BlurView } from 'expo-blur';
import { Logout } from 'iconsax-react-native';

interface LogoutModalProps {
    visible: boolean;
    onClose: () => void;
    onConfirm?: () => void;
}

const { height } = Dimensions.get('window');

export default function LogoutModal({ visible, onClose, onConfirm }: LogoutModalProps) {
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
    }, [visible]);

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

    if (!showModal) return null;

    return (
        <Modal
            transparent
            visible={showModal}
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
                <View className="bg-white w-full rounded-t-[32px] p-6 pb-10 items-center">
                    <View className="w-12 h-1.5 bg-gray-300 rounded-full mb-6" />
                    
                    <View className="w-16 h-16 bg-red-50 rounded-full items-center justify-center mb-5">
                        <Logout size={32} color="#EF4444" />
                    </View>
                    
                    <Text className="text-[20px] font-bold text-[#333] mb-2.5">Logout</Text>
                    <Text className="text-[14px] text-[#626262] text-center mb-8">
                        Are you sure you want to log out from your account?
                    </Text>

                    <View className="flex-row w-full space-x-4">
                        <TouchableOpacity
                            className="flex-1 py-4 bg-gray-50 rounded-full items-center border border-[#F2EEF4]"
                            onPress={closeModal}
                        >
                            <Text className="text-[#626262] font-semibold text-[16px]">Cancel</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            className="flex-1 py-4 bg-red-500 rounded-full items-center ml-3"
                            onPress={() => {
                                closeModal();
                                setTimeout(() => {
                                    if (onConfirm) onConfirm();
                                }, 300);
                            }}
                        >
                            <Text className="text-white font-semibold text-[16px]">Yes, Logout</Text>
                        </TouchableOpacity>
                    </View>
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
