import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, StyleSheet, LayoutAnimation, Platform, UIManager } from 'react-native';
import { ArrowDown2, ArrowUp2 } from 'iconsax-react-native';

if (Platform.OS === 'android' && UIManager.setLayoutAnimationEnabledExperimental) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

interface CustomDropdownProps {
  value: string;
  onChange: (value: string) => void;
  options: { label: string; value: string }[];
  placeholder?: string;
  className?: string;
}

export default function CustomDropdown({ value, onChange, options, placeholder = 'Select...', className = '' }: CustomDropdownProps) {
  const [visible, setVisible] = useState(false);

  const selectedItem = options.find((opt) => opt.value === value);

  const toggleDropdown = () => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setVisible(!visible);
  };

  const handleSelect = (val: string) => {
    onChange(val);
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setVisible(false);
  };

  return (
    <View className="relative">
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={toggleDropdown}
        className={`bg-white border border-[#D3D3D3] rounded-[10px] h-[38px] flex-row items-center justify-between px-3 ${className}`}
      >
        <Text className={`text-[13px] font-medium flex-1 mr-1 ${selectedItem ? 'text-[#1F2937]' : 'text-[#9CA3AF]'}`} numberOfLines={1}>
          {selectedItem ? selectedItem.label : placeholder}
        </Text>
        {visible ? (
          <ArrowUp2 size={14} color="#9CA3AF" variant="Linear" />
        ) : (
          <ArrowDown2 size={14} color="#9CA3AF" variant="Linear" />
        )}
      </TouchableOpacity>

      {visible && (
        <View style={styles.dropdownContainer}>
          <ScrollView nestedScrollEnabled showsVerticalScrollIndicator={false}>
            {options.map((item, index) => (
              <TouchableOpacity
                key={item.value}
                style={[
                  styles.option,
                  index !== options.length - 1 && styles.optionBorder
                ]}
                onPress={() => handleSelect(item.value)}
              >
                <Text className={`text-[13px] ${item.value === value ? 'text-[#F67300] font-semibold' : 'text-[#4B5563]'}`}>
                  {item.label}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  dropdownContainer: {
    position: 'absolute',
    top: 42,
    left: 0,
    right: 0,
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    maxHeight: 160,
    zIndex: 1000,
  },
  option: {
    paddingVertical: 10,
    paddingHorizontal: 12,
  },
  optionBorder: {
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
  },
});
