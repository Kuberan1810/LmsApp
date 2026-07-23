import React from 'react';
import { View, Text, TouchableOpacity, ScrollView, TextInput } from 'react-native';
import { BlurView } from 'expo-blur';
import { LinearGradient } from 'expo-linear-gradient';
import { X, MessageSquare, Sparkles, Download, HelpCircle, Pin, Send, FileText, Check, RotateCw } from 'lucide-react-native';

interface SidePanelsProps {
  activePanel: 'chat' | 'tutor' | 'resources' | 'polls' | null;
  setActivePanel: (panel: 'chat' | 'tutor' | 'resources' | 'polls' | null) => void;
  togglePanel: (panel: 'chat' | 'tutor' | 'resources' | 'polls') => void;
  chatMessages: any[];
  inputMessage: string;
  setInputMessage: (msg: string) => void;
  handleSendChat: () => void;
  tutorChat: any[];
  isAiLoading: boolean;
  handleAiTutorAction: (action: string) => void;
  aiInput: string;
  setAiInput: (msg: string) => void;
  handleAiInputSubmit: () => void;
  downloads: Record<string, 'idle' | 'downloading' | 'completed'>;
  startDownload: (id: string) => void;
  totalVotes: number;
  pollVotes: number[];
  selectedPollOption: number | null;
  handleVote: (idx: number) => void;
}

