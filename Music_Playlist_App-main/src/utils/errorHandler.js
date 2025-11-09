import {
  getErrorByCode,
  getUserFriendlyMessage,
  shouldContactSupport,
  isActionable,
  getErrorCategory,
  getErrorStatusCode,
} from './vercelErrors';

/**
 * Error Handler Utility
 * Provides functions to handle and process Vercel errors
 */

/**
 * Parse error from various sources (response, error object, string)
 * @param {any} error - Error from various sources
 * @returns {Object} Parsed error information
 */
export function parseError(error) {
  // If error is already parsed
  if (error && typeof error === 'object' && error.code) {
    return error;
  }

  // If error is a string (error code)
  if (typeof error === 'string') {
    const errorInfo = getErrorByCode(error);
    if (errorInfo) {
      return {
        ...errorInfo,
        originalError: error,
      };
    }
    return {
      code: 'UNKNOWN_ERROR',
      category: 'Unknown',
      statusCode: 500,
      message: error,
      userMessage: error,
      description: 'An unknown error occurred',
      actionable: true,
      originalError: error,
    };
  }

  // If error is an Error object
  if (error instanceof Error) {
    // Try to extract error code from message
    const errorCodeMatch = error.message.match(/([A-Z_]+)/);
    if (errorCodeMatch) {
      const errorCode = errorCodeMatch[1];
      const errorInfo = getErrorByCode(errorCode);
      if (errorInfo) {
        return {
          ...errorInfo,
          originalError: error,
          stack: error.stack,
        };
      }
    }

    return {
      code: 'UNKNOWN_ERROR',
      category: 'Unknown',
      statusCode: 500,
      message: error.message,
      userMessage: error.message || 'An unexpected error occurred',
      description: error.message,
      actionable: true,
      originalError: error,
      stack: error.stack,
    };
  }

  // If error is from a fetch response
  if (error && error.response) {
    const status = error.response.status;
    const errorText = error.response.statusText || '';
    
    // Try to extract error code from headers or body
    const errorCode = error.response.headers?.get('x-vercel-error') || 
                     error.response.headers?.get('x-vercel-id') ||
                     null;
    
    if (errorCode) {
      const errorInfo = getErrorByCode(errorCode);
      if (errorInfo) {
        return {
          ...errorInfo,
          originalError: error,
          httpStatus: status,
        };
      }
    }

    return {
      code: `HTTP_${status}`,
      category: 'HTTP',
      statusCode: status,
      message: errorText || `HTTP ${status} Error`,
      userMessage: getUserFriendlyMessage(null, `Server returned an error (${status})`),
      description: errorText,
      actionable: status >= 400 && status < 500,
      originalError: error,
      httpStatus: status,
    };
  }

  // Default fallback
  return {
    code: 'UNKNOWN_ERROR',
    category: 'Unknown',
    statusCode: 500,
    message: 'An unknown error occurred',
    userMessage: 'An unexpected error occurred. Please try again.',
    description: 'Unable to parse error information',
    actionable: true,
    originalError: error,
  };
}

/**
 * Handle error and return user-friendly information
 * @param {any} error - Error to handle
 * @param {Object} options - Additional options
 * @returns {Object} Error handling result
 */
export function handleError(error, options = {}) {
  const {
    logError = true,
    showDetails = false,
    includeStack = false,
  } = options;

  const parsedError = parseError(error);

  // Log error if requested
  if (logError && typeof window !== 'undefined' && window.console) {
    console.error('Error handled:', {
      code: parsedError.code,
      message: parsedError.message,
      category: parsedError.category,
      statusCode: parsedError.statusCode,
      originalError: parsedError.originalError,
      ...(includeStack && parsedError.stack ? { stack: parsedError.stack } : {}),
    });
  }

  // Return user-friendly error information
  return {
    code: parsedError.code,
    message: parsedError.userMessage,
    category: parsedError.category,
    statusCode: parsedError.statusCode,
    actionable: isActionable(parsedError.code),
    contactSupport: shouldContactSupport(parsedError.code),
    ...(showDetails ? {
      description: parsedError.description,
      technicalMessage: parsedError.message,
    } : {}),
    ...(includeStack && parsedError.stack ? { stack: parsedError.stack } : {}),
  };
}

