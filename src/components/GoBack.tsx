import { TouchableOpacity, TouchableOpacityProps } from 'react-native'
import React from 'react'
import { router } from 'expo-router'
import { ArrowLeft2 } from 'iconsax-react-native'

interface GoBackProps extends TouchableOpacityProps {
  className?: string;
  color?: string;
  variant?: 'default' | 'card';
}

export default function GoBack({
  className,
  color = "#333",
  variant = "default",
  ...props
}: GoBackProps) {
  return (
    <TouchableOpacity
      onPress={() => router.back()}
      className={`
        w-11 h-11 rounded-full items-center justify-center
        ${
          variant === "card"
            ? "bg-[#242424] border border-white/30"
            : "bg-[#FAFAFA] border border-[#F2EEF4]"
        }
        ${className || ""}
      `}
      {...props}
    >
      <ArrowLeft2
        size={20}
        color={variant === "card" ? "#FFFFFF" : color}
      />
    </TouchableOpacity>
  )
}