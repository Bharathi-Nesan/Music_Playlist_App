import { useLocation, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { handleError, extractErrorCode } from '../utils/errorHandler';
import { ErrorDisplay } from '../components/ErrorBoundary';
import { motion } from 'framer-motion';

/**
 * Error Page Component
 * Displays error information for route-level errors
 */
const ErrorPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  
  // Extract error from location state or URL params
  const error = location.state?.error || 
               new URLSearchParams(location.search).get('error') ||
               null;

  useEffect(() => {
    // Log error for debugging
    if (error) {
      console.error('ErrorPage - Error:', error);
    }
  }, [error]);

  const handleReset = () => {
    // Navigate back or to home
    if (window.history.length > 1) {
      navigate(-1);
    } else {
      navigate('/');
    }
  };

  const handleReload = () => {
    window.location.reload();
  };

  // Parse error if it exists
  const errorDetails = error ? handleError(error, { logError: false }) : {
    code: 'NOT_FOUND',
    message: 'The page you\'re looking for doesn\'t exist.',
    category: 'Deployment',
    statusCode: 404,
    actionable: true,
    contactSupport: false,
  };

  return (
    <ErrorDisplay
      error={errorDetails}
      onReset={handleReset}
      onReload={handleReload}
      showDetails={process.env.NODE_ENV === 'development'}
    />
  );
};

export default ErrorPage;

