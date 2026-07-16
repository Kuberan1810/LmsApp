import React from "react";
import { TouchableOpacity, Text } from "react-native";

interface BtnComProps {
    label?: string;
    onClick?: () => void;
    icon?: React.ReactNode;
    iconPosition?: "left" | "right"
}

const BtnCom: React.FC<BtnComProps> = ({
    label = "View",
    onClick,
    icon,
    iconPosition = "left",
}) => {
    return (
        <TouchableOpacity
            onPress={onClick}
            activeOpacity={0.7}
            className="flex-row items-center gap-2 px-3 py-2.5 border self-start border-[#F2EEF4] dark:border-[#363636] rounded-[10px] bg-white dark:bg-[#2A2A2A]"
        >
            {icon && iconPosition === "left" && icon}
            <Text className="text-[14px] font-medium text-[#808080] dark:text-gray-300">
                {label}
            </Text>
            {icon && iconPosition === "right" && icon}
        </TouchableOpacity>
    );
};

export default BtnCom;