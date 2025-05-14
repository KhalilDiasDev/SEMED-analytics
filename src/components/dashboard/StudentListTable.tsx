import React from 'react';
import { Student } from '../../types';
import { MoreHorizontal, ArrowUpDown } from 'lucide-react';

interface StudentListTableProps {
  students: Student[];
}

const StudentListTable: React.FC<StudentListTableProps> = ({ students }) => {
  // Calculate average performance for each student
  const studentsWithAvg = students.map(student => {
    const totalScore = student.performanceData.reduce((sum, data) => sum + data.score, 0);
    const avgScore = totalScore / student.performanceData.length;
    return {
      ...student,
      averageScore: avgScore
    };
  });

  // Sort students by average score (descending)
  const sortedStudents = [...studentsWithAvg].sort((a, b) => b.averageScore - a.averageScore);
  
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <div className="p-6 pb-4">
        <h3 className="text-lg font-semibold">Student Performance</h3>
        <p className="text-sm text-gray-500 mt-1">Ranked by average score across all subjects</p>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Student
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Grade
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                School
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider flex items-center">
                <span>Avg. Score</span>
                <ArrowUpDown className="ml-1 h-3 w-3" />
              </th>
              <th scope="col" className="relative px-6 py-3">
                <span className="sr-only">Actions</span>
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {sortedStudents.map((student) => {
              // Determine color based on average score
              let scoreColor = 'text-red-500';
              if (student.averageScore >= 80) {
                scoreColor = 'text-green-600';
              } else if (student.averageScore >= 60) {
                scoreColor = 'text-yellow-600';
              } else if (student.averageScore >= 40) {
                scoreColor = 'text-orange-500';
              }
              
              return (
                <tr key={student.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">{student.name}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-500">{student.grade}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-500">{student.school}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className={`text-sm font-medium ${scoreColor}`}>
                      {student.averageScore.toFixed(1)}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <button className="text-gray-400 hover:text-gray-500 focus:outline-none">
                      <MoreHorizontal className="h-5 w-5" />
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      <div className="bg-gray-50 px-6 py-3 flex items-center justify-between border-t border-gray-200">
        <div className="text-sm text-gray-500">
          Showing <span className="font-medium">{students.length}</span> students
        </div>
        <a href="#students" className="text-sm font-medium text-blue-600 hover:text-blue-500">
          View all students
        </a>
      </div>
    </div>
  );
};

export default StudentListTable;