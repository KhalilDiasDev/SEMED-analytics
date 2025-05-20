import React from 'react';
import { ArrowUpRight, ArrowDownRight, Minus } from 'lucide-react';
import { PerformanceIndicator } from '../../types';
import Card from './Card';

interface StatCardProps {
  stat: PerformanceIndicator;
}

const StatCard: React.FC<StatCardProps> = ({ stat }) => {
  const { title, value, previousValue, unit, trend } = stat;
  
  const percentChange = ((value - previousValue) / previousValue) * 100;
  const changeText = previousValue ? `${percentChange.toFixed(1)}%` : 'N/A';
  
  let TrendIcon;
  let trendColorClass;
  
  switch (trend) {
    case 'up':
      TrendIcon = ArrowUpRight;
      trendColorClass = 'text-green-500';
      break;
    case 'down':
      TrendIcon = ArrowDownRight;
      trendColorClass = 'text-red-500';
      break;
    default:
      TrendIcon = Minus;
      trendColorClass = 'text-gray-500';
  }
  
  return (
    <Card className="h-full transition-all duration-200 hover:shadow-md">
      <h3 className="text-sm font-medium text-gray-500">{title}</h3>
      <div className="mt-2 flex items-baseline">
        <p className="text-2xl font-semibold text-gray-900">
          {value.toLocaleString()}{unit}
        </p>
        <p className={`ml-2 flex items-baseline text-sm font-semibold ${trendColorClass}`}>
          <TrendIcon className="self-center flex-shrink-0 h-4 w-4 mr-0.5" />
          <span>{changeText}</span>
        </p>
      </div>
    </Card>
  );
};

export default StatCard;