import React, { useState, useEffect, useRef, useCallback } from 'react';
import { View, Text,Animated, PanResponder,LayoutAnimation,Platform,UIManager, Dimensions, BackHandler, Alert,} from 'react-native';
import { Image } from 'expo-image';
import { BlurView } from 'expo-blur';
import { router, useFocusEffect } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import { Wifi,RotateCw, Check} from 'lucide-react-native';

// Enable layout animations for smooth UI transitions
if (Platform.OS === 'android' && UIManager.setLayoutAnimationEnabledExperimental) {
  try {
    UIManager.setLayoutAnimationEnabledExperimental(true);
  } catch (e) { }
}

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');
const DRAWER_FULL_HEIGHT = SCREEN_HEIGHT - 60;
const DRAWER_HALF_HEIGHT = 540;
const DRAWER_HALF_Y = DRAWER_FULL_HEIGHT - DRAWER_HALF_HEIGHT;

import MeetHeader from '../../../features/student/meet/components/MeetHeader';
import BottomControls from '../../../features/student/meet/components/BottomControls';
import { FloatingReaction, EmojiPicker } from '../../../features/student/meet/components/Reactions';
import ParticipantGrid from '../../../features/student/meet/components/ParticipantGrid';
import MoreOptionsSheet from '../../../features/student/meet/components/MoreOptionsSheet';
import PeopleDrawer from '../../../features/student/meet/components/PeopleDrawer';
import LeaveMeetingDrawer from '../../../features/student/meet/components/LeaveMeetingDrawer';
import SidePanels from '../../../features/student/meet/components/SidePanels';

// Initial Mock States
const INITIAL_CHAT = [
  { id: '1', sender: 'Dr. Liam', role: 'Teacher', message: 'Welcome to AM101 Live! Today we are discussing AI safety paradigms, alignment theory, and RLHF concepts.', time: '10:00 AM', isPinned: true },
  { id: '2', sender: 'Sarah Connor', role: 'Student', message: 'Will we cover constitutional AI today?', time: '10:02 AM' },
  { id: '3', sender: 'Alex Rivera', role: 'Student', message: 'Awesome presentation screen share!', time: '10:03 AM' },
];

