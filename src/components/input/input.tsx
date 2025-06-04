// src/components/input/index.tsx
import React from 'react';

type InputProps = {
  type?: 'text' | 'email' | 'password' | 'number' | 'tel';
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  className?: string;
  required?: boolean;
  disabled?: boolean;
  autoComplete?: string;
  maxLength?: number;
  minLength?: number;
  id?: string;
  label?: string;
  error?: boolean;
  errorMessage?: string;
};

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (
    {
      type = 'text',
      name,
      value,
      onChange,
      placeholder = '',
      className = '',
      required = false,
      disabled = false,
      autoComplete = 'off',
      maxLength,
      minLength,
      id = name,
      label,
      error = false,
      errorMessage,
      ...props
    },
    ref
  ) => {
    const baseClasses = 'input input-bordered w-full';
    const errorClasses = error ? 'input-error' : '';
    const finalClasses = `${baseClasses} ${errorClasses} ${className}`;

    return (
      <div className="form-control w-full">
        {label && (
          <label htmlFor={id} className="label">
            <span className="label-text">{label}</span>
            {required && <span className="label-text-alt text-error">*</span>}
          </label>
        )}
        <input
          ref={ref}
          type={type}
          id={id}
          name={name}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          className={finalClasses.trim()}
          required={required}
          disabled={disabled}
          autoComplete={autoComplete}
          maxLength={maxLength}
          minLength={minLength}
          {...props}
        />
        {error && errorMessage && (
          <label className="label">
            <span className="label-text-alt text-error">{errorMessage}</span>
          </label>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';