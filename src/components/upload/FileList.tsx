// components/upload/FileList.tsx
import React from 'react';
import { FileCheck, AlertCircle } from 'lucide-react';
import Card from '../ui/Card';
import { FileState, FileType } from '../../types/upload';

interface FileListProps {
  files: FileState[];
  isUploading: boolean;
  uploadProgress: number;
  onRemoveFile: (name: string, type: FileType) => void;
  onProcessFiles: () => void;
}

const FileList: React.FC<FileListProps> = ({
  files,
  isUploading,
  uploadProgress,
  onRemoveFile,
  onProcessFiles
}) => {
  if (files.length === 0) return null;

  const getFileTypeLabel = (type: FileType): string => {
    const labels = {
      school: 'Dados das Escolas',
      performance: 'Dados de Desempenho',
      teachers: 'Dados de Professores'
    };
    return labels[type];
  };

  return (
    <Card>
      <h3 className="text-lg font-medium text-gray-900 mb-4">Arquivos Enviados</h3>
      <ul className="divide-y divide-gray-200">
        {files.map((file, index) => (
          <li key={index} className="py-4 flex items-center justify-between">
            <div className="flex items-center">
              {file.status === 'processing' && (
                <div className="h-5 w-5 mr-3 animate-spin rounded-full border-b-2 border-gray-400"></div>
              )}
              {file.status === 'success' && (
                <FileCheck className="h-5 w-5 mr-3 text-green-500" />
              )}
              {file.status === 'error' && (
                <AlertCircle className="h-5 w-5 mr-3 text-red-500" />
              )}
              <div>
                <p className="text-sm font-medium text-gray-900">{file.name}</p>
                <p className="text-xs text-gray-500">
                  {getFileTypeLabel(file.type)}
                </p>
                {file.message && (
                  <p className={`text-xs mt-1 ${file.status === 'error' ? 'text-red-500' : 'text-green-500'}`}>
                    {file.message}
                  </p>
                )}
                {file.data && (
                  <p className="text-xs text-gray-500 mt-1">
                    {file.data.length} registros encontrados
                  </p>
                )}
              </div>
            </div>
            
            <button
              type="button"
              className="ml-4 text-sm font-medium text-red-600 hover:text-red-500"
              onClick={() => onRemoveFile(file.name, file.type)}
            >
              Remover
            </button>
          </li>
        ))}
      </ul>
      
      {/* Upload Progress */}
      {isUploading && (
        <div className="mt-4">
          <div className="text-sm font-medium text-gray-700 mb-1">
            Enviando dados para o banco... {uploadProgress}%
          </div>
          <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
            <div 
              className="h-full bg-blue-500 rounded-full" 
              style={{ width: `${uploadProgress}%` }}
            ></div>
          </div>
        </div>
      )}
      
      {/* Process button */}
      <div className="mt-6 flex justify-end">
        <button
          type="button"
          className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
          disabled={!files.some(file => file.status === 'success') || isUploading}
          onClick={onProcessFiles}
        >
          {isUploading ? 'Processando...' : 'Processar Arquivos'}
        </button>
      </div>
    </Card>
  );
};

export default FileList;