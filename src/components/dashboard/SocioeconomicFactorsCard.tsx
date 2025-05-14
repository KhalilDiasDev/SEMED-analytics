import React from 'react';
import { DollarSign, WifiOff, Bus } from 'lucide-react';

interface SocioeconomicFactorsCardProps {
  region: string;
  averageIncome: number;
  unemploymentRate: number;
  accessToTechnology: number;
  transportQuality: string;
}

const SocioeconomicFactorsCard: React.FC<SocioeconomicFactorsCardProps> = ({
  region,
  averageIncome,
  unemploymentRate,
  accessToTechnology,
  transportQuality,
}) => {
  // Determine transport quality icon color
  const transportColorMap: Record<string, string> = {
    'poor': 'text-red-500',
    'adequate': 'text-yellow-500',
    'good': 'text-green-500',
    'excellent': 'text-green-600',
  };
  
  const transportColor = transportColorMap[transportQuality] || 'text-gray-500';
  
  // Determine technology access color
  let techAccessColor = 'text-red-500';
  if (accessToTechnology >= 80) {
    techAccessColor = 'text-green-500';
  } else if (accessToTechnology >= 60) {
    techAccessColor = 'text-yellow-500';
  } else if (accessToTechnology >= 40) {
    techAccessColor = 'text-orange-500';
  }
  
  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h3 className="text-lg font-semibold mb-2">Socioeconomic Factors</h3>
      <p className="text-sm text-gray-500 mb-4">{region}</p>
      
      <div className="space-y-4">
        <div className="flex items-start">
          <div className="p-2 bg-blue-50 rounded-full mr-3">
            <DollarSign className="h-5 w-5 text-blue-600" />
          </div>
          <div>
            <p className="text-sm font-medium text-gray-700">Economic Indicators</p>
            <div className="mt-1 grid grid-cols-2 gap-2">
              <div>
                <p className="text-xs text-gray-500">Avg. Income</p>
                <p className="font-semibold">R$ {averageIncome.toLocaleString()}</p>
              </div>
              <div>
                <p className="text-xs text-gray-500">Unemployment</p>
                <p className="font-semibold">{unemploymentRate}%</p>
              </div>
            </div>
          </div>
        </div>
        
        <div className="flex items-start">
          <div className="p-2 bg-blue-50 rounded-full mr-3">
            <WifiOff className={`h-5 w-5 ${techAccessColor}`} />
          </div>
          <div>
            <p className="text-sm font-medium text-gray-700">Technology Access</p>
            <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
              <div 
                className={`bg-blue-600 h-2 rounded-full transition-all duration-500 ease-in-out`} 
                style={{ width: `${accessToTechnology}%` }}
              ></div>
            </div>
            <p className="text-xs text-gray-500 mt-1">{accessToTechnology}% of students have access</p>
          </div>
        </div>
        
        <div className="flex items-start">
          <div className="p-2 bg-blue-50 rounded-full mr-3">
            <Bus className={`h-5 w-5 ${transportColor}`} />
          </div>
          <div>
            <p className="text-sm font-medium text-gray-700">Transport Quality</p>
            <p className="text-sm capitalize">{transportQuality}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SocioeconomicFactorsCard;