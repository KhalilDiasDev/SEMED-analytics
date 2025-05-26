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

// Função para processar percentuais (remove % se existir)
export const parsePercentage = (value: string): number => {
  if (!value) return 0;
  const cleanValue = value.toString().replace('%', '').trim();
  const parsed = parseFloat(cleanValue);
  return isNaN(parsed) ? 0 : parsed;
};

// Função para normalizar nomes de escolas (remove acentos, espaços extras, etc.)
export const normalizeSchoolName = (name: string): string => {
  return name
    .toLowerCase()
    .trim()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '') // Remove acentos
    .replace(/\s+/g, ' '); // Remove espaços extras
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

// Processamento de dados de desempenho com filtro por escolas existentes
export const processPerformanceData = (
  data: any[], 
  existingSchools: SchoolData[]
): { processedData: PerformanceData[], skippedSchools: string[] } => {
  
  // Criar um Set com os nomes normalizados das escolas existentes para busca rápida
  const existingSchoolNames = new Set(
    existingSchools.map(school => normalizeSchoolName(school.nome))
  );
  
  const processedData: PerformanceData[] = [];
  const skippedSchools: string[] = [];
  const uniqueSkippedSchools = new Set<string>();
  
  data.forEach(row => {
    const schoolName = row.Escola || row.escola || '';
    const normalizedSchoolName = normalizeSchoolName(schoolName);
    
    // Verifica se a escola existe na tabela de escolas
    if (existingSchoolNames.has(normalizedSchoolName)) {
      processedData.push({
        escola: schoolName,
        componente_curricular: row['Componente Curricular'] || row.componente_curricular || '',
        etapa: row.Etapa || row.etapa || '',
        previstos: parseNumber(row.Previstos || row.previstos),
        avaliados: parseNumber(row.Avaliados || row.avaliados),
        participacao: parsePercentage(row['% Participação'] || row.participacao),
        defasagem: parsePercentage(row.Defasagem || row.defasagem),
        aprendizado_intermediario: parsePercentage(row['Aprendizado intermediário'] || row.aprendizado_intermediario),
        aprendizado_adequado: parsePercentage(row['Aprendizado adequado'] || row.aprendizado_adequado),
        acerto_total: parsePercentage(row['Acerto Total'] || row.acerto_total),
        h01: parsePercentage(row['H 01 (%)'] || row.h01),
        h02: parsePercentage(row['H 02 (%)'] || row.h02),
        h03: parsePercentage(row['H 03 (%)'] || row.h03),
        h04: parsePercentage(row['H 04 (%)'] || row.h04),
        h05: parsePercentage(row['H 05 (%)'] || row.h05),
        h06: parsePercentage(row['H 06 (%)'] || row.h06),
        h07: parsePercentage(row['H 07 (%)'] || row.h07),
        h08: parsePercentage(row['H 08 (%)'] || row.h08),
        h09: parsePercentage(row['H 09 (%)'] || row.h09),
        h10: parsePercentage(row['H 10 (%)'] || row.h10),
        h11: parsePercentage(row['H 11 (%)'] || row.h11),
        h12: parsePercentage(row['H 12 (%)'] || row.h12),
        h13: parsePercentage(row['H 13 (%)'] || row.h13),
        h14: parsePercentage(row['H 14 (%)'] || row.h14),
        h15: parsePercentage(row['H 15 (%)'] || row.h15),
        h16: parsePercentage(row['H 16 (%)'] || row.h16),
        h17: parsePercentage(row['H 17 (%)'] || row.h17),
        h18: parsePercentage(row['H 18 (%)'] || row.h18),
        h19: parsePercentage(row['H 19 (%)'] || row.h19),
        h20: parsePercentage(row['H 20 (%)'] || row.h20),
        h21: parsePercentage(row['H 21 (%)'] || row.h21),
      });
    } else {
      // Adiciona escola não encontrada à lista de escolas ignoradas
      if (schoolName && !uniqueSkippedSchools.has(schoolName)) {
        uniqueSkippedSchools.add(schoolName);
        skippedSchools.push(schoolName);
      }
    }
  });
  
  return { processedData, skippedSchools };
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

// Validação de dados de desempenho com verificação de escolas existentes
export const validatePerformanceData = (
  data: unknown[], 
  existingSchools?: SchoolData[]
): ValidationResult & { schoolsValidation?: { total: number, existing: number, missing: string[] } } => {
  if (!data || data.length === 0) {
    return { valid: false, message: 'O arquivo está vazio ou não contém dados válidos.' };
  }
  
  const requiredColumns = [
    "Escola", "Componente Curricular", "Etapa", "Previstos", "Avaliados", 
    "% Participação", "Defasagem", "Aprendizado intermediário", "Aprendizado adequado",
    "Acerto Total", "H 01 (%)", "H 02 (%)", "H 03 (%)", "H 04 (%)", "H 05 (%)",
    "H 06 (%)", "H 07 (%)", "H 08 (%)", "H 09 (%)", "H 10 (%)", "H 11 (%)",
    "H 12 (%)", "H 13 (%)", "H 14 (%)", "H 15 (%)", "H 16 (%)", "H 17 (%)",
    "H 18 (%)", "H 19 (%)", "H 20 (%)", "H 21 (%)"
  ];
  
  const columns = Object.keys(data[0] as object);
  
  const missingColumns = requiredColumns.filter(
    col => !columns.includes(col)
  );
  
  if (missingColumns.length > 0) {
    return {
      valid: false,
      message: `Colunas obrigatórias ausentes: ${missingColumns.join(', ')}`
    };
  }
  
  // Se as escolas existentes foram fornecidas, valida também quais escolas serão processadas
  if (existingSchools) {
    const existingSchoolNames = new Set(
      existingSchools.map(school => normalizeSchoolName(school.nome))
    );
    
    const uniqueSchoolsInData = new Set<string>();
    const missingSchools: string[] = [];
    
    data.forEach((row: any) => {
      const schoolName = row.Escola || row.escola || '';
      if (schoolName) {
        uniqueSchoolsInData.add(schoolName);
        
        const normalizedName = normalizeSchoolName(schoolName);
        if (!existingSchoolNames.has(normalizedName) && !missingSchools.includes(schoolName)) {
          missingSchools.push(schoolName);
        }
      }
    });
    
    const existingCount = uniqueSchoolsInData.size - missingSchools.length;
    
    return {
      valid: true,
      message: `Arquivo válido. ${existingCount} escolas serão processadas, ${missingSchools.length} escolas serão ignoradas.`,
      schoolsValidation: {
        total: uniqueSchoolsInData.size,
        existing: existingCount,
        missing: missingSchools
      }
    };
  }
  
  return { valid: true, message: 'Arquivo válido. Dados prontos para processamento.' };
};