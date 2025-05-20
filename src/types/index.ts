// Type definitions for the application

export interface School {
  id: string;
  name: string;
  code: string;
  hasInternet: boolean;
  hasLibrary: boolean;
  hasLaboratory: boolean;
  hasComputerLab: boolean;
  region: string;
  city: string;
  state: string;
  averagePerformance: number;
  numberOfStudents: number;
  performanceBySkill: SkillPerformance[];
  infrastructure: Infrastructure;
}

export interface Infrastructure {
  portugueseTeachers: number;
  mathTeachers: number;
  scienceTeachers: number;
  lastRenovationYear: number;
  availableCourts: number;
  libraryFunctional: boolean;
  computerLabFunctional: boolean;
  studentInternet: boolean;
  mobileProjects: boolean;
  teacherShortage: boolean;
  airConditioned: boolean;
  adequateLighting: boolean;
  waterFountains: boolean;
  accessibilityLevel: 'Nenhuma' | 'Mediana' | 'Alta';
  hasProjects: boolean;
  hasRecreationAreas: boolean;
  shiftPerformanceDifference: boolean;
}

export interface SkillPerformance {
  skillId: string;
  skillCode: string;
  subject: 'math' | 'portuguese' | 'science' | 'history' | 'geography';
  description: string;
  percentCorrect: number;
  participationRate: number;
  totalStudents: number;
  evaluatedStudents: number;
}

export interface PerformanceIndicator {
  title: string;
  value: number;
  previousValue: number;
  unit: string;
  trend: 'up' | 'down' | 'neutral';
}

export interface InfrastructureData {
  label: string;
  value: number;
  color: string;
}

export interface PerformanceBySubject {
  subject: string;
  performance: number;
  color: string;
}

export interface RegionData {
  name: string;
  performance: number;
}

export interface ComparisonData {
  factor: string;
  school1Value: number;
  school2Value: number;
}