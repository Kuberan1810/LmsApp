import Header from '@/components/Student/Header';
import ProfileScreenCard, { MenuItemData, UserProfileData } from '@/features/student/profile/ProfileScreenCard';
import { router, useRouter } from 'expo-router';
import { Calendar, InfoCircle, Logout, MessageQuestion, NotificationBing, Setting2, User } from 'iconsax-react-native';
import React from 'react';
import { ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function InstructorProfile() {
    const routerHook = useRouter();

    const user: UserProfileData = {
        name: 'Instructor Name',
        email: 'instructor@gmail.com',
        image: '',
    };
    
    const menuItems: MenuItemData[] = [
        {
            id: 1,
            label: 'My Profile',
            icon: <User size={24} color="#4B5563" variant="Linear" />,
            onPress: () => console.log('My Profile'),
        },
        {
            id: 2,
            label: 'Attendance',
            icon: <Calendar size={24} color="#4B5563" variant="Linear" />,
            onPress: () => console.log('Attendance'),
        },
        {
            id: 3,
            label: 'Notifications',
            icon: <NotificationBing size={24} color="#4B5563" variant="Linear" />,
            badgeCount: 2,
            onPress: () => routerHook.push('/(instructor)/notification/notification' as any),
        },
        {
            id: 4,
            label: 'Settings',
            icon: <Setting2 size={24} color="#4B5563" variant="Linear" />,
            onPress: () => routerHook.push('/(instructor)/profile/settings' as any),
        },
        {
            id: 5,
            label: 'FAQ',
            icon: <MessageQuestion size={24} color="#4B5563" variant="Linear" />,
            onPress: () => console.log('FAQ'),
        },
        {
            id: 6,
            label: 'About App',
            icon: <InfoCircle size={24} color="#4B5563" variant="Linear" />,
            onPress: () => console.log('About App'),
        },
        {
            id: 7,
            label: 'Logout',
            icon: <Logout size={24} color="#EF4444" variant="Linear" />,
            isLogout: true,
        },
    ];

    const handleLogoutConfirm = () => {
        router.replace('/(auth)/login');
    };

    return (
        <SafeAreaView className="flex-1 bg-white" edges={['top', 'left', 'right']}>
            <Header
                title="Profile"
                onBackPress={() => routerHook.back()}
                showProfile={false}
                showSearch={false}
                showNotification={false}
                titleAlign='center'
            />

            <ScrollView
                className="flex-1"
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{ paddingBottom: 100 }}
            >
                <ProfileScreenCard 
                    user={user} 
                    menuItems={menuItems} 
                    onLogoutConfirm={handleLogoutConfirm}
                />
            </ScrollView>
        </SafeAreaView>
    );
}