/**
 * Check if error is retryable
 * @param {any} error - Error to check
 * @returns {boolean} True if error is retryable
 */
export function isRetryable(error) {
  const parsedError = parseError(error);
  const retryableStatusCodes = [408, 429, 500, 502, 503, 504];
  const retryableCodes = [
    'FUNCTION_INVOCATION_TIMEOUT',
    'EDGE_FUNCTION_INVOCATION_TIMEOUT',
    'MIDDLEWARE_INVOCATION_TIMEOUT',
    'FUNCTION_THROTTLED',
    'DNS_HOSTNAME_SERVER_ERROR',
    'ROUTER_EXTERNAL_TARGET_CONNECTION_ERROR',
    'ROUTER_EXTERNAL_TARGET_HANDSHAKE_ERROR',
  ];

  return (
    retryableStatusCodes.includes(parsedError.statusCode) ||
    retryableCodes.includes(parsedError.code) ||
    parsedError.statusCode >= 500
  );
}

/**
 * Get retry delay in milliseconds based on error
 * @param {any} error - Error to analyze
 * @param {number} attemptNumber - Current attempt number (1-based)
 * @returns {number} Delay in milliseconds
 */
export function getRetryDelay(error, attemptNumber = 1) {
  const parsedError = parseError(error);
  
  // Exponential backoff: 1s, 2s, 4s, 8s, max 30s
  const baseDelay = 1000;
  const maxDelay = 30000;
  const delay = Math.min(baseDelay * Math.pow(2, attemptNumber - 1), maxDelay);

  // Special cases
  if (parsedError.code === 'FUNCTION_THROTTLED') {
    return Math.max(delay, 5000); // At least 5 seconds for throttling
  }

  if (parsedError.statusCode === 429) {
    return Math.max(delay, 3000); // At least 3 seconds for rate limiting
  }

  return delay;
}

/**
 * Format error for display
 * @param {any} error - Error to format
 * @param {Object} options - Formatting options
 * @returns {string} Formatted error message
 */
export function formatErrorForDisplay(error, options = {}) {
  const {
    includeCode = false,
    includeCategory = false,
    technical = false,
  } = options;

  const parsedError = parseError(error);
  let message = technical ? parsedError.message : parsedError.userMessage;

  if (includeCode) {
    message = `${message} (${parsedError.code})`;
  }

  if (includeCategory) {
    message = `${message} [${parsedError.category}]`;
  }

  return message;
}

/**
 * Create error response object for API-like usage
 * @param {any} error - Error to convert
 * @returns {Object} Error response object
 */
export function createErrorResponse(error) {
  const parsedError = parseError(error);
  
  return {
    success: false,
    error: {
      code: parsedError.code,
      message: parsedError.userMessage,
      category: parsedError.category,
      statusCode: parsedError.statusCode,
      actionable: parsedError.actionable,
      contactSupport: parsedError.contactSupport,
    },
    timestamp: new Date().toISOString(),
  };
}

/**
 * Extract Vercel error code from various sources
 * @param {any} error - Error source
 * @returns {string|null} Error code or null
 */
export function extractErrorCode(error) {
  if (!error) return null;

  // Direct code
  if (typeof error === 'string') {
    return error;
  }

  // From error object
  if (error.code) {
    return error.code;
  }

  // From error message
  if (error.message) {
    const match = error.message.match(/([A-Z_]+)/);
    if (match) {
      return match[1];
    }
  }

  // From response headers
  if (error.response?.headers) {
    const vercelError = error.response.headers.get('x-vercel-error');
    if (vercelError) {
      return vercelError;
    }
  }

  // From response body
  if (error.response?.data?.error?.code) {
    return error.response.data.error.code;
  }

  return null;
}

