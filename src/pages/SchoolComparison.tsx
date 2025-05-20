import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import Card from '../components/ui/Card';
import { 
  Check, X, Users, BookOpen, School2, Calculator,
  Lightbulb, Wifi, Smartphone, Accessibility, Trophy,
  Dumbbell, ArrowUpDown
} from 'lucide-react';
import { getSchoolById, schools } from '../data/mockData';
import { School } from '../types';

const SchoolComparison: React.FC = () => {
  const [searchParams] = useSearchParams();
  const school1Id = searchParams.get('school1');
  const school2Id = searchParams.get('school2');
  
  const [selectedSchool1, setSelectedSchool1] = useState<School | null>(null);
  const [selectedSchool2, setSelectedSchool2] = useState<School | null>(null);

  useEffect(() => {
    if (school1Id) {
      const school = getSchoolById(school1Id);
      if (school) setSelectedSchool1(school);
    }
    
    if (school2Id) {
      const school = getSchoolById(school2Id);
      if (school) setSelectedSchool2(school);
    }
  }, [school1Id, school2Id]);

  const handleSchool1Change = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const schoolId = e.target.value;
    if (schoolId) {
      const school = getSchoolById(schoolId);
      setSelectedSchool1(school || null);
    } else {
      setSelectedSchool1(null);
    }
  };

  const handleSchool2Change = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const schoolId = e.target.value;
    if (schoolId) {
      const school = getSchoolById(schoolId);
      setSelectedSchool2(school || null);
    } else {
      setSelectedSchool2(null);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Comparação de Escolas</h1>
        <p className="mt-1 text-sm text-gray-600">
          Compare infraestrutura e desempenho entre escolas
        </p>
      </div>
      
      <Card>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label htmlFor="school1" className="block text-sm font-medium text-gray-700 mb-1">
              Escola 1
            </label>
            <select
              id="school1"
              className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              value={selectedSchool1?.id || ''}
              onChange={handleSchool1Change}
            >
              <option value="">Selecione uma escola</option>
              {schools.map(school => (
                <option key={school.id} value={school.id}>
                  {school.name}
                </option>
              ))}
            </select>
          </div>
          
          <div>
            <label htmlFor="school2" className="block text-sm font-medium text-gray-700 mb-1">
              Escola 2
            </label>
            <select
              id="school2"
              className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              value={selectedSchool2?.id || ''}
              onChange={handleSchool2Change}
            >
              <option value="">Selecione uma escola</option>
              {schools.map(school => (
                <option key={school.id} value={school.id}>
                  {school.name}
                </option>
              ))}
            </select>
          </div>
        </div>
      </Card>
      
      {selectedSchool1 && selectedSchool2 ? (
        <div className="space-y-6">
          {/* Infrastructure Comparison */}
          <Card>
            <h2 className="text-lg font-medium text-gray-900 mb-6">Infraestrutura</h2>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead>
                  <tr>
                    <th className="py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-1/3">
                      Indicador
                    </th>
                    <th className="py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-1/3">
                      {selectedSchool1.name}
                    </th>
                    <th className="py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-1/3">
                      {selectedSchool2.name}
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {/* Teachers */}
                  <tr>
                    <td className="py-4 text-sm font-medium text-gray-900 flex items-center">
                      <Users className="h-4 w-4 mr-2" />
                      Professores de Português
                    </td>
                    <td className="py-4 text-sm text-gray-500">
                      {selectedSchool1.infrastructure.portugueseTeachers}
                    </td>
                    <td className="py-4 text-sm text-gray-500">
                      {selectedSchool2.infrastructure.portugueseTeachers}
                    </td>
                  </tr>
                  <tr>
                    <td className="py-4 text-sm font-medium text-gray-900 flex items-center">
                      <Calculator className="h-4 w-4 mr-2" />
                      Professores de Matemática
                    </td>
                    <td className="py-4 text-sm text-gray-500">
                      {selectedSchool1.infrastructure.mathTeachers}
                    </td>
                    <td className="py-4 text-sm text-gray-500">
                      {selectedSchool2.infrastructure.mathTeachers}
                    </td>
                  </tr>
                  
                  {/* Facilities */}
                  <tr>
                    <td className="py-4 text-sm font-medium text-gray-900 flex items-center">
                      <BookOpen className="h-4 w-4 mr-2" />
                      Biblioteca Funcional
                    </td>
                    <td className="py-4">
                      {selectedSchool1.infrastructure.libraryFunctional ? 
                        <Check className="h-5 w-5 text-green-500" /> : 
                        <X className="h-5 w-5 text-red-500" />}
                    </td>
                    <td className="py-4">
                      {selectedSchool2.infrastructure.libraryFunctional ? 
                        <Check className="h-5 w-5 text-green-500" /> : 
                        <X className="h-5 w-5 text-red-500" />}
                    </td>
                  </tr>
                  <tr>
                    <td className="py-4 text-sm font-medium text-gray-900 flex items-center">
                      <School2 className="h-4 w-4 mr-2" />
                      Laboratório de Informática
                    </td>
                    <td className="py-4">
                      {selectedSchool1.infrastructure.computerLabFunctional ? 
                        <Check className="h-5 w-5 text-green-500" /> : 
                        <X className="h-5 w-5 text-red-500" />}
                    </td>
                    <td className="py-4">
                      {selectedSchool2.infrastructure.computerLabFunctional ? 
                        <Check className="h-5 w-5 text-green-500" /> : 
                        <X className="h-5 w-5 text-red-500" />}
                    </td>
                  </tr>
                  
                  {/* Amenities */}
                  <tr>
                    <td className="py-4 text-sm font-medium text-gray-900 flex items-center">
                      <Wifi className="h-4 w-4 mr-2" />
                      Internet para Alunos
                    </td>
                    <td className="py-4">
                      {selectedSchool1.infrastructure.studentInternet ? 
                        <Check className="h-5 w-5 text-green-500" /> : 
                        <X className="h-5 w-5 text-red-500" />}
                    </td>
                    <td className="py-4">
                      {selectedSchool2.infrastructure.studentInternet ? 
                        <Check className="h-5 w-5 text-green-500" /> : 
                        <X className="h-5 w-5 text-red-500" />}
                    </td>
                  </tr>
                  <tr>
                    <td className="py-4 text-sm font-medium text-gray-900 flex items-center">
                      <Lightbulb className="h-4 w-4 mr-2" />
                      Iluminação Adequada
                    </td>
                    <td className="py-4">
                      {selectedSchool1.infrastructure.adequateLighting ? 
                        <Check className="h-5 w-5 text-green-500" /> : 
                        <X className="h-5 w-5 text-red-500" />}
                    </td>
                    <td className="py-4">
                      {selectedSchool2.infrastructure.adequateLighting ? 
                        <Check className="h-5 w-5 text-green-500" /> : 
                        <X className="h-5 w-5 text-red-500" />}
                    </td>
                  </tr>
                  
                  {/* Programs and Features */}
                  <tr>
                    <td className="py-4 text-sm font-medium text-gray-900 flex items-center">
                      <Smartphone className="h-4 w-4 mr-2" />
                      Projetos com Celular
                    </td>
                    <td className="py-4">
                      {selectedSchool1.infrastructure.mobileProjects ? 
                        <Check className="h-5 w-5 text-green-500" /> : 
                        <X className="h-5 w-5 text-red-500" />}
                    </td>
                    <td className="py-4">
                      {selectedSchool2.infrastructure.mobileProjects ? 
                        <Check className="h-5 w-5 text-green-500" /> : 
                        <X className="h-5 w-5 text-red-500" />}
                    </td>
                  </tr>
                  <tr>
                    <td className="py-4 text-sm font-medium text-gray-900 flex items-center">
                      <Accessibility className="h-4 w-4 mr-2" />
                      Nível de Acessibilidade
                    </td>
                    <td className="py-4 text-sm text-gray-500">
                      {selectedSchool1.infrastructure.accessibilityLevel}
                    </td>
                    <td className="py-4 text-sm text-gray-500">
                      {selectedSchool2.infrastructure.accessibilityLevel}
                    </td>
                  </tr>
                  <tr>
                    <td className="py-4 text-sm font-medium text-gray-900 flex items-center">
                      <Trophy className="h-4 w-4 mr-2" />
                      Projetos Ativos
                    </td>
                    <td className="py-4">
                      {selectedSchool1.infrastructure.hasProjects ? 
                        <Check className="h-5 w-5 text-green-500" /> : 
                        <X className="h-5 w-5 text-red-500" />}
                    </td>
                    <td className="py-4">
                      {selectedSchool2.infrastructure.hasProjects ? 
                        <Check className="h-5 w-5 text-green-500" /> : 
                        <X className="h-5 w-5 text-red-500" />}
                    </td>
                  </tr>
                  <tr>
                    <td className="py-4 text-sm font-medium text-gray-900 flex items-center">
                      <Dumbbell className="h-4 w-4 mr-2" />
                      Áreas Recreativas
                    </td>
                    <td className="py-4">
                      {selectedSchool1.infrastructure.hasRecreationAreas ? 
                        <Check className="h-5 w-5 text-green-500" /> : 
                        <X className="h-5 w-5 text-red-500" />}
                    </td>
                    <td className="py-4">
                      {selectedSchool2.infrastructure.hasRecreationAreas ? 
                        <Check className="h-5 w-5 text-green-500" /> : 
                        <X className="h-5 w-5 text-red-500" />}
                    </td>
                  </tr>
                  <tr>
                    <td className="py-4 text-sm font-medium text-gray-900 flex items-center">
                      <ArrowUpDown className="h-4 w-4 mr-2" />
                      Diferença entre Turnos
                    </td>
                    <td className="py-4">
                      {selectedSchool1.infrastructure.shiftPerformanceDifference ? 
                        <Check className="h-5 w-5 text-amber-500" /> : 
                        <X className="h-5 w-5 text-green-500" />}
                    </td>
                    <td className="py-4">
                      {selectedSchool2.infrastructure.shiftPerformanceDifference ? 
                        <Check className="h-5 w-5 text-amber-500" /> : 
                        <X className="h-5 w-5 text-green-500" />}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </Card>

          {/* Performance Comparison */}
          <Card>
            <h2 className="text-lg font-medium text-gray-900 mb-6">Desempenho em Matemática</h2>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead>
                  <tr>
                    <th className="py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Indicador
                    </th>
                    <th className="py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      {selectedSchool1.name}
                    </th>
                    <th className="py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      {selectedSchool2.name}
                    </th>
                    <th className="py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Diferença
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {selectedSchool1.performanceBySkill.map((skill, index) => {
                    const matchingSkill = selectedSchool2.performanceBySkill.find(
                      s => s.skillId === skill.skillId
                    );
                    
                    if (!matchingSkill) return null;
                    
                    const difference = skill.percentCorrect - matchingSkill.percentCorrect;
                    
                    return (
                      <tr key={skill.skillId}>
                        <td className="py-4 text-sm text-gray-900">
                          <div className="font-medium">{skill.skillCode}</div>
                          <div className="text-xs text-gray-500">{skill.description}</div>
                        </td>
                        <td className="py-4 text-sm text-gray-900">
                          {skill.percentCorrect.toFixed(1)}%
                          <div className="text-xs text-gray-500">
                            ({skill.evaluatedStudents}/{skill.totalStudents} alunos)
                          </div>
                        </td>
                        <td className="py-4 text-sm text-gray-900">
                          {matchingSkill.percentCorrect.toFixed(1)}%
                          <div className="text-xs text-gray-500">
                            ({matchingSkill.evaluatedStudents}/{matchingSkill.totalStudents} alunos)
                          </div>
                        </td>
                        <td className={`py-4 text-sm font-medium ${
                          difference > 0 ? 'text-green-600' : 
                          difference < 0 ? 'text-red-600' : 
                          'text-gray-500'
                        }`}>
                          {difference > 0 ? '+' : ''}{difference.toFixed(1)}%
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </Card>

          {/* Analysis */}
          <Card className="bg-blue-50 p-6">
            <h3 className="text-lg font-medium text-blue-900 mb-4">Análise Comparativa</h3>
            <div className="space-y-4 text-blue-800">
              {/* Infrastructure Analysis */}
              <p>
                <strong>Infraestrutura:</strong> {selectedSchool1.name} possui {
                  [
                    selectedSchool1.infrastructure.libraryFunctional && 'biblioteca',
                    selectedSchool1.infrastructure.computerLabFunctional && 'laboratório de informática',
                    selectedSchool1.infrastructure.studentInternet && 'internet para alunos'
                  ].filter(Boolean).join(', ')
                } {
                  selectedSchool1.infrastructure.libraryFunctional || 
                  selectedSchool1.infrastructure.computerLabFunctional || 
                  selectedSchool1.infrastructure.studentInternet 
                    ? 'como diferencial'
                    : 'com oportunidades de melhoria'
                }.
              </p>

              {/* Performance Analysis */}
              <p>
                <strong>Desempenho:</strong> {
                  selectedSchool1.averagePerformance > selectedSchool2.averagePerformance
                    ? `${selectedSchool1.name} apresenta desempenho superior em ${(selectedSchool1.averagePerformance - selectedSchool2.averagePerformance).toFixed(1)}%`
                    : `${selectedSchool2.name} apresenta desempenho superior em ${(selectedSchool2.averagePerformance - selectedSchool1.averagePerformance).toFixed(1)}%`
                }.
              </p>

              {/* Teacher Analysis */}
              <p>
                <strong>Corpo Docente:</strong> {
                  selectedSchool1.infrastructure.portugueseTeachers + selectedSchool1.infrastructure.mathTeachers >
                  selectedSchool2.infrastructure.portugueseTeachers + selectedSchool2.infrastructure.mathTeachers
                    ? `${selectedSchool1.name} possui maior equipe docente`
                    : `${selectedSchool2.name} possui maior equipe docente`
                }.
              </p>
            </div>
          </Card>
        </div>
      ) : (
        <Card className="text-center p-8">
          <p className="text-gray-500">Selecione duas escolas para visualizar a comparação.</p>
        </Card>
      )}
    </div>
  );
};

export default SchoolComparison;