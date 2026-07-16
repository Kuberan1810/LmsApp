import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import { router } from 'expo-router'
import { ArrowLeft2 } from 'iconsax-react-native'

export default function GoBack() {
  return (
      <TouchableOpacity
          onPress={() => router.back()}
          className="bg-[#FAFAFA] border border-[#E5E5E5] w-11 h-11 rounded-full items-center justify-center">

          <ArrowLeft2 size={20} color="#1E1E2D" />
      </TouchableOpacity>
  )
}