import React, { useState } from 'react';
import { School, Student, Teacher } from '../../types';
import { Library, TrendingUp, BookOpen, GraduationCap, School as SchoolIcon } from 'lucide-react';

interface ComparisonAnalysisProps {
  schools: School[];
  students: Student[];
}

type ComparisonType = 'library' | 'teacherExperience';

const ComparisonAnalysis: React.FC<ComparisonAnalysisProps> = ({ schools, students }) => {
  const [comparisonType, setComparisonType] = useState<ComparisonType>('library');

  // Helper function to calculate average performance for a school
  const calculateSchoolPerformance = (schoolName: string) => {
    const schoolStudents = students.filter(student => student.school === schoolName);
    if (schoolStudents.length === 0) return 0;

    const allScores = schoolStudents.flatMap(student => 
      student.performanceData.map(data => data.score)
    );
    
    return allScores.reduce((sum, score) => sum + score, 0) / allScores.length;
  };

  // Comparison data based on selected type
  const getComparisonData = () => {
    if (comparisonType === 'library') {
      const schoolsWithLibrary = schools.filter(school => school.infrastructure.hasLibrary);
      const schoolsWithoutLibrary = schools.filter(school => !school.infrastructure.hasLibrary);

      return {
        group1: {
          title: 'Escolas com Biblioteca',
          icon: <Library className="h-6 w-6 text-blue-600 mr-2" />,
          schools: schoolsWithLibrary.map(school => ({
            name: school.name,
            performance: calculateSchoolPerformance(school.name)
          })),
          colorClass: 'bg-blue-600'
        },
        group2: {
          title: 'Escolas sem Biblioteca',
          icon: <BookOpen className="h-6 w-6 text-red-600 mr-2" />,
          schools: schoolsWithoutLibrary.map(school => ({
            name: school.name,
            performance: calculateSchoolPerformance(school.name)
          })),
          colorClass: 'bg-red-600'
        }
      };
    } else {
      // Teacher experience comparison
      const averageExperience = 10; // Threshold for experienced vs less experienced
      const experiencedSchools = schools.filter(school => {
        const schoolTeachers = mockTeachers.filter(t => t.schoolId === school.id);
        const avgExp = schoolTeachers.reduce((sum, t) => sum + t.experience, 0) / schoolTeachers.length;
        return avgExp >= averageExperience;
      });

      const lessExperiencedSchools = schools.filter(school => {
        const schoolTeachers = mockTeachers.filter(t => t.schoolId === school.id);
        const avgExp = schoolTeachers.reduce((sum, t) => sum + t.experience, 0) / schoolTeachers.length;
        return avgExp < averageExperience;
      });

      return {
        group1: {
          title: 'Escolas com Professores Mais Experientes',
          icon: <GraduationCap className="h-6 w-6 text-green-600 mr-2" />,
          schools: experiencedSchools.map(school => ({
            name: school.name,
            performance: calculateSchoolPerformance(school.name)
          })),
          colorClass: 'bg-green-600'
        },
        group2: {
          title: 'Escolas com Professores Menos Experientes',
          icon: <SchoolIcon className="h-6 w-6 text-orange-600 mr-2" />,
          schools: lessExperiencedSchools.map(school => ({
            name: school.name,
            performance: calculateSchoolPerformance(school.name)
          })),
          colorClass: 'bg-orange-600'
        }
      };
    }
  };

  const comparisonData = getComparisonData();
  
  // Calculate averages
  const avgGroup1 = comparisonData.group1.schools.reduce((sum, school) => sum + school.performance, 0) / 
    (comparisonData.group1.schools.length || 1);
  const avgGroup2 = comparisonData.group2.schools.reduce((sum, school) => sum + school.performance, 0) / 
    (comparisonData.group2.schools.length || 1);

  const performanceDifference = avgGroup1 - avgGroup2;
  const percentageImprovement = ((avgGroup1 - avgGroup2) / avgGroup2) * 100;

  return (
    <div className="space-y-6">
      {/* Comparison Type Selector */}
      <div className="bg-white rounded-lg shadow-md p-4">
        <label htmlFor="comparison-type" className="block text-sm font-medium text-gray-700 mb-2">
          Selecione o tipo de comparação:
        </label>
        <select
          id="comparison-type"
          value={comparisonType}
          onChange={(e) => setComparisonType(e.target.value as ComparisonType)}
          className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
        >
          <option value="library">Biblioteca</option>
          <option value="teacherExperience">Experiência dos Professores</option>
        </select>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Group 1 */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center mb-4">
            {comparisonData.group1.icon}
            <h3 className="text-lg font-semibold">{comparisonData.group1.title}</h3>
          </div>
          <div className="space-y-4">
            {comparisonData.group1.schools.map(school => (
              <div key={school.name}>
                <div className="flex justify-between items-center mb-1">
                  <span className="text-sm font-medium">{school.name}</span>
                  <span className="text-sm text-gray-600">{school.performance.toFixed(1)}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className={`${comparisonData.group1.colorClass} h-2 rounded-full`}
                    style={{ width: `${school.performance}%` }}
                  ></div>
                </div>
              </div>
            ))}
            <div className="mt-4 pt-4 border-t border-gray-200">
              <div className="flex justify-between items-center">
                <span className="font-medium">Média Geral</span>
                <span className="font-bold text-blue-600">{avgGroup1.toFixed(1)}%</span>
              </div>
            </div>
          </div>
        </div>

        {/* Group 2 */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center mb-4">
            {comparisonData.group2.icon}
            <h3 className="text-lg font-semibold">{comparisonData.group2.title}</h3>
          </div>
          <div className="space-y-4">
            {comparisonData.group2.schools.map(school => (
              <div key={school.name}>
                <div className="flex justify-between items-center mb-1">
                  <span className="text-sm font-medium">{school.name}</span>
                  <span className="text-sm text-gray-600">{school.performance.toFixed(1)}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className={`${comparisonData.group2.colorClass} h-2 rounded-full`}
                    style={{ width: `${school.performance}%` }}
                  ></div>
                </div>
              </div>
            ))}
            <div className="mt-4 pt-4 border-t border-gray-200">
              <div className="flex justify-between items-center">
                <span className="font-medium">Média Geral</span>
                <span className="font-bold text-red-600">{avgGroup2.toFixed(1)}%</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Performance Impact Analysis */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex items-center mb-6">
          <TrendingUp className="h-6 w-6 text-green-600 mr-2" />
          <h3 className="text-lg font-semibold">Análise de Impacto</h3>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-4 bg-blue-50 rounded-lg">
            <p className="text-sm text-gray-600">Diferença de Desempenho</p>
            <p className="text-2xl font-bold text-blue-600">
              {performanceDifference > 0 ? '+' : ''}{performanceDifference.toFixed(1)}%
            </p>
          </div>
          
          <div className="p-4 bg-green-50 rounded-lg">
            <p className="text-sm text-gray-600">Melhoria Percentual</p>
            <p className="text-2xl font-bold text-green-600">
              {percentageImprovement > 0 ? '+' : ''}{percentageImprovement.toFixed(1)}%
            </p>
          </div>
          
          <div className="p-4 bg-purple-50 rounded-lg">
            <p className="text-sm text-gray-600">Escolas Analisadas</p>
            <p className="text-2xl font-bold text-purple-600">
              {schools.length}
            </p>
          </div>
        </div>

        <div className="mt-6 p-4 bg-gray-50 rounded-lg">
          <h4 className="font-medium mb-2">Conclusões</h4>
          <ul className="space-y-2 text-sm text-gray-600">
            <li>• {comparisonData.group1.title} apresentam desempenho {performanceDifference > 0 ? 'superior' : 'inferior'} em média</li>
            <li>• A diferença representa uma variação de {Math.abs(percentageImprovement).toFixed(1)}% no desempenho</li>
            <li>• {comparisonData.group1.schools.length} escolas no primeiro grupo e {comparisonData.group2.schools.length} no segundo grupo</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default ComparisonAnalysis;