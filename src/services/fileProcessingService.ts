import Papa from 'papaparse';
import { FileType, SchoolData } from '../types/upload';
import { 
  processSchoolData,
  processPerformanceData,
  validateSchoolData,
  validatePerformanceData 
} from '../utils/uploadUtils';
import { NotificationService } from './notificationService';
import { supabaseService } from './supabaseService';

class FileProcessingService {
  isValidFileFormat(fileName: string): boolean {
    return fileName.endsWith('.csv') || fileName.endsWith('.xlsx');
  }

  async processFile(
    file: File,
    type: FileType,
    updateFileStatus: (fileName: string, fileType: FileType, updates: any) => void,
    notificationService: NotificationService
  ): Promise<void> {
    let existingSchools: SchoolData[] = [];

    // Buscar escolas existentes se for arquivo de desempenho
    if (type === 'performance') {
      existingSchools = await this.getExistingSchoolsForPerformance(
        file.name,
        type,
        updateFileStatus,
        notificationService
      );
      
      if (existingSchools.length === 0) return;
    }

    if (file.name.endsWith('.csv')) {
      await this.processCSVFile(file, type, existingSchools, updateFileStatus, notificationService);
    } else if (file.name.endsWith('.xlsx')) {
      this.processExcelFile(file.name, type, updateFileStatus);
    }
  }

  private async getExistingSchoolsForPerformance(
    fileName: string,
    fileType: FileType,
    updateFileStatus: (fileName: string, fileType: FileType, updates: any) => void,
    notificationService: NotificationService
  ): Promise<SchoolData[]> {
    try {
      const existingSchools = await supabaseService.getExistingSchools();
      
      if (existingSchools.length === 0) {
        notificationService.showNoSchoolsFoundWarning();
        updateFileStatus(fileName, fileType, {
          status: 'error',
          message: 'Nenhuma escola encontrada na base de dados.'
        });
      }
      
      return existingSchools;
    } catch (error) {
      notificationService.showConnectionError();
      updateFileStatus(fileName, fileType, {
        status: 'error',
        message: 'Erro ao verificar escolas existentes.'
      });
      return [];
    }
  }

  private async processCSVFile(
    file: File,
    type: FileType,
    existingSchools: SchoolData[],
    updateFileStatus: (fileName: string, fileType: FileType, updates: any) => void,
    notificationService: NotificationService
  ): Promise<void> {
    return new Promise((resolve, reject) => {
      Papa.parse(file, {
        header: true,
        skipEmptyLines: true,
        dynamicTyping: true, // Melhoria: conversão automática de tipos
        complete: (results) => {
          try {
            const { validation, processedData, skippedSchools } = this.validateAndProcessData(
              results.data,
              type,
              existingSchools
            );

            this.handleProcessingResult(
              file.name,
              type,
              validation,
              processedData,
              skippedSchools,
              updateFileStatus,
              notificationService
            );
            
            resolve();
          } catch (error) {
            reject(error);
          }
        },
        error: (error) => {
          notificationService.showProcessingError(error);
          updateFileStatus(file.name, type, {
            status: 'error',
            message: `Erro ao processar o arquivo: ${error.message}`
          });
          reject(error);
        }
      });
    });
  }

  private validateAndProcessData(
    data: unknown[],
    type: FileType,
    existingSchools: SchoolData[]
  ) {
    let validation: { valid: boolean; message: string };
    let processedData: unknown[] = [];
    let skippedSchools: string[] = [];

    if (type === 'school') {
      validation = validateSchoolData(data);
      if (validation.valid) {
        processedData = processSchoolData(data);
      }
    } else if (type === 'performance') {
      validation = validatePerformanceData(data, existingSchools);
      if (validation.valid) {
        const result = processPerformanceData(data, existingSchools);
        processedData = result.processedData;
        skippedSchools = result.skippedSchools;
      }
    } else {
      validation = { valid: false, message: 'Tipo de arquivo não suportado ainda.' };
    }

    return { validation, processedData, skippedSchools };
  }

  private handleProcessingResult(
    fileName: string,
    type: FileType,
    validation: { valid: boolean; message: string },
    processedData: unknown[],
    skippedSchools: string[],
    updateFileStatus: (fileName: string, fileType: FileType, updates: any) => void,
    notificationService: NotificationService
  ): void {
    if (validation.valid) {
      // Notificar sobre escolas ignoradas (apenas para performance)
      if (type === 'performance' && skippedSchools.length > 0) {
        notificationService.showSkippedSchoolsInfo(skippedSchools);
      }

      notificationService.showValidationSuccess(processedData.length);
      
      updateFileStatus(fileName, type, {
        status: 'success',
        message: 'Arquivo validado e pronto para importação',
        data: processedData,
        skippedSchools
      });
    } else {
      notificationService.showValidationError(validation.message);
      
      updateFileStatus(fileName, type, {
        status: 'error',
        message: validation.message
      });
    }
  }

  private processExcelFile(
    fileName: string,
    type: FileType,
    updateFileStatus: (fileName: string, fileType: FileType, updates: any) => void
  ): void {
    // Placeholder para implementação futura do Excel
    setTimeout(() => {
      updateFileStatus(fileName, type, {
        status: 'error',
        message: 'Processamento de arquivos Excel (.xlsx) não implementado ainda.'
      });
    }, 1500);
  }
}

export const fileProcessingService = new FileProcessingService();