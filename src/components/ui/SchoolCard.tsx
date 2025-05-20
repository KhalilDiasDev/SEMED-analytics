import React from 'react';
import { School } from '../../types';
import { Link } from 'react-router-dom';
import { Wifi, BookOpen, FlaskConical, Monitor, MapPin } from 'lucide-react';
import Card from './Card';

interface SchoolCardProps {
  school: School;
}

const SchoolCard: React.FC<SchoolCardProps> = ({ school }) => {
  return (
    <Card className="h-full hover:shadow-md transition-shadow duration-200">
      <div className="flex justify-between items-start">
        <div>
          <h3 className="text-lg font-semibold text-gray-900 truncate" title={school.name}>
            {school.name}
          </h3>
          <p className="text-sm text-gray-500">{school.code}</p>
        </div>
        <div className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-sm font-medium">
          {school.averagePerformance.toFixed(1)}%
        </div>
      </div>
      
      <div className="mt-4 flex items-center text-sm text-gray-600">
        <MapPin size={16} className="mr-1" />
        <span>{school.city}, {school.state} ({school.region})</span>
      </div>
      
      <div className="mt-4 grid grid-cols-2 gap-2">
        <div className={`flex items-center text-sm ${school.hasInternet ? 'text-green-600' : 'text-gray-400'}`}>
          <Wifi size={16} className="mr-1" />
          <span>Internet</span>
        </div>
        <div className={`flex items-center text-sm ${school.hasLibrary ? 'text-green-600' : 'text-gray-400'}`}>
          <BookOpen size={16} className="mr-1" />
          <span>Biblioteca</span>
        </div>
        <div className={`flex items-center text-sm ${school.hasLaboratory ? 'text-green-600' : 'text-gray-400'}`}>
          <FlaskConical size={16} className="mr-1" />
          <span>Laboratório</span>
        </div>
        <div className={`flex items-center text-sm ${school.hasComputerLab ? 'text-green-600' : 'text-gray-400'}`}>
          <Monitor size={16} className="mr-1" />
          <span>Lab. Informática</span>
        </div>
      </div>
      
      <div className="mt-4 flex justify-between">
        <Link 
          to={`/schools/${school.id}`}
          className="text-blue-600 hover:text-blue-800 text-sm font-medium"
        >
          Ver detalhes
        </Link>
        <Link 
          to={`/comparison?school1=${school.id}`}
          className="text-green-600 hover:text-green-800 text-sm font-medium"
        >
          Comparar
        </Link>
      </div>
    </Card>
  );
};

export default SchoolCard;