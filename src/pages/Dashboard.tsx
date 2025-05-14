import React, { useState } from 'react';
import PerformanceCard from '../components/dashboard/PerformanceCard';
import SubjectPerformanceChart from '../components/dashboard/SubjectPerformanceChart';
import SchoolComparisonChart from '../components/dashboard/SchoolComparisonChart';
import SocioeconomicFactorsCard from '../components/dashboard/SocioeconomicFactorsCard';
import StudentListTable from '../components/dashboard/StudentListTable';
import InfrastructureAnalysis from '../components/analysis/InfrastructureAnalysis';
import TeacherAnalysis from '../components/analysis/TeacherAnalysis';
import EducationalPrograms from '../components/analysis/EducationalPrograms';
import ComparisonAnalysis from '../components/analysis/ComparisonAnalysis';
import FileUpload from '../components/data/FileUpload';
import { Users, School, BookOpen, Award, Building2, GraduationCap, BookCheck, Upload, BarChart } from 'lucide-react';
import { mockStudents, mockSchools, mockSocioeconomicFactors } from '../data/mockData';

const Dashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [importedData, setImportedData] = useState<any[]>([]);

  // Calculate average scores by subject for all students
  const subjectScores: { [key: string]: number[] } = {};
  mockStudents.forEach(student => {
    student.performanceData.forEach(data => {
      if (!subjectScores[data.subject]) {
        subjectScores[data.subject] = [];
      }
      subjectScores[data.subject].push(data.score);
    });
  });

  const averageSubjectPerformance = Object.entries(subjectScores).map(([subject, scores]) => {
    const average = scores.reduce((sum, score) => sum + score, 0) / scores.length;
    return {
      subject,
      score: Math.round(average * 10) / 10
    };
  }).sort((a, b) => b.score - a.score);

  const schoolsData = mockSchools.map(school => {
    const infraScore = (
      (school.infrastructure.hasLibrary ? 20 : 0) +
      (school.infrastructure.hasLaboratory ? 20 : 0) +
      (school.infrastructure.hasInternet ? 20 : 0) +
      (school.infrastructure.hasComputerLab ? 20 : 0) +
      (school.infrastructure.hasComputerLab ? 20 : 0)
    );

    const schoolStudents = mockStudents.filter(student => student.school === school.name);
    let performanceScore = 0;
    
    if (schoolStudents.length > 0) {
      const allScores: number[] = [];
      schoolStudents.forEach(student => {
        student.performanceData.forEach(data => {
          allScores.push(data.score);
        });
      });
      
      performanceScore = Math.round(
        (allScores.reduce((sum, score) => sum + score, 0) / allScores.length) 
      );
    }

    return {
      name: school.name,
      performance: performanceScore,
      infrastructure: infraScore
    };
  });

  const handleDataImported = (data: any[]) => {
    setImportedData(data);
    console.log('Imported data:', data);
    // Here you would typically process and validate the data
    // Then update your application state or send to a backend
  };

  const socioeconomicData = mockSocioeconomicFactors[0];

  const tabs = [
    { id: 'overview', name: 'Overview', icon: <BookOpen className="w-5 h-5" /> },
    { id: 'infrastructure', name: 'Infrastructure', icon: <Building2 className="w-5 h-5" /> },
    { id: 'teachers', name: 'Teachers', icon: <GraduationCap className="w-5 h-5" /> },
    { id: 'programs', name: 'Educational Programs', icon: <BookCheck className="w-5 h-5" /> },
    { id: 'comparison', name: 'Comparações', icon: <BarChart className="w-5 h-5" /> },
    { id: 'import', name: 'Importar Dados', icon: <Upload className="w-5 h-5" /> },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Education Analytics Dashboard</h1>
        <p className="text-gray-600 mt-1">Overview of student performance and educational factors</p>
      </div>

      {/* Tabs */}
      <div className="border-b border-gray-200 mb-8">
        <nav className="-mb-px flex space-x-8">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`
                flex items-center px-1 py-4 border-b-2 font-medium text-sm
                ${activeTab === tab.id
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}
              `}
            >
              {tab.icon}
              <span className="ml-2">{tab.name}</span>
            </button>
          ))}
        </nav>
      </div>

      {activeTab === 'overview' && (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <PerformanceCard 
              title="Total Students" 
              value={mockStudents.length} 
              change={5.2} 
              icon={<Users className="h-6 w-6 text-blue-600" />}
            />
            <PerformanceCard 
              title="Schools" 
              value={mockSchools.length} 
              change={0} 
              icon={<School className="h-6 w-6 text-blue-600" />}
            />
            <PerformanceCard 
              title="Average Score" 
              value={75.8} 
              unit="%" 
              change={2.3}
              icon={<Award className="h-6 w-6 text-blue-600" />}
            />
            <PerformanceCard 
              title="Subjects" 
              value={5} 
              change={0}
              icon={<BookOpen className="h-6 w-6 text-blue-600" />} 
            />
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
            <div className="lg:col-span-2">
              <SchoolComparisonChart schools={schoolsData} />
            </div>
            <div>
              <SubjectPerformanceChart data={averageSubjectPerformance} />
            </div>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
            <div className="lg:col-span-2">
              <StudentListTable students={mockStudents} />
            </div>
            <div>
              <SocioeconomicFactorsCard 
                region={socioeconomicData.region}
                averageIncome={socioeconomicData.averageIncome}
                unemploymentRate={socioeconomicData.unemploymentRate}
                accessToTechnology={socioeconomicData.accessToTechnology}
                transportQuality={socioeconomicData.transportQuality}
              />
            </div>
          </div>
        </>
      )}

      {activeTab === 'infrastructure' && <InfrastructureAnalysis schools={mockSchools} />}
      {activeTab === 'teachers' && <TeacherAnalysis />}
      {activeTab === 'programs' && <EducationalPrograms schools={mockSchools} />}
      {activeTab === 'comparison' && <ComparisonAnalysis schools={mockSchools} students={mockStudents} />}
      {activeTab === 'import' && (
        <div className="space-y-6">
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold mb-4">Importar Dados</h2>
            <p className="text-gray-600 mb-6">
              Faça upload de arquivos CSV ou Excel contendo dados sobre alunos, professores ou escolas.
              Os dados serão automaticamente processados e integrados ao sistema.
            </p>
            <FileUpload onDataImported={handleDataImported} />
          </div>
          
          {importedData.length > 0 && (
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-lg font-semibold mb-4">Dados Importados</h3>
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      {Object.keys(importedData[0]).map((header) => (
                        <th
                          key={header}
                          className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                        >
                          {header}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {importedData.map((row, index) => (
                      <tr key={index}>
                        {Object.values(row).map((value: any, cellIndex) => (
                          <td
                            key={cellIndex}
                            className="px-6 py-4 whitespace-nowrap text-sm text-gray-500"
                          >
                            {value}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Dashboard;