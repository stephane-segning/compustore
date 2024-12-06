import React from "react";

interface TableTHProps {
  label: string;
}

const TableTH: React.FC<TableTHProps> = ({ label }) => {
  return <th className="border border-neutral-300 p-2">{label}</th>;
};

export default TableTH;
