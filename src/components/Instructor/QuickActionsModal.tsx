import React from 'react';
import { View, Text, Modal, TouchableOpacity, Animated, StyleSheet, Dimensions, Platform, PanResponder } from 'react-native';
import { ClipboardText, Teacher, DocumentText, Notification, ArrowRight2, CloseCircle } from 'iconsax-react-native';
import { useRouter } from 'expo-router';

interface QuickActionsModalProps {
  visible: boolean;
  onClose: () => void;
}

const { height } = Dimensions.get('window');

const ACTION_ITEMS = [
  {
    id: 'assignment',
    title: 'Assignment',
    description: 'Create a new assignment for students.',
    icon: ClipboardText,
    color: '#3B82F6', // Blue
    bgColor: '#EFF6FF',
  },
  {
    id: 'test',
    title: 'Test',
    description: 'Set up a new test or quiz.',
    icon: Teacher,
    color: '#F59E0B', // Orange
    bgColor: '#FEF3C7',
  },
  {
    id: 'resources',
    title: 'Resources',
    description: 'Upload new study materials.',
    icon: DocumentText,
    color: '#8B5CF6', // Purple
    bgColor: '#F5F3FF',
  },
  {
    id: 'announcement',
    title: 'Announcement',
    description: 'Broadcast a message to the class.',
    icon: Notification,
    color: '#F97316', // Orange/Peach
    bgColor: '#FFF7ED',
  },
];

