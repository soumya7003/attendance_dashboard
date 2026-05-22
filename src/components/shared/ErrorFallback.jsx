import React from 'react';
import PropTypes from 'prop-types';
import { AlertCircle, RefreshCw } from 'lucide-react';
import { Button } from '../ui/Button';

export const ErrorFallback = ({ error, resetErrorBoundary }) => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[400px] p-8 text-center">
      <div className="glass-card p-8 max-w-md">
        <div className="flex justify-center mb-4">
          <div className="bg-danger-bg p-3 rounded-full">
            <AlertCircle className="text-danger" size={32} />
          </div>
        </div>
        <h3 className="text-lg font-semibold mb-2">Something went wrong</h3>
        <p className="text-sm text-muted mb-4">{error?.message || 'An unexpected error occurred'}</p>
        <Button onClick={resetErrorBoundary} icon={RefreshCw}>
          Try again
        </Button>
      </div>
    </div>
  );
};

ErrorFallback.propTypes = {
  error: PropTypes.object,
  resetErrorBoundary: PropTypes.func,
};