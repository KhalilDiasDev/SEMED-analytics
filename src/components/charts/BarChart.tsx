import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { PerformanceBySubject } from '../../types';
import Card from '../ui/Card';

interface PerformanceBarChartProps {
  data: PerformanceBySubject[];
  title: string;
}

const PerformanceBarChart: React.FC<PerformanceBarChartProps> = ({ data, title }) => {
  return (
    <Card className="h-full">
      <h3 className="text-lg font-medium text-gray-900 mb-4">{title}</h3>
      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={data}
            margin={{
              top: 5,
              right: 30,
              left: 20,
              bottom: 5,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" vertical={false} />
            <XAxis dataKey="subject" />
            <YAxis domain={[0, 100]} />
            <Tooltip
              formatter={(value: number) => [`${value.toFixed(1)}%`, 'Desempenho']}
              labelStyle={{ color: '#111827' }}
              contentStyle={{ 
                backgroundColor: '#ffffff', 
                border: '1px solid #e5e7eb',
                borderRadius: '6px',
                boxShadow: '0 1px 2px 0 rgba(0, 0, 0, 0.05)'
              }}
            />
            <Bar dataKey="performance" fill={(entry) => entry.color} radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
};

export default PerformanceBarChart;