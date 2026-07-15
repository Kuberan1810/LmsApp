import { Redirect } from 'expo-router';

export default function Index() {
    // Redirect to the student dashboard automatically
    return <Redirect href="/(student)/dashboard/dashboard" />;
}