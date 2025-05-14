import React from 'react';

interface SchoolData {
  name: string;
  performance: number;
  infrastructure: number;
}

interface SchoolComparisonChartProps {
  schools: SchoolData[];
}

const SchoolComparisonChart: React.FC<SchoolComparisonChartProps> = ({ schools }) => {
  // Sort schools by performance for the display
  const sortedSchools = [...schools].sort((a, b) => b.performance - a.performance);
  
  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h3 className="text-lg font-semibold mb-4">School Performance Comparison</h3>
      <div className="space-y-6">
        {sortedSchools.map((school, index) => {
          // Calculate colors based on performance
          const performanceColor = 
            school.performance >= 80 ? 'bg-green-500' : 
            school.performance >= 60 ? 'bg-yellow-500' : 
            'bg-red-500';
            
          const infrastructureColor = 
            school.infrastructure >= 80 ? 'bg-green-500' : 
            school.infrastructure >= 60 ? 'bg-yellow-500' : 
            'bg-red-500';
          
          return (
            <div key={school.name} className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="font-medium text-gray-800">{index + 1}. {school.name}</span>
              </div>
              <div className="space-y-1">
                <div className="flex justify-between items-center text-sm">
                  <span className="text-gray-600">Academic Performance</span>
                  <span className="font-medium">{school.performance}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className={`${performanceColor} h-2 rounded-full transition-all duration-500 ease-in-out`} 
                    style={{ width: `${school.performance}%` }}
                  ></div>
                </div>
              </div>
              <div className="space-y-1">
                <div className="flex justify-between items-center text-sm">
                  <span className="text-gray-600">Infrastructure Quality</span>
                  <span className="font-medium">{school.infrastructure}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className={`${infrastructureColor} h-2 rounded-full transition-all duration-500 ease-in-out`} 
                    style={{ width: `${school.infrastructure}%` }}
                  ></div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default SchoolComparisonChart;