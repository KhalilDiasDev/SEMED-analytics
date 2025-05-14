import React from 'react';
import { ArrowUpRight, ArrowDownRight, BarChart2 } from 'lucide-react';

interface PerformanceCardProps {
  title: string;
  value: number;
  change: number;
  unit?: string;
  icon?: React.ReactNode;
}

const PerformanceCard: React.FC<PerformanceCardProps> = ({ 
  title, 
  value, 
  change, 
  unit = '', 
  icon = <BarChart2 className="h-6 w-6 text-blue-600" />
}) => {
  const isPositive = change >= 0;
  const changeColor = isPositive ? 'text-green-600' : 'text-red-600';
  const changeIcon = isPositive ? <ArrowUpRight className="h-4 w-4" /> : <ArrowDownRight className="h-4 w-4" />;
  
  return (
    <div className="bg-white rounded-lg shadow-md p-6 transition-transform duration-200 hover:translate-y-[-4px]">
      <div className="flex justify-between items-start">
        <div>
          <p className="text-sm text-gray-500 font-medium">{title}</p>
          <p className="mt-2 text-3xl font-bold">
            {value}{unit}
          </p>
        </div>
        <div className="p-2 bg-blue-50 rounded-full">
          {icon}
        </div>
      </div>
      <div className="mt-4">
        <div className={`flex items-center ${changeColor}`}>
          {changeIcon}
          <span className="ml-1 text-sm font-medium">
            {Math.abs(change)}% {isPositive ? 'increase' : 'decrease'} from last semester
          </span>
        </div>
      </div>
    </div>
  );
};

export default PerformanceCard;