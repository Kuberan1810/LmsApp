import { Stack } from 'expo-router';

export default function CoursesLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="index" />
      <Stack.Screen name="tests" />
      <Stack.Screen name="assignments" />
      <Stack.Screen name="chapters" />
      <Stack.Screen name="review" />
    </Stack>
  );
}

