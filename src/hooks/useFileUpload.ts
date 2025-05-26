import { useState, useCallback } from 'react';
import { FileState, FileType } from '../types/upload';
import { fileProcessingService } from '../services/fileProcessingService';
import { notificationService } from '../services/notificationService';
import { supabaseService } from '../services/supabaseService';

export const useFileUpload = () => {
  const [files, setFiles] = useState<FileState[]>([]);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);

  const updateFileStatus = useCallback((
    fileName: string,
    fileType: FileType,
    updates: Partial<FileState>
  ) => {
    setFiles(prevFiles => {
      const updatedFiles = [...prevFiles];
      const fileIndex = updatedFiles.findIndex(
        f => f.name === fileName && f.type === fileType
      );
      
      if (fileIndex >= 0) {
        updatedFiles[fileIndex] = {
          ...updatedFiles[fileIndex],
          ...updates
        };
      }
      
      return updatedFiles;
    });
  }, []);

  const addFile = useCallback((type: FileType, name: string) => {
    setFiles(prevFiles => [
      ...prevFiles,
      {
        type,
        name,
        status: 'processing'
      }
    ]);
  }, []);

  const handleFileChange = useCallback(async (
    e: React.ChangeEvent<HTMLInputElement>,
    type: FileType
  ) => {
    const uploadedFiles = e.target.files;
    if (!uploadedFiles || uploadedFiles.length === 0) return;
    
    const file = uploadedFiles[0];
    
    // Validação do formato do arquivo
    if (!fileProcessingService.isValidFileFormat(file.name)) {
      notificationService.showInvalidFormatError();
      return;
    }
    
    addFile(type, file.name);
    
    try {
      await fileProcessingService.processFile(
        file,
        type,
        updateFileStatus,
        notificationService
      );
    } catch (error) {
      console.error('Erro no processamento do arquivo:', error);
      updateFileStatus(file.name, type, {
        status: 'error',
        message: 'Erro inesperado no processamento do arquivo'
      });
      notificationService.showProcessingError(error);
    }
  }, [addFile, updateFileStatus]);

  const handleRemoveFile = useCallback((name: string, type: FileType) => {
    setFiles(prevFiles => 
      prevFiles.filter(f => !(f.name === name && f.type === type))
    );
  }, []);

  const handleProcessFiles = useCallback(async () => {
    const validFiles = files.filter(file => file.status === 'success' && file.data);
    
    if (validFiles.length === 0) {
      notificationService.showNoValidFilesWarning();
      return;
    }
    
    setIsUploading(true);
    setUploadProgress(0);
    
    try {
      await supabaseService.processValidFiles(
        validFiles,
        setUploadProgress,
        updateFileStatus,
        notificationService
      );
      
      notificationService.showImportCompletedSuccess();
    } catch (error) {
      console.error('Erro ao processar arquivos:', error);
      notificationService.showImportError(error);
      
      // Atualizar status dos arquivos para erro
      setFiles(prevFiles => 
        prevFiles.map(file => 
          file.status === 'success' 
            ? {
                ...file,
                status: 'error' as const,
                message: `Erro ao salvar no banco de dados: ${
                  error instanceof Error ? error.message : 'Erro desconhecido'
                }`
              }
            : file
        )
      );
    } finally {
      setIsUploading(false);
    }
  }, [files, updateFileStatus]);

  return {
    files,
    isUploading,
    uploadProgress,
    handleFileChange,
    handleRemoveFile,
    handleProcessFiles
  };
};
