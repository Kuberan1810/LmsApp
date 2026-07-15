import { View, Text, TextInput, TouchableOpacity, KeyboardAvoidingView, Platform, ScrollView } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { router } from 'expo-router'
import { AntDesign } from '@expo/vector-icons'

export default function LoginCom() {
  const [loginMethod, setLoginMethod] = useState<'email' | 'mobile'>('email')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  return (
    <SafeAreaView className="flex-1 bg-white">
      <KeyboardAvoidingView 
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        className="flex-1"
      >
        <ScrollView contentContainerStyle={{ flexGrow: 1, paddingHorizontal: 24, paddingTop: 40, paddingBottom: 24 }}>
          {/* Header */}
          <Text className="text-3xl font-medium text-black mb-2 tracking-tight">Welcome back!</Text>
          <Text className="text-gray-400 text-base mb-10">Let's continue your learning journey.</Text>

          {/* Toggle buttons */}
          <View className="flex-row bg-gray-50 rounded-xl p-1 mb-10">
            <TouchableOpacity 
              onPress={() => setLoginMethod('email')}
              className={`flex-1 py-3 rounded-lg items-center ${loginMethod === 'email' ? 'bg-[#EE8B3A]' : 'bg-transparent'}`}
            >
              <Text className={`font-medium ${loginMethod === 'email' ? 'text-white' : 'text-gray-600'}`}>Email id</Text>
            </TouchableOpacity>
            <TouchableOpacity 
              onPress={() => setLoginMethod('mobile')}
              className={`flex-1 py-3 rounded-lg items-center ${loginMethod === 'mobile' ? 'bg-[#EE8B3A]' : 'bg-transparent'}`}
            >
              <Text className={`font-medium ${loginMethod === 'mobile' ? 'text-white' : 'text-gray-600'}`}>Mobile Nuimber</Text>
            </TouchableOpacity>
          </View>

          {/* Login Form Section */}
          <View className="items-center mb-8">
            <Text className="text-[28px] font-semibold text-black mb-1">Login</Text>
            <Text className="text-[#A0A0A0] text-sm">Use your registered student account</Text>
          </View>

          {/* Inputs */}
          <View className="mb-4">
            <Text className="text-[13px] text-gray-800 mb-2">Username / Email</Text>
            <TextInput 
              className="border border-gray-100 rounded-xl px-4 py-[14px] text-black bg-white"
              placeholder="Student@gmail.com"
              placeholderTextColor="#C0C0C0"
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
            />
          </View>

          <View className="mb-8">
            <View className="flex-row justify-between items-center mb-2">
              <Text className="text-[13px] text-gray-800">Password</Text>
              <TouchableOpacity onPress={() => router.push('/(auth)/forgot-password')}>
                <Text className="text-[13px] text-[#EE8B3A]">Forgot Password?</Text>
              </TouchableOpacity>
            </View>
            <TextInput 
              className="border border-gray-100 rounded-xl px-4 py-[14px] text-black bg-white"
              placeholder="Password"
              placeholderTextColor="#C0C0C0"
              value={password}
              onChangeText={setPassword}
              secureTextEntry
            />
          </View>

          {/* Login Button */}
          <TouchableOpacity 
            className="border border-gray-100 rounded-xl py-4 items-center mb-10 bg-white shadow-sm"
            onPress={() => router.replace('/(student)/dashboard/dashboard')}
          >
            <Text className="text-[#C0C0C0] font-medium text-base">Login</Text>
          </TouchableOpacity>

          {/* OR divider */}
          <View className="flex-row items-center mb-8">
            <View className="flex-1 h-[1px] bg-gray-200" />
            <Text className="mx-4 text-xs font-semibold text-gray-400">OR</Text>
            <View className="flex-1 h-[1px] bg-gray-200" />
          </View>

          {/* Google Button */}
          <View className="items-center mb-10">
            <TouchableOpacity className="w-[46px] h-[46px] rounded-full border border-gray-200 items-center justify-center bg-white shadow-sm">
              <AntDesign name="google" size={20} color="#DB4437" />
            </TouchableOpacity>
          </View>

          {/* Signup Link */}
          <View className="flex-row justify-center mt-auto pb-4">
            <Text className="text-gray-600 text-[13px]">Don't Have An Account? </Text>
            <TouchableOpacity>
              <Text className="text-[#EE8B3A] text-[13px] font-medium">Signup</Text>
            </TouchableOpacity>
          </View>

        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  )
}