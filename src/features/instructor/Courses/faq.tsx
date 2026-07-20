import React, { useState } from 'react';
import { View, Text, TouchableOpacity, TextInput, Modal } from 'react-native';
import { HelpCircle, MessageSquare, Plus, Trash2, Edit2, ChevronUp, ChevronDown, X } from 'lucide-react-native';

interface FAQItem {
    id: string;
    question: string;
    answer: string;
    isExpanded: boolean;
}

export default function FAQ() {
    const [faqs, setFaqs] = useState<FAQItem[]>([
        {
            id: '1',
            question: 'What is Python?',
            answer: 'Python is a high-level, interpreted programming language known for its simplicity and readability. It was created by Guido van Rossum and first released in 1991.',
            isExpanded: true,
        }
    ]);

    // Modal States
    const [isAddFaqOpen, setIsAddFaqOpen] = useState(false);
    const [questionInput, setQuestionInput] = useState('');
    const [answerInput, setAnswerInput] = useState('');

    const [isEditFaqOpen, setIsEditFaqOpen] = useState(false);
    const [editingFaqId, setEditingFaqId] = useState<string | null>(null);

    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [deletingFaqId, setDeletingFaqId] = useState<string | null>(null);

    const toggleExpand = (id: string) => {
        setFaqs(prev =>
            prev.map(faq =>
                faq.id === id ? { ...faq, isExpanded: !faq.isExpanded } : faq
            )
        );
    };

    const handleCreateFAQ = () => {
        if (!questionInput.trim()) return;
        const newFaq: FAQItem = {
            id: Date.now().toString(),
            question: questionInput.trim(),
            answer: answerInput.trim() || 'No answer provided.',
            isExpanded: true,
        };
        setFaqs([...faqs, newFaq]);
        setQuestionInput('');
        setAnswerInput('');
        setIsAddFaqOpen(false);
    };

    const handleOpenEditFAQ = (faq: FAQItem) => {
        setEditingFaqId(faq.id);
        setQuestionInput(faq.question);
        setAnswerInput(faq.answer);
        setIsEditFaqOpen(true);
    };

    const handleSaveEditFAQ = () => {
        if (!editingFaqId || !questionInput.trim()) return;
        setFaqs(prev =>
            prev.map(faq =>
                faq.id === editingFaqId
                    ? { ...faq, question: questionInput.trim(), answer: answerInput.trim() }
                    : faq
            )
        );
        setIsEditFaqOpen(false);
        setEditingFaqId(null);
        setQuestionInput('');
        setAnswerInput('');
    };

    const handleConfirmDelete = () => {
        if (deletingFaqId) {
            setFaqs(prev => prev.filter(faq => faq.id !== deletingFaqId));
            setDeletingFaqId(null);
        }
        setIsDeleteModalOpen(false);
    };

    return (
        <View className="bg-white border border-[#F2EEF4] rounded-[16px] mb-4 p-4 mx-5">
            {/* Header */}
            <View className="flex-row justify-between items-center mb-4">
                <Text className="text-[18px] font-semibold text-[#0B1C30]">Frequently Asked Questions</Text>
                <TouchableOpacity
                    onPress={() => {
                        setQuestionInput('');
                        setAnswerInput('');
                        setIsAddFaqOpen(true);
                    }}
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
                                <Text className="text-[14px] text-[#F67300] font-semibold">Q.</Text>
                                <Text className="text-[16px] font-semibold text-[#0B1C30] flex-1">
                                    {faq.question}
                                </Text>
                            </View>

                            <View className="flex-row items-center gap-2.5">
                                <TouchableOpacity onPress={() => handleOpenEditFAQ(faq)} className="p-1">
                                    <Edit2 size={15} color="#8C8E90" />
                                </TouchableOpacity>
                                <TouchableOpacity
                                    onPress={() => {
                                        setDeletingFaqId(faq.id);
                                        setIsDeleteModalOpen(true);
                                    }}
                                    className="p-1"
                                >
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
                                <Text className="text-[14px] text-[#333333] font-semibold">A.</Text>
                                <Text className="text-[14px] text-[#626262] flex-1 leading-relaxed">
                                    {faq.answer}
                                </Text>
                            </View>
                        )}
                    </View>
                ))}
                {faqs.length === 0 && (
                    <Text className="text-[12px] text-[#8C8E90] italic text-center py-2">No FAQs added yet.</Text>
                )}
            </View>

            {/* Add FAQ Modal */}
            <Modal visible={isAddFaqOpen} transparent animationType="fade" onRequestClose={() => setIsAddFaqOpen(false)}>
                <View className="flex-1 bg-black/40 items-center justify-center px-6">
                    <View className="bg-white rounded-[16px] p-7 w-full max-w-[340px] shadow-lg">
                        <View className="flex-row justify-between items-start mb-4">
                            <Text className="text-[20px] font-semibold text-[#0B1C30]">Add FAQ</Text>
                            <TouchableOpacity onPress={() => setIsAddFaqOpen(false)} className="p-1">
                                <X size={20} color="#8C8E90" />
                            </TouchableOpacity>
                        </View>

                        {/* Question Field */}
                        <View className="mb-4">
                            <Text className="text-[14px] font-medium text-[#333333] mb-1.5">Question</Text>
                            <TextInput
                                value={questionInput}
                                onChangeText={setQuestionInput}
                                placeholder="e.g. How do I submit my assignment?"
                                placeholderTextColor="#A0A0AB"
                                className="border border-[#E5E7EB] rounded-[12px] px-3.5 h-11 text-[14px] text-[#333333]/50 bg-[#F9F9F9]"
                            />
                        </View>

                        {/* Answer Field */}
                        <View className="mb-6">
                            <Text className="text-[14px] font-medium text-[#333333] mb-1.5">Answer</Text>
                            <TextInput
                                value={answerInput}
                                onChangeText={setAnswerInput}
                                placeholder="Type the answer here..."
                                placeholderTextColor="#A0A0AB"
                                multiline
                                numberOfLines={3}
                                className="border border-[#E5E7EB] rounded-[12px] px-3.5 text-[14px] text-[#333333]/50 bg-[#F9F9F9] h-24 textAlignVertical-top"
                            />
                        </View>

                        {/* Action Buttons */}
                        <View className="flex-row gap-3">
                            <TouchableOpacity
                                onPress={() => setIsAddFaqOpen(false)}
                                className="flex-1 h-11 rounded-[12px] border border-[#E5E7EB] items-center justify-center bg-white"
                                activeOpacity={0.7}
                            >
                                <Text className="text-[#0B1C30] text-[14px] font-semibold">Cancel</Text>
                            </TouchableOpacity>

                            <TouchableOpacity
                                onPress={handleCreateFAQ}
                                disabled={!questionInput.trim()}
                                className={`flex-1 h-11 rounded-[12px] items-center justify-center ${questionInput.trim() ? 'bg-[#F67300]' : 'bg-[#FFC799]'}`}
                                activeOpacity={questionInput.trim() ? 0.8 : 1}
                            >
                                <Text className="text-white text-[14px] font-semibold">Create FAQ</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </Modal>

            {/* Edit FAQ Modal */}
            <Modal visible={isEditFaqOpen} transparent animationType="fade" onRequestClose={() => setIsEditFaqOpen(false)}>
                <View className="flex-1 bg-black/40 items-center justify-center px-6">
                    <View className="bg-white rounded-[24px] p-6 w-full max-w-[340px] shadow-lg">
                        <View className="flex-row justify-between items-start mb-4">
                            <Text className="text-[20px] font-semibold text-[#0B1C30]">Edit FAQ</Text>
                            <TouchableOpacity onPress={() => setIsEditFaqOpen(false)} className="p-1">
                                <X size={20} color="#8C8E90" />
                            </TouchableOpacity>
                        </View>

                        {/* Question Field */}
                        <View className="mb-4">
                            <Text className="text-[14px] font-medium text-[#333333] mb-1.5">Question</Text>
                            <TextInput
                                value={questionInput}
                                onChangeText={setQuestionInput}
                                placeholder="e.g. How do I submit my assignment?"
                                placeholderTextColor="#A0A0AB"
                                className="border border-[#E2E8F0] rounded-[12px] px-3.5 h-11 text-[14px] text-[#333333] bg-white"
                            />
                        </View>

                        {/* Answer Field */}
                        <View className="mb-6">
                            <Text className="text-[14px] font-medium text-[#333333] mb-1.5">Answer</Text>
                            <TextInput
                                value={answerInput}
                                onChangeText={setAnswerInput}
                                placeholder="Type the answer here..."
                                placeholderTextColor="#A0A0AB"
                                multiline
                                numberOfLines={3}
                                className="border border-[#E2E8F0] rounded-[12px] p-3.5 text-[14px] text-[#333333] bg-white h-24 textAlignVertical-top"
                            />
                        </View>

                        {/* Action Buttons */}
                        <View className="flex-row gap-3">
                            <TouchableOpacity
                                onPress={() => setIsEditFaqOpen(false)}
                                className="flex-1 h-11 rounded-[12px] border border-[#E5E7EB] items-center justify-center bg-white"
                                activeOpacity={0.7}
                            >
                                <Text className="text-[#0B1C30] text-[14px] font-semibold">Cancel</Text>
                            </TouchableOpacity>

                            <TouchableOpacity
                                onPress={handleSaveEditFAQ}
                                disabled={!questionInput.trim()}
                                className={`flex-1 h-11 rounded-[12px] items-center justify-center ${questionInput.trim() ? 'bg-[#F67300]' : 'bg-[#FFC799]'}`}
                                activeOpacity={questionInput.trim() ? 0.8 : 1}
                            >
                                <Text className="text-white text-[14px] font-semibold">Save Changes</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </Modal>

            {/* Confirm Delete Modal */}
            <Modal visible={isDeleteModalOpen} transparent animationType="fade" onRequestClose={() => setIsDeleteModalOpen(false)}>
                <View className="flex-1 bg-black/40 items-center justify-center px-6">
                    <View className="bg-white rounded-[16px] p-7 w-full max-w-[320px] shadow-lg items-center">
                        <View className="w-12 h-12 rounded-full bg-[#FEF2F2] items-center justify-center mb-6">
                            <Trash2 size={22} color="#F32D2D" />
                        </View>
                        <Text className="text-[20px] font-bold text-black text-center mb-2">Confirm Delete</Text>
                        <Text className="text-[14px] text-[#6A7282] text-center mb-10">
                            Are you sure you want to delete FAQ? This action cannot be undone and will remove all associated content.
                        </Text>

                        <View className="flex-row gap-3 w-full">
                            <TouchableOpacity
                                onPress={() => setIsDeleteModalOpen(false)}
                                className="flex-1 h-11 rounded-[12px] border border-[#F2EEF4] items-center justify-center bg-white"
                                activeOpacity={0.7}
                            >
                                <Text className="text-[#808080] text-[16px] font-semibold">Cancel</Text>
                            </TouchableOpacity>

                            <TouchableOpacity
                                onPress={handleConfirmDelete}
                                className="flex-1 h-11 rounded-[12px] bg-[#FB2C36] items-center justify-center"
                                activeOpacity={0.8}
                            >
                                <Text className="text-white text-[16px] font-semibold">Delete</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </Modal>
        </View>
    );
}
