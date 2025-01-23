import React from 'react';
import Button from '@cps/components/button/button';
import ErrorState from '@cps/components/common/error-state';
import Input from '@cps/components/input/input';

interface FormInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    label: string;
    id: string;
    value: string;
    placeholder: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    error?: string;
    required?: boolean;
    buttonLabel?: string;
    onButtonClick?: () => void;
    variant?: 'outlined' | 'filled';
    buttonSize?: 'sm' | 'md' | 'lg';
}

const FormInput: React.FC<FormInputProps> = ({
  label,
  id,
  value,
  onChange,
  placeholder,
  error = '',
  required = false,
  buttonLabel,
  onButtonClick,
  ...props
}) => (
  <div className="mb-6">
    <label
      htmlFor={id}
      className="block text-sm font-medium text-neutral-content mb-1"
    >
      {label}
      {required && <span className="text-red">*</span>}
    </label>

    <Input
      id={id}
      value={value}
      onChange={onChange}
      placeholder={placeholder}      
      error={!!error}
      {...props}
    />

    {error && (
      <div className="relative mt-2">
        <div className="absolute inset-0 flex items-center justify-center">
          <ErrorState message={error} />
        </div>
      </div>
    )}

    {buttonLabel && onButtonClick && (
      <Button
        onClick={onButtonClick}
        variant="outlined"
        size="lg"
      >
        {buttonLabel}
      </Button>
    )}
  </div>
);

export default FormInput;
