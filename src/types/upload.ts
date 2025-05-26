// types/upload.ts
export type FileType = 'school' | 'performance' | 'teachers';
export type UploadStatus = 'idle' | 'processing' | 'success' | 'error';

// types/upload.ts
export interface FileState {
  type: FileType;
  name: string;
  status: 'processing' | 'success' | 'error';
  message?: string;
  data?: unknown[];
  skippedSchools?: string[]; // Adicione esta linha
}
export interface SchoolData {
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

// types/upload.ts - Adicione/substitua o tipo PerformanceData

export interface PerformanceData {
  escola: string;
  componente_curricular: string;
  etapa: string;
  previstos: number;
  avaliados: number;
  participacao: number;
  defasagem: number;
  aprendizado_intermediario: number;
  aprendizado_adequado: number;
  /* acerto_total: number; */
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
export interface ValidationResult {
  valid: boolean;
  message: string;
}
