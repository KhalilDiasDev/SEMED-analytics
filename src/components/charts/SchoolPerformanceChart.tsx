import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { School } from '../../types';
import Card from '../ui/Card';

interface SchoolPerformanceChartProps {
  schools: School[];
  title: string;
}

const SchoolPerformanceChart: React.FC<SchoolPerformanceChartProps> = ({ schools, title }) => {
  // Prepare data for the chart
  const data = schools.map(school => ({
    name: school.name.length > 20 ? `${school.name.substring(0, 18)}...` : school.name,
    fullName: school.name,
    performance: school.averagePerformance,
    code: school.code
  }));

  return (
    <Card className="h-full">
      <h3 className="text-lg font-medium text-gray-900 mb-4">{title}</h3>
      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={data}
            layout="vertical"
            margin={{
              top: 5,
              right: 30,
              left: 120,
              bottom: 5,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" horizontal={true} vertical={false} />
            <XAxis type="number" domain={[0, 100]} />
            <YAxis type="category" dataKey="name" width={120} />
            <Tooltip
              formatter={(value: number) => [`${value.toFixed(1)}%`, 'Desempenho']}
              labelFormatter={(label) => data.find(item => item.name === label)?.fullName || label}
              contentStyle={{ 
                backgroundColor: '#ffffff', 
                border: '1px solid #e5e7eb',
                borderRadius: '6px',
                boxShadow: '0 1px 2px 0 rgba(0, 0, 0, 0.05)'
              }}
            />
            <Bar 
              dataKey="performance" 
              fill="#3B82F6" 
              radius={[0, 4, 4, 0]} 
              animationDuration={1000}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
};

export default SchoolPerformanceChart;