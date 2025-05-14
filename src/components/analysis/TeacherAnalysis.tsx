import React, { useEffect, useState } from 'react';
import { supabase } from '../../lib/supabase';
import { Table, TableProps } from 'antd';

type Teacher = {
  id: number;
  name: string;
  years_old: number;
  qualification: string;
  age_experience: number;
  subject: string;
};

const TeacherAnalysis: React.FC = () => {
  const [teachers, setTeachers] = useState<Teacher[]>([]);

  useEffect(() => {
    const fetchTeachers = async () => {
      const { data, error } = await supabase.from('teachers').select('*');
      if (!error && data) {
        setTeachers(data);
      }
    };

    fetchTeachers();
  }, []);


  const columns: TableProps<Teacher>['columns'] = [
    {
      title: 'Id',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Years Old',
      dataIndex: 'years_old',
      key: 'years_old',
    },
    {
      title: 'Qualification',
      dataIndex: 'qualification',
      key: 'qualification',
    },
    {
      title: 'Age Experience',
      dataIndex: 'age_experience',
      key: 'age_experience',
    },
    {
      title: 'Subject',
      dataIndex: 'subject',
      key: 'subject',
    },
  ];

  return (
    <div>
          <Table<Teacher> columns={columns} dataSource={teachers} />

    </div>
  );
};

export default TeacherAnalysis;
