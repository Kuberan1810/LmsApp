import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, StyleSheet, LayoutAnimation, Platform, UIManager } from 'react-native';
import { ChevronDown, ChevronUp } from 'lucide-react-native';

if (Platform.OS === 'android' && UIManager.setLayoutAnimationEnabledExperimental) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

interface CustomDropdownProps {
  value: string;
  onChange: (value: string) => void;
  options: { label: string; value: string }[];
  placeholder?: string;
}

export default function CustomDropdown({ value, onChange, options, placeholder = 'Select...' }: CustomDropdownProps) {
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
        className="bg-[#FAFAFA] border border-[#F3F4F6] rounded-xl flex-row items-center justify-between px-4 py-3.5"
      >
        <Text className={`text-base flex-1 ${selectedItem ? 'text-[#1F2937]' : 'text-[#D1D5DB]'}`}>
          {selectedItem ? selectedItem.label : placeholder}
        </Text>
        {visible ? (
          <ChevronUp size={20} color="#9CA3AF" />
        ) : (
          <ChevronDown size={20} color="#9CA3AF" />
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
                <Text
                  style={[
                    styles.optionText,
                    value === item.value && styles.selectedOptionText
                  ]}
                >
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
    top: 50,
    zIndex: 1000,
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#F3F4F6',
    width: '100%',
    maxHeight: 200,
    marginTop: 8,
    overflow: 'hidden',
  },
  option: {
    paddingVertical: 14,
    paddingHorizontal: 16,
  },
  optionBorder: {
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
  },
  optionText: {
    fontSize: 15,
    color: '#374151',
  },
  selectedOptionText: {
    color: '#000000',
    fontWeight: '600',
  },
});
