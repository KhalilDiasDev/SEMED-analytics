import React from 'react';
import { Link } from 'react-router-dom';
import { Wifi, BookOpen, FlaskConical, Monitor, Snowflake, Lightbulb, Droplet, Smartphone, Users } from 'lucide-react';
import Card from './Card';

interface School {
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

interface SchoolCardProps {
  school: School;
}

const SchoolCard: React.FC<SchoolCardProps> = ({ school }) => {
  console.log('aaaaaaaaaaaa',school);
  
  return (
    <Card className="h-full hover:shadow-md transition-shadow duration-200 p-4">
      <h3 className="text-lg font-semibold text-gray-900 truncate mb-1" title={school.nome}>
        {school.nome}
      </h3>

      <p className="text-sm text-gray-500 mb-2">Ano da última reforma: {school.ano_da_ultima_reforma}</p>

      <div className="grid grid-cols-2 gap-2 text-sm mb-4">
        <div><strong>Portugues:</strong> {school.profe_lingua_portuguesa}</div>
        <div><strong>Matemática:</strong> {school.profe_matematica}</div>
        <div><strong>Ciências:</strong> {school.profe_ciencias}</div>
        <div><strong>Quadras:</strong> {school.n_de_quadras_disponiveis}</div>
      </div>

      <div className="grid grid-cols-2 gap-2 text-sm">
        <Feature icon={Wifi} label="Internet" active={school.acess_internet} />
        <Feature icon={BookOpen} label="Biblioteca" active={school.biblioteca} />
        <Feature icon={FlaskConical} label="Lab. Ciências" active={true} />
        <Feature icon={Monitor} label="Lab. Informática" active={school.lab_info} />
        <Feature icon={Smartphone} label="Projetos com celular" active={school.projetos_usam_celular} />
        <Feature icon={Users} label="Carência de professores" active={school.carencia_de_professor} />
        <Feature icon={Snowflake} label="Ar-condicionado" active={school.ar_condicionado} />
        <Feature icon={Lightbulb} label="Iluminação" active={school.iluminacao} />
        <Feature icon={Droplet} label="Bebedouro" active={school.bebedouro} />
        <Feature icon={BookOpen} label="Projetos externos" active={school.projetos_externos} />
        <div><strong>Acessibilidade:</strong> {school.acessibilidade}</div>
        <div><strong>Área recreativa:</strong> {school.areas_recreativas ? 'Sim' : 'Não'}</div>
        <div><strong>Diferença entre turnos:</strong> {school.dif_rendimento_entre_turnos ? 'Sim' : 'Não'}</div>
      </div>

      <div className="mt-4 flex justify-between">
        <Link to={`/schools/${school.nome}`} className="text-blue-600 hover:text-blue-800 text-sm font-medium">
          Ver detalhes
        </Link>
        <Link to={`/comparison?school1=${school.nome}`} className="text-green-600 hover:text-green-800 text-sm font-medium">
          Comparar
        </Link>
      </div>
    </Card>
  );
};

const Feature = ({ icon: Icon, label, active }: { icon: any, label: string, active: boolean }) => (
  <div className={`flex items-center ${active ? 'text-green-600' : 'text-gray-400'}`}>
    <Icon size={16} className="mr-1" />
    <span>{label}</span>
  </div>
);

export default SchoolCard;
