import { InputHTMLAttributes, TextareaHTMLAttributes } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

interface TextAreaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
}

export function Input({ label, error, className = "", ...props }: InputProps) {
  return (
    <div className="w-full">
      {label && (
        <label className="block text-sm font-semibold text-[#2D2D2D] mb-2">
          {label}
        </label>
      )}
      <input
        className={`w-full px-4 py-3 rounded-2xl border-2 border-[#FFE5EE] bg-white 
          focus:border-[#FF6B9D] focus:outline-none transition-colors
          placeholder:text-[#D1B4C0] ${error ? 'border-red-400' : ''} ${className}`}
        {...props}
      />
      {error && (
        <p className="mt-1 text-sm text-red-500">{error}</p>
      )}
    </div>
  );
}

export function TextArea({ label, error, className = "", rows = 4, ...props }: TextAreaProps) {
  return (
    <div className="w-full">
      {label && (
        <label className="block text-sm font-semibold text-[#2D2D2D] mb-2">
          {label}
        </label>
      )}
      <textarea
        rows={rows}
        className={`w-full px-4 py-3 rounded-2xl border-2 border-[#FFE5EE] bg-white 
          focus:border-[#FF6B9D] focus:outline-none transition-colors resize-none
          placeholder:text-[#D1B4C0] ${error ? 'border-red-400' : ''} ${className}`}
        {...props}
      />
      {error && (
        <p className="mt-1 text-sm text-red-500">{error}</p>
      )}
    </div>
  );
}
