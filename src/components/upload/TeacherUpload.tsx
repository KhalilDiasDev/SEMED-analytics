// components/upload/TeacherUpload.tsx
import React from 'react';
import { Upload } from 'lucide-react';
import Card from '../ui/Card';
import { FileType } from '../../types/upload';

interface TeacherUploadProps {
  onFileChange: (e: React.ChangeEvent<HTMLInputElement>, type: FileType) => void;
}

const TeacherUpload: React.FC<TeacherUploadProps> = ({ onFileChange }) => {
  return (
    <Card>
      <div className="text-center p-6">
        <div className="mx-auto h-12 w-12 flex items-center justify-center rounded-full bg-amber-100 mb-4">
          <Upload className="h-6 w-6 text-amber-600" />
        </div>
        <h3 className="text-lg font-medium text-gray-900">Dados de Professores</h3>
        <p className="mt-2 text-sm text-gray-500">
          Importe informações sobre professores e suas qualificações (futuro).
        </p>
        <label className="mt-4 inline-flex items-center px-4 py-2 border border-amber-300 shadow-sm text-sm font-medium rounded-md text-amber-700 bg-white hover:bg-amber-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-amber-500 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed" 
          aria-disabled="true">
          Em breve
          <input
            type="file"
            className="sr-only"
            accept=".csv,.xlsx"
            disabled
          />
        </label>
      </div>
    </Card>
  );
};

export default TeacherUpload;