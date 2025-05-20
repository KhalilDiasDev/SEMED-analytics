// Type definitions for the application

export interface School {
  nome: string;
  profe_lingua_portuguesa: number;
  profe_matematica: number;
  profe_ciencias: number;
  ano_da_ultima_reforma: number;
  n_de_quadras_disponiveis: number;
  biblioteca: boolean;
  lab_info: boolean;
  acess_internet: boolean;
  projetos_usam_celular: boolean;
  carencia_de_professor: boolean;
  ar_condicionado: boolean;
  iluminacao: boolean;
  bebedouro: boolean;
  acessibilidade: string;
  projetos_externos: boolean;
  areas_recreativas: boolean;
  dif_rendimento_entre_turnos: boolean;
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