import { View, Text, TouchableOpacity } from 'react-native';
import React from 'react';
import { Add, ArrowDown2 } from 'iconsax-react-native';

const MODULES = [
    {
        id: '3',
        number: '3',
        title: 'Frontier AI Systems & Deployment',
        status: 'Ongoing',
        statusBg: 'bg-[#FFEDDE]',
        statusColor: 'text-[#F67300]',
    },
    {
        id: '2',
        number: '2',
        title: 'Generative AI & LLM Engineering',
        status: 'Completed',
        statusBg: 'bg-[#DDF0EB]',
        statusColor: 'text-[#2BB290]',
    },
    {
        id: '1',
        number: '1',
        title: 'AI & ML Foundations',
        status: 'Completed',
        statusBg: 'bg-[#DDF0EB]',
        statusColor: 'text-[#2BB290]',
    },
];

export default function Curriculum() {
    return (
        <View className="px-5 mb-6">
            <View className="flex-row justify-between items-center mb-4">
                <Text className="text-[16px] font-medium text-[#0B1C30]">Curriculum</Text>
                <TouchableOpacity className="w-11 h-11 rounded-[10px] items-center justify-center bg-white">
                    <Add size={26} color="#333333" />
                </TouchableOpacity>
            </View>

            {/* Modules List */}
            <View className="space-y-4 gap-3">
                {MODULES.map((item) => (
                    <TouchableOpacity
                        key={item.id}
                        className="flex-row items-center justify-between bg-white border border-[#D3D3D3] rounded-[10px] p-4"
                        activeOpacity={0.8}
                    >
                        <View className="flex-row items-center flex-1 mr-3">
                            <Text className="text-[13px] text-[#333333] leading-snug">
                                <Text className="text-[#121212]">Module : {item.number}</Text>  {item.title}
                            </Text>
                        </View>
                        <View className="flex-row items-center gap-2">
                            <View className={`${item.statusBg} px-2.5 py-1 rounded-full`}>
                                <Text className={`text-[11px] ${item.statusColor}`}>{item.status}</Text>
                            </View>
                            <ArrowDown2 size={10} color="#121212" />
                        </View>
                    </TouchableOpacity>
                ))}
            </View>
        </View>
    );
}
