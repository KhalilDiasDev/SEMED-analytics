import React from 'react';
import { School } from '../../types';
import { Building2, Wifi, BookOpen, Dumbbell, Thermometer, Armchair as Wheelchair, Sun } from 'lucide-react';

interface InfrastructureAnalysisProps {
  schools: School[];
}

const InfrastructureAnalysis: React.FC<InfrastructureAnalysisProps> = ({ schools }) => {
  const calculateInfrastructureScore = (school: School) => {
    const infra = school.infrastructure;
    let score = 0;
    const features = [
      infra.hasLibrary,
      infra.hasLaboratory,
      infra.hasInternet,
      infra.hasComputerLab,
      infra.hasSportsField,
      infra.hasAirConditioning,
      infra.hasAccessibility,
      infra.hasRecreationArea
    ];
    
    score += features.filter(Boolean).length * 10;
    
    const conditions = {
      poor: 0,
      adequate: 5,
      good: 7.5,
      excellent: 10
    };
    
    score += conditions[infra.condition];
    score += conditions[infra.maintenanceStatus];
    score += conditions[infra.lighting];
    score += conditions[infra.furniture];
    
    return Math.min(100, score);
  };

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {schools.map((school) => (
          <div key={school.id} className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-lg font-semibold mb-4">{school.name}</h3>
            
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <Building2 className="w-5 h-5 text-blue-600 mr-2" />
                  <span>Overall Condition</span>
                </div>
                <span className="capitalize font-medium">{school.infrastructure.condition}</span>
              </div>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <Wifi className="w-5 h-5 text-blue-600 mr-2" />
                  <span>Internet Access</span>
                </div>
                <span>{school.infrastructure.hasInternet ? "Available" : "Not Available"}</span>
              </div>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <BookOpen className="w-5 h-5 text-blue-600 mr-2" />
                  <span>Library</span>
                </div>
                <span>{school.infrastructure.hasLibrary ? "Available" : "Not Available"}</span>
              </div>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <Dumbbell className="w-5 h-5 text-blue-600 mr-2" />
                  <span>Sports Field</span>
                </div>
                <span>{school.infrastructure.hasSportsField ? "Available" : "Not Available"}</span>
              </div>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <Thermometer className="w-5 h-5 text-blue-600 mr-2" />
                  <span>Air Conditioning</span>
                </div>
                <span>{school.infrastructure.hasAirConditioning ? "Available" : "Not Available"}</span>
              </div>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <Wheelchair className="w-5 h-5 text-blue-600 mr-2" />
                  <span>Accessibility</span>
                </div>
                <span>{school.infrastructure.hasAccessibility ? "Available" : "Not Available"}</span>
              </div>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <Sun className="w-5 h-5 text-blue-600 mr-2" />
                  <span>Lighting</span>
                </div>
                <span className="capitalize">{school.infrastructure.lighting}</span>
              </div>
              
              <div className="mt-6">
                <div className="flex justify-between items-center mb-2">
                  <span className="font-medium">Infrastructure Score</span>
                  <span className="font-bold">{calculateInfrastructureScore(school)}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2.5">
                  <div 
                    className="bg-blue-600 h-2.5 rounded-full"
                    style={{ width: `${calculateInfrastructureScore(school)}%` }}
                  ></div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default InfrastructureAnalysis;