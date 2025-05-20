import React, { useEffect, useState } from 'react';
import StatCard from '../components/ui/StatCard';
import PerformanceBarChart from '../components/charts/BarChart';
import InfrastructurePieChart from '../components/charts/PieChart';
import SchoolPerformanceChart from '../components/charts/SchoolPerformanceChart';
import SchoolCard from '../components/ui/SchoolCard';
import Card from '../components/ui/Card';
import { Search } from 'lucide-react';
import {  performanceIndicators, infrastructureData, performanceBySubject} from '../data/mockData';
import { supabase } from '../libs/supabase';

const Dashboard: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  
  const [schools, setSchools] = useState<any[]>([]);
   
    useEffect(() => {
      const fetchSchools = async () => {
        const { data, error } = await supabase.from('escolas').select('*');
        console.log('daaata',data);
        
        if (error) console.error('Erro ao buscar dados:', error);
        else setSchools(data);
      };
      fetchSchools();
    }, []);
  
  
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
        <p className="mt-1 text-sm text-gray-600">
          Visão geral do desempenho e infraestrutura das escolas
        </p>
      </div>
      
      {/* Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {performanceIndicators.map((stat, index) => (
          <StatCard key={index} stat={stat} />
        ))}
      </div>
      
      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <PerformanceBarChart 
          data={performanceBySubject}
          title="Desempenho por Componente Curricular"
        />
        <InfrastructurePieChart 
          data={infrastructureData}
          title="Infraestrutura das Escolas (%)"
        />
      </div>
      
      {/* School Performance */}
      <div>
        <SchoolPerformanceChart 
          schools={schools.slice(0, 5)} 
          title="Top 5 Escolas por Desempenho"
        />
      </div>
      
      {/* School List */}
      <div>
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-medium text-gray-900">Escolas Recentes</h2>
          
          {/* Search */}
          <div className="relative w-64">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Buscar escola..."
              className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {schools.length > 0 ? (
            schools.map(schools => (
              <SchoolCard key={schools.nome} school={schools} />
            ))
          ) : (
            <Card className="col-span-full p-8 text-center">
              <p className="text-gray-500">Nenhuma escola encontrada com os critérios de busca.</p>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;