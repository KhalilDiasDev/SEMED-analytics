import React, { useState, useCallback } from 'react';
import { Upload, CheckCircle, AlertCircle } from 'lucide-react';
import Papa from 'papaparse';

interface FileUploadProps {
  onDataImported: (data: any[]) => void;
  acceptedFileTypes?: string[];
}

const FileUpload: React.FC<FileUploadProps> = ({ 
  onDataImported, 
  acceptedFileTypes = ['.csv', '.xlsx', '.xls'] 
}) => {
  const [isDragging, setIsDragging] = useState(false);
  const [uploadStatus, setUploadStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState<string>('');

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  }, []);

  const processFile = useCallback((file: File) => {
    if (!file) return;

    const fileExtension = file.name.split('.').pop()?.toLowerCase();
    if (!acceptedFileTypes.some(type => type.includes(fileExtension || ''))) {
      setErrorMessage(`Tipo de arquivo não suportado. Por favor, use: ${acceptedFileTypes.join(', ')}`);
      setUploadStatus('error');
      return;
    }

    if (fileExtension === 'csv') {
      Papa.parse(file, {
        complete: (results) => {
          if (results.errors.length > 0) {
            setErrorMessage('Erro ao processar o arquivo CSV');
            setUploadStatus('error');
            return;
          }
          onDataImported(results.data);
          setUploadStatus('success');
        },
        header: true,
        skipEmptyLines: true
      });
    } else {
      // For Excel files, you would need to implement additional processing
      setErrorMessage('Processamento de arquivos Excel será implementado em breve');
      setUploadStatus('error');
    }
  }, [acceptedFileTypes, onDataImported]);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    
    const file = e.dataTransfer.files[0];
    processFile(file);
  }, [processFile]);

  const handleFileInput = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      processFile(file);
    }
  }, [processFile]);

  return (
    <div className="w-full p-6 bg-white rounded-lg shadow-md">
      <div
        className={`
          border-2 border-dashed rounded-lg p-8 text-center
          ${isDragging ? 'border-blue-500 bg-blue-50' : 'border-gray-300'}
          ${uploadStatus === 'success' ? 'border-green-500 bg-green-50' : ''}
          ${uploadStatus === 'error' ? 'border-red-500 bg-red-50' : ''}
        `}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        <input
          type="file"
          accept={acceptedFileTypes.join(',')}
          onChange={handleFileInput}
          className="hidden"
          id="file-upload"
        />
        
        {uploadStatus === 'idle' && (
          <>
            <Upload className="w-12 h-12 mx-auto text-gray-400" />
            <p className="mt-4 text-lg font-medium text-gray-700">
              Arraste e solte seu arquivo aqui
            </p>
            <p className="mt-2 text-sm text-gray-500">
              ou
            </p>
            <label
              htmlFor="file-upload"
              className="mt-4 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 cursor-pointer"
            >
              Selecionar Arquivo
            </label>
            <p className="mt-2 text-xs text-gray-500">
              Formatos suportados: {acceptedFileTypes.join(', ')}
            </p>
          </>
        )}

        {uploadStatus === 'success' && (
          <div className="text-green-600">
            <CheckCircle className="w-12 h-12 mx-auto" />
            <p className="mt-4 text-lg font-medium">Upload realizado com sucesso!</p>
          </div>
        )}

        {uploadStatus === 'error' && (
          <div className="text-red-600">
            <AlertCircle className="w-12 h-12 mx-auto" />
            <p className="mt-4 text-lg font-medium">Erro no upload</p>
            <p className="mt-2 text-sm">{errorMessage}</p>
            <button
              onClick={() => setUploadStatus('idle')}
              className="mt-4 px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
            >
              Tentar Novamente
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default FileUpload;