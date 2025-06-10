import React from "react";

interface ErrorMessageProps {
  message: string;
  onRetry?: () => void;
  className?: string;
}

export const ErrorMessage: React.FC<ErrorMessageProps> = ({
  message,
  onRetry,
  className = "",
}) => {
  return (
    <div
      className={`bg-error bg-opacity-10 border-l-4 border-error text-error p-4 rounded ${className}`}
      role="alert"
    >
      <p className="font-bold">Erro</p>
      <p className="text-sm">{message}</p>
      {onRetry && (
        <button
          onClick={onRetry}
          className="mt-2 px-4 py-2 bg-error text-white rounded hover:bg-opacity-90 transition"
        >
          Tentar novamente
        </button>
      )}
    </div>
  );
};

export default ErrorMessage;