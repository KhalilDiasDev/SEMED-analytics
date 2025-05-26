import { notification } from 'antd';

export class NotificationService {
  showInvalidFormatError(): void {
    notification.error({
      message: 'Formato Inválido',
      description: 'Por favor, envie um arquivo CSV ou XLSX.',
      placement: 'topRight',
      duration: 4
    });
  }

  showNoSchoolsFoundWarning(): void {
    notification.warning({
      message: 'Nenhuma Escola Encontrada',
      description: 'Nenhuma escola encontrada na base de dados. Importe primeiro os dados das escolas.',
      placement: 'topRight',
      duration: 6
    });
  }

  showConnectionError(): void {
    notification.error({
      message: 'Erro de Conexão',
      description: 'Erro ao verificar escolas existentes na base de dados.',
      placement: 'topRight',
      duration: 5
    });
  }

  showProcessingError(error: any): void {
    notification.error({
      message: 'Erro no Processamento',
      description: `Erro ao processar o arquivo: ${error?.message || 'Erro desconhecido'}`,
      placement: 'topRight',
      duration: 6
    });
  }

  showSkippedSchoolsInfo(skippedSchools: string[]): void {
    notification.info({
      message: 'Escolas Ignoradas',
      description: `${skippedSchools.length} escolas foram ignoradas por não existirem na base de dados: ${
        skippedSchools.slice(0, 3).join(', ')
      }${skippedSchools.length > 3 ? '...' : ''}`,
      placement: 'topRight',
      duration: 8
    });
  }

  showValidationSuccess(recordCount: number): void {
    notification.success({
      message: 'Arquivo Validado',
      description: `Arquivo processado com sucesso! ${recordCount} registros prontos para importação.`,
      placement: 'topRight',
      duration: 4
    });
  }

  showValidationError(message: string): void {
    notification.error({
      message: 'Erro de Validação',
      description: message,
      placement: 'topRight',
      duration: 6
    });
  }

  showNoValidFilesWarning(): void {
    notification.warning({
      message: 'Nenhum Arquivo Válido',
      description: 'Não há arquivos válidos para processar. Verifique se os arquivos foram carregados corretamente.',
      placement: 'topRight',
      duration: 5
    });
  }

  showSchoolsImportedSuccess(count: number): void {
    notification.success({
      message: 'Escolas Importadas',
      description: `${count} escolas foram importadas com sucesso!`,
      placement: 'topRight',
      duration: 5
    });
  }

  showPerformanceImportedSuccess(processedCount: number, skippedCount: number): void {
    notification.success({
      message: 'Dados de Desempenho Importados',
      description: `${processedCount} registros importados com sucesso!${
        skippedCount > 0 ? ` ${skippedCount} escolas foram ignoradas.` : ''
      }`,
      placement: 'topRight',
      duration: 6
    });
  }

  showImportCompletedSuccess(): void {
    notification.success({
      message: 'Importação Concluída',
      description: 'Todos os arquivos foram processados com sucesso!',
      placement: 'topRight',
      duration: 4
    });
  }

  showImportError(error: any): void {
    notification.error({
      message: 'Erro na Importação',
      description: `Erro ao salvar no banco de dados: ${
        error instanceof Error ? error.message : 'Erro desconhecido'
      }`,
      placement: 'topRight',
      duration: 8
    });
  }
}

export const notificationService = new NotificationService();