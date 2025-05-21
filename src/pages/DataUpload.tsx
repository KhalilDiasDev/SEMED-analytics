import React, { useState } from 'react';
import Card from '../components/ui/Card';
import { Upload, FileCheck, AlertCircle } from 'lucide-react';
import { createClient } from '@supabase/supabase-js';
import Papa from 'papaparse';
// Configuração do Supabase
// Substitua com suas credenciais reais
const supabaseUrl = 'https://uzbulczrtaxrdzxfnxnq.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InV6YnVsY3pydGF4cmR6eGZueG5xIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDcxMzcxNjIsImV4cCI6MjA2MjcxMzE2Mn0.XPgWhLoONAZWEzRQx2wOyTi38udzFFXvnc8MNj4XH-o';
const supabase = createClient(supabaseUrl, supabaseKey);

type FileType = 'school' | 'performance' | 'teachers';
type UploadStatus = 'idle' | 'processing' | 'success' | 'error';

interface FileState {
  type: FileType;
  name: string;
  status: UploadStatus;
  message?: string;
  data?: any[];
}

interface SchoolData {
  nome: string;
  profe_lingua_portuguesa: number;
  profe_matematica: number;
  profe_ciencias: number;
  ano_da_ultima_reforma: number;
  n_de_quadras_disponiveis: number;
  biblioteca: boolean;
  lab_info: boolean;
  acess_internet: boolean;
  projetos_usam_celular: boolean;
  carencia_de_professor: boolean;
  ar_condicionado: boolean;
  iluminacao: boolean;
  bebedouro: boolean;
  acessibilidade: string;
  projetos_externos: boolean;
  areas_recreativas: boolean;
  dif_rendimento_entre_turnos: boolean;
}

