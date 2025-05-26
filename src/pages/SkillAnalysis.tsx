import React, { useState, useEffect } from 'react';
import Card from '../components/ui/Card';

import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip, BarChart, Bar, XAxis, YAxis, CartesianGrid } from 'recharts';
import { School, SkillPerformance } from '../types';
import { supabase } from '../libs/supabase';


type Subject = 'all' | 'Língua Portuguesa' | 'Matemática' | 'Ciências';

const SkillAnalysis: React.FC = () => {
  const [selectedSubject, setSelectedSubject] = useState<Subject>('all');
  const [selectedEtapa, setSelectedEtapa] = useState<string>('all');
  const [selectedSkill, setSelectedSkill] = useState<string>('');
  
  // Estados para os dados do Supabase
  const [escolas, setEscolas] = useState<School[]>([]);
  const [desempenhoHabilidades, setDesempenhoHabilidades] = useState<SkillPerformance[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  console.log(escolas);
  console.log(desempenhoHabilidades);
  
  

  // ADICIONE AQUI: Função para buscar dados do Supabase
  const fetchData = async () => {
    try {
      setLoading(true);
      
     const { data: escolasData, error: escolasError } = await supabase.from('escolas').select('*');
     if (escolasError) throw escolasError;
     
     const { data: desempenhoData, error: desempenhoError } = await supabase.from('desempenho_habilidades').select('*');
     console.log(desempenhoData);
     
     if (desempenhoError) throw desempenhoError;
     
     
     console.log(escolasData);
     console.log(desempenhoData);
     
       setEscolas(escolasData);
       setDesempenhoHabilidades(desempenhoData);
      
 
      
    } catch (err) {
      console.error('Erro ao buscar dados:', err);
      setError('Erro ao carregar dados do banco');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // Mapear habilidades H01-H21 para um array
  const getHabilidadesFromDesempenho = (desempenho: SkillPerformance) => {
    const habilidades = [];
    for (let i = 1; i <= 21; i++) {
      const key = `h${i.toString().padStart(2, '0')}` as keyof SkillPerformance;
      const value = desempenho[key] as number;
      if (value !== null && value !== undefined) {
        habilidades.push({
          skillCode: `H${i.toString().padStart(2, '0')}`,
          percentCorrect: value,
          subject: desempenho.componente_curricular,
          etapa: desempenho.etapa,
          escola: desempenho.escola
        });
      }
    }
    return habilidades;
  };

  // Obter lista única de componentes curriculares
  const getUniqueSubjects = () => {
    return Array.from(new Set(desempenhoHabilidades.map(d => d.componente_curricular))).sort();
  };

  // Obter lista única de etapas
  const getUniqueEtapas = () => {
    return Array.from(new Set(desempenhoHabilidades.map(d => d.etapa))).sort();
  };

  // Obter habilidades disponíveis baseadas nos filtros
  const getAvailableSkills = () => {
    let filteredData = desempenhoHabilidades;
    
    if (selectedSubject !== 'all') {
      filteredData = filteredData.filter(d => d.componente_curricular === selectedSubject);
    }
    
    if (selectedEtapa !== 'all') {
      filteredData = filteredData.filter(d => d.etapa === selectedEtapa);
    }
    
    const allSkills = [];
    for (let i = 1; i <= 21; i++) {
      const skillCode = `H${i.toString().padStart(2, '0')}`;
      const hasData = filteredData.some(d => {
        const key = `h${i.toString().padStart(2, '0')}` as keyof SkillPerformance;
        return d[key] !== null && d[key] !== undefined;
      });
      if (hasData) {
        allSkills.push(skillCode);
      }
    }
    
    return allSkills;
  };

  // Calcular dados de impacto da infraestrutura
  const getInfrastructureImpactData = () => {
    if (!selectedSkill) return [];
    
    const skillNumber = parseInt(selectedSkill.replace('H', ''));
    const skillKey = `h${skillNumber.toString().padStart(2, '0')}` as keyof SkillPerformance;
    
    // Filtrar dados de desempenho baseado nos filtros selecionados
    let filteredDesempenho = desempenhoHabilidades;
    
    if (selectedSubject !== 'all') {
      filteredDesempenho = filteredDesempenho.filter(d => d.componente_curricular === selectedSubject);
    }
    
    if (selectedEtapa !== 'all') {
      filteredDesempenho = filteredDesempenho.filter(d => d.etapa === selectedEtapa);
    }

    const escolaMap = new Map(escolas.map(e => [e.nome, e]));
    
    const calculateInfrastructureAverage = (hasInfrastructure: boolean, infrastructureField: keyof School) => {
      const relevantSchools = filteredDesempenho.filter(d => {
        const escola = escolaMap.get(d.escola);
        return escola && escola[infrastructureField] === hasInfrastructure && d[skillKey] !== null;
      });
      
      if (relevantSchools.length === 0) return 0;
      
      const sum = relevantSchools.reduce((acc, d) => acc + (d[skillKey] as number), 0);
      return sum / relevantSchools.length;
    };

    return [
      {
        name: 'Internet',
        with: calculateInfrastructureAverage(true, 'acess_internet'),
        without: calculateInfrastructureAverage(false, 'acess_internet'),
        difference: calculateInfrastructureAverage(true, 'acess_internet') - calculateInfrastructureAverage(false, 'acess_internet')
      },
      {
        name: 'Biblioteca',
        with: calculateInfrastructureAverage(true, 'biblioteca'),
        without: calculateInfrastructureAverage(false, 'biblioteca'),
        difference: calculateInfrastructureAverage(true, 'biblioteca') - calculateInfrastructureAverage(false, 'biblioteca')
      },
      {
        name: 'Lab. Informática',
        with: calculateInfrastructureAverage(true, 'lab_info'),
        without: calculateInfrastructureAverage(false, 'lab_info'),
        difference: calculateInfrastructureAverage(true, 'lab_info') - calculateInfrastructureAverage(false, 'lab_info')
      },
      {
        name: 'Ar Condicionado',
        with: calculateInfrastructureAverage(true, 'ar_condicionado'),
        without: calculateInfrastructureAverage(false, 'ar_condicionado'),
        difference: calculateInfrastructureAverage(true, 'ar_condicionado') - calculateInfrastructureAverage(false, 'ar_condicionado')
      }
    ];
  };

  // Obter distribuição de performance da habilidade
  const getSkillDistributionData = () => {
    if (!selectedSkill) return [];
    
    const skillNumber = parseInt(selectedSkill.replace('H', ''));
    const skillKey = `h${skillNumber.toString().padStart(2, '0')}` as keyof SkillPerformance;
    
    let filteredData = desempenhoHabilidades;
    
    if (selectedSubject !== 'all') {
      filteredData = filteredData.filter(d => d.componente_curricular === selectedSubject);
    }
    
    if (selectedEtapa !== 'all') {
      filteredData = filteredData.filter(d => d.etapa === selectedEtapa);
    }
    
    const performanceLevels = [
      { name: 'Baixo (<60%)', count: 0, color: '#EF4444' },
      { name: 'Médio (60-80%)', count: 0, color: '#F59E0B' },
      { name: 'Alto (>80%)', count: 0, color: '#10B981' }
    ];
    
    filteredData.forEach(desempenho => {
      const value = desempenho[skillKey] as number;
      if (value === null || value === undefined) return;
      
      if (value < 60) {
        performanceLevels[0].count++;
      } else if (value <= 80) {
        performanceLevels[1].count++;
      } else {
        performanceLevels[2].count++;
      }
    });
    
    return performanceLevels;
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="text-gray-600">Carregando dados...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-md p-4">
        <div className="text-red-800">{error}</div>
        <button 
          onClick={fetchData}
          className="mt-2 px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
        >
          Tentar novamente
        </button>
      </div>
    );
  }

  const availableSubjects = getUniqueSubjects();
  const availableEtapas = getUniqueEtapas();
  const availableSkills = getAvailableSkills();
  const infrastructureImpactData = getInfrastructureImpactData();
  const skillDistributionData = getSkillDistributionData();

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
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
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
              {availableSubjects.map(subject => (
                <option key={subject} value={subject}>
                  {subject}
                </option>
              ))}
            </select>
          </div>
          
          <div>
            <label htmlFor="etapa" className="block text-sm font-medium text-gray-700 mb-1">
              Etapa
            </label>
            <select
              id="etapa"
              className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              value={selectedEtapa}
              onChange={(e) => {
                setSelectedEtapa(e.target.value);
                setSelectedSkill(''); // Reset skill when etapa changes
              }}
            >
              <option value="all">Todas</option>
              {availableEtapas.map(etapa => (
                <option key={etapa} value={etapa}>
                  {etapa}
                </option>
              ))}
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
              disabled={availableSkills.length === 0}
            >
              <option value="">Selecione uma habilidade</option>
              {availableSkills.map(skillCode => (
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