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
  acessibilidade: boolean;
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
  escola: string;
  componente_curricular: string;
  etapa: string;
  previstos: number;
  avaliados: number;
  participacao: number;
  defasagem: number;
  aprendizado_intermediario: number;
  aprendizado_adequado: number;
  acerto_total: number;
  h01: number;
  h02: number;
  h03: number;
  h04: number;
  h05: number;
  h06: number;
  h07: number;
  h08: number;
  h09: number;
  h10: number;
  h11: number;
  h12: number;
  h13: number;
  h14: number;
  h15: number;
  h16: number;
  h17: number;
  h18: number;
  h19: number;
  h20: number;
  h21: number;
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