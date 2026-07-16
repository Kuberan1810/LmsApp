import { TouchableOpacity, Text, View } from 'react-native';
import React from 'react';

export default function BtnMainCom({
    title,
    onPress,
    icon,
    style,
    textStyle
}: any) {
    return (
        <TouchableOpacity
            onPress={onPress}
            activeOpacity={0.8}
            className={`w-full py-5 rounded-2xl bg-[#F67300] ${style}`}
        >
            <View className="flex-row items-center justify-center gap-2">

                {icon && icon}

                <Text className={`text-white text-base font-semibold ${textStyle}`}>
                    {title}
                </Text>

            </View>
        </TouchableOpacity>
    );
}