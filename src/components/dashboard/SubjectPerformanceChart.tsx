import React from 'react';

interface SubjectPerformanceChartProps {
  data: {
    subject: string;
    score: number;
  }[];
}

const SubjectPerformanceChart: React.FC<SubjectPerformanceChartProps> = ({ data }) => {
  const maxScore = 100; // Assuming score is out of 100
  
  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h3 className="text-lg font-semibold mb-4">Performance by Subject</h3>
      <div className="space-y-4">
        {data.map((item) => {
          const percentage = (item.score / maxScore) * 100;
          let barColor = 'bg-red-500';
          
          if (percentage >= 80) {
            barColor = 'bg-green-500';
          } else if (percentage >= 60) {
            barColor = 'bg-yellow-500';
          } else if (percentage >= 40) {
            barColor = 'bg-orange-500';
          }
          
          return (
            <div key={item.subject}>
              <div className="flex justify-between items-center mb-1">
                <span className="text-sm font-medium text-gray-700">{item.subject}</span>
                <span className="text-sm font-semibold">{item.score}/{maxScore}</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2.5">
                <div 
                  className={`${barColor} h-2.5 rounded-full transition-all duration-500 ease-in-out`} 
                  style={{ width: `${percentage}%` }}
                ></div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default SubjectPerformanceChart;