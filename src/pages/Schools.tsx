import React, { useEffect, useState } from 'react';
import SchoolCard from '../components/ui/SchoolCard';
import Card from '../components/ui/Card';
import { supabase } from '../libs/supabase';
import { School } from '../types';

const Schools: React.FC = () => {
  
  const [schools, setSchools] = useState<School[]>([]);
   
    useEffect(() => {
      const fetchSchools = async () => {
        const { data, error } = await supabase.from('escolas').select('*');
        if (error) console.error('Erro ao buscar dados:', error);
        else setSchools(data);
      };
      fetchSchools();
    }, []);
  
    console.log(schools);
    
  
  return (
    <div className="space-y-6">
 
    
        
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
  );
};

export default Schools;