const INITIAL_PARTICIPANTS = [
  {
    id: 'alison',
    name: 'Alison Roberts',
    initials: 'AR',
    muted: false,
    avatarBg: '#E9573F', // Salmon Coral
    handRaised: false,
  },
  {
    id: 'you',
    name: 'You',
    initials: 'ME',
    muted: false,
    avatarBg: '#3BAFDA', // Sky Blue
    handRaised: false,
  },
  {
    id: 'sarah',
    name: 'Sarah Paige',
    initials: 'SP',
    muted: true,
    avatarBg: '#37BC9B', // Mint Teal
    handRaised: false,
  },
  {
    id: 'joe',
    name: 'Joe Parsons',
    initials: 'JP',
    muted: true,
    avatarBg: '#4A89DC', // Royal Blue
    handRaised: false,
  },
  {
    id: 'peter',
    name: 'Peter Lee',
    initials: 'PL',
    muted: false,
    avatarBg: '#967ADC', // Lavender Purple
    handRaised: false,
  },
  { id: 'luke', name: 'Luke Smith', initials: 'LS', muted: true, avatarBg: '#8CC152', handRaised: false },
  { id: 'emily', name: 'Emily Chen', initials: 'EC', muted: true, avatarBg: '#F6B654', handRaised: false },
  { id: 'michael', name: 'Michael Johnson', initials: 'MJ', muted: true, avatarBg: '#4A89DC', handRaised: true },
  { id: 'sophia', name: 'Sophia Martinez', initials: 'SM', muted: true, avatarBg: '#E9573F', handRaised: false },
  { id: 'james', name: 'James Wilson', initials: 'JW', muted: true, avatarBg: '#967ADC', handRaised: false },
  { id: 'olivia', name: 'Olivia Brown', initials: 'OB', muted: true, avatarBg: '#3BAFDA', handRaised: false },
  { id: 'david', name: 'David Taylor', initials: 'DT', muted: true, avatarBg: '#37BC9B', handRaised: false },
  { id: 'emma', name: 'Emma Anderson', initials: 'EA', muted: true, avatarBg: '#8CC152', handRaised: false },
  { id: 'daniel', name: 'Daniel Thomas', initials: 'DT', muted: true, avatarBg: '#F6B654', handRaised: false },
  { id: 'ava', name: 'Ava Jackson', initials: 'AJ', muted: true, avatarBg: '#4A89DC', handRaised: false },
  { id: 'william', name: 'William White', initials: 'WW', muted: true, avatarBg: '#E9573F', handRaised: false },
  { id: 'mia', name: 'Mia Harris', initials: 'MH', muted: true, avatarBg: '#967ADC', handRaised: false },
  { id: 'alex', name: 'Alexander Martin', initials: 'AM', muted: true, avatarBg: '#3BAFDA', handRaised: false },
  { id: 'charlotte', name: 'Charlotte Thompson', initials: 'CT', muted: true, avatarBg: '#37BC9B', handRaised: false },
  { id: 'ethan', name: 'Ethan Garcia', initials: 'EG', muted: true, avatarBg: '#8CC152', handRaised: false },
  { id: 'harper', name: 'Harper Clark', initials: 'HC', muted: true, avatarBg: '#F6B654', handRaised: false },
  { id: 'ben', name: 'Benjamin Lewis', initials: 'BL', muted: true, avatarBg: '#4A89DC', handRaised: false },
  { id: 'amelia', name: 'Amelia Robinson', initials: 'AR', muted: true, avatarBg: '#E9573F', handRaised: false },
  { id: 'jacob', name: 'Jacob Walker', initials: 'JW', muted: true, avatarBg: '#967ADC', handRaised: false },
  { id: 'isabella', name: 'Isabella Young', initials: 'IY', muted: true, avatarBg: '#3BAFDA', handRaised: false },
];

const NETWORK_STATES = [
  { state: 'Excellent', color: '#22C55E', icon: Wifi },
  { state: 'Good', color: '#F59E0B', icon: Wifi },
  { state: 'Poor', color: '#EF4444', icon: Wifi },
  { state: 'Reconnecting', color: '#EF4444', icon: RotateCw },
];

