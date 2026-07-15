import { Redirect } from 'expo-router';

export default function Index() {
    // Redirect to the login page initially
    return <Redirect href="/(auth)/login" />;
}