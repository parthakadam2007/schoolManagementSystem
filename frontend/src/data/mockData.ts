import { Student, Teacher, Class, Performance } from '../types';

export const mockStudents: Student[] = [
  {
    id: '1',
    name: 'Emma Johnson',
    email: 'emma.johnson@school.edu',
    grade: '10th',
    enrollmentDate: '2024-01-15',
    avatar: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop',
    performance: {
      gpa: 3.8,
      attendance: 95,
      assignments: 88
    }
  },
  {
    id: '2',
    name: 'Michael Chen',
    email: 'michael.chen@school.edu',
    grade: '11th',
    enrollmentDate: '2024-01-20',
    avatar: 'https://images.pexels.com/photos/1043471/pexels-photo-1043471.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop',
    performance: {
      gpa: 3.9,
      attendance: 92,
      assignments: 95
    }
  },
  {
    id: '3',
    name: 'Sarah Williams',
    email: 'sarah.williams@school.edu',
    grade: '9th',
    enrollmentDate: '2024-02-01',
    avatar: 'https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop',
    performance: {
      gpa: 3.6,
      attendance: 98,
      assignments: 85
    }
  }
];

export const mockTeachers: Teacher[] = [
  {
    id: '1',
    name: 'Dr. Robert Smith',
    email: 'robert.smith@school.edu',
    subject: 'Mathematics',
    experience: 15,
    avatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop',
    classes: ['Math 101', 'Algebra II', 'Calculus']
  },
  {
    id: '2',
    name: 'Prof. Lisa Davis',
    email: 'lisa.davis@school.edu',
    subject: 'English Literature',
    experience: 12,
    avatar: 'https://images.pexels.com/photos/1181424/pexels-photo-1181424.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop',
    classes: ['English 101', 'Creative Writing', 'Literature']
  },
  {
    id: '3',
    name: 'Mr. James Wilson',
    email: 'james.wilson@school.edu',
    subject: 'Science',
    experience: 8,
    avatar: 'https://images.pexels.com/photos/1040880/pexels-photo-1040880.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop',
    classes: ['Biology', 'Chemistry', 'Physics']
  }
];

export const mockClasses: Class[] = [
  {
    id: '1',
    name: 'Mathematics 101',
    teacher: 'Dr. Robert Smith',
    students: ['1', '2', '3'],
    schedule: 'Mon, Wed, Fri - 9:00 AM',
    room: 'Room 205',
    capacity: 30
  },
  {
    id: '2',
    name: 'English Literature',
    teacher: 'Prof. Lisa Davis',
    students: ['1', '3'],
    schedule: 'Tue, Thu - 10:30 AM',
    room: 'Room 108',
    capacity: 25
  },
  {
    id: '3',
    name: 'Biology',
    teacher: 'Mr. James Wilson',
    students: ['2'],
    schedule: 'Mon, Wed - 2:00 PM',
    room: 'Lab 301',
    capacity: 20
  }
];

export const mockPerformance: Performance[] = [
  {
    studentId: '1',
    studentName: 'Emma Johnson',
    grade: '10th',
    gpa: 3.8,
    attendance: 95,
    assignments: 88,
    lastActivity: '2025-01-08'
  },
  {
    studentId: '2',
    studentName: 'Michael Chen',
    grade: '11th',
    gpa: 3.9,
    attendance: 92,
    assignments: 95,
    lastActivity: '2025-01-07'
  },
  {
    studentId: '3',
    studentName: 'Sarah Williams',
    grade: '9th',
    gpa: 3.6,
    attendance: 98,
    assignments: 85,
    lastActivity: '2025-01-08'
  }
];