export default function SidePanels({
  activePanel,
  setActivePanel,
  togglePanel,
  chatMessages,
  inputMessage,
  setInputMessage,
  handleSendChat,
  tutorChat,
  isAiLoading,
  handleAiTutorAction,
  aiInput,
  setAiInput,
  handleAiInputSubmit,
  downloads,
  startDownload,
  totalVotes,
  pollVotes,
  selectedPollOption,
  handleVote,
}: SidePanelsProps) {
  if (!activePanel) return null;

  return (
    <View
      className="absolute bottom-0 inset-x-0 h-[480px] bg-[#14171C] rounded-t-[32px] border-t border-white/10 overflow-hidden z-[100]"
    >
      <BlurView intensity={90} tint="dark" style={{ flex: 1 }}>
        {/* Sheet Header */}
        <View className="px-5 py-4 border-b border-white/5 flex-row items-center justify-between">
          <View className="flex-row items-center gap-2">
            {activePanel === 'chat' && (
              <>
                <MessageSquare size={18} color="#FF7A00" />
                <Text className="text-white font-semibold text-base">Class Chat</Text>
              </>
            )}
            {activePanel === 'tutor' && (
              <>
                <Sparkles size={18} color="#FF7A00" />
                <Text className="text-white font-semibold text-base">AI Copilot Tutor</Text>
              </>
            )}
            {activePanel === 'resources' && (
              <>
                <Download size={18} color="#FF7A00" />
                <Text className="text-white font-semibold text-base">Reference Resources</Text>
              </>
            )}
            {activePanel === 'polls' && (
              <>
                <HelpCircle size={18} color="#FF7A00" />
                <Text className="text-white font-semibold text-base">Active Poll</Text>
              </>
            )}
          </View>

          {/* Close button */}
          <TouchableOpacity onPress={() => setActivePanel(null)} className="w-8 h-8 rounded-full bg-white/5 items-center justify-center">
            <X size={16} color="#A0A7B4" />
          </TouchableOpacity>
        </View>

        {/* Panel Sheet Switch Tab Bar */}
        <View className="flex-row border-b border-white/5 bg-[#0B0D10]/40 px-3">
          {[
            { id: 'chat', label: 'Chat' },
            { id: 'tutor', label: 'AI Tutor' },
            { id: 'resources', label: 'Docs' },
            { id: 'polls', label: 'Poll' },
          ].map((tab) => (
            <TouchableOpacity
              key={tab.id}
              onPress={() => togglePanel(tab.id as any)}
              className="py-3 px-4 relative flex-1 items-center"
            >
              <Text
                className={`text-xs font-semibold ${activePanel === tab.id ? 'text-white' : 'text-[#A0A7B4]'
                  }`}
              >
                {tab.label}
              </Text>
              {activePanel === tab.id && (
                <View className="absolute bottom-0 w-8 h-0.5 bg-[#FF7A00] rounded-full" />
              )}
            </TouchableOpacity>
          ))}
        </View>

        {/* Tab Contents */}
        <View className="flex-1">
          {/* Chat Tab */}
          {activePanel === 'chat' && (
            <View className="flex-1 justify-between">
              <ScrollView className="flex-1" contentContainerStyle={{ padding: 20, gap: 16 }}>
                {chatMessages.map((msg) => (
                  <View
                    key={msg.id}
                    className={`p-3 rounded-2xl ${msg.sender === 'You'
                      ? 'bg-[#FF7A00]/10 border border-[#FF7A00]/25 align-self-end w-[85%]'
                      : msg.role === 'Teacher'
                        ? 'bg-blue-500/10 border border-blue-500/20 w-[85%]'
                        : 'bg-[#1C2128] border border-white/5 w-[85%]'
                      }`}
                  >
                    <View className="flex-row justify-between items-center mb-1">
                      <View className="flex-row items-center gap-1.5">
                        <Text className="text-white text-xs font-bold">{msg.sender}</Text>
                        {msg.role === 'Teacher' && (
                          <View className="bg-blue-500/20 px-1.5 py-0.5 rounded">
                            <Text className="text-blue-400 text-[8px] font-bold uppercase">TEACHER</Text>
                          </View>
                        )}
                        {msg.isPinned && (
                          <Pin size={10} color="#FF7A00" />
                        )}
                      </View>
                      <Text className="text-[#A0A7B4] text-[9px]">{msg.time}</Text>
                    </View>
                    <Text className="text-white/95 text-xs leading-5">{msg.message}</Text>
                  </View>
                ))}
              </ScrollView>

              {/* Input Bar */}
              <View className="p-4 border-t border-white/5 bg-[#14171C] flex-row items-center gap-3">
                <TextInput
                  value={inputMessage}
                  onChangeText={setInputMessage}
                  placeholder="Ask standard questions or chat..."
                  placeholderTextColor="#A0A7B4"
                  className="flex-1 h-11 bg-white/5 border border-white/10 rounded-xl px-4 text-white text-xs"
                />
                <TouchableOpacity onPress={handleSendChat} className="w-11 h-11 bg-[#FF7A00] rounded-xl items-center justify-center">
                  <Send size={16} color="white" />
                </TouchableOpacity>
              </View>
            </View>
          )}

          {/* AI Tutor Tab */}
          {activePanel === 'tutor' && (
            <View className="flex-1 justify-between">
              <ScrollView className="flex-1" contentContainerStyle={{ padding: 20, gap: 16 }}>
                {/* Glowing AI Tutor Banner */}
                <LinearGradient
                  colors={['#FF7A0025', '#9B51E025']}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 1 }}
                  className="p-4 rounded-2xl border border-[#FF7A00]/20 flex-row gap-3 items-center"
                >
                  <View className="w-9 h-9 rounded-xl bg-[#FF7A00] items-center justify-center">
                    <Sparkles size={18} color="white" />
                  </View>
                  <View className="flex-1">
                    <Text className="text-white text-xs font-bold">Ask AI Tutor Assistant</Text>
                    <Text className="text-[#A0A7B4] text-[10px] mt-0.5">Real-time answers compiled directly from this class lecture.</Text>
                  </View>
                </LinearGradient>

                {/* Conversation */}
                <View className="gap-4">
                  {tutorChat.map((msg, idx) => (
                    <View
                      key={idx}
                      className={`flex-row gap-2.5 ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                    >
                      {msg.role === 'assistant' && (
                        <View className="w-6 h-6 rounded-lg bg-orange-500 items-center justify-center mt-1">
                          <Sparkles size={12} color="white" />
                        </View>
                      )}
                      <View
                        className={`p-3 rounded-2xl max-w-[80%] ${msg.role === 'user'
                          ? 'bg-[#FF7A00]/10 border border-[#FF7A00]/30'
                          : 'bg-white/5 border border-white/5'
                          }`}
                      >
                        <Text className="text-white text-xs leading-5">{msg.message}</Text>
                      </View>
                    </View>
                  ))}
                  {isAiLoading && (
                    <View className="flex-row gap-2.5 justify-start items-center p-3">
                      <View className="w-6 h-6 rounded-lg bg-orange-500 items-center justify-center">
                        <Sparkles size={12} color="white" />
                      </View>
                      <Text className="text-[#A0A7B4] text-xs">AI Tutor is thinking...</Text>
                    </View>
                  )}
                </View>

                {/* AI Quick Actions */}
                <View className="mt-2">
                  <Text className="text-[#A0A7B4] text-[10px] font-bold uppercase tracking-wider mb-2">QUICK ACTIONS</Text>
                  <View className="flex-row flex-wrap gap-2">
                    {[
                      '💡 Explain Alignment Theory',
                      '📝 Summarize Lecture So Far',
                      '❓ Generate Practice Quiz',
                    ].map((action) => (
                      <TouchableOpacity
                        key={action}
                        onPress={() => handleAiTutorAction(action)}
                        className="bg-white/5 border border-white/10 px-3 py-2 rounded-xl"
                      >
                        <Text className="text-white text-[10px] font-medium">{action}</Text>
                      </TouchableOpacity>
                    ))}
                  </View>
                </View>
              </ScrollView>

              {/* Input Bar */}
              <View className="p-4 border-t border-white/5 bg-[#14171C] flex-row items-center gap-3">
                <TextInput
                  value={aiInput}
                  onChangeText={setAiInput}
                  placeholder="Ask tutor to elaborate..."
                  placeholderTextColor="#A0A7B4"
                  className="flex-1 h-11 bg-white/5 border border-white/10 rounded-xl px-4 text-white text-xs"
                />
                <TouchableOpacity onPress={handleAiInputSubmit} className="w-11 h-11 bg-orange-500 rounded-xl items-center justify-center">
                  <Send size={16} color="white" />
                </TouchableOpacity>
              </View>
            </View>
          )}

          {/* Resources Tab */}
          {activePanel === 'resources' && (
            <ScrollView className="flex-1" contentContainerStyle={{ padding: 20, gap: 14 }}>
              {[
                { id: '1', title: 'AI_Safety_Framework.pdf', size: '2.4 MB', type: 'PDF Document' },
                { id: '2', title: 'Lecture_Slides.pptx', size: '4.8 MB', type: 'Powerpoint Slides' },
                { id: '3', title: 'Alignment_Lab_Exercises.zip', size: '12.1 MB', type: 'Coding Files' },
              ].map((item) => (
                <View
                  key={item.id}
                  className="bg-[#1C2128] border border-white/5 p-4 rounded-2xl flex-row justify-between items-center"
                >
                  <View className="flex-row items-center gap-3">
                    <View className="w-10 h-10 rounded-xl bg-white/5 items-center justify-center border border-white/10">
                      <FileText size={18} color="#FF7A00" />
                    </View>
                    <View>
                      <Text className="text-white text-xs font-semibold" numberOfLines={1}>{item.title}</Text>
                      <Text className="text-[#A0A7B4] text-[10px] mt-0.5">{item.type} • {item.size}</Text>
                    </View>
                  </View>

                  <TouchableOpacity
                    onPress={() => startDownload(item.id)}
                    className={`w-9 h-9 rounded-xl items-center justify-center ${downloads[item.id] === 'completed'
                      ? 'bg-green-500/10 border border-green-500/25'
                      : downloads[item.id] === 'downloading'
                        ? 'bg-white/5'
                        : 'bg-[#FF7A00] border border-orange-600'
                      }`}
                  >
                    {downloads[item.id] === 'completed' ? (
                      <Check size={14} color="#22C55E" />
                    ) : downloads[item.id] === 'downloading' ? (
                      <RotateCw size={14} color="white" className="animate-spin" />
                    ) : (
                      <Download size={14} color="white" />
                    )}
                  </TouchableOpacity>
                </View>
              ))}
            </ScrollView>
          )}

          {/* Poll Tab */}
          {activePanel === 'polls' && (
            <ScrollView className="flex-1" contentContainerStyle={{ padding: 20, gap: 16 }}>
              <View className="bg-[#1C2128] border border-white/5 p-5 rounded-2xl">
                <View className="flex-row items-center gap-1.5 mb-2.5">
                  <HelpCircle size={14} color="#FF7A00" />
                  <Text className="text-[#FF7A00] text-[10px] font-bold uppercase tracking-wider">ACTIVE POLL</Text>
                </View>

                <Text className="text-white text-sm font-semibold leading-6 mb-5">
                  Which method is most effective for model alignment in safety paradigms?
                </Text>

                {/* Poll Options */}
                <View className="gap-3">
                  {[
                    'Reinforcement Learning from Human Feedback (RLHF)',
                    'Constitutional AI / Self-Correction Rules',
                    'Supervised Fine-Tuning with Curated Datasets',
                  ].map((option, idx) => {
                    const percentage = totalVotes > 0 ? Math.round((pollVotes[idx] / totalVotes) * 100) : 0;
                    const hasVoted = selectedPollOption !== null;
                    const isOptionSelected = selectedPollOption === idx;

                    return (
                      <TouchableOpacity
                        key={idx}
                        disabled={hasVoted}
                        onPress={() => handleVote(idx)}
                        className="relative h-12 justify-center rounded-xl overflow-hidden bg-white/5 border border-white/10 px-4"
                      >
                        {/* Animated background bar if voted */}
                        {hasVoted && (
                          <View
                            className="absolute inset-y-0 left-0"
                            style={{
                              width: `${percentage}%`,
                              backgroundColor: isOptionSelected ? 'rgba(255, 122, 0, 0.25)' : 'rgba(255, 255, 255, 0.05)',
                            }}
                          />
                        )}

                        <View className="flex-row justify-between items-center z-10">
                          <Text
                            className={`text-xs font-medium max-w-[80%] ${isOptionSelected ? 'text-[#FF7A00]' : 'text-white/90'
                              }`}
                            numberOfLines={1}
                          >
                            {option}
                          </Text>
                          {hasVoted && (
                            <Text className="text-white text-xs font-bold">{percentage}%</Text>
                          )}
                        </View>
                      </TouchableOpacity>
                    );
                  })}
                </View>

                {selectedPollOption !== null && (
                  <Text className="text-[#A0A7B4] text-[10px] text-center mt-4">
                    Thank you for voting! Live poll results updated dynamically. Total: {totalVotes} votes.
                  </Text>
                )}
              </View>
            </ScrollView>
          )}
        </View>
      </BlurView>
    </View>
  );
}
