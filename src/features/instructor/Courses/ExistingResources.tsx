import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Modal, TextInput } from 'react-native';
import { FileText, Plus, MoreVertical, Trash2, Edit2, Download, UploadCloud, X } from 'lucide-react-native';
import { Image } from 'expo-image';

interface ResourceItem {
    id: string;
    name: string;
    size: string;
    date: string;
    type: string;
}

export default function ExistingResources() {
    const [resources, setResources] = useState<ResourceItem[]>([
        {
            id: '1',
            name: 'Text_to_PDF.pdf',
            size: '85.77 KB',
            date: '7/14/2026',
            type: 'pdf',
        }
    ]);

    const [activeResourceId, setActiveResourceId] = useState<string | null>(null);
    const [popupY, setPopupY] = useState(0);

    // Modal States
    const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);
    const [resourceTitle, setResourceTitle] = useState('');

    const [isEditResourceOpen, setIsEditResourceOpen] = useState(false);
    const [editingResourceId, setEditingResourceId] = useState<string | null>(null);
    const [editResourceTitle, setEditResourceTitle] = useState('');

    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [deletingResourceId, setDeletingResourceId] = useState<string | null>(null);

    const handleUploadResource = () => {
        const titleText = resourceTitle.trim() || `Resource_Doc_${Date.now().toString().slice(-4)}.pdf`;
        const newResource: ResourceItem = {
            id: Date.now().toString(),
            name: titleText.endsWith('.pdf') ? titleText : `${titleText}.pdf`,
            size: '124.5 KB',
            date: new Date().toLocaleDateString(),
            type: 'pdf',
        };
        setResources([...resources, newResource]);
        setResourceTitle('');
        setIsUploadModalOpen(false);
    };

    const handleOpenEditResource = (res: ResourceItem) => {
        setEditingResourceId(res.id);
        setEditResourceTitle(res.name);
        setIsEditResourceOpen(true);
    };

    const handleSaveEditResource = () => {
        if (!editingResourceId || !editResourceTitle.trim()) return;
        setResources(prev =>
            prev.map(r => r.id === editingResourceId ? { ...r, name: editResourceTitle.trim() } : r)
        );
        setIsEditResourceOpen(false);
        setEditingResourceId(null);
        setEditResourceTitle('');
    };

    const handleConfirmDelete = () => {
        if (deletingResourceId) {
            setResources(prev => prev.filter(res => res.id !== deletingResourceId));
            setDeletingResourceId(null);
        }
        setIsDeleteModalOpen(false);
    };

    return (
        <View className="bg-white border border-[#F2EEF4] rounded-[16px] mb-6 p-4 mx-5">
            {/* Header */}
            <View className="flex-row justify-between items-center mb-4">
                <Text className="text-[18px] font-semibold text-[#333333]">Existing Resources</Text>
                <TouchableOpacity
                    onPress={() => setIsUploadModalOpen(true)}
                    className="w-8 h-8 rounded-lg bg-[#F3F4F6] items-center justify-center"
                    activeOpacity={0.8}
                >
                    <Plus size={16} color="#364153" />
                </TouchableOpacity>
            </View>

            {/* Resources List */}
            <View className="gap-3">
                {resources.map((res) => (
                    <View
                        key={res.id}
                        className="bg-white border border-[#F2EEF4] rounded-[20px] py-1 px-1 flex-row items-center justify-between"
                    >
                        <View className="flex-row items-center flex-1 mr-3">
                            {/* PDF Icon */}
                            <View className="w-16 h-13 p-4 rounded-[20px] bg-[#FFF0F0] items-center justify-center mr-3">
                                <Image
                                    source={require('../../../../assets/images/pdficon.svg')}
                                    contentFit="contain"
                                    style={{ width: 24, height: 24 }}
                                />
                            </View>

                            <View className="flex-1">
                                <Text className="text-[14px] font-semibold text-[#364153]" numberOfLines={1}>
                                    {res.name}
                                </Text>
                                <Text className="text-[12px] text-[#808080] mt-0.5">
                                    {res.size} - {res.date}
                                </Text>
                            </View>
                        </View>

                        <TouchableOpacity
                            onPress={(event) => {
                                const py = event.nativeEvent.pageY;
                                setPopupY(py);
                                setActiveResourceId(res.id);
                            }}
                            className="w-8 h-8 rounded-full items-center justify-center"
                        >
                            <MoreVertical size={18} color="#808080" />
                        </TouchableOpacity>
                    </View>
                ))}
                {resources.length === 0 && (
                    <Text className="text-[12px] text-[#8C8E90] italic text-center py-2">No resources uploaded yet.</Text>
                )}
            </View>

            {/* Options Dropdown Overlay */}
            <Modal
                visible={!!activeResourceId}
                transparent
                animationType="fade"
                onRequestClose={() => setActiveResourceId(null)}
            >
                <TouchableOpacity
                    className="flex-1 bg-transparent"
                    activeOpacity={1}
                    onPress={() => setActiveResourceId(null)}
                >
                    <View
                        className="bg-white border border-[#F2EEF4] rounded-[16px] p-2 shadow-lg absolute min-w-[150px]"
                        style={{
                            top: Math.max(80, popupY - 10),
                            right: 40,
                        }}
                    >
                        {/* Download */}
                        <TouchableOpacity
                            onPress={() => setActiveResourceId(null)}
                            className="flex-row items-center gap-2.5 px-3 py-2.5 rounded-[10px] active:bg-[#F3F4F6]"
                        >
                            <Download size={16} color="#6A7282" />
                            <Text className="text-[14px] font-medium text-[#333333]">Download</Text>
                        </TouchableOpacity>

                        {/* Edit */}
                        <TouchableOpacity
                            onPress={() => {
                                const res = resources.find(r => r.id === activeResourceId);
                                if (res) handleOpenEditResource(res);
                                setActiveResourceId(null);
                            }}
                            className="flex-row items-center gap-2.5 px-3 py-2.5 rounded-[10px] active:bg-[#F3F4F6]"
                        >
                            <Edit2 size={16} color="#6A7282" />
                            <Text className="text-[14px] font-medium text-[#333333]">Edit</Text>
                        </TouchableOpacity>

                        {/* Delete */}
                        <TouchableOpacity
                            onPress={() => {
                                setDeletingResourceId(activeResourceId);
                                setActiveResourceId(null);
                                setIsDeleteModalOpen(true);
                            }}
                            className="flex-row items-center gap-2.5 px-3 py-2.5 rounded-[10px] active:bg-[#F3F4F6]"
                        >
                            <Trash2 size={16} color="#F32D2D" />
                            <Text className="text-[14px] font-medium text-[#F32D2D]">Delete</Text>
                        </TouchableOpacity>
                    </View>
                </TouchableOpacity>
            </Modal>

            {/* Upload Resource Modal */}
            <Modal visible={isUploadModalOpen} transparent animationType="fade" onRequestClose={() => setIsUploadModalOpen(false)}>
                <View className="flex-1 bg-black/40 items-center justify-center px-6">
                    <View className="bg-white rounded-[16px] p-7 w-full max-w-[340px] shadow-lg">
                        <View className="flex-row justify-between items-start mb-4">
                            <Text className="text-[20px] font-semibold text-[#0B1C30]">Upload Resource</Text>
                            {/* <TouchableOpacity onPress={() => setIsUploadModalOpen(false)} className="p-1">
                                <X size={20} color="#8C8E90" />
                            </TouchableOpacity> */}
                        </View>

                        {/* File Upload Box */}
                        <View className="mb-4">
                            <Text className="text-[14px] font-medium text-[#333333] mb-1.5">File</Text>
                            <TouchableOpacity
                                className="border border-dashed border-[#D1D5DC] bg-[#F9F9F9] rounded-[16px] p-6 items-center justify-center"
                                activeOpacity={0.8}
                            >
                                <View className="w-10 h-10 rounded-full bg-[#FFF7ED] items-center justify-center mb-2">
                                    <UploadCloud size={20} color="#F67300" />
                                </View>
                                <Text className="text-[14px] font-medium text-[#4A5565]">Click to submit a file</Text>
                                <Text className="text-[12px] text-[#6A7282] mt-1">max size 25MB</Text>
                            </TouchableOpacity>
                        </View>

                        {/* Title Input */}
                        <View className="mb-6">
                            <Text className="text-[14px] font-medium text-[#333333] mb-1.5">Title</Text>
                            <TextInput
                                value={resourceTitle}
                                onChangeText={setResourceTitle}
                                placeholder="Enter resource title"
                                placeholderTextColor="#A0A0AB"
                                className="border border-[#E5E7EB] rounded-[12px] px-3.5 h-11 text-[14px] text-[#333333] bg-[#F9F9F9]"
                            />
                        </View>

                        {/* Buttons */}
                        <View className="flex-row gap-3">
                            <TouchableOpacity
                                onPress={() => setIsUploadModalOpen(false)}
                                className="flex-1 h-11 rounded-[12px] border border-[#E5E7EB] items-center justify-center bg-white"
                                activeOpacity={0.7}
                            >
                                <Text className="text-[#333333] text-[14px] font-medium">Cancel</Text>
                            </TouchableOpacity>

                            <TouchableOpacity
                                onPress={handleUploadResource}
                                disabled={!resourceTitle.trim()}
                                className={`flex-1 h-11 rounded-[12px] items-center justify-center ${resourceTitle.trim() ? 'bg-[#F67300]' : 'bg-[#FFC799]'}`}
                                activeOpacity={resourceTitle.trim() ? 0.8 : 1}
                            >
                                <Text className="text-white text-[14px] font-medium">Upload Resource</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </Modal>

            {/* Edit Resource Modal */}
            <Modal visible={isEditResourceOpen} transparent animationType="fade" onRequestClose={() => setIsEditResourceOpen(false)}>
                <View className="flex-1 bg-black/40 items-center justify-center px-6">
                    <View className="bg-white rounded-[24px] p-6 w-full max-w-[340px] shadow-lg">
                        <View className="flex-row justify-between items-start mb-4">
                            <Text className="text-[20px] font-semibold text-[#0B1C30]">Edit Resource</Text>
                            {/* <TouchableOpacity onPress={() => setIsEditResourceOpen(false)} className="p-1">
                                <X size={20} color="#8C8E90" />
                            </TouchableOpacity> */}
                        </View>

                        <View className="mb-6">
                            <Text className="text-[14px] text-[#808080] mb-1.5">Resource Name</Text>
                            <TextInput
                                value={editResourceTitle}
                                onChangeText={setEditResourceTitle}
                                placeholder="Enter resource name"
                                placeholderTextColor="#A0A0AB"
                                className="border border-[#F2EEF4] rounded-[12px] px-3.5 h-11 text-[14px] text-[#333333] bg-white"
                            />
                        </View>

                        <View className="flex-row gap-3">
                            <TouchableOpacity
                                onPress={() => setIsEditResourceOpen(false)}
                                className="flex-1 h-11 rounded-[12px] border border-[#F2EEF4] items-center justify-center bg-white"
                                activeOpacity={0.7}
                            >
                                <Text className="text-[#808080] text-[14px] font-semibold">Cancel</Text>
                            </TouchableOpacity>

                            <TouchableOpacity
                                onPress={handleSaveEditResource}
                                disabled={!editResourceTitle.trim()}
                                className={`flex-1 h-11 rounded-[12px] items-center justify-center ${editResourceTitle.trim() ? 'bg-[#F67300]' : 'bg-[#FFC799]'}`}
                                activeOpacity={editResourceTitle.trim() ? 0.8 : 1}
                            >
                                <Text className="text-white text-[14px] font-semibold">Save Changes</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </Modal>

            {/* Delete Modal */}
            <Modal visible={isDeleteModalOpen} transparent animationType="fade" onRequestClose={() => setIsDeleteModalOpen(false)}>
                <View className="flex-1 bg-black/40 items-center justify-center px-6">
                    <View className="bg-white rounded-[16px] p-7 w-full max-w-[320px] shadow-lg items-center">
                        <View className="w-12 h-12 rounded-full bg-[#FEF2F2] items-center justify-center mb-6">
                            <Trash2 size={22} color="#F32D2D" />
                        </View>
                        <Text className="text-[20px] font-bold text-black text-center mb-2">Confirm Delete</Text>
                        <Text className="text-[14px] text-[#6A7282] text-center mb-10">
                            Are you sure you want to delete this Resources? This action cannot be undone and will remove all associated content.
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