export default function LiveClassScreen() {
  // Bottom meeting controls toggles
  const [micActive, setMicActive] = useState(true);
  const [camActive, setCamActive] = useState(true);
  const [speakerActive, setSpeakerActive] = useState(true);
  const [screenShareActive, setScreenShareActive] = useState(false); // Default to grid layout to match screenshot!
  const [handRaised, setHandRaised] = useState(false);

  // Fullscreen and Roster States
  const [isSpotlightFullscreen, setIsSpotlightFullscreen] = useState(false);
  const [isControlsHidden, setIsControlsHidden] = useState(false);
  const [showParticipantsSheet, setShowParticipantsSheet] = useState(false);
  const [participantQuery, setParticipantQuery] = useState('');

  // Bottom bar popups
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [showMoreOptions, setShowMoreOptions] = useState(false);

  // Network State Cycling
  const [networkIdx, setNetworkIdx] = useState(0);

  // Active Speaker Spotlight state
  const [activeSpeakerId, setActiveSpeakerId] = useState('alison');
  const [participants, setParticipants] = useState(INITIAL_PARTICIPANTS);

  // Grid pagination state
  const [currentGridPage, setCurrentGridPage] = useState(0);

  // Floating reactions state
  const [reactions, setReactions] = useState<{ id: string; emoji: string }[]>([]);

  // Sliding sheet panel state
  const [activePanel, setActivePanel] = useState<'chat' | 'tutor' | 'resources' | 'polls' | null>(null);

  // Class Time (seconds)
  const [classSeconds, setClassSeconds] = useState(2132); // Starting at 35m 32s

  // Chat messages
  const [chatMessages, setChatMessages] = useState(INITIAL_CHAT);
  const [inputMessage, setInputMessage] = useState('');

  // AI Tutor conversation state
  const [tutorChat, setTutorChat] = useState([
    { role: 'assistant', message: 'Hello! I am your AI Co-Pilot for today\'s lecture. Ask me to explain concepts, summarize parts of the class, or generate custom quizzes in real time!' }
  ]);
  const [aiInput, setAiInput] = useState('');
  const [isAiLoading, setIsAiLoading] = useState(false);

  // Resources state
  const [downloads, setDownloads] = useState<{ [key: string]: 'idle' | 'downloading' | 'completed' }>({
    '1': 'idle',
    '2': 'idle',
  });

  // Poll state
  const [selectedPollOption, setSelectedPollOption] = useState<number | null>(null);
  const [pollVotes, setPollVotes] = useState([38, 18, 12]); // Votes for A, B, C

  // Swipe gesture Y position refs
  const touchStartY = useRef(0);

  // Drag-and-drop Picture-in-Picture (PiP) coordinates
  const pan = useRef(new Animated.ValueXY({ x: SCREEN_WIDTH - 130, y: 110 })).current;

  // People drawer slide animation
  const drawerY = useRef(new Animated.Value(SCREEN_HEIGHT)).current;
  const openDrawer = () => {
    setShowParticipantsSheet(true);
    // Initial open to half-height (Instagram style)
    Animated.spring(drawerY, { toValue: DRAWER_HALF_Y, useNativeDriver: true, tension: 65, friction: 11 }).start();
  };
  const closeDrawer = () => {
    Animated.timing(drawerY, { toValue: SCREEN_HEIGHT, duration: 280, useNativeDriver: true }).start(() =>
      setShowParticipantsSheet(false)
    );
  };
  const drawerPanResponder = useRef(
    PanResponder.create({
      onMoveShouldSetPanResponder: (_, g) => Math.abs(g.dy) > 15 && Math.abs(g.dy) > Math.abs(g.dx),
      onPanResponderGrant: () => {
        setShowParticipantsSheet(true);
        drawerY.setOffset((drawerY as any)._value);
        drawerY.setValue(0);
      },
      onPanResponderMove: (_, g) => {
        let newY = g.dy;
        // Prevent dragging above the top of the drawer limit (0)
        if ((drawerY as any)._offset + newY < 0) {
          newY = -(drawerY as any)._offset;
        }
        drawerY.setValue(newY);
      },
      onPanResponderRelease: (_, g) => {
        drawerY.flattenOffset();
        const currentY = (drawerY as any)._value;

        // Dragged down hard, or past threshold -> close completely
        if (g.vy > 1.5 || currentY > DRAWER_HALF_Y + 100) {
          closeDrawer();
        } 
        // Dragged up hard, or past threshold -> expand to full screen
        else if (g.vy < -0.5 || currentY < DRAWER_HALF_Y - 50) {
          Animated.spring(drawerY, { toValue: 0, useNativeDriver: true, tension: 65, friction: 11 }).start();
        } 
        // Otherwise snap back to half open
        else {
          Animated.spring(drawerY, { toValue: DRAWER_HALF_Y, useNativeDriver: true, tension: 65, friction: 11 }).start();
        }
      },
    })
  ).current;

  // More options slide animation
  const moreOptionsY = useRef(new Animated.Value(450)).current;
  const openMoreOptions = () => {
    setShowMoreOptions(true);
    Animated.spring(moreOptionsY, { toValue: 0, useNativeDriver: true, tension: 65, friction: 11 }).start();
  };
  const closeMoreOptions = () => {
    Animated.timing(moreOptionsY, { toValue: 450, duration: 280, useNativeDriver: true }).start(() =>
      setShowMoreOptions(false)
    );
  };
  const moreOptionsPanResponder = useRef(
    PanResponder.create({
      onMoveShouldSetPanResponder: (_, g) => Math.abs(g.dy) > 15 && Math.abs(g.dy) > Math.abs(g.dx),
      onPanResponderMove: (_, g) => {
        if (g.dy > 0) moreOptionsY.setValue(g.dy);
      },
      onPanResponderRelease: (_, g) => {
        if (g.dy > 80 || g.vy > 0.5) {
          closeMoreOptions();
        } else {
          Animated.spring(moreOptionsY, { toValue: 0, useNativeDriver: true, tension: 65, friction: 11 }).start();
        }
      },
    })
  ).current;

  // Leave drawer animation
  const [showLeaveDrawer, setShowLeaveDrawer] = useState(false);
  const leaveDrawerY = useRef(new Animated.Value(350)).current;
  const openLeaveDrawer = () => {
    setShowLeaveDrawer(true);
    Animated.spring(leaveDrawerY, { toValue: 0, useNativeDriver: true, tension: 65, friction: 11 }).start();
  };
  const closeLeaveDrawer = () => {
    Animated.timing(leaveDrawerY, { toValue: 350, duration: 280, useNativeDriver: true }).start(() =>
      setShowLeaveDrawer(false)
    );
  };
  const leaveDrawerPanResponder = useRef(
    PanResponder.create({
      onMoveShouldSetPanResponder: (_, g) => Math.abs(g.dy) > 15 && Math.abs(g.dy) > Math.abs(g.dx),
      onPanResponderMove: (_, g) => {
        if (g.dy > 0) leaveDrawerY.setValue(g.dy);
      },
      onPanResponderRelease: (_, g) => {
        if (g.dy > 80 || g.vy > 0.5) {
          closeLeaveDrawer();
        } else {
          Animated.spring(leaveDrawerY, { toValue: 0, useNativeDriver: true, tension: 65, friction: 11 }).start();
        }
      },
    })
  ).current;

  const panResponder = useRef(
    PanResponder.create({
      onMoveShouldSetPanResponder: () => true,
      onPanResponderGrant: () => {
        pan.setOffset({
          x: (pan.x as any)._value,
          y: (pan.y as any)._value,
        });
      },
      onPanResponderMove: Animated.event([null, { dx: pan.x, dy: pan.y }], {
        useNativeDriver: false,
      }),
      onPanResponderRelease: () => {
        pan.flattenOffset();
      },
    })
  ).current;

  // Unified exit handler with confirmation
  const handleLeaveCall = () => {
    openLeaveDrawer();
  };

  // Hardware Back Button Interception
  useFocusEffect(
    useCallback(() => {
      const backAction = () => {
        // 1. Close Emoji Picker if open
        if (showEmojiPicker) {
          setShowEmojiPicker(false);
          return true; // Handled
        }
        // 2. Close More Options sheet if open
        if (showMoreOptions) {
          closeMoreOptions();
          return true;
        }
        // 3. Close People Drawer if open
        if (showParticipantsSheet) {
          closeDrawer();
          return true;
        }
        // 4. Close any active side panels (chat, poll, resources)
        if (activePanel) {
          setActivePanel(null);
          return true;
        }
        // 5. Close Leave drawer if open
        if (showLeaveDrawer) {
          closeLeaveDrawer();
          return true;
        }

        // If nothing is open, trigger the leave confirmation
        handleLeaveCall();
        return true; // Handled (prevents default exit)
      };

      const backHandler = BackHandler.addEventListener('hardwareBackPress', backAction);
      return () => backHandler.remove();
    }, [showEmojiPicker, showMoreOptions, showParticipantsSheet, activePanel, showLeaveDrawer])
  );

  // Run class timer
  useEffect(() => {
    const timer = setInterval(() => {
      setClassSeconds((prev) => prev + 1);
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // Format Timer (MM:SS)
  const formatTime = (secs: number) => {
    const mins = Math.floor(secs / 60);
    const s = secs % 60;
    return `${mins.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  // Trigger floating reaction
  const spawnReaction = (emoji: string) => {
    const id = Date.now().toString() + Math.random().toString();
    setReactions((prev) => [...prev, { id, emoji }]);
  };

  // Switch panels
  const togglePanel = (panel: 'chat' | 'tutor' | 'resources' | 'polls') => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    if (activePanel === panel) {
      setActivePanel(null);
    } else {
      setActivePanel(panel);
    }
  };

  // Submit Chat Message
  const handleSendChat = () => {
    if (!inputMessage.trim()) return;
    const newMessage = {
      id: Date.now().toString(),
      sender: 'You',
      role: 'Student',
      message: inputMessage.trim(),
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setChatMessages((prev) => [...prev, newMessage]);
    setInputMessage('');
  };

  // AI Tutor Quick Prompt Helper
  const handleAiTutorAction = (promptText: string) => {
    if (isAiLoading) return;
    setTutorChat((prev) => [...prev, { role: 'user', message: promptText }]);
    setIsAiLoading(true);

    setTimeout(() => {
      let response = '';
      if (promptText.includes('Explain')) {
        response = 'Sure! RLHF (Reinforcement Learning from Human Feedback) uses human preferences to optimize model behavior. We train a reward model on pairwise rankings, then tune the base policy via PPO algorithm.';
      } else if (promptText.includes('Summarize')) {
        response = 'So far, the class covered:\n1. Key safety failure modes in frontier AI systems.\n2. The RLHF process breakdown (human comparison, reward modeling, PPO optimization).';
      } else {
        response = 'Here is a quick quiz to check your understanding:\n\n*Question: What does PPO stand for in the context of RLHF?*\n\n1. Proximal Policy Optimization\n2. Predictive Parameter Overlay\n3. Pre-trained Policy Outlines\n\nChoose an option in the Chat to respond!';
      }
      LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
      setTutorChat((prev) => [...prev, { role: 'assistant', message: response }]);
      setIsAiLoading(false);
    }, 1800);
  };

  const handleAiInputSubmit = () => {
    if (!aiInput.trim()) return;
    const query = aiInput.trim();
    setAiInput('');
    handleAiTutorAction(query);
  };

  // Mock download resource
  const startDownload = (id: string) => {
    setDownloads((prev) => ({ ...prev, [id]: 'downloading' }));
    setTimeout(() => {
      setDownloads((prev) => ({ ...prev, [id]: 'completed' }));
    }, 2500);
  };

  // Cast Poll Vote
  const handleVote = (optionIndex: number) => {
    if (selectedPollOption !== null) return;
    setSelectedPollOption(optionIndex);
    setPollVotes((prev) => {
      const updated = [...prev];
      updated[optionIndex] += 1;
      return updated;
    });
  };

  // Toggle user's Mic from bottom bar
  const toggleUserMic = () => {
    const nextState = !micActive;
    setMicActive(nextState);
    setParticipants(prev =>
      prev.map(p => (p.id === 'you' ? { ...p, muted: !nextState } : p))
    );
  };

  // Toggle user's Cam from bottom bar
  const toggleUserCam = () => {
    const nextState = !camActive;
    setCamActive(nextState);
    setParticipants(prev =>
      prev.map(p => (p.id === 'you' ? { ...p, hasVideo: nextState } : p))
    );
  };

  // Gesture Handlers moved to ParticipantGrid

  // Simulated active speaker rotation (Google Meet/Zoom logic)
  useEffect(() => {
    const speakInterval = setInterval(() => {
      // Pick a random participant who is unmuted to talk
      const unmuted = participants.filter((p) => !p.muted);
      if (unmuted.length > 0) {
        const nextSpeaker = unmuted[Math.floor(Math.random() * unmuted.length)];

        LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
        setActiveSpeakerId(nextSpeaker.id);
      }
    }, 7000); // Rotate spotlight speaker every 7 seconds

    return () => clearInterval(speakInterval);
  }, [participants]);

  const totalVotes = pollVotes.reduce((a, b) => a + b, 0);
  const CurrentNetwork = NETWORK_STATES[networkIdx];

  // Dynamic spotlight speaker
  const spotlightParticipant = participants.find((p) => p.id === activeSpeakerId) || participants[0];

  // Get all other participants and chunk them into groups of 4 for horizontal swiping
  const nonSpotlightParticipants = participants.filter((p) => p.id !== activeSpeakerId);
  const participantChunks = [];
  for (let i = 0; i < nonSpotlightParticipants.length; i += 4) {
    participantChunks.push(nonSpotlightParticipants.slice(i, i + 4));
  }

  // Search filtered people roster list
  const filteredParticipants = participants.filter((p) =>
    p.name.toLowerCase().includes(participantQuery.toLowerCase())
  );

  return (
    <View className="flex-1 bg-[#0B0D10] relative">
      {/* Background Ambient Glow (matches screenshot gradient) */}
      <LinearGradient
        colors={[
          '#E5A2CE',
          '#4D2961',
          '#140D1D',
          '#0B0D10',
        ]}
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
        }}
        start={{ x: 0.5, y: 0 }}
        end={{ x: 0.5, y: 1 }}
      />

      {/* Header Bar - Hide if controls hidden OR spotlight fullscreen is active */}
      {(!isControlsHidden && !isSpotlightFullscreen) && (
        <MeetHeader
          onLeaveCall={handleLeaveCall}
          timeText={`${formatTime(classSeconds)} min`}
          networkIcon={<CurrentNetwork.icon size={20} color="white" />}
          onCycleNetwork={() => setNetworkIdx((prev) => (prev + 1) % NETWORK_STATES.length)}
        />
      )}

      {/* Main Grid Area */}
      {screenShareActive ? (
        // Mode A: Screen Sharing active - displays IDE fullscreen with PiP webcam
        <View className="flex-1 relative bg-black justify-center items-center overflow-hidden">
          <Image
            source={require('@/assets/images/meet_screen_share.png')}
            style={{ width: '100%', height: '100%' }}
            contentFit="contain"
          />

          {/* Floating Indicators */}
          <View style={{ position: 'absolute', top: 20, left: 20, zIndex: 10, gap: 8 }}>
            <View style={{ borderRadius: 12, overflow: 'hidden', borderWidth: 1, borderColor: 'rgba(255, 255, 255, 0.1)' }}>
              <BlurView intensity={25} tint="dark" style={{ paddingHorizontal: 12, paddingVertical: 6, flexDirection: 'row', alignItems: 'center', gap: 6 }}>
                <Check size={12} color="#22C55E" />
                <Text style={{ color: 'white', fontSize: 11, fontWeight: '600' }}>Attendance: Present</Text>
              </BlurView>
            </View>
          </View>

          {/* Floating Draggable PiP (using circular avatar profile) */}
          <Animated.View
            {...panResponder.panHandlers}
            style={[
              pan.getLayout(),
              {
                position: 'absolute',
                zIndex: 30,
                width: 100,
                height: 120,
                borderRadius: 16,
                borderWidth: 1.5,
                borderColor: 'rgba(255, 255, 255, 0.12)',
                backgroundColor: '#1C2128',
                alignItems: 'center',
                justifyContent: 'center',
                shadowColor: '#000',
                shadowOffset: { width: 0, height: 6 },
                shadowOpacity: 0.35,
                shadowRadius: 8,
                elevation: 8,
              },
            ]}
          >
            <View
              style={{
                width: 44,
                height: 44,
                borderRadius: 22,
                backgroundColor: spotlightParticipant.avatarBg || '#E9573F',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <Text style={{ color: 'white', fontSize: 16, fontWeight: 'bold' }}>
                {spotlightParticipant.initials}
              </Text>
            </View>
            <Text className="text-white text-[9px] font-bold mt-2" numberOfLines={1}>
              {spotlightParticipant.name}
            </Text>
          </Animated.View>
        </View>
      ) : (
        // Mode B: Premium Grid View (1 Large Active Speaker + 2x2 Grid)
        <ParticipantGrid
          isSpotlightFullscreen={isSpotlightFullscreen}
          setIsSpotlightFullscreen={setIsSpotlightFullscreen}
          isControlsHidden={isControlsHidden}
          toggleControls={() => {
            LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
            setIsControlsHidden(!isControlsHidden);
          }}
          spotlightParticipant={spotlightParticipant}
          participantChunks={participantChunks}
          SCREEN_WIDTH={SCREEN_WIDTH}
          openDrawer={openDrawer}
          currentGridPage={currentGridPage}
          setCurrentGridPage={setCurrentGridPage}
        />
      )}

      {/* Emoji Picker Popup */}
      <EmojiPicker
        showEmojiPicker={showEmojiPicker}
        setShowEmojiPicker={setShowEmojiPicker}
        spawnReaction={spawnReaction}
      />

      {/* ─── More Options — Exact Google Meet Layout ─── */}
      <MoreOptionsSheet
        showMoreOptions={showMoreOptions}
        closeMoreOptions={closeMoreOptions}
        moreOptionsPanResponder={moreOptionsPanResponder}
        moreOptionsY={moreOptionsY}
        handRaised={handRaised}
        setHandRaised={setHandRaised}
        screenShareActive={screenShareActive}
        setScreenShareActive={setScreenShareActive}
        speakerActive={speakerActive}
        setSpeakerActive={setSpeakerActive}
        activePanel={activePanel}
        togglePanel={togglePanel}
        openDrawer={openDrawer}
        handleLeaveCall={handleLeaveCall}
      />

      {/* Bottom Controls Bar */}
      {(!isControlsHidden && !isSpotlightFullscreen) && (
        <BottomControls
          camActive={camActive}
          toggleUserCam={toggleUserCam}
          micActive={micActive}
          toggleUserMic={toggleUserMic}
          showEmojiPicker={showEmojiPicker}
          setShowEmojiPicker={setShowEmojiPicker}
          openMoreOptions={openMoreOptions}
          setShowMoreOptions={setShowMoreOptions}
          handleLeaveCall={handleLeaveCall}
        />
      )}

      {/* Floating Side panel / slide-up sheet */}
      <SidePanels
        activePanel={activePanel}
        setActivePanel={setActivePanel}
        togglePanel={togglePanel}
        chatMessages={chatMessages}
        inputMessage={inputMessage}
        setInputMessage={setInputMessage}
        handleSendChat={handleSendChat}
        tutorChat={tutorChat}
        isAiLoading={isAiLoading}
        handleAiTutorAction={handleAiTutorAction}
        aiInput={aiInput}
        setAiInput={setAiInput}
        handleAiInputSubmit={handleAiInputSubmit}
        downloads={downloads}
        startDownload={startDownload}
        totalVotes={totalVotes}
        pollVotes={pollVotes}
        selectedPollOption={selectedPollOption}
        handleVote={handleVote}
      />

      {/* ─── People Drawer — Animated slide-up with drag-to-close & outside tap ─── */}
      <PeopleDrawer
        showParticipantsSheet={showParticipantsSheet}
        closeDrawer={closeDrawer}
        drawerPanResponder={drawerPanResponder}
        drawerY={drawerY}
        DRAWER_FULL_HEIGHT={DRAWER_FULL_HEIGHT}
        participants={participants}
        activeSpeakerId={activeSpeakerId}
        setActiveSpeakerId={setActiveSpeakerId}
        participantQuery={participantQuery}
        setParticipantQuery={setParticipantQuery}
        filteredParticipants={filteredParticipants}
      />
      <LeaveMeetingDrawer
        showLeaveDrawer={showLeaveDrawer}
        closeLeaveDrawer={closeLeaveDrawer}
        leaveDrawerPanResponder={leaveDrawerPanResponder}
        leaveDrawerY={leaveDrawerY}
      />
    </View>
  );
}
