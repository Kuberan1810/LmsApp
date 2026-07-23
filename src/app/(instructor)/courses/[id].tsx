import { useRouter, useLocalSearchParams } from 'expo-router';
import { ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

// Modular Feature Imports
import InstructorHeader from '@/components/Instructor/InstructorHeader';
import CoursesStats from '@/features/instructor/Courses/coursesStats';
import Curriculum from '@/features/instructor/Courses/Curriculum';
import ExistingResources from '@/features/instructor/Courses/ExistingResources';
import FAQ from '@/features/instructor/Courses/faq';
import UpcomingSchedule from '@/features/instructor/Courses/UpcomingSchedule';

export default function CourseDetailScreen() {
    const router = useRouter();
    const { id } = useLocalSearchParams();

    return (
        <SafeAreaView className="flex-1 bg-[#FAFAFA]" edges={['top', 'left', 'right']}>
            <InstructorHeader 
                title="Course Details" 
                onBackPress={() => router.back()} 
            />

            <ScrollView                       
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{ paddingBottom: 120 }}
            >
                {/* Stats 2x2 Grid Component */}
                <CoursesStats />

                {/* Upcoming Schedule Component */}
                <UpcomingSchedule />

                {/* Curriculum Component */}
                <Curriculum />

                {/* Frequently Asked Questions */}
                <FAQ />

                {/* Existing Resources Component */}
                <ExistingResources />

            </ScrollView>
        </SafeAreaView>
    );
}
