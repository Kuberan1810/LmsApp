import React from "react";
import { Text, TouchableOpacity, View } from "react-native";

type Props = {
    Icon: any;
    Icon2?: any;
    Title: string;
    onPress?: () => void;
    onPress2?: () => void;
};

export default function SubScreenHeader({
    Icon,
    Icon2,
    Title,
    onPress,
    onPress2
}: Props) {

    return (
        <View className="flex-row items-center justify-between">


            <TouchableOpacity
                onPress={onPress}
                className="bg-[#f2f2f2] w-11 h-11 rounded-full items-center justify-center"
            >
                <Icon size={20} color="#1E1E2D" />
            </TouchableOpacity>


            <Text className="text-xl text-[#1E1E2D] font-medium">
                {Title}
            </Text>


            {Icon2 ? (
                <TouchableOpacity
                    onPress={onPress2}
                    className="bg-[#f2f2f2] w-11 h-11 rounded-full items-center justify-center"
                >
                    <Icon2 size={20} color="#1E1E2D" />
                </TouchableOpacity>
            ) : (
                // Empty space maintain pannum
                <View className="w-11 h-11" />
            )}

        </View>
    );
}