const DataUpload: React.FC = () => {
  const [files, setFiles] = useState<FileState[]>([]);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  
  // Converte strings em booleanos
  const parseBoolean = (value: string): boolean => {
    const lowercaseValue = value.toLowerCase().trim();
    return lowercaseValue === 'true' || lowercaseValue === 'sim' || lowercaseValue === '1' || lowercaseValue === 's';
  };
  
  // Converte strings em números
  const parseNumber = (value: string): number => {
    const parsed = parseFloat(value);
    return isNaN(parsed) ? 0 : parsed;
  };
  
  const processSchoolData = (data: any[]): SchoolData[] => {
    return data.map(row => ({
      nome: row.nome || '',
      profe_lingua_portuguesa: parseNumber(row.profe_lingua_portuguesa),
      profe_matematica: parseNumber(row.profe_matematica),
      profe_ciencias: parseNumber(row.profe_ciencias),
      ano_da_ultima_reforma: parseNumber(row.ano_da_ultima_reforma),
      n_de_quadras_disponiveis: parseNumber(row.n_de_quadras_disponiveis),
      biblioteca: parseBoolean(row.biblioteca),
      lab_info: parseBoolean(row.lab_info),
      acess_internet: parseBoolean(row.acess_internet),
      projetos_usam_celular: parseBoolean(row.projetos_usam_celular),
      carencia_de_professor: parseBoolean(row.carencia_de_professor),
      ar_condicionado: parseBoolean(row.ar_condicionado),
      iluminacao: parseBoolean(row.iluminacao),
      bebedouro: parseBoolean(row.bebedouro),
      acessibilidade: row.acessibilidade || '',
      projetos_externos: parseBoolean(row.projetos_externos),
      areas_recreativas: parseBoolean(row.areas_recreativas),
      dif_rendimento_entre_turnos: parseBoolean(row.dif_rendimento_entre_turnos),
    }));
  };

  const validateSchoolData = (data: unknown[]): { valid: boolean; message: string } => {
    // Verifique se há pelo menos uma linha de dados
    if (!data || data.length === 0) {
      return { valid: false, message: 'O arquivo está vazio ou não contém dados válidos.' };
    }
    
    // Verifique se todas as colunas necessárias estão presentes
    const requiredColumns = [
      'nome', 'profe_lingua_portuguesa', 'profe_matematica', 'profe_ciencias',
      'ano_da_ultima_reforma', 'n_de_quadras_disponiveis', 'biblioteca', 'lab_info',
      'acess_internet', 'projetos_usam_celular', 'carencia_de_professor', 'ar_condicionado',
      'iluminacao', 'bebedouro', 'acessibilidade', 'projetos_externos',
      'areas_recreativas', 'dif_rendimento_entre_turnos'
    ];
    
    const columns = Object.keys(data[0]);
    
    // Converter colunas para minúsculas para comparação não sensível a maiúsculas/minúsculas
    const lowerCaseColumns = columns.map(col => col.toLowerCase().trim());
    
    const missingColumns = requiredColumns.filter(
      col => !lowerCaseColumns.includes(col.toLowerCase())
    );
    
    if (missingColumns.length > 0) {
      return {
        valid: false,
        message: `Colunas obrigatórias ausentes: ${missingColumns.join(', ')}`
      };
    }
    
    return { valid: true, message: 'Arquivo válido. Dados prontos para processamento.' };
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>, type: FileType) => {
    const uploadedFiles = e.target.files;
    if (!uploadedFiles || uploadedFiles.length === 0) return;
    
    const file = uploadedFiles[0];
    
    if (!file.name.endsWith('.csv') && !file.name.endsWith('.xlsx')) {
      setFiles(prevFiles => [
        ...prevFiles,
        {
          type,
          name: file.name,
          status: 'error',
          message: 'Formato de arquivo inválido. Por favor, envie um arquivo CSV ou XLSX.'
        }
      ]);
      return;
    }
    
    // Adicione o arquivo à lista com status de processamento
    setFiles(prevFiles => [
      ...prevFiles,
      {
        type,
        name: file.name,
        status: 'processing'
      }
    ]);
    
    // Leia o arquivo CSV
    if (file.name.endsWith('.csv')) {
      Papa.parse(file, {
        header: true,
        skipEmptyLines: true,
        complete: (results: { data: unknown[]; }) => {
          const validation = validateSchoolData(results.data);
          
          if (validation.valid) {
            const processedData = processSchoolData(results.data);
            
            setFiles(prevFiles => {
              const updatedFiles = [...prevFiles];
              const fileIndex = updatedFiles.findIndex(f => f.name === file.name && f.type === type);
              
              if (fileIndex >= 0) {
                updatedFiles[fileIndex] = {
                  ...updatedFiles[fileIndex],
                  status: 'success',
                  message: validation.message,
                  data: processedData
                };
              }
              
              return updatedFiles;
            });
          } else {
            setFiles(prevFiles => {
              const updatedFiles = [...prevFiles];
              const fileIndex = updatedFiles.findIndex(f => f.name === file.name && f.type === type);
              
              if (fileIndex >= 0) {
                updatedFiles[fileIndex] = {
                  ...updatedFiles[fileIndex],
                  status: 'error',
                  message: validation.message
                };
              }
              
              return updatedFiles;
            });
          }
        },
        error: (error) => {
          setFiles(prevFiles => {
            const updatedFiles = [...prevFiles];
            const fileIndex = updatedFiles.findIndex(f => f.name === file.name && f.type === type);
            
            if (fileIndex >= 0) {
              updatedFiles[fileIndex] = {
                ...updatedFiles[fileIndex],
                status: 'error',
                message: `Erro ao processar o arquivo: ${error.message}`
              };
            }
            
            return updatedFiles;
          });
        }
      });
    } else if (file.name.endsWith('.xlsx')) {
      // Para arquivos Excel, você precisaria usar uma biblioteca como SheetJS
      // Aqui usaremos uma simulação por enquanto
      setTimeout(() => {
        setFiles(prevFiles => {
          const updatedFiles = [...prevFiles];
          const fileIndex = updatedFiles.findIndex(f => f.name === file.name && f.type === type);
          
          if (fileIndex >= 0) {
            updatedFiles[fileIndex] = {
              ...updatedFiles[fileIndex],
              status: 'error',
              message: 'Processamento de arquivos Excel (.xlsx) não implementado ainda.'
            };
          }
          
          return updatedFiles;
        });
      }, 1500);
    }
  };
  
  const handleRemoveFile = (name: string, type: FileType) => {
    setFiles(prevFiles => prevFiles.filter(f => !(f.name === name && f.type === type)));
  };
  
  const handleProcessFiles = async () => {
    const validFiles = files.filter(file => file.status === 'success' && file.data);
    
    if (validFiles.length === 0) {
      return;
    }
    
    setIsUploading(true);
    setUploadProgress(0);
    
    try {
      // Processa cada arquivo válido
      for (let i = 0; i < validFiles.length; i++) {
        const file = validFiles[i];
        
        if (file.type === 'school' && file.data) {
          // Salva os dados no Supabase
          const { data, error } = await supabase
            .from('escolas')
            .insert(file.data);
          
          if (error) {
            throw new Error(`Erro ao salvar no Supabase: ${error.message}`);
          }
          
          // Atualiza o status do arquivo
          setFiles(prevFiles => {
            const updatedFiles = [...prevFiles];
            const fileIndex = updatedFiles.findIndex(f => f.name === file.name && f.type === file.type);
            
            if (fileIndex >= 0) {
              updatedFiles[fileIndex] = {
                ...updatedFiles[fileIndex],
                message: `Dados importados com sucesso! ${file.data?.length} registros salvos.`
              };
            }
            
            return updatedFiles;
          });
        }
        
        // Atualiza o progresso
        setUploadProgress(Math.round(((i + 1) / validFiles.length) * 100));
      }
      
      setIsUploading(false);
    } catch (error) {
      console.error('Erro ao processar arquivos:', error);
      
      setFiles(prevFiles => {
        return prevFiles.map(file => {
          if (file.status === 'success') {
            return {
              ...file,
              status: 'error',
              message: `Erro ao salvar no banco de dados: ${error instanceof Error ? error.message : 'Erro desconhecido'}`
            };
          }
          return file;
        });
      });
      
      setIsUploading(false);
    }
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
              Importe dados básicos das escolas e infraestrutura.
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
                  onClick={() => handleRemoveFile(file.name, file.type)}
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
              onClick={handleProcessFiles}
            >
              {isUploading ? 'Processando...' : 'Processar Arquivos'}
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
              <li>nome (obrigatório)</li>
              <li>profe_lingua_portuguesa</li>
              <li>profe_matematica</li>
              <li>profe_ciencias</li>
              <li>ano_da_ultima_reforma</li>
              <li>n_de_quadras_disponiveis</li>
              <li>biblioteca (sim/não)</li>
              <li>lab_info (sim/não)</li>
              <li>acess_internet (sim/não)</li>
              <li>projetos_usam_celular (sim/não)</li>
              <li>carencia_de_professor (sim/não)</li>
              <li>ar_condicionado (sim/não)</li>
              <li>iluminacao (sim/não)</li>
              <li>bebedouro (sim/não)</li>
              <li>acessibilidade</li>
              <li>projetos_externos (sim/não)</li>
              <li>areas_recreativas (sim/não)</li>
              <li>dif_rendimento_entre_turnos (sim/não)</li>
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