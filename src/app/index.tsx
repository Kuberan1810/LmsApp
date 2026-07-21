import { Redirect } from 'expo-router';
import React from 'react';

export default function Index() {

    // Redirect to the onboarding page initially
    return <Redirect href="/(instructor)/dashboard/dashboard" />;

}