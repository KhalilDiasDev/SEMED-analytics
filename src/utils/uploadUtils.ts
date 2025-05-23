// utils/uploadUtils.ts
import { SchoolData, PerformanceData, ValidationResult } from '../types/upload';

// Utilitários de conversão
export const parseBoolean = (value: string): boolean => {
  const lowercaseValue = value.toLowerCase().trim();
  return lowercaseValue === 'true' || lowercaseValue === 'sim' || lowercaseValue === '1' || lowercaseValue === 's';
};

export const parseNumber = (value: string): number => {
  const parsed = parseFloat(value);
  return isNaN(parsed) ? 0 : parsed;
};

// Processamento de dados das escolas
export const processSchoolData = (data: any[]): SchoolData[] => {
  return data.map(row => ({
    nome: row.nome || '',
    profe_lingua_portuguesa: parseNumber(row.profe_lingua_portuguesa),
    profe_matematica: parseNumber(row.profe_matematica),
    profe_ciencias: parseNumber(row.profe_ciencias),
    ano_da_ultima_reforma: parseNumber(row.ano_da_ultima_reforma),
    n_de_quadras_disponiveis: parseNumber(row.n_de_quadras_disponiveis),
    biblioteca: parseBoolean(row.biblioteca),
    lab_info: parseBoolean(row.lab_info),
    acess_internet: parseBoolean(row.acess_internet),
    projetos_usam_celular: parseBoolean(row.projetos_usam_celular),
    carencia_de_professor: parseBoolean(row.carencia_de_professor),
    ar_condicionado: parseBoolean(row.ar_condicionado),
    iluminacao: parseBoolean(row.iluminacao),
    bebedouro: parseBoolean(row.bebedouro),
    acessibilidade: row.acessibilidade || '',
    projetos_externos: parseBoolean(row.projetos_externos),
    areas_recreativas: parseBoolean(row.areas_recreativas),
    dif_rendimento_entre_turnos: parseBoolean(row.dif_rendimento_entre_turnos),
  }));
};

// Processamento de dados de desempenho
export const processPerformanceData = (data: any[]): PerformanceData[] => {
  return data.map(row => ({
    codigo_escola: row.codigo_escola || '',
    codigo_habilidade: row.codigo_habilidade || '',
    componente_curricular: row.componente_curricular || '',
    descricao_habilidade: row.descricao_habilidade || '',
    percentual_acertos: parseNumber(row.percentual_acertos),
  }));
};

// Validação de dados das escolas
export const validateSchoolData = (data: unknown[]): ValidationResult => {
  if (!data || data.length === 0) {
    return { valid: false, message: 'O arquivo está vazio ou não contém dados válidos.' };
  }
  
  const requiredColumns = [
    'nome', 'profe_lingua_portuguesa', 'profe_matematica', 'profe_ciencias',
    'ano_da_ultima_reforma', 'n_de_quadras_disponiveis', 'biblioteca', 'lab_info',
    'acess_internet', 'projetos_usam_celular', 'carencia_de_professor', 'ar_condicionado',
    'iluminacao', 'bebedouro', 'acessibilidade', 'projetos_externos',
    'areas_recreativas', 'dif_rendimento_entre_turnos'
  ];
  
  const columns = Object.keys(data[0]);
  const lowerCaseColumns = columns.map(col => col.toLowerCase().trim());
  
  const missingColumns = requiredColumns.filter(
    col => !lowerCaseColumns.includes(col.toLowerCase())
  );
  
  if (missingColumns.length > 0) {
    return {
      valid: false,
      message: `Colunas obrigatórias ausentes: ${missingColumns.join(', ')}`
    };
  }
  
  return { valid: true, message: 'Arquivo válido. Dados prontos para processamento.' };
};

// Validação de dados de desempenho
export const validatePerformanceData = (data: unknown[]): ValidationResult => {
  if (!data || data.length === 0) {
    return { valid: false, message: 'O arquivo está vazio ou não contém dados válidos.' };
  }
  
  const requiredColumns = [
    'codigo_escola', 'codigo_habilidade', 'componente_curricular',
    'descricao_habilidade', 'percentual_acertos'
  ];
  
  const columns = Object.keys(data[0]);
  const lowerCaseColumns = columns.map(col => col.toLowerCase().trim());
  
  const missingColumns = requiredColumns.filter(
    col => !lowerCaseColumns.includes(col.toLowerCase())
  );
  
  if (missingColumns.length > 0) {
    return {
      valid: false,
      message: `Colunas obrigatórias ausentes: ${missingColumns.join(', ')}`
    };
  }
  
  return { valid: true, message: 'Arquivo válido. Dados prontos para processamento.' };
};