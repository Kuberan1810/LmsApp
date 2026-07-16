import React, { useRef, useState } from 'react';
import { View, Text, FlatList, Dimensions, TouchableOpacity, NativeSyntheticEvent, NativeScrollEvent } from 'react-native';
import { Image } from 'expo-image';
import { useRouter } from 'expo-router';
import Svg, { Circle } from 'react-native-svg';
import Animated, { useAnimatedProps, useSharedValue, withTiming } from 'react-native-reanimated';
import { ArrowRight } from 'iconsax-react-native';
const { width } = Dimensions.get('window');

const slides = [
  {
    id: '1',
    title: 'Learn, build real skills and shape your future today.',
    image: require('../../assets/images/splash/onboarding.svg'),
  },
  {
    id: '2',
    title: 'Learn, build real skills and shape your future today.',
    image: require('../../assets/images/splash/onboarding.svg'),
  },
  {
    id: '3',
    title: 'Learn, build real skills and shape your future today.',
    image: require('../../assets/images/splash/onboarding.svg'),
  }
];

const AnimatedCircle = Animated.createAnimatedComponent(Circle);

export default function Onboarding() {
  const router = useRouter();
  const [currentIndex, setCurrentIndex] = useState(0);
  const flatListRef = useRef<FlatList>(null);
  const progress = useSharedValue(1);

  React.useEffect(() => {
    progress.value = withTiming(currentIndex + 1, { duration: 300 });
  }, [currentIndex]);

  const updateCurrentSlideIndex = (e: NativeSyntheticEvent<NativeScrollEvent>) => {
    const contentOffsetX = e.nativeEvent.contentOffset.x;
    const currentSlideIndex = Math.round(contentOffsetX / width);
    if (currentSlideIndex !== currentIndex) {
      setCurrentIndex(currentSlideIndex);
    }
  };

  const goNextSlide = () => {
    const nextSlideIndex = currentIndex + 1;
    if (nextSlideIndex < slides.length) {
      const offset = nextSlideIndex * width;
      flatListRef.current?.scrollToOffset({ offset, animated: true });
      setCurrentIndex(nextSlideIndex);
    } else {
      // Navigate to login on the final slide
      router.replace('/(auth)/login');
    }
  };

  // SVG Circular Progress config
  const strokeWidth = 2;
  const radius = 30; // Radius for the progress ring
  const circumference = 2 * Math.PI * radius;
  
  const animatedProps = useAnimatedProps(() => {
    const strokeDashoffset = circumference - (circumference * (progress.value / slides.length));
    return {
      strokeDashoffset,
    };
  });

  return (
    <View className="flex-1 bg-white">
      <FlatList
        ref={flatListRef}
        onMomentumScrollEnd={updateCurrentSlideIndex}
        showsHorizontalScrollIndicator={false}
        horizontal
        data={slides}
        pagingEnabled
        bounces={false}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={{ width, alignItems: 'center', justifyContent: 'center', paddingHorizontal: 20 }}>
            <Image 
              source={item.image}
              style={{ width: width * 0.8, height: width * 0.8 }}
              contentFit="contain"
            />
            <Text className="text-[#808080] text-center text-[18px] font-medium mt-10 leading-6 px-4">
              {item.title}
            </Text>
          </View>
        )}
      />
      
      {/* Footer */}
      <View className="items-center mb-16">
        <TouchableOpacity 
          onPress={goNextSlide}
          activeOpacity={0.8}
          className="items-center justify-center relative"
          style={{ width: 76, height: 76 }}
        >
          <Svg width={76} height={76} style={{ position: 'absolute', transform: [{ rotate: '-90deg' }] }}>
            {/* Background Track Circle */}
            <Circle 
              stroke="#FFF1E6" // Light orange background ring
              fill="transparent"
              cx={38} 
              cy={38} 
              r={radius} 
              strokeWidth={strokeWidth} 
            />
            {/* Progress Stroke Circle */}
            <AnimatedCircle 
              stroke="#F67300" // Brand orange color
              fill="transparent"
              cx={38} 
              cy={38} 
              r={radius} 
              strokeWidth={strokeWidth} 
              strokeDasharray={circumference}
              animatedProps={animatedProps}
              strokeLinecap="round"
            />
          </Svg>
          
          {/* Inner Orange Button */}
          <View style={{ width: 50, height: 50, borderRadius: 25, backgroundColor: '#F67300', alignItems: 'center', justifyContent: 'center' }}>
             <ArrowRight size={24} color="#FFF" />
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
}
