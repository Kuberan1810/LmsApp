import React, { useState } from 'react';
import { View, Text, TouchableOpacity, TextInput } from 'react-native';
import { HelpCircle, MessageSquare, Plus, Trash2, Edit2, ChevronUp, ChevronDown } from 'lucide-react-native';

interface FAQItem {
    id: string;
    question: string;
    answer: string;
    isExpanded: boolean;
    isEditing: boolean;
}

export default function FAQ() {
    const [faqs, setFaqs] = useState<FAQItem[]>([
        {
            id: '1',
            question: 'What is Python?',
            answer: 'Python is a high-level, interpreted programming language known for its simplicity and readability. It was created by Guido van Rossum and first released in 1991.',
            isExpanded: true,
            isEditing: false,
        }
    ]);

    const toggleExpand = (id: string) => {
        setFaqs(prev =>
            prev.map(faq =>
                faq.id === id ? { ...faq, isExpanded: !faq.isExpanded } : faq
            )
        );
    };

    const addFAQ = () => {
        const nextId = Date.now().toString();
        const newFaq: FAQItem = {
            id: nextId,
            question: 'New Question',
            answer: 'New Answer',
            isExpanded: true,
            isEditing: true, // Start in editing mode
        };
        setFaqs([...faqs, newFaq]);
    };

    const deleteFAQ = (id: string) => {
        setFaqs(prev => prev.filter(faq => faq.id !== id));
    };

    const toggleEditing = (id: string) => {
        setFaqs(prev =>
            prev.map(faq =>
                faq.id === id ? { ...faq, isEditing: !faq.isEditing } : faq
            )
        );
    };

    const updateFAQ = (id: string, updatedFields: Partial<FAQItem>) => {
        setFaqs(prev =>
            prev.map(faq =>
                faq.id === id ? { ...faq, ...updatedFields } : faq
            )
        );
    };

    return (
        <View className="bg-white border border-[#F2EEF4] rounded-[16px] mb-4 p-4 mx-5">
            {/* Header */}
            <View className="flex-row justify-between items-center mb-4">
                <Text className="text-[18px] font-semibold text-[#0B1C30]">Frequently Asked Questions</Text>
                <TouchableOpacity
                    onPress={addFAQ}
                    className="w-8 h-8 rounded-lg bg-[#F3F4F6] border border-[#F2EEF4] items-center justify-center shadow-xs"
                    activeOpacity={0.8}
                >
                    <Plus size={16} color="#333" />
                </TouchableOpacity>
            </View>

            {/* FAQs List */}
            <View className="gap-3">
                {faqs.map((faq) => (
                    <View key={faq.id} className="bg-white border border-[#F2EEF4] rounded-[16px] overflow-hidden shadow-2xs">
                        {/* Question Row */}
                        <View className="flex-row items-center justify-between p-4">
                            <View className="flex-row items-center flex-1 mr-3 gap-2">
                                <Text className='text-[14px] text-[#F67300] ' > Q. </Text>
                                {faq.isEditing ? (
                                    <TextInput
                                        value={faq.question}
                                        onChangeText={(text) => updateFAQ(faq.id, { question: text })}
                                        onBlur={() => toggleEditing(faq.id)}
                                        className="flex-1 font-semibold text-[#0B1C30] text-[16px] border-b border-[#D3D3D3]"
                                        autoFocus
                                    />
                                ) : (
                                    <Text className="text-[16px] font-semibold text-[#0B1C30] flex-1">
                                        {faq.question}
                                    </Text>
                                )}
                            </View>

                            <View className="flex-row items-center gap-2.5">
                                <TouchableOpacity onPress={() => toggleEditing(faq.id)} className="p-1">
                                    <Edit2 size={15} color="#8C8E90" />
                                </TouchableOpacity>
                                <TouchableOpacity onPress={() => deleteFAQ(faq.id)} className="p-1">
                                    <Trash2 size={15} color="#EF4444" />
                                </TouchableOpacity>
                                <TouchableOpacity onPress={() => toggleExpand(faq.id)} className="p-1">
                                    {faq.isExpanded ? (
                                        <ChevronUp size={16} color="#8C8E90" />
                                    ) : (
                                        <ChevronDown size={16} color="#8C8E90" />
                                    )}
                                </TouchableOpacity>
                            </View>
                        </View>

                        {/* Answer Row */}
                        {faq.isExpanded && (
                            <View className="bg-[#FFFFFF] border-t border-[#F2EEF4] px-4 py-3 flex-row items-start gap-2">
                                <Text className='text-[14px] text-[#333333] '> A. </Text>
                                {faq.isEditing ? (
                                    <TextInput
                                        value={faq.answer}
                                        onChangeText={(text) => updateFAQ(faq.id, { answer: text })}
                                        onBlur={() => toggleEditing(faq.id)}
                                        multiline
                                        className="flex-1 text-[14px] text-[#626262] border-b border-[#D3D3D3]"
                                    />
                                ) : (
                                    <Text className="text-[14px] text-[#626262] flex-1 leading-relaxed">
                                        {faq.answer}
                                    </Text>
                                )}
                            </View>
                        )}
                    </View>
                ))}
                {faqs.length === 0 && (
                    <Text className="text-[12px] text-[#8C8E90] italic text-center py-2">No FAQs added yet.</Text>
                )}
            </View>
        </View>
    );
}