export default function QuickActionsModal({ visible, onClose }: QuickActionsModalProps) {
  const router = useRouter();
  const [showModal, setShowModal] = React.useState(visible);
  const slideAnim = React.useRef(new Animated.Value(height)).current;
  const fadeAnim = React.useRef(new Animated.Value(0)).current;

  const panResponder = React.useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onStartShouldSetPanResponderCapture: () => false,
      onMoveShouldSetPanResponder: (_, gestureState) => {
        return Math.abs(gestureState.dy) > 2 && Math.abs(gestureState.dy) > Math.abs(gestureState.dx);
      },
      onMoveShouldSetPanResponderCapture: (_, gestureState) => {
        return Math.abs(gestureState.dy) > 2 && Math.abs(gestureState.dy) > Math.abs(gestureState.dx);
      },
      onPanResponderMove: (_, gestureState) => {
        if (gestureState.dy > 0) {
          slideAnim.setValue(gestureState.dy);
          const opacity = Math.max(0, 1 - (gestureState.dy / (height / 2)));
          fadeAnim.setValue(opacity);
        }
      },
      onPanResponderRelease: (_, gestureState) => {
        if (gestureState.dy > 60 || gestureState.vy > 0.3) {
          Animated.parallel([
            Animated.spring(slideAnim, {
              toValue: height,
              useNativeDriver: true,
              velocity: gestureState.vy,
              damping: 20,
              mass: 0.6,
              stiffness: 100,
            }),
            Animated.timing(fadeAnim, {
              toValue: 0,
              duration: 150,
              useNativeDriver: true,
            })
          ]).start(() => {
            onClose();
          });
        } else {
          Animated.parallel([
            Animated.spring(slideAnim, {
              toValue: 0,
              useNativeDriver: true,
              bounciness: 6,
            }),
            Animated.timing(fadeAnim, {
              toValue: 1,
              duration: 150,
              useNativeDriver: true,
            })
          ]).start();
        }
      },
    })
  ).current;

  React.useEffect(() => {
    if (visible) {
      setShowModal(true);
      Animated.parallel([
        Animated.spring(slideAnim, {
          toValue: 0,
          useNativeDriver: true,
          bounciness: 5,
          speed: 14,
        }),
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 250,
          useNativeDriver: true,
        })
      ]).start();
    } else {
      Animated.parallel([
        Animated.spring(slideAnim, {
          toValue: height,
          useNativeDriver: true,
          damping: 20,
          mass: 0.8,
          stiffness: 120,
        }),
        Animated.timing(fadeAnim, {
          toValue: 0,
          duration: 200,
          useNativeDriver: true,
        })
      ]).start(() => {
        setShowModal(false);
      });
    }
  }, [visible]);

  if (!showModal) return null;

  const handleClose = () => {
    Animated.parallel([
      Animated.spring(slideAnim, {
        toValue: height,
        useNativeDriver: true,
        damping: 20,
        mass: 0.8,
        stiffness: 120,
      }),
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 200,
        useNativeDriver: true,
      })
    ]).start(() => {
      onClose();
    });
  };

  return (
    <Modal
      transparent
      visible={showModal}
      animationType="none"
      onRequestClose={handleClose}
      statusBarTranslucent
    >
      <View style={styles.overlay}>
        {/* Animated Backdrop */}
        <Animated.View style={[styles.backdrop, { opacity: fadeAnim }]}>
          <TouchableOpacity 
            style={styles.backdropTouch} 
            activeOpacity={1} 
            onPress={handleClose} 
          />
        </Animated.View>

        {/* Sliding Bottom Sheet */}
        <Animated.View
          style={[
            styles.modalContainer,
            {
              transform: [{ translateY: slideAnim }],
            },
          ]}
        >
          {/* Top Drag Zone */}
          <View {...panResponder.panHandlers} style={styles.dragArea}>
            <View style={styles.dragHandle} />
          </View>

          {/* Header */}
          <View style={styles.header}>
            <View>
              <Text style={styles.title}>Quick Actions</Text>
              <Text style={styles.subtitle}>What would you like to create?</Text>
            </View>
            <TouchableOpacity 
              onPress={handleClose}
              style={styles.closeButton}
              activeOpacity={0.7}
            >
              <CloseCircle size={24} color="#9CA3AF" variant="Linear" />
            </TouchableOpacity>
          </View>

          {/* Action Items List */}
          <View style={styles.itemsContainer}>
            {ACTION_ITEMS.map((item) => (
              <TouchableOpacity
                key={item.id}
                style={styles.actionItem}
                activeOpacity={0.7}
                onPress={() => {
                  handleClose();
                  if (item.id === 'test') {
                    router.push('/(instructor)/create-test');
                  } else if (item.id === 'assignment') {
                    router.push('/(instructor)/create-assignment');
                  } else if (item.id === 'announcement') {
                    router.push('/(instructor)/create-announcement');
                  } else if (item.id === 'resources') {
                    router.push('/(instructor)/create-resource');
                  }
                }}
              >
                <View style={[styles.iconContainer, { backgroundColor: item.bgColor }]}>
                  <item.icon size={22} color={item.color} variant="Linear" />
                </View>
                <View style={styles.textContainer}>
                  <Text style={styles.itemTitle}>{item.title}</Text>
                  <Text style={styles.itemDescription}>{item.description}</Text>
                </View>
                <ArrowRight2 size={16} color="#D1D5DB" variant="Linear" />
              </TouchableOpacity>
            ))}
          </View>
        </Animated.View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  backdrop: {
    ...StyleSheet.absoluteFill,
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
  },
  backdropTouch: {
    flex: 1,
  },
  modalContainer: {
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 32,
    borderTopRightRadius: 32,
    paddingTop: 4,
    paddingHorizontal: 24,
    paddingBottom: Platform.OS === 'ios' ? 48 : 32,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: -4,
    },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 20,
  },
  dragArea: {
    width: '100%',
    paddingVertical: 12,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 8,
    backgroundColor: 'transparent',
  },
  dragHandle: {
    width: 48,
    height: 5,
    borderRadius: 3,
    backgroundColor: '#E5E7EB',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 28,
  },
  title: {
    fontSize: 24,
    fontWeight: '800',
    color: '#111827',
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 15,
    color: '#6B7280',
    fontWeight: '500',
  },
  closeButton: {
    padding: 4,
  },
  itemsContainer: {
    gap: 16,
  },
  actionItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderRadius: 20,
    backgroundColor: '#FAFAFA',
    borderWidth: 1,
    borderColor: '#F3F4F6',
  },
  iconContainer: {
    width: 48,
    height: 48,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
  },
  textContainer: {
    flex: 1,
  },
  itemTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#1F2937',
    marginBottom: 2,
  },
  itemDescription: {
    fontSize: 13,
    color: '#6B7280',
    fontWeight: '400',
  },
});
