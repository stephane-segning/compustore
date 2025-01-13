import React from 'react';

interface QuantityInputProps {
  value: number;
  onChange: (value: number) => void;
}

const QuantityInput: React.FC<QuantityInputProps> = ({ value, onChange }) => {
  return (
    <input
      type='number'
      min='1'
      value={value}
      onChange={(e) => onChange(parseInt(e.target.value, 10))}
      className='border-neutral-300 w-20 rounded border p-2'
    />
  );
};

export default QuantityInput;
