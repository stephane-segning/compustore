import React from 'react';

interface TableTHProps {
  label: string;
}

const TableTH: React.FC<TableTHProps> = ({ label }) => {
  return <th className='border-neutral-300 border p-2'>{label}</th>;
};

export default TableTH;
