import { Student, Teacher, School, SocioeconomicFactor } from '../types';

export const mockStudents: Student[] = [
  {
    id: '1',
    name: 'Ana Silva',
    grade: '6th',
    school: 'Escola Municipal Paulo Freire',
    gender: 'female',
    performanceData: [
      { subject: 'Mathematics', score: 85, semester: '1st', year: 2023 },
      { subject: 'Portuguese', score: 78, semester: '1st', year: 2023 },
      { subject: 'Science', score: 92, semester: '1st', year: 2023 },
      { subject: 'History', score: 75, semester: '1st', year: 2023 },
      { subject: 'Geography', score: 80, semester: '1st', year: 2023 },
    ],
  },
  {
    id: '2',
    name: 'Pedro Santos',
    grade: '7th',
    school: 'Escola Municipal Paulo Freire',
    gender: 'male',
    performanceData: [
      { subject: 'Mathematics', score: 65, semester: '1st', year: 2023 },
      { subject: 'Portuguese', score: 72, semester: '1st', year: 2023 },
      { subject: 'Science', score: 68, semester: '1st', year: 2023 },
      { subject: 'History', score: 70, semester: '1st', year: 2023 },
      { subject: 'Geography', score: 75, semester: '1st', year: 2023 },
    ],
  },
  {
    id: '3',
    name: 'Carolina Oliveira',
    grade: '8th',
    school: 'Escola Municipal Anísio Teixeira',
    gender: 'female',
    performanceData: [
      { subject: 'Mathematics', score: 92, semester: '1st', year: 2023 },
      { subject: 'Portuguese', score: 95, semester: '1st', year: 2023 },
      { subject: 'Science', score: 88, semester: '1st', year: 2023 },
      { subject: 'History', score: 90, semester: '1st', year: 2023 },
      { subject: 'Geography', score: 93, semester: '1st', year: 2023 },
    ],
  },
  {
    id: '4',
    name: 'Marcos Souza',
    grade: '9th',
    school: 'Escola Municipal Anísio Teixeira',
    gender: 'male',
    performanceData: [
      { subject: 'Mathematics', score: 75, semester: '1st', year: 2023 },
      { subject: 'Portuguese', score: 68, semester: '1st', year: 2023 },
      { subject: 'Science', score: 72, semester: '1st', year: 2023 },
      { subject: 'History', score: 65, semester: '1st', year: 2023 },
      { subject: 'Geography', score: 70, semester: '1st', year: 2023 },
    ],
  },
  {
    id: '5',
    name: 'Juliana Costa',
    grade: '6th',
    school: 'Escola Municipal Darcy Ribeiro',
    gender: 'female',
    performanceData: [
      { subject: 'Mathematics', score: 88, semester: '1st', year: 2023 },
      { subject: 'Portuguese', score: 92, semester: '1st', year: 2023 },
      { subject: 'Science', score: 90, semester: '1st', year: 2023 },
      { subject: 'History', score: 85, semester: '1st', year: 2023 },
      { subject: 'Geography', score: 87, semester: '1st', year: 2023 },
    ],
  },
];

export const mockTeachers: Teacher[] = [
  {
    id: '1',
    name: 'Roberto Mendes',
    qualification: 'Master in Mathematics',
    experience: 12,
    subjects: ['Mathematics'],
    schoolId: '1',
  },
  {
    id: '2',
    name: 'Carla Nunes',
    qualification: 'Bachelor in Portuguese Literature',
    experience: 8,
    subjects: ['Portuguese'],
    schoolId: '1',
  },
  {
    id: '3',
    name: 'Fernando Azevedo',
    qualification: 'PhD in Chemistry',
    experience: 15,
    subjects: ['Science'],
    schoolId: '2',
  },
  {
    id: '4',
    name: 'Mariana Lima',
    qualification: 'Bachelor in History',
    experience: 5,
    subjects: ['History', 'Geography'],
    schoolId: '2',
  },
  {
    id: '5',
    name: 'Paulo César',
    qualification: 'Master in Education',
    experience: 20,
    subjects: ['Mathematics', 'Science'],
    schoolId: '3',
  },
];

export const mockSchools: School[] = [
  {
    id: '1',
    name: 'Escola Municipal Paulo Freire',
    location: 'São Paulo - Capital',
    infrastructure: {
      hasLibrary: true,
      hasLaboratory: false,
      hasInternet: true,
      hasComputerLab: true,
      hasCafeteria: true,
      condition: 'good',
    },
    totalStudents: 850,
    region: 'Urban',
  },
  {
    id: '2',
    name: 'Escola Municipal Anísio Teixeira',
    location: 'São Paulo - Região Metropolitana',
    infrastructure: {
      hasLibrary: true,
      hasLaboratory: true,
      hasInternet: true,
      hasComputerLab: true,
      hasCafeteria: true,
      condition: 'excellent',
    },
    totalStudents: 1200,
    region: 'Urban',
  },
  {
    id: '3',
    name: 'Escola Municipal Darcy Ribeiro',
    location: 'São Paulo - Interior',
    infrastructure: {
      hasLibrary: false,
      hasLaboratory: false,
      hasInternet: false,
      hasComputerLab: false,
      hasCafeteria: true,
      condition: 'poor',
    },
    totalStudents: 320,
    region: 'Rural',
  },
];

export const mockSocioeconomicFactors: SocioeconomicFactor[] = [
  {
    region: 'São Paulo - Capital',
    averageIncome: 3200,
    unemploymentRate: 7.5,
    accessToTechnology: 85,
    transportQuality: 'good',
  },
  {
    region: 'São Paulo - Região Metropolitana',
    averageIncome: 2800,
    unemploymentRate: 9.2,
    accessToTechnology: 75,
    transportQuality: 'adequate',
  },
  {
    region: 'São Paulo - Interior',
    averageIncome: 2100,
    unemploymentRate: 12.5,
    accessToTechnology: 45,
    transportQuality: 'poor',
  },
];