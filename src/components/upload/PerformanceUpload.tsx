// components/upload/PerformanceUpload.tsx
import React from 'react';
import { Upload } from 'lucide-react';
import Card from '../ui/Card';
import { FileType } from '../../types/upload';

interface PerformanceUploadProps {
  onFileChange: (e: React.ChangeEvent<HTMLInputElement>, type: FileType) => void;
}

const PerformanceUpload: React.FC<PerformanceUploadProps> = ({ onFileChange }) => {
  return (
    <Card>
      <div className="text-center p-6">
        <div className="mx-auto h-12 w-12 flex items-center justify-center rounded-full bg-green-100 mb-4">
          <Upload className="h-6 w-6 text-green-600" />
        </div>
        <h3 className="text-lg font-medium text-gray-900">Dados de Desempenho</h3>
        <p className="mt-2 text-sm text-gray-500">
          Importe resultados de avaliações e desempenho por habilidade.
        </p>
        <label className="mt-4 inline-flex items-center px-4 py-2 border border-green-300 shadow-sm text-sm font-medium rounded-md text-green-700 bg-white hover:bg-green-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 cursor-pointer">
          Selecionar Arquivo
          <input
            type="file"
            className="sr-only"
            accept=".csv,.xlsx"
            onChange={(e) => onFileChange(e, 'performance')}
          />
        </label>
      </div>
    </Card>
  );
};

export default PerformanceUpload;