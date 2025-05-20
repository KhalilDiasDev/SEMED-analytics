import React, { useState } from 'react';
import Card from '../components/ui/Card';
import { schools } from '../data/mockData';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip, BarChart, Bar, XAxis, YAxis, CartesianGrid } from 'recharts';

type Subject = 'all' | 'math' | 'portuguese' | 'science' | 'history' | 'geography';

const SkillAnalysis: React.FC = () => {
  const [selectedSubject, setSelectedSubject] = useState<Subject>('all');
  const [selectedSkill, setSelectedSkill] = useState<string>('');
  
  // Get unique skills across all schools
  const allSkills = Array.from(
    new Set(
      schools.flatMap(school => 
        school.performanceBySkill.map(skill => skill.skillCode)
      )
    )
  ).sort();
  
  // Filter skills by subject if subject is selected
  const filteredSkills = allSkills.filter(skillCode => {
    if (selectedSubject === 'all') return true;
    
    return schools.some(school => 
      school.performanceBySkill.some(skill => 
        skill.skillCode === skillCode && skill.subject === selectedSubject
      )
    );
  });
  
  // Calculate infrastructure impact data
  const getInfrastructureImpactData = () => {
    if (!selectedSkill) return [];
    
    const schoolsWithSkill = schools.filter(school => 
      school.performanceBySkill.some(skill => skill.skillCode === selectedSkill)
    );
    
    const withInternet = schoolsWithSkill.filter(s => s.hasInternet);
    const withoutInternet = schoolsWithSkill.filter(s => !s.hasInternet);
    
    const withLibrary = schoolsWithSkill.filter(s => s.hasLibrary);
    const withoutLibrary = schoolsWithSkill.filter(s => !s.hasLibrary);
    
    const withLab = schoolsWithSkill.filter(s => s.hasLaboratory);
    const withoutLab = schoolsWithSkill.filter(s => !s.hasLaboratory);
    
    const withComputerLab = schoolsWithSkill.filter(s => s.hasComputerLab);
    const withoutComputerLab = schoolsWithSkill.filter(s => !s.hasComputerLab);
    
    const getAveragePerformance = (schools: typeof schoolsWithSkill, skillCode: string) => {
      if (schools.length === 0) return 0;
      
      const sum = schools.reduce((acc, school) => {
        const skill = school.performanceBySkill.find(s => s.skillCode === skillCode);
        return acc + (skill ? skill.percentCorrect : 0);
      }, 0);
      
      return sum / schools.length;
    };
    
    return [
      {
        name: 'Internet',
        with: getAveragePerformance(withInternet, selectedSkill),
        without: getAveragePerformance(withoutInternet, selectedSkill),
        difference: getAveragePerformance(withInternet, selectedSkill) - getAveragePerformance(withoutInternet, selectedSkill)
      },
      {
        name: 'Biblioteca',
        with: getAveragePerformance(withLibrary, selectedSkill),
        without: getAveragePerformance(withoutLibrary, selectedSkill),
        difference: getAveragePerformance(withLibrary, selectedSkill) - getAveragePerformance(withoutLibrary, selectedSkill)
      },
      {
        name: 'Laboratório',
        with: getAveragePerformance(withLab, selectedSkill),
        without: getAveragePerformance(withoutLab, selectedSkill),
        difference: getAveragePerformance(withLab, selectedSkill) - getAveragePerformance(withoutLab, selectedSkill)
      },
      {
        name: 'Lab. Informática',
        with: getAveragePerformance(withComputerLab, selectedSkill),
        without: getAveragePerformance(withoutComputerLab, selectedSkill),
        difference: getAveragePerformance(withComputerLab, selectedSkill) - getAveragePerformance(withoutComputerLab, selectedSkill)
      }
    ];
  };
  
  const infrastructureImpactData = getInfrastructureImpactData();
  
  // Get skill distribution data
  const getSkillDistributionData = () => {
    if (!selectedSkill) return [];
    
    const performanceLevels = [
      { name: 'Baixo (<60%)', count: 0, color: '#EF4444' },
      { name: 'Médio (60-80%)', count: 0, color: '#F59E0B' },
      { name: 'Alto (>80%)', count: 0, color: '#10B981' }
    ];
    
    schools.forEach(school => {
      const skill = school.performanceBySkill.find(s => s.skillCode === selectedSkill);
      if (!skill) return;
      
      if (skill.percentCorrect < 60) {
        performanceLevels[0].count++;
      } else if (skill.percentCorrect <= 80) {
        performanceLevels[1].count++;
      } else {
        performanceLevels[2].count++;
      }
    });
    
    return performanceLevels;
  };
  
  const skillDistributionData = getSkillDistributionData();
  
  // Get skill description
  const getSkillDescription = () => {
    if (!selectedSkill) return '';
    
    const skill = schools
      .flatMap(school => school.performanceBySkill)
      .find(skill => skill.skillCode === selectedSkill);
    
    return skill ? skill.description : '';
  };
  
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Análise de Desempenho por Habilidade</h1>
        <p className="mt-1 text-sm text-gray-600">
          Analise quais fatores influenciam o desempenho em habilidades específicas
        </p>
      </div>
      
      {/* Filters */}
      <Card>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-1">
              Componente Curricular
            </label>
            <select
              id="subject"
              className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              value={selectedSubject}
              onChange={(e) => {
                setSelectedSubject(e.target.value as Subject);
                setSelectedSkill(''); // Reset skill when subject changes
              }}
            >
              <option value="all">Todos</option>
              <option value="math">Matemática</option>
              <option value="portuguese">Língua Portuguesa</option>
              <option value="science">Ciências</option>
              <option value="history">História</option>
              <option value="geography">Geografia</option>
            </select>
          </div>
          
          <div>
            <label htmlFor="skill" className="block text-sm font-medium text-gray-700 mb-1">
              Habilidade
            </label>
            <select
              id="skill"
              className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              value={selectedSkill}
              onChange={(e) => setSelectedSkill(e.target.value)}
              disabled={filteredSkills.length === 0}
            >
              <option value="">Selecione uma habilidade</option>
              {filteredSkills.map(skillCode => (
                <option key={skillCode} value={skillCode}>
                  {skillCode}
                </option>
              ))}
            </select>
          </div>
        </div>
      </Card>
      
      {/* Skill Analysis */}
      {selectedSkill ? (
        <>
          {/* Skill Description */}
          <Card>
            <h2 className="text-lg font-medium text-gray-900 mb-1">Descrição da Habilidade</h2>
            <p className="text-gray-600">{getSkillDescription()}</p>
          </Card>
          
          {/* Charts & Analysis */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Performance Distribution */}
            <Card>
              <h3 className="text-lg font-medium text-gray-900 mb-4">Distribuição de Desempenho</h3>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={skillDistributionData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="count"
                      label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                    >
                      {skillDistributionData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip 
                      formatter={(value: number) => [value, 'Escolas']}
                      contentStyle={{ 
                        backgroundColor: '#ffffff', 
                        border: '1px solid #e5e7eb',
                        borderRadius: '6px',
                        boxShadow: '0 1px 2px 0 rgba(0, 0, 0, 0.05)'
                      }}
                    />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </Card>
            
            {/* Infrastructure Impact */}
            <Card>
              <h3 className="text-lg font-medium text-gray-900 mb-4">Impacto da Infraestrutura</h3>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={infrastructureImpactData}
                    layout="vertical"
                    margin={{
                      top: 5,
                      right: 30,
                      left: 100,
                      bottom: 5,
                    }}
                  >
                    <CartesianGrid strokeDasharray="3 3" horizontal={true} vertical={false} />
                    <XAxis type="number" domain={[0, 100]} />
                    <YAxis type="category" dataKey="name" width={100} />
                    <Tooltip
                      formatter={(value: number) => [`${value.toFixed(1)}%`, 'Desempenho']}
                      contentStyle={{ 
                        backgroundColor: '#ffffff', 
                        border: '1px solid #e5e7eb',
                        borderRadius: '6px',
                        boxShadow: '0 1px 2px 0 rgba(0, 0, 0, 0.05)'
                      }}
                    />
                    <Bar dataKey="with" name="Com" fill="#10B981" />
                    <Bar dataKey="without" name="Sem" fill="#EF4444" />
                    <Legend />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </Card>
          </div>
          
          {/* Insights */}
          <Card>
            <h3 className="text-lg font-medium text-gray-900 mb-4">Insights Automáticos</h3>
            <ul className="space-y-2">
              {infrastructureImpactData.map((item, index) => (
                item.difference > 3 && (
                  <li key={index} className="flex items-start">
                    <span className="h-5 w-5 text-green-500 mr-2">•</span>
                    <span>
                      Escolas com <span className="font-medium">{item.name}</span> tiveram desempenho 
                      <span className="font-medium text-green-600"> {item.difference.toFixed(1)}% superior</span> na habilidade {selectedSkill}.
                    </span>
                  </li>
                )
              ))}
              {infrastructureImpactData.map((item, index) => (
                item.difference < -3 && (
                  <li key={`neg-${index}`} className="flex items-start">
                    <span className="h-5 w-5 text-amber-500 mr-2">•</span>
                    <span>
                      Escolas sem <span className="font-medium">{item.name}</span> tiveram desempenho 
                      <span className="font-medium text-amber-600"> {(-item.difference).toFixed(1)}% superior</span> na habilidade {selectedSkill}, 
                      o que sugere outros fatores importantes.
                    </span>
                  </li>
                )
              ))}
              {infrastructureImpactData.every(item => Math.abs(item.difference) <= 3) && (
                <li className="flex items-start">
                  <span className="h-5 w-5 text-gray-500 mr-2">•</span>
                  <span>
                    A infraestrutura parece não ter impacto significativo no desempenho desta habilidade.
                  </span>
                </li>
              )}
              {skillDistributionData.length > 0 && (
                <li className="flex items-start">
                  <span className="h-5 w-5 text-blue-500 mr-2">•</span>
                  <span>
                    {skillDistributionData[2].count > skillDistributionData[0].count
                      ? `A maioria das escolas (${skillDistributionData[2].count} escolas) apresenta alto desempenho nesta habilidade.`
                      : skillDistributionData[0].count > skillDistributionData[2].count
                        ? `A maioria das escolas (${skillDistributionData[0].count} escolas) apresenta baixo desempenho nesta habilidade, indicando uma possível área para intervenção.`
                        : 'Há uma distribuição equilibrada de desempenho entre as escolas nesta habilidade.'
                    }
                  </span>
                </li>
              )}
            </ul>
          </Card>
        </>
      ) : (
        <Card className="text-center p-8">
          <p className="text-gray-500">Selecione uma habilidade para visualizar a análise.</p>
        </Card>
      )}
    </div>
  );
};

export default SkillAnalysis;