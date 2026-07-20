import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Modal, TextInput } from 'react-native';
import { FileText, Plus, MoreVertical, Trash2, Edit2, Download } from 'lucide-react-native';
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
    const [editingResourceId, setEditingResourceId] = useState<string | null>(null);
    const [editNameText, setEditNameText] = useState('');
    const [popupY, setPopupY] = useState(0);

    const addResource = () => {
        const nextId = Date.now().toString();
        const newResource: ResourceItem = {
            id: nextId,
            name: `Resource_Doc_${nextId.slice(-4)}.pdf`,
            size: '124.5 KB',
            date: new Date().toLocaleDateString(),
            type: 'pdf',
        };
        setResources([...resources, newResource]);
    };

    const deleteResource = (id: string) => {
        setResources(prev => prev.filter(res => res.id !== id));
    };

    return (
        <View className="bg-white border border-[#F2EEF4] rounded-[16px] mb-6 p-4 mx-5">
            {/* Header */}
            <View className="flex-row justify-between items-center mb-4">
                <Text className="text-[18px] font-semibold text-[#333333]">Existing Resources</Text>
                <TouchableOpacity
                    onPress={addResource}
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
                            {/* PDF*/}
                            <View className="w-16 h-13 p-4 rounded-[20px] bg-[#FFF0F0] items-center justify-center mr-3">
                                <Image
                                    source={require('../../../../assets/images/pdficon.svg')}
                                    contentFit="contain"
                                    style={{ width: 24, height: 24 }}
                                />
                            </View>

                            <View className="flex-1">
                                {editingResourceId === res.id ? (
                                    <TextInput
                                        value={editNameText}
                                        onChangeText={setEditNameText}
                                        onBlur={() => {
                                            if (editNameText.trim()) {
                                                setResources(prev =>
                                                    prev.map(r => r.id === res.id ? { ...r, name: editNameText } : r)
                                                );
                                            }
                                            setEditingResourceId(null);
                                        }}
                                        onSubmitEditing={() => {
                                            if (editNameText.trim()) {
                                                setResources(prev =>
                                                    prev.map(r => r.id === res.id ? { ...r, name: editNameText } : r)
                                                );
                                            }
                                            setEditingResourceId(null);
                                        }}
                                        className="border-b border-[#D3D3D3] text-[14px] font-semibold text-[#364153] py-0.5"
                                        autoFocus
                                    />
                                ) : (
                                    <Text className="text-[14px] font-semibold text-[#364153]" numberOfLines={1}>
                                        {res.name}
                                    </Text>
                                )}
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

            {/* Options modal */}
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
                        className="bg-white border border-[#F2EEF4] rounded-full px-4 py-2 flex-row items-center gap-3.5 shadow-lg absolute"
                        style={{
                            top: Math.max(80, popupY - 30),
                            right: 60,
                        }}
                    >
                        {/* Download */}
                        <TouchableOpacity
                            onPress={() => {
                                setActiveResourceId(null);
                            }}
                            className="w-9 h-9 rounded-full items-center justify-center"
                        >
                            <Download size={16} color="#626262" />
                        </TouchableOpacity>

                        {/* Edit */}
                        <TouchableOpacity
                            onPress={() => {
                                const res = resources.find(r => r.id === activeResourceId);
                                if (res) {
                                    setEditNameText(res.name);
                                    setEditingResourceId(activeResourceId);
                                }
                                setActiveResourceId(null);
                            }}
                            className="w-9 h-9 rounded-full items-center justify-center"
                        >
                            <Edit2 size={16} color="#808080" />
                        </TouchableOpacity>

                        {/* Delete */}
                        <TouchableOpacity
                            onPress={() => {
                                if (activeResourceId) {
                                    deleteResource(activeResourceId);
                                    setActiveResourceId(null);
                                }
                            }}
                            className="w-9 h-9 rounded-full items-center justify-center"
                        >
                            <Trash2 size={16} color="#FB2C36" />
                        </TouchableOpacity>
                    </View>
                </TouchableOpacity>
            </Modal>
        </View>
    );
}
