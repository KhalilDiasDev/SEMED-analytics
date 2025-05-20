import React, { useState } from 'react';
import Card from '../components/ui/Card';
import { Upload, FileCheck, AlertCircle } from 'lucide-react';

type FileType = 'school' | 'performance' | 'teachers';
type UploadStatus = 'idle' | 'processing' | 'success' | 'error';

interface FileState {
  type: FileType;
  name: string;
  status: UploadStatus;
  message?: string;
}

const DataUpload: React.FC = () => {
  const [files, setFiles] = useState<FileState[]>([]);
  
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>, type: FileType) => {
    const uploadedFiles = e.target.files;
    if (!uploadedFiles || uploadedFiles.length === 0) return;
    
    // In a real app, we would actually upload and validate the file here
    // For this demo, we'll simulate the process
    const file = uploadedFiles[0];
    
    // Add file to the list with processing status
    setFiles(prevFiles => [
      ...prevFiles,
      {
        type,
        name: file.name,
        status: 'processing'
      }
    ]);
    
    // Simulate processing delay
    setTimeout(() => {
      setFiles(prevFiles => {
        const updatedFiles = [...prevFiles];
        const fileIndex = updatedFiles.findIndex(f => f.name === file.name && f.type === type);
        
        if (fileIndex >= 0) {
          // Simulate validation results
          // In a real app, this would be based on actual file validation
          if (file.name.endsWith('.csv') || file.name.endsWith('.xlsx')) {
            updatedFiles[fileIndex] = {
              ...updatedFiles[fileIndex],
              status: 'success',
              message: 'Arquivo validado com sucesso!'
            };
          } else {
            updatedFiles[fileIndex] = {
              ...updatedFiles[fileIndex],
              status: 'error',
              message: 'Formato de arquivo inválido. Por favor, envie um arquivo CSV ou XLSX.'
            };
          }
        }
        
        return updatedFiles;
      });
    }, 1500);
  };
  
  const handleRemoveFile = (name: string, type: FileType) => {
    setFiles(prevFiles => prevFiles.filter(f => !(f.name === name && f.type === type)));
  };
  
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Upload de Dados</h1>
        <p className="mt-1 text-sm text-gray-600">
          Importe arquivos de dados para atualizar informações das escolas e desempenho
        </p>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* School Data Upload */}
        <Card>
          <div className="text-center p-6">
            <div className="mx-auto h-12 w-12 flex items-center justify-center rounded-full bg-blue-100 mb-4">
              <Upload className="h-6 w-6 text-blue-600" />
            </div>
            <h3 className="text-lg font-medium text-gray-900">Dados das Escolas</h3>
            <p className="mt-2 text-sm text-gray-500">
              Importe dados básicos das escolas, como código, nome, localização e infraestrutura.
            </p>
            <label className="mt-4 inline-flex items-center px-4 py-2 border border-blue-300 shadow-sm text-sm font-medium rounded-md text-blue-700 bg-white hover:bg-blue-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 cursor-pointer">
              Selecionar Arquivo
              <input
                type="file"
                className="sr-only"
                accept=".csv,.xlsx"
                onChange={(e) => handleFileChange(e, 'school')}
              />
            </label>
          </div>
        </Card>
        
        {/* Performance Data Upload */}
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
                onChange={(e) => handleFileChange(e, 'performance')}
              />
            </label>
          </div>
        </Card>
        
        {/* Teacher Data Upload */}
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
      </div>
      
      {/* File Upload Status */}
      {files.length > 0 && (
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
                      {file.type === 'school' && 'Dados das Escolas'}
                      {file.type === 'performance' && 'Dados de Desempenho'}
                      {file.type === 'teachers' && 'Dados de Professores'}
                    </p>
                    {file.message && (
                      <p className={`text-xs mt-1 ${file.status === 'error' ? 'text-red-500' : 'text-green-500'}`}>
                        {file.message}
                      </p>
                    )}
                  </div>
                </div>
                
                <button
                  type="button"
                  className="ml-4 text-sm font-medium text-red-600 hover:text-red-500"
                  onClick={() => handleRemoveFile(file.name, file.type)}
                >
                  Remover
                </button>
              </li>
            ))}
          </ul>
          
          {/* Process button would be enabled only when files are valid */}
          <div className="mt-6 flex justify-end">
            <button
              type="button"
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              disabled={!files.some(file => file.status === 'success')}
            >
              Processar Arquivos
            </button>
          </div>
        </Card>
      )}
      
      {/* Guidelines Card */}
      <Card>
        <h3 className="text-lg font-medium text-gray-900 mb-4">Orientações para Upload</h3>
        
        <div className="space-y-4">
          <div>
            <h4 className="text-sm font-medium text-gray-900 mb-1">Formato dos Arquivos</h4>
            <p className="text-sm text-gray-600">
              Aceitamos arquivos no formato CSV ou Excel (XLSX). Certifique-se de que o arquivo não excede 10MB.
            </p>
          </div>
          
          <div>
            <h4 className="text-sm font-medium text-gray-900 mb-1">Dados das Escolas</h4>
            <p className="text-sm text-gray-600">
              O arquivo deve conter as seguintes colunas:
            </p>
            <ul className="mt-2 list-disc list-inside text-sm text-gray-600">
              <li>código_escola (obrigatório)</li>
              <li>nome_escola</li>
              <li>cidade</li>
              <li>estado</li>
              <li>região</li>
              <li>internet (sim/não)</li>
              <li>biblioteca (sim/não)</li>
              <li>laboratorio (sim/não)</li>
              <li>lab_informatica (sim/não)</li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-sm font-medium text-gray-900 mb-1">Dados de Desempenho</h4>
            <p className="text-sm text-gray-600">
              O arquivo deve conter as seguintes colunas:
            </p>
            <ul className="mt-2 list-disc list-inside text-sm text-gray-600">
              <li>código_escola (obrigatório)</li>
              <li>código_habilidade (obrigatório)</li>
              <li>componente_curricular</li>
              <li>descrição_habilidade</li>
              <li>percentual_acertos</li>
            </ul>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default DataUpload;