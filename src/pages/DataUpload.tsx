// pages/DataUpload.tsx
import React from 'react';
import { useFileUpload } from '../hooks/useFileUpload';
import SchoolUpload from '../components/upload/SchoolUpload';
import PerformanceUpload from '../components/upload/PerformanceUpload';
import TeacherUpload from '../components/upload/TeacherUpload';
import FileList from '../components/upload/FileList';
import UploadGuidelines from '../components/upload/UploadGuidelines';

const DataUpload: React.FC = () => {
  const {
    files,
    isUploading,
    uploadProgress,
    handleFileChange,
    handleRemoveFile,
    handleProcessFiles
  } = useFileUpload();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Upload de Dados</h1>
        <p className="mt-1 text-sm text-gray-600">
          Importe arquivos de dados para atualizar informações das escolas e desempenho
        </p>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <SchoolUpload onFileChange={handleFileChange} />
        <PerformanceUpload onFileChange={handleFileChange} />
        <TeacherUpload onFileChange={handleFileChange} />
      </div>
      
      <FileList
        files={files}
        isUploading={isUploading}
        uploadProgress={uploadProgress}
        onRemoveFile={handleRemoveFile}
        onProcessFiles={handleProcessFiles}
      />
      
      <UploadGuidelines />
    </div>
  );
};

export default DataUpload;