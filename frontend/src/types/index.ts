export interface Student {
  id: string;
  name: string;
  email: string;
  grade: string;
  enrollmentDate: string;
  avatar?: string;
  performance: {
    gpa: number;
    attendance: number;
    assignments: number;
  };
}

export interface Teacher {
  id: string;
  name: string;
  email: string;
  subject: string;
  experience: number;
  avatar?: string;
  classes: string[];
}

export interface Class {
  id: string;
  name: string;
  teacher: string;
  students: string[];
  schedule: string;
  room: string;
  capacity: number;
}

export interface Performance {
  studentId: string;
  studentName: string;
  grade: string;
  gpa: number;
  attendance: number;
  assignments: number;
  lastActivity: string;
}

export interface User {
  id: string;
  email: string;
  name: string;
  role: 'student' | 'teacher' | 'admin';
  avatar?: string;
}

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
}