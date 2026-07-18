import React from 'react';
import EnrollCourseCard from '../../../components/Student/EnrollCourseCard';

type CourseCardProps = {
  title: string;
  duration: string;
  lessons: string;
  bgColorClass: string;
  onPress?: () => void;
};

export const CourseCard = ({ title, duration, lessons, bgColorClass, onPress }: CourseCardProps) => {
  return (
    <EnrollCourseCard
      course={{
        name: title,
        duration: duration,
        lessons: lessons,
        bgColor: bgColorClass,
        textColor: 'text-slate-800',
      }}
      onCoursePress={onPress}
    />
  );
};
