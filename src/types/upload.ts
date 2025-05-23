// types/upload.ts
export type FileType = 'school' | 'performance' | 'teachers';
export type UploadStatus = 'idle' | 'processing' | 'success' | 'error';

export interface FileState {
  type: FileType;
  name: string;
  status: UploadStatus;
  message?: string;
  data?: any[];
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

export interface PerformanceData {
  codigo_escola: string;
  codigo_habilidade: string;
  componente_curricular: string;
  descricao_habilidade: string;
  percentual_acertos: number;
}

export interface ValidationResult {
  valid: boolean;
  message: string;
}