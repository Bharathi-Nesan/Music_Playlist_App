import React from 'react';
import { handleError } from '../utils/errorHandler';
import { motion } from 'framer-motion';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      hasError: false,
      error: null,
      errorInfo: null,
    };
  }

  static getDerivedStateFromError(error) {
    // Update state so the next render will show the fallback UI
    return {
      hasError: true,
      error,
    };
  }

  componentDidCatch(error, errorInfo) {
    // Log error details
    console.error('ErrorBoundary caught an error:', error, errorInfo);
    
    this.setState({
      error,
      errorInfo,
    });

    // Call optional error reporting callback
    if (this.props.onError) {
      this.props.onError(error, errorInfo);
    }
  }

  handleReset = () => {
    this.setState({
      hasError: false,
      error: null,
      errorInfo: null,
    });
  };

  handleReload = () => {
    window.location.reload();
  };

  render() {
    if (this.state.hasError) {
      const errorDetails = handleError(this.state.error, {
        logError: false,
        showDetails: this.props.showDetails || false,
      });

      // Use custom fallback UI if provided
      if (this.props.fallback) {
        return this.props.fallback(this.state.error, errorDetails, this.handleReset);
      }

      // Default error UI
      return (
        <ErrorDisplay
          error={errorDetails}
          errorInfo={this.state.errorInfo}
          onReset={this.handleReset}
          onReload={this.handleReload}
          showDetails={this.props.showDetails || false}
        />
      );
    }

    return this.props.children;
  }
}

/**
 * Error Display Component
 * Displays user-friendly error messages
 */
export function ErrorDisplay({ error, errorInfo, onReset, onReload, showDetails = false }) {
  const needsSupport = error.contactSupport || false;
  const isActionable = error.actionable !== false;

  return (
    <div className="min-h-screen flex items-center justify-center bg-spotify-black p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-2xl"
      >
        <div className="bg-spotify-dark rounded-lg p-8 shadow-2xl">
          {/* Error Icon */}
          <div className="text-center mb-6">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-red-500 bg-opacity-20 mb-4">
              <svg
                className="w-8 h-8 text-red-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                />
              </svg>
            </div>
            <h1 className="text-3xl font-bold text-white mb-2">Oops! Something went wrong</h1>
            <p className="text-spotify-lightgray">
              {error.message || 'An unexpected error occurred'}
            </p>
          </div>

          {/* Error Code */}
          {error.code && error.code !== 'UNKNOWN_ERROR' && (
            <div className="mb-4 p-3 bg-spotify-lightgray bg-opacity-10 rounded-lg">
              <p className="text-sm text-spotify-lightgray">
                Error Code: <span className="font-mono text-white">{error.code}</span>
              </p>
              {error.category && (
                <p className="text-xs text-spotify-lightgray mt-1">
                  Category: <span className="text-white">{error.category}</span>
                </p>
              )}
            </div>
          )}

          {/* Support Message */}
          {needsSupport && (
            <div className="mb-4 p-4 bg-yellow-500 bg-opacity-20 border border-yellow-500 rounded-lg">
              <p className="text-yellow-400 text-sm">
                This appears to be a platform issue. Please contact support if this problem persists.
              </p>
            </div>
          )}

          {/* Action Buttons */}
          {isActionable && (
            <div className="flex flex-col sm:flex-row gap-3 mb-4">
              {onReset && (
                <button
                  onClick={onReset}
                  className="flex-1 px-6 py-3 bg-spotify-green hover:bg-spotify-green-dark text-white font-semibold rounded-full transition-colors"
                >
                  Try Again
                </button>
              )}
              {onReload && (
                <button
                  onClick={onReload}
                  className="flex-1 px-6 py-3 bg-spotify-lightgray hover:bg-gray-600 text-white font-semibold rounded-full transition-colors"
                >
                  Reload Page
                </button>
              )}
            </div>
          )}

          {/* Technical Details (if enabled) */}
          {showDetails && errorInfo && (
            <details className="mt-6">
              <summary className="cursor-pointer text-spotify-lightgray hover:text-white text-sm mb-2">
                Technical Details
              </summary>
              <div className="mt-2 p-4 bg-spotify-black rounded-lg overflow-auto max-h-64">
                <pre className="text-xs text-spotify-lightgray whitespace-pre-wrap">
                  {errorInfo.componentStack || errorInfo.toString()}
                </pre>
              </div>
            </details>
          )}

          {/* Help Text */}
          <div className="mt-6 pt-6 border-t border-spotify-lightgray border-opacity-20">
            <p className="text-sm text-spotify-lightgray text-center">
              If this problem persists, please{' '}
              <a
                href="https://vercel.com/support"
                target="_blank"
                rel="noopener noreferrer"
                className="text-spotify-green hover:underline"
              >
                contact support
              </a>
              .
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

export default ErrorBoundary;

