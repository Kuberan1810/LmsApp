import React from 'react';
import { View, Text, TouchableOpacity, Image, ImageSourcePropType } from 'react-native';
import { useRouter } from 'expo-router';
import { ArrowLeft2, SearchNormal1, Notification } from 'iconsax-react-native';


interface HeaderProps {
    title?: string;
    subtitle?: string;
    onBackPress?: () => void;
    showSearchAndNotify?: boolean;
    profileSource?: ImageSourcePropType;
}

export default function Header({
    title = 'Courses',
    onBackPress,
    showSearchAndNotify = false,
    profileSource = require('../../../../assets/images/avatarLms.png'),
}: HeaderProps) {
    const router = useRouter();
    return (
        <View className="px-5 py-3 flex-row justify-between items-center bg-[#FAFAFA]">
            <View className="flex-row items-center flex-1 mr-4">
                {onBackPress && (
                    <TouchableOpacity onPress={onBackPress} className="mr-1.5 p-1 rounded-lg">
                        <ArrowLeft2 size={24} color="#1F2937" variant="Linear" />
                    </TouchableOpacity>
                )}

                <Text className="text-[20px] font-medium text-[#333333] leading-tight">{title}</Text>


            </View>

            {/* Right Content */}
            <View className="flex-row items-center gap-[10px]">
                {showSearchAndNotify && (
                    <>
                        {/* Search Button */}
                        <TouchableOpacity className="w-[30px] h-[30px] rounded-lg border border-[#E5E5E5] bg-[#FAFAFA] items-center justify-center">
                            <SearchNormal1 size={14} color="black" variant="Linear" />
                        </TouchableOpacity>

                        {/* Notification Bell Button */}

                        <TouchableOpacity className="w-[30px] h-[30px] rounded-lg border border-[#E5E5E5] bg-[#FAFAFA] items-center justify-center relative">
                            <View className="absolute top-[6px] right-[8px] w-1.5 h-1.5 bg-[#F67300] rounded-full z-10" />

                            <Notification size={14} color="black" variant="Linear" />

                        </TouchableOpacity>
                    </>
                )}

                {/* Profile Avatar */}

                <TouchableOpacity
                    className="rounded-full bg-[#FCE7F3] items-center justify-center border border-gray-100 shadow-sm"
                    style={{ width: 38, height: 38 }}
                >
                    <Text className="text-[#BE185D] text-[14px] font-medium">PS</Text>
                </TouchableOpacity>

            </View>
        </View>
    );
}
