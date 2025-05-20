import { School, PerformanceIndicator, InfrastructureData, PerformanceBySubject, RegionData } from '../types';

// Mock school data
export const schools: School[] = [
  {
    id: '1',
    name: 'Escola Municipal Maria da Silva',
    code: 'EM001',
    hasInternet: true,
    hasLibrary: true,
    hasLaboratory: false,
    hasComputerLab: true,
    region: 'Norte',
    city: 'Manaus',
    state: 'AM',
    averagePerformance: 72.8,
    numberOfStudents: 520,
    performanceBySkill: [
      {
        skillId: '1',
        skillCode: 'H01',
        subject: 'math',
        description: 'Resolver situações-problema envolvendo números naturais.',
        percentCorrect: 75.2
      },
      {
        skillId: '2',
        skillCode: 'H02',
        subject: 'math',
        description: 'Reconhecer a representação decimal de medida de comprimento.',
        percentCorrect: 68.7
      },
      {
        skillId: '3',
        skillCode: 'H03',
        subject: 'portuguese',
        description: 'Identificar elementos da narrativa em textos.',
        percentCorrect: 82.3
      }
    ]
  },
  {
    id: '2',
    name: 'Escola Estadual José Pereira',
    code: 'EE002',
    hasInternet: true,
    hasLibrary: true,
    hasLaboratory: true,
    hasComputerLab: true,
    region: 'Sudeste',
    city: 'São Paulo',
    state: 'SP',
    averagePerformance: 81.5,
    numberOfStudents: 830,
    performanceBySkill: [
      {
        skillId: '1',
        skillCode: 'H01',
        subject: 'math',
        description: 'Resolver situações-problema envolvendo números naturais.',
        percentCorrect: 84.7
      },
      {
        skillId: '2',
        skillCode: 'H02',
        subject: 'math',
        description: 'Reconhecer a representação decimal de medida de comprimento.',
        percentCorrect: 79.4
      },
      {
        skillId: '3',
        skillCode: 'H03',
        subject: 'portuguese',
        description: 'Identificar elementos da narrativa em textos.',
        percentCorrect: 85.3
      }
    ]
  },
  {
    id: '3',
    name: 'Colégio Municipal Pedro Santos',
    code: 'CM003',
    hasInternet: false,
    hasLibrary: true,
    hasLaboratory: false,
    hasComputerLab: false,
    region: 'Nordeste',
    city: 'Recife',
    state: 'PE',
    averagePerformance: 64.2,
    numberOfStudents: 375,
    performanceBySkill: [
      {
        skillId: '1',
        skillCode: 'H01',
        subject: 'math',
        description: 'Resolver situações-problema envolvendo números naturais.',
        percentCorrect: 58.3
      },
      {
        skillId: '2',
        skillCode: 'H02',
        subject: 'math',
        description: 'Reconhecer a representação decimal de medida de comprimento.',
        percentCorrect: 61.8
      },
      {
        skillId: '3',
        skillCode: 'H03',
        subject: 'portuguese',
        description: 'Identificar elementos da narrativa em textos.',
        percentCorrect: 72.5
      }
    ]
  },
  {
    id: '4',
    name: 'Escola Municipal Ana Luiza',
    code: 'EM004',
    hasInternet: true,
    hasLibrary: false,
    hasLaboratory: false,
    hasComputerLab: true,
    region: 'Sul',
    city: 'Porto Alegre',
    state: 'RS',
    averagePerformance: 76.9,
    numberOfStudents: 420,
    performanceBySkill: [
      {
        skillId: '1',
        skillCode: 'H01',
        subject: 'math',
        description: 'Resolver situações-problema envolvendo números naturais.',
        percentCorrect: 77.1
      },
      {
        skillId: '2',
        skillCode: 'H02',
        subject: 'math',
        description: 'Reconhecer a representação decimal de medida de comprimento.',
        percentCorrect: 74.6
      },
      {
        skillId: '3',
        skillCode: 'H03',
        subject: 'portuguese',
        description: 'Identificar elementos da narrativa em textos.',
        percentCorrect: 79.2
      }
    ]
  },
  {
    id: '5',
    name: 'Colégio Estadual Roberto Alves',
    code: 'CE005',
    hasInternet: true,
    hasLibrary: true,
    hasLaboratory: true,
    hasComputerLab: true,
    region: 'Centro-Oeste',
    city: 'Brasília',
    state: 'DF',
    averagePerformance: 79.3,
    numberOfStudents: 950,
    performanceBySkill: [
      {
        skillId: '1',
        skillCode: 'H01',
        subject: 'math',
        description: 'Resolver situações-problema envolvendo números naturais.',
        percentCorrect: 80.2
      },
      {
        skillId: '2',
        skillCode: 'H02',
        subject: 'math',
        description: 'Reconhecer a representação decimal de medida de comprimento.',
        percentCorrect: 77.9
      },
      {
        skillId: '3',
        skillCode: 'H03',
        subject: 'portuguese',
        description: 'Identificar elementos da narrativa em textos.',
        percentCorrect: 81.8
      }
    ]
  }
];

// Performance indicators for the dashboard
export const performanceIndicators: PerformanceIndicator[] = [
  {
    title: 'Média Geral',
    value: 74.9,
    previousValue: 72.3,
    unit: '%',
    trend: 'up'
  },
  {
    title: 'Escolas Analisadas',
    value: 125,
    previousValue: 100,
    unit: '',
    trend: 'up'
  },
  {
    title: 'Habilidades Acompanhadas',
    value: 24,
    previousValue: 20,
    unit: '',
    trend: 'up'
  }
];

// Infrastructure data for pie chart
export const infrastructureData: InfrastructureData[] = [
  { label: 'Internet', value: 78.4, color: '#3B82F6' },
  { label: 'Biblioteca', value: 65.6, color: '#10B981' },
  { label: 'Laboratório', value: 42.3, color: '#F59E0B' },
  { label: 'Lab. Informática', value: 58.7, color: '#8B5CF6' }
];

// Performance by subject for the bar chart
export const performanceBySubject: PerformanceBySubject[] = [
  { subject: 'Matemática', performance: 68.7, color: '#3B82F6' },
  { subject: 'Português', performance: 73.2, color: '#10B981' },
  { subject: 'Ciências', performance: 70.5, color: '#F59E0B' },
  { subject: 'História', performance: 75.8, color: '#8B5CF6' },
  { subject: 'Geografia', performance: 72.3, color: '#EC4899' }
];

// Region data for the map
export const regionData: RegionData[] = [
  { name: 'Norte', performance: 67.3 },
  { name: 'Nordeste', performance: 65.8 },
  { name: 'Centro-Oeste', performance: 72.1 },
  { name: 'Sudeste', performance: 79.4 },
  { name: 'Sul', performance: 77.5 }
];

// Function to filter schools by criteria
export const filterSchools = (
  query: string = '',
  hasInternet?: boolean,
  hasLibrary?: boolean,
  region?: string
): School[] => {
  return schools.filter(school => {
    const matchesQuery = query === '' || 
      school.name.toLowerCase().includes(query.toLowerCase()) || 
      school.code.toLowerCase().includes(query.toLowerCase());
    
    const matchesInternet = hasInternet === undefined || school.hasInternet === hasInternet;
    const matchesLibrary = hasLibrary === undefined || school.hasLibrary === hasLibrary;
    const matchesRegion = region === undefined || school.region === region;
    
    return matchesQuery && matchesInternet && matchesLibrary && matchesRegion;
  });
};

// Get a school by ID
export const getSchoolById = (id: string): School | undefined => {
  return schools.find(school => school.id === id);
};