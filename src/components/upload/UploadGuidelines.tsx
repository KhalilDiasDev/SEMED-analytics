// components/upload/UploadGuidelines.tsx
import React from 'react';
import Card from '../ui/Card';

const UploadGuidelines: React.FC = () => {
  return (
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
            <li>codigo_escola (obrigatório)</li>
            <li>codigo_habilidade (obrigatório)</li>
            <li>componente_curricular</li>
            <li>descrição_habilidade</li>
            <li>percentual_acertos</li>
          </ul>
        </div>
      </div>
    </Card>
  );
};

export default UploadGuidelines;