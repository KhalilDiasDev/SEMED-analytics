// components/upload/SchoolUpload.tsx
import React from 'react';
import { Upload } from 'lucide-react';
import Card from '../ui/Card';
import { FileType } from '../../types/upload';

interface SchoolUploadProps {
  onFileChange: (e: React.ChangeEvent<HTMLInputElement>, type: FileType) => void;
}

const SchoolUpload: React.FC<SchoolUploadProps> = ({ onFileChange }) => {
  return (
    <Card>
      <div className="text-center p-6">
        <div className="mx-auto h-12 w-12 flex items-center justify-center rounded-full bg-blue-100 mb-4">
          <Upload className="h-6 w-6 text-blue-600" />
        </div>
        <h3 className="text-lg font-medium text-gray-900">Dados das Escolas</h3>
        <p className="mt-2 text-sm text-gray-500">
          Importe dados básicos das escolas e infraestrutura.
        </p>
        <label className="mt-4 inline-flex items-center px-4 py-2 border border-blue-300 shadow-sm text-sm font-medium rounded-md text-blue-700 bg-white hover:bg-blue-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 cursor-pointer">
          Selecionar Arquivo
          <input
            type="file"
            className="sr-only"
            accept=".csv,.xlsx"
            onChange={(e) => onFileChange(e, 'school')}
          />
        </label>
      </div>
    </Card>
  );
};

export default SchoolUpload;