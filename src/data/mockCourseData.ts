export const COURSE_DATA = {
  id: 'AM101',
  title: 'AM101- AI / ML Frontier AI Engineer',
  description: 'The AI / ML Frontier AI Engineer course is designed to equip learners with the skills required to build, deploy, and scale real-world AI and machine learning solutions.',
  instructor: {
    initials: 'E',
    name: 'Ed Donner',
    role: 'Lead AI Instructor',
  },
  missedClassAlert: 'You Missed the Live class on Jan 02, 05:30 PM',
  modules: [
    {
      id: 0,
      title: 'Module 3 : Frontier AI Systems & Deployment',
      lessons: [
        { id: '3-5', title: '3.5 AI safety & real-world use cases', status: 'future', link: '/courses/lesson/3-5' },
        { id: '3-4', title: '3.4 AI Agents (LangChain, CrewAI, AutoGen)', status: 'past', hasRecording: true, hasAssignment: true, link: '/courses/lesson/3-4' },
        { id: '3-3', title: '3.3 Tool-using autonomous agents', status: 'past', hasRecording: true, hasAssignment: true, link: '/courses/lesson/3-3' },
        { id: '3-2', title: '3.2 API & Web App integration (FastAPI/Flask)', status: 'past', hasRecording: true, link: '/courses/lesson/3-2' },
        { id: '3-1', title: '3.1 Model deployment & basics of MLOps', status: 'past', hasRecording: true, link: '/courses/lesson/3-1' },
      ],
    },
    {
      id: 1,
      title: 'Module 2 : Generative AI & LLM Engineering',
      lessons: [],
    },
    {
      id: 2,
      title: 'Module 1 : AI & ML Foundations',
      lessons: [],
    },
  ],
  resources: [
    { id: 1, title: 'Agent Architecture.pdf', size: '2.4MB' },
    { id: 2, title: 'Agent Architecture.pdf', size: '2.4MB' },
    { id: 3, title: 'Agent Architecture.pdf', size: '2.4MB' },
    { id: 4, title: 'Agent Architecture.pdf', size: '2.4MB' },
  ],
  faqs: [
    {
      q: 'What is this course about?',
      a: 'This course focuses on building, deploying, and scaling real-world AI/ML and Generative AI systems. It covers the complete AI lifecycle—from fundamentals to production-ready applications.'
    },
    {
      q: 'What tools and technologies are covered in this course?',
      a: 'We cover Python, LangChain, CrewAI, AutoGen, vector databases, FastAPI, and more.'
    },
    {
      q: 'What skills will I gain by the end of this course?',
      a: 'You will be able to design, build, and deploy robust AI applications and autonomous agents.'
    }
  ],
  assignments: [
    { id: 1, title: 'Build Q&A system using RAG', dueDate: '2 Jan', status: 'Completed' },
    { id: 2, title: 'Build Q&A system using RAG', dueDate: '2 Jan', status: 'Completed' },
    { id: 3, title: 'Build Q&A system using RAG', dueDate: '2 Jan', status: 'Completed' },
  ],
  courseInfo: {
    duration: '12 weeks',
    students: '1,240 Students',
    status: 'Active',
  }
};
