import { Tabs } from 'expo-router';
import { CalendarTick, ClipboardText, DocumentText, DocumentText1, Home2, NoteText, Profile } from 'iconsax-react-native';
import React from 'react';

export default function StudentLayout() {
  return (
    <Tabs screenOptions={{ tabBarActiveTintColor: '#F67300', headerShown: false }}>
      <Tabs.Screen
        name="dashboard/dashboard"
        options={{
          title: 'Dashboard',
          tabBarIcon: ({ color, focused }) => <Home2 size={24} color={color as string} variant={focused ? "Bold" : "Linear"} />,
        }}
      />
      <Tabs.Screen
        name="courses/courses"
        options={{
          title: 'Courses',
           tabBarIcon: ({ color, focused }) => focused ? <DocumentText size={24} color={color as string} variant="Bold" /> : <DocumentText1 size={24} color={color as string} variant="Linear" />,
        }}
      />
      <Tabs.Screen
        name="assignments/assignments"
        options={{
          title: 'Assignments',
          tabBarIcon: ({ color, focused }) => <NoteText size={24} color={color as string} variant={focused ? "Bold" : "Linear"} />,
        }}
      />
      <Tabs.Screen
        name="attendance/attendance"
        options={{
          title: 'Attendance',
          tabBarIcon: ({ color, focused }) => <CalendarTick size={24} color={color as string} variant={focused ? "Bold" : "Linear"} />,
        }}
      />
      <Tabs.Screen
        name="tests/tests"
        options={{
          title: 'Tests',
          tabBarIcon: ({ color, focused }) => <ClipboardText size={24} color={color as string} variant={focused ? "Bold" : "Linear"} />,
        }}
      />
      <Tabs.Screen
        name="profile/profile"
        options={{
          href: null,
          title: 'Profile',
          tabBarIcon: ({ color, focused }) => <Profile size={24} color={color as string} variant={focused ? "Bold" : "Linear"} />,
        }}
      />
      <Tabs.Screen
        name="courses/[id]"
        options={{ href: null }}
      />
      <Tabs.Screen
        name="courses/lesson/[id]"
        options={{ href: null }}
      />
      <Tabs.Screen
        name="courses/recording/[id]"
        options={{ href: null }}
      />
    </Tabs>
  );
}