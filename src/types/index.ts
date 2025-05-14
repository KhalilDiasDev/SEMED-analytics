export interface Student {
  id: string;
  name: string;
  grade: string;
  school: string;
  gender: 'male' | 'female' | 'other';
  performanceData: SubjectPerformance[];
  attendance: number; // percentage
  specialNeeds?: {
    diagnosis: string;
    hasSpecializedSupport: boolean;
  };
}

export interface SubjectPerformance {
  subject: string;
  score: number;
  semester: string;
  year: number;
}

export interface Teacher {
  id: string;
  name: string;
  qualification: string;
  experience: number;
  subjects: string[];
  schoolId: string;
  graduationYear: number;
  teachingMethods: string[];
  evaluationMethods: string[];
  turnoverRate?: number;
}

export interface School {
  id: string;
  name: string;
  location: string;
  infrastructure: Infrastructure;
  totalStudents: number;
  region: string;
  educationalPrograms: string[];
  mealProgram: {
    available: boolean;
    quality: 'poor' | 'adequate' | 'good' | 'excellent';
    mealsPerDay: number;
  };
  teacherTurnoverRate: number;
}

export interface Infrastructure {
  hasLibrary: boolean;
  hasLaboratory: boolean;
  hasInternet: boolean;
  hasComputerLab: boolean;
  hasCafeteria: boolean;
  hasSportsField: boolean;
  hasAirConditioning: boolean;
  hasAccessibility: boolean;
  hasRecreationArea: boolean;
  condition: 'poor' | 'adequate' | 'good' | 'excellent';
  maintenanceStatus: 'poor' | 'adequate' | 'good' | 'excellent';
  lighting: 'poor' | 'adequate' | 'good' | 'excellent';
  furniture: 'poor' | 'adequate' | 'good' | 'excellent';
}

export interface SocioeconomicFactor {
  region: string;
  averageIncome: number;
  unemploymentRate: number;
  accessToTechnology: number;
  transportQuality: 'poor' | 'adequate' | 'good' | 'excellent';
}

export interface PerformanceAnalytics {
  averageScore: number;
  medianScore: number;
  topPerformers: number;
  lowPerformers: number;
  performanceTrend: 'decreasing' | 'stable' | 'increasing';
  correlations: {
    infrastructureImpact: number;
    teacherQualificationImpact: number;
    attendanceImpact: number;
    socioeconomicImpact: number;
  };
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'viewer';
}