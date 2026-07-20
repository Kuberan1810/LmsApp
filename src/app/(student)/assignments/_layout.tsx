import { Stack } from 'expo-router';

export default function AssignmentsLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="index" />
      <Stack.Screen name="[id]" />
      <Stack.Screen name="submit/[id]" />
      <Stack.Screen name="view/[id]" />
    </Stack>
  );
}
