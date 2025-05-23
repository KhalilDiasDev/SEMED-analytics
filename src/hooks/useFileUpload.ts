// hooks/useFileUpload.ts
import { useState } from 'react';
import Papa from 'papaparse';
import { createClient } from '@supabase/supabase-js';
import { 
  processSchoolData,
  processPerformanceData,
  validateSchoolData,
  validatePerformanceData 
} from '../utils/uploadUtils';
import { FileState, FileType } from '../types/upload';

// Configuração do Supabase
const supabaseUrl = 'https://uzbulczrtaxrdzxfnxnq.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InV6YnVsY3pydGF4cmR6eGZueG5xIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDcxMzcxNjIsImV4cCI6MjA2MjcxMzE2Mn0.XPgWhLoONAZWEzRQx2wOyTi38udzFFXvnc8MNj4XH-o';
const supabase = createClient(supabaseUrl, supabaseKey);

export const useFileUpload = () => {
  const [files, setFiles] = useState<FileState[]>([]);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);

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
          let validation;
          let processedData;
          
          // Valida e processa baseado no tipo
          if (type === 'school') {
            validation = validateSchoolData(results.data);
            if (validation.valid) {
              processedData = processSchoolData(results.data);
            }
          } else if (type === 'performance') {
            validation = validatePerformanceData(results.data);
            if (validation.valid) {
              processedData = processPerformanceData(results.data);
            }
          } else {
            validation = { valid: false, message: 'Tipo de arquivo não suportado ainda.' };
          }
          
          setFiles(prevFiles => {
            const updatedFiles = [...prevFiles];
            const fileIndex = updatedFiles.findIndex(f => f.name === file.name && f.type === type);
            
            if (fileIndex >= 0) {
              updatedFiles[fileIndex] = {
                ...updatedFiles[fileIndex],
                status: validation.valid ? 'success' : 'error',
                message: validation.message,
                data: processedData
              };
            }
            
            return updatedFiles;
          });
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
            .from('desempenho')
            .insert(file.data);
          
          if (error) {
            throw new Error(`Erro ao salvar no Supabase: ${error.message}`);
          }
          
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

  return {
    files,
    isUploading,
    uploadProgress,
    handleFileChange,
    handleRemoveFile,
    handleProcessFiles
  };
};