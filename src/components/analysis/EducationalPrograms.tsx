import React from 'react';
import { School } from '../../types';
import { Utensils, BookOpen, Bus } from 'lucide-react';

interface EducationalProgramsProps {
  schools: School[];
}

const EducationalPrograms: React.FC<EducationalProgramsProps> = ({ schools }) => {
  const calculateMealProgramScore = (school: School) => {
    if (!school.mealProgram) return 0;
    
    const qualityScores = {
      poor: 25,
      adequate: 50,
      good: 75,
      excellent: 100
    };
    
    return school.mealProgram.available 
      ? (qualityScores[school.mealProgram.quality] + (school.mealProgram.mealsPerDay * 10))
      : 0;
  };

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {schools.map((school) => (
          <div key={school.id} className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-lg font-semibold mb-4">{school.name}</h3>
            
            {/* Meal Program Section */}
            <div className="mb-6">
              <div className="flex items-center mb-3">
                <Utensils className="h-5 w-5 text-blue-600 mr-2" />
                <h4 className="font-medium">Meal Program</h4>
              </div>
              <div className="pl-7 space-y-2">
                {school.mealProgram ? (
                  <>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Status:</span>
                      <span className={school.mealProgram.available ? 'text-green-600' : 'text-red-600'}>
                        {school.mealProgram.available ? 'Active' : 'Inactive'}
                      </span>
                    </div>
                    {school.mealProgram.available && (
                      <>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Quality:</span>
                          <span className="capitalize">{school.mealProgram.quality}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Meals per day:</span>
                          <span>{school.mealProgram.mealsPerDay}</span>
                        </div>
                      </>
                    )}
                  </>
                ) : (
                  <p className="text-gray-500 italic">No meal program data available</p>
                )}
              </div>
            </div>

            {/* Educational Programs Section */}
            <div className="mb-6">
              <div className="flex items-center mb-3">
                <BookOpen className="h-5 w-5 text-blue-600 mr-2" />
                <h4 className="font-medium">Special Programs</h4>
              </div>
              <div className="pl-7">
                {school.educationalPrograms && school.educationalPrograms.length > 0 ? (
                  <ul className="list-disc pl-5 space-y-1">
                    {school.educationalPrograms.map((program, index) => (
                      <li key={index} className="text-gray-600">{program}</li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-gray-500 italic">No special programs available</p>
                )}
              </div>
            </div>

            {/* Transportation Section */}
            <div className="mb-6">
              <div className="flex items-center mb-3">
                <Bus className="h-5 w-5 text-blue-600 mr-2" />
                <h4 className="font-medium">Transportation</h4>
              </div>
              <div className="pl-7">
                <div className="flex justify-between">
                  <span className="text-gray-600">Quality:</span>
                  <span className="capitalize">
                    {school.infrastructure?.condition || 'Not available'}
                  </span>
                </div>
              </div>
            </div>

            {/* Overall Program Score */}
            <div className="mt-6 pt-6 border-t border-gray-200">
              <div className="flex justify-between items-center mb-2">
                <span className="font-medium">Program Effectiveness Score</span>
                <span className="font-bold">{calculateMealProgramScore(school)}%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2.5">
                <div 
                  className="bg-blue-600 h-2.5 rounded-full"
                  style={{ width: `${calculateMealProgramScore(school)}%` }}
                ></div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default EducationalPrograms;