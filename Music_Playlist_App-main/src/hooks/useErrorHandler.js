import { useState, useCallback } from 'react';
import { handleError, parseError, isRetryable, getRetryDelay } from '../utils/errorHandler';

/**
 * Custom hook for error handling in React components
 * 
 * @param {Object} options - Configuration options
 * @returns {Object} Error handling utilities
 */
export function useErrorHandler(options = {}) {
  const {
    onError: onErrorCallback,
    autoLog = true,
    showDetails = false,
  } = options || {};

  const [error, setError] = useState(null);
  const [errorDetails, setErrorDetails] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  /**
   * Handle an error
   */
  const handleError = useCallback((err, customOptions = {}) => {
    const mergedOptions = { ...options, ...customOptions };
    const details = handleError(err, {
      logError: mergedOptions.autoLog !== false,
      showDetails: mergedOptions.showDetails || showDetails,
    });

    setError(err);
    setErrorDetails(details);

    // Call custom error callback if provided
    if (onErrorCallback) {
      onErrorCallback(details, err);
    }

    return details;
  }, [onErrorCallback, autoLog, showDetails, options]);

  /**
   * Clear error state
   */
  const clearError = useCallback(() => {
    setError(null);
    setErrorDetails(null);
  }, []);

  /**
   * Wrap an async function with error handling
   */
  const withErrorHandling = useCallback((asyncFn) => {
    return async (...args) => {
      try {
        setIsLoading(true);
        clearError();
        const result = await asyncFn(...args);
        setIsLoading(false);
        return result;
      } catch (err) {
        setIsLoading(false);
        handleError(err);
        throw err; // Re-throw so caller can handle if needed
      }
    };
  }, [handleError, clearError]);

  /**
   * Retry a function with exponential backoff
   */
  const retry = useCallback(async (fn, maxAttempts = 3) => {
    let lastError = null;
    
    for (let attempt = 1; attempt <= maxAttempts; attempt++) {
      try {
        setIsLoading(true);
        clearError();
        const result = await fn();
        setIsLoading(false);
        return result;
      } catch (err) {
        lastError = err;
        const parsedError = parseError(err);
        
        // Check if error is retryable
        if (!isRetryable(parsedError) || attempt === maxAttempts) {
          setIsLoading(false);
          handleError(err);
          throw err;
        }

        // Wait before retrying
        const delay = getRetryDelay(parsedError, attempt);
        await new Promise(resolve => setTimeout(resolve, delay));
      }
    }

    setIsLoading(false);
    handleError(lastError);
    throw lastError;
  }, [handleError, clearError]);

  return {
    error,
    errorDetails,
    isLoading,
    handleError,
    clearError,
    withErrorHandling,
    retry,
    hasError: error !== null,
  };
}

/**
 * Hook for handling async operations with error handling
 */
export function useAsyncErrorHandler(asyncFn, dependencies = []) {
  const errorHandler = useErrorHandler();
  const { withErrorHandling } = errorHandler;

  const execute = useCallback(
    withErrorHandling(asyncFn),
    [withErrorHandling, ...dependencies]
  );

  return {
    ...errorHandler,
    execute,
  };
}

