import { createClient } from '@supabase/supabase-js';
import { FileState, SchoolData } from '../types/upload';
import { NotificationService } from './notificationService';

const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_ANON_KEY
);

class SupabaseService {
  async getExistingSchools(): Promise<SchoolData[]> {
    const { data, error } = await supabase
      .from('escolas')
      .select('nome');
    
    if (error) {
      console.error('Erro ao buscar escolas existentes:', error);
      throw error;
    }
    
    return data || [];
  }

  async processValidFiles(
    validFiles: FileState[],
    setUploadProgress: (progress: number) => void,
    updateFileStatus: (fileName: string, fileType: any, updates: any) => void,
    notificationService: NotificationService
  ): Promise<void> {
    for (let i = 0; i < validFiles.length; i++) {
      const file = validFiles[i];
      
      if (file.type === 'school' && file.data) {
        await this.processSchoolFile(file, updateFileStatus, notificationService);
      } else if (file.type === 'performance' && file.data) {
        await this.processPerformanceFile(file, updateFileStatus, notificationService);
      }
      
      setUploadProgress(Math.round(((i + 1) / validFiles.length) * 100));
    }
  }

  private async processSchoolFile(
    file: FileState,
    updateFileStatus: (fileName: string, fileType: any, updates: any) => void,
    notificationService: NotificationService
  ): Promise<void> {
    const { data, error } = await supabase
      .from('escolas')
      .insert(file.data);
    
    if (error) {
      throw new Error(`Erro ao salvar escolas: ${error.message}`);
    }
    
    notificationService.showSchoolsImportedSuccess(file.data?.length || 0);
    
    updateFileStatus(file.name, file.type, {
      message: `Dados importados com sucesso! ${file.data?.length} registros salvos.`
    });
  }

  private async processPerformanceFile(
    file: FileState,
    updateFileStatus: (fileName: string, fileType: any, updates: any) => void,
    notificationService: NotificationService
  ): Promise<void> {
    const { data, error } = await supabase
      .from('desempenho_habilidades')
      .insert(file.data);
      
    if (error) {
      throw new Error(`Erro ao salvar dados de desempenho: ${error.message}`);
    }
    
    const skippedCount = file.skippedSchools?.length || 0;
    const processedCount = file.data?.length || 0;
    
    notificationService.showPerformanceImportedSuccess(processedCount, skippedCount);
    
    let message = `Dados importados com sucesso! ${processedCount} registros salvos.`;
    if (skippedCount > 0) {
      message += ` ${skippedCount} escolas foram ignoradas.`;
    }
    
    updateFileStatus(file.name, file.type, { message });
  }
}

export const supabaseService = new SupabaseService();