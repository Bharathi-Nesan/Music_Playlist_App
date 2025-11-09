# Vercel Error Handling System

This application includes a comprehensive error handling system for Vercel deployment errors. The system provides user-friendly error messages, error boundaries, and utilities for handling errors throughout the application.

## Overview

The error handling system consists of:

1. **Error Constants** (`vercelErrors.js`) - Complete list of all Vercel error codes with metadata
2. **Error Handler Utility** (`errorHandler.js`) - Functions to parse, handle, and format errors
3. **Error Boundary Component** (`ErrorBoundary.jsx`) - React component to catch and display errors
4. **Error Page** (`ErrorPage.jsx`) - Route-level error display page
5. **Error Handler Hook** (`useErrorHandler.js`) - React hook for component-level error handling

## Quick Start

### Using Error Boundary

The `ErrorBoundary` component is already integrated into the main `App` component. It will catch any unhandled React errors and display a user-friendly error message.

```jsx
import ErrorBoundary from './components/ErrorBoundary';

function App() {
  return (
    <ErrorBoundary showDetails={process.env.NODE_ENV === 'development'}>
      {/* Your app content */}
    </ErrorBoundary>
  );
}
```

### Using the Error Handler Hook

For component-level error handling:

```jsx
import { useErrorHandler } from '../hooks/useErrorHandler';

function MyComponent() {
  const { handleError, errorDetails, clearError, withErrorHandling } = useErrorHandler({
    onError: (errorDetails, originalError) => {
      // Custom error handling logic
      console.log('Error occurred:', errorDetails);
    },
  });

  const handleAsyncOperation = withErrorHandling(async () => {
    // Your async code here
    const response = await fetch('/api/data');
    if (!response.ok) {
      throw new Error('API_ERROR');
    }
    return response.json();
  });

  return (
    <div>
      {errorDetails && (
        <div className="error-message">
          {errorDetails.message}
        </div>
      )}
      <button onClick={handleAsyncOperation}>
        Load Data
      </button>
    </div>
  );
}
```

### Using Error Handler Utilities

For direct error handling:

```jsx
import { handleError, parseError, getUserFriendlyMessage } from '../utils/errorHandler';

try {
  // Your code that might throw an error
  await someAsyncOperation();
} catch (error) {
  const errorDetails = handleError(error);
  console.log('User-friendly message:', errorDetails.message);
  console.log('Error code:', errorDetails.code);
  console.log('Should contact support:', errorDetails.contactSupport);
}
```

### Navigating to Error Page

To navigate to the error page with error information:

```jsx
import { useNavigate } from 'react-router-dom';
import { handleError } from '../utils/errorHandler';

function MyComponent() {
  const navigate = useNavigate();

  const handleError = (error) => {
    const errorDetails = handleError(error);
    navigate('/error', { 
      state: { error: errorDetails } 
    });
  };

  // Use handleError when catching errors
}
```

## Error Categories

### Application Errors

These are errors that can occur in your application:

- **Function Errors**: Serverless function execution errors
- **Deployment Errors**: Deployment-related issues
- **DNS Errors**: Domain and DNS configuration errors
- **Cache Errors**: Caching-related issues
- **Runtime Errors**: Code execution errors
- **Image Errors**: Image optimization errors
- **Request Errors**: HTTP request errors
- **Routing Errors**: Routing configuration errors
- **Sandbox Errors**: Development environment errors

### Platform Errors

These are internal Vercel platform errors. If you encounter these, contact Vercel support:

- **Internal Errors**: Various internal platform errors

## Error Properties

Each error object contains:

- `code`: The Vercel error code (e.g., `FUNCTION_INVOCATION_FAILED`)
- `category`: Error category (e.g., `Function`, `Deployment`)
- `statusCode`: HTTP status code
- `message`: Technical error message
- `userMessage`: User-friendly error message
- `description`: Detailed error description
- `actionable`: Whether the user can take action
- `contactSupport`: Whether to contact Vercel support

## Common Error Codes

### Function Errors

- `BODY_NOT_A_STRING_FROM_FUNCTION` (502): Function returned non-string value
- `FUNCTION_INVOCATION_FAILED` (500): Function execution failed
- `FUNCTION_INVOCATION_TIMEOUT` (504): Function execution timed out
- `FUNCTION_PAYLOAD_TOO_LARGE` (413): Request payload too large
- `FUNCTION_THROTTLED` (503): Rate limit exceeded

### Deployment Errors

- `DEPLOYMENT_NOT_FOUND` (404): Deployment not found
- `DEPLOYMENT_PAUSED` (503): Deployment paused
- `DEPLOYMENT_BLOCKED` (403): Deployment blocked

### Request Errors

- `NOT_FOUND` (404): Resource not found
- `INVALID_REQUEST_METHOD` (405): Invalid HTTP method
- `URL_TOO_LONG` (414): URL exceeds maximum length

## Retry Logic

The error handler includes retry logic for retryable errors:

```jsx
import { useErrorHandler } from '../hooks/useErrorHandler';

function MyComponent() {
  const { retry, isLoading } = useErrorHandler();

  const fetchData = async () => {
    const response = await fetch('/api/data');
    if (!response.ok) throw new Error('FETCH_FAILED');
    return response.json();
  };

  const handleFetch = () => {
    retry(fetchData, 3); // Retry up to 3 times
  };

  return (
    <button onClick={handleFetch} disabled={isLoading}>
      {isLoading ? 'Loading...' : 'Fetch Data'}
    </button>
  );
}
```

## Custom Error Handling

You can create custom error handlers for specific error codes:

```jsx
import { getErrorByCode } from '../utils/vercelErrors';

function handleSpecificError(errorCode) {
  const error = getErrorByCode(errorCode);
  
  if (error) {
    switch (error.code) {
      case 'FUNCTION_THROTTLED':
        // Custom handling for throttled errors
        console.log('Rate limited, waiting...');
        break;
      case 'DEPLOYMENT_PAUSED':
        // Custom handling for paused deployments
        console.log('Deployment is paused');
        break;
      default:
        // Default handling
        console.log('Error:', error.userMessage);
    }
  }
}
```

## Best Practices

1. **Always use error boundaries** for top-level error catching
2. **Use the error handler hook** for component-level errors
3. **Provide user-friendly messages** using `getUserFriendlyMessage()`
4. **Log errors** for debugging (automatic in development)
5. **Handle retryable errors** with the retry utility
6. **Contact support** for platform errors (marked with `contactSupport: true`)

## Error Reporting

To report errors to an external service:

```jsx
import { useErrorHandler } from '../hooks/useErrorHandler';

function MyComponent() {
  const { handleError } = useErrorHandler({
    onError: (errorDetails, originalError) => {
      // Report to error tracking service
      if (window.errorTracker) {
        window.errorTracker.report({
          code: errorDetails.code,
          message: errorDetails.message,
          stack: originalError?.stack,
        });
      }
    },
  });
}
```

## Testing Errors

To test error handling in development:

```jsx
// Trigger a test error
import { handleError } from '../utils/errorHandler';

const testError = handleError('FUNCTION_INVOCATION_FAILED');
console.log('Test error:', testError);
```

## Support

For Vercel platform errors, contact [Vercel Support](https://vercel.com/support).

For application errors, check the error code and category to determine the appropriate action.

