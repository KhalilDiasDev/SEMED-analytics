// hooks/useFileUpload.ts
import { useState } from 'react';
import Papa from 'papaparse';
import { createClient } from '@supabase/supabase-js';
import { notification } from 'antd';
import { 
  processSchoolData,
  processPerformanceData,
  validateSchoolData,
  validatePerformanceData 
} from '../utils/uploadUtils';
import { FileState, FileType, SchoolData } from '../types/upload';

const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_ANON_KEY
);


export const useFileUpload = () => {
  const [files, setFiles] = useState<FileState[]>([]);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);

  // Função para buscar escolas existentes no banco
  const getExistingSchools = async (): Promise<SchoolData[]> => {
    const { data, error } = await supabase
      .from('escolas')
      .select('nome');
    
    if (error) {
      console.error('Erro ao buscar escolas existentes:', error);
      return [];
    }
    
    return data || [];
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>, type: FileType) => {
    const uploadedFiles = e.target.files;
    if (!uploadedFiles || uploadedFiles.length === 0) return;
    
    const file = uploadedFiles[0];
    
    if (!file.name.endsWith('.csv') && !file.name.endsWith('.xlsx')) {
      notification.error({
        message: 'Formato Inválido',
        description: 'Por favor, envie um arquivo CSV ou XLSX.',
        placement: 'topRight',
        duration: 4
      });
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
    
    // Buscar escolas existentes se for um arquivo de desempenho
    let existingSchools: SchoolData[] = [];
    if (type === 'performance') {
      try {
        existingSchools = await getExistingSchools();
        if (existingSchools.length === 0) {
          notification.warning({
            message: 'Nenhuma Escola Encontrada',
            description: 'Nenhuma escola encontrada na base de dados. Importe primeiro os dados das escolas.',
            placement: 'topRight',
            duration: 6
          });
          
          setFiles(prevFiles => {
            const updatedFiles = [...prevFiles];
            const fileIndex = updatedFiles.findIndex(f => f.name === file.name && f.type === type);
            
            if (fileIndex >= 0) {
              updatedFiles[fileIndex] = {
                ...updatedFiles[fileIndex],
                status: 'error',
                message: 'Nenhuma escola encontrada na base de dados.'
              };
            }
            
            return updatedFiles;
          });
          return;
        }
      } catch (error) {
        notification.error({
          message: 'Erro de Conexão',
          description: 'Erro ao verificar escolas existentes na base de dados.',
          placement: 'topRight',
          duration: 5
        });
        
        setFiles(prevFiles => {
          const updatedFiles = [...prevFiles];
          const fileIndex = updatedFiles.findIndex(f => f.name === file.name && f.type === type);
          
          if (fileIndex >= 0) {
            updatedFiles[fileIndex] = {
              ...updatedFiles[fileIndex],
              status: 'error',
              message: 'Erro ao verificar escolas existentes.'
            };
          }
          
          return updatedFiles;
        });
        return;
      }
    }
    
    // Leia o arquivo CSV
    if (file.name.endsWith('.csv')) {
      Papa.parse(file, {
        header: true,
        skipEmptyLines: true,
        complete: (results: { data: unknown[]; }) => {
          let validation;
          let processedData: unknown[];
          let skippedSchools: string[] = [];
          
          // Valida e processa baseado no tipo
          if (type === 'school') {
            validation = validateSchoolData(results.data);
            if (validation.valid) {
              processedData = processSchoolData(results.data);
            }
          } else if (type === 'performance') {
            validation = validatePerformanceData(results.data, existingSchools);
            if (validation.valid) {
              const result = processPerformanceData(results.data, existingSchools);
              processedData = result.processedData;
              skippedSchools = result.skippedSchools;
            }
          } else {
            validation = { valid: false, message: 'Tipo de arquivo não suportado ainda.' };
          }
          
          setFiles(prevFiles => {
            const updatedFiles = [...prevFiles];
            const fileIndex = updatedFiles.findIndex(f => f.name === file.name && f.type === type);
            
            if (fileIndex >= 0) {
              let message = validation.message;
              
              // Adicionar informações sobre escolas ignoradas
              if (type === 'performance' && validation.valid && skippedSchools.length > 0) {
                notification.info({
                  message: 'Escolas Ignoradas',
                  description: `${skippedSchools.length} escolas foram ignoradas por não existirem na base de dados: ${skippedSchools.slice(0, 3).join(', ')}${skippedSchools.length > 3 ? '...' : ''}`,
                  placement: 'topRight',
                  duration: 8
                });
              }
              
              // Notificação de sucesso para validação
              if (validation.valid) {
                const dataLength = Array.isArray(processedData) ? processedData.length : 0;
                notification.success({
                  message: 'Arquivo Validado',
                  description: `Arquivo processado com sucesso! ${dataLength} registros prontos para importação.`,
                  placement: 'topRight',
                  duration: 4
                });
              } else {
                notification.error({
                  message: 'Erro de Validação',
                  description: validation.message,
                  placement: 'topRight',
                  duration: 6
                });
              }
              
              updatedFiles[fileIndex] = {
                ...updatedFiles[fileIndex],
                status: validation.valid ? 'success' : 'error',
                message: validation.valid ? 'Arquivo validado e pronto para importação' : validation.message,
                data: processedData,
                skippedSchools: skippedSchools // Para referência posterior
              };
            }
            
            return updatedFiles;
          });
        },
        error: (error) => {
          notification.error({
            message: 'Erro no Processamento',
            description: `Erro ao processar o arquivo: ${error.message}`,
            placement: 'topRight',
            duration: 6
          });
          
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
      // Para arquivos Excel, implementar com SheetJS
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
      notification.warning({
        message: 'Nenhum Arquivo Válido',
        description: 'Não há arquivos válidos para processar. Verifique se os arquivos foram carregados corretamente.',
        placement: 'topRight',
        duration: 5
      });
      return;
    }
    
    setIsUploading(true);
    setUploadProgress(0);
    
    try {
      for (let i = 0; i < validFiles.length; i++) {
        const file = validFiles[i];
        
        if (file.type === 'school' && file.data) {
          const { data, error } = await supabase
            .from('escolas')
            .insert(file.data);
          
          if (error) {
            throw new Error(`Erro ao salvar no Supabase: ${error.message}`);
          }
          
          notification.success({
            message: 'Escolas Importadas',
            description: `${file.data?.length} escolas foram importadas com sucesso!`,
            placement: 'topRight',
            duration: 5
          });
          
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
          
        } else if (file.type === 'performance' && file.data) {
          
          const { data, error } = await supabase
            .from('desempenho_habilidades')
            .insert(file.data);
            
          if (error) {
            throw new Error(`Erro ao salvar no Supabase: ${error.message}`);
          }
          
          const skippedCount = file.skippedSchools?.length || 0;
          const processedCount = file.data?.length || 0;
          
          notification.success({
            message: 'Dados de Desempenho Importados',
            description: `${processedCount} registros importados com sucesso!${skippedCount > 0 ? ` ${skippedCount} escolas foram ignoradas.` : ''}`,
            placement: 'topRight',
            duration: 6
          });
          
          setFiles(prevFiles => {
            const updatedFiles = [...prevFiles];
            const fileIndex = updatedFiles.findIndex(f => f.name === file.name && f.type === file.type);
            
            if (fileIndex >= 0) {
              let message = `Dados importados com sucesso! ${processedCount} registros salvos.`;
              if (skippedCount > 0) {
                message += ` ${skippedCount} escolas foram ignoradas.`;
              }
              
              updatedFiles[fileIndex] = {
                ...updatedFiles[fileIndex],
                message: message
              };
            }
            
            return updatedFiles;
          });
        }
        
        setUploadProgress(Math.round(((i + 1) / validFiles.length) * 100));
      }
      
      setIsUploading(false);
      
      notification.success({
        message: 'Importação Concluída',
        description: `Todos os arquivos foram processados com sucesso!`,
        placement: 'topRight',
        duration: 4
      });
      
    } catch (error) {
      console.error('Erro ao processar arquivos:', error);
      
      notification.error({
        message: 'Erro na Importação',
        description: `Erro ao salvar no banco de dados: ${error instanceof Error ? error.message : 'Erro desconhecido'}`,
        placement: 'topRight',
        duration: 8
      });
      
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

  return {
    files,
    isUploading,
    uploadProgress,
    handleFileChange,
    handleRemoveFile,
    handleProcessFiles
  };
};