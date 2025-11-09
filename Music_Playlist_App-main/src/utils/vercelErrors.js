/**
 * Vercel Error Codes Reference
 * Comprehensive list of all Vercel application and platform errors
 * Based on: https://vercel.com/docs/errors
 */

// Application Errors
export const APPLICATION_ERRORS = {
  // Function Errors
  BODY_NOT_A_STRING_FROM_FUNCTION: {
    code: 'BODY_NOT_A_STRING_FROM_FUNCTION',
    category: 'Function',
    statusCode: 502,
    message: 'Function returned a non-string value',
    description: 'A serverless function returned a value that is not a string. Functions must return strings or Response objects.',
    userMessage: 'The server encountered an error processing your request. Please try again.',
    actionable: true,
  },
  EDGE_FUNCTION_INVOCATION_FAILED: {
    code: 'EDGE_FUNCTION_INVOCATION_FAILED',
    category: 'Function',
    statusCode: 500,
    message: 'Edge function invocation failed',
    description: 'An edge function failed to execute properly.',
    userMessage: 'A server error occurred. Please try again later.',
    actionable: true,
  },
  EDGE_FUNCTION_INVOCATION_TIMEOUT: {
    code: 'EDGE_FUNCTION_INVOCATION_TIMEOUT',
    category: 'Function',
    statusCode: 504,
    message: 'Edge function execution timed out',
    description: 'An edge function took too long to execute and was terminated.',
    userMessage: 'The request took too long to process. Please try again.',
    actionable: true,
  },
  FUNCTION_INVOCATION_FAILED: {
    code: 'FUNCTION_INVOCATION_FAILED',
    category: 'Function',
    statusCode: 500,
    message: 'Function invocation failed',
    description: 'A serverless function failed to execute properly.',
    userMessage: 'A server error occurred. Please try again later.',
    actionable: true,
  },
  FUNCTION_INVOCATION_TIMEOUT: {
    code: 'FUNCTION_INVOCATION_TIMEOUT',
    category: 'Function',
    statusCode: 504,
    message: 'Function execution timed out',
    description: 'A serverless function took too long to execute and was terminated.',
    userMessage: 'The request took too long to process. Please try again.',
    actionable: true,
  },
  FUNCTION_PAYLOAD_TOO_LARGE: {
    code: 'FUNCTION_PAYLOAD_TOO_LARGE',
    category: 'Function',
    statusCode: 413,
    message: 'Request payload too large',
    description: 'The request body exceeds the maximum allowed size for serverless functions.',
    userMessage: 'The data you\'re trying to send is too large. Please reduce the size and try again.',
    actionable: true,
  },
  FUNCTION_RESPONSE_PAYLOAD_TOO_LARGE: {
    code: 'FUNCTION_RESPONSE_PAYLOAD_TOO_LARGE',
    category: 'Function',
    statusCode: 500,
    message: 'Response payload too large',
    description: 'The function response exceeds the maximum allowed size.',
    userMessage: 'The server response is too large. Please contact support if this persists.',
    actionable: false,
  },
  FUNCTION_THROTTLED: {
    code: 'FUNCTION_THROTTLED',
    category: 'Function',
    statusCode: 503,
    message: 'Function rate limit exceeded',
    description: 'Too many requests to the function. Rate limit exceeded.',
    userMessage: 'Too many requests. Please wait a moment and try again.',
    actionable: true,
  },
  NO_RESPONSE_FROM_FUNCTION: {
    code: 'NO_RESPONSE_FROM_FUNCTION',
    category: 'Function',
    statusCode: 502,
    message: 'No response from function',
    description: 'The function did not return a response.',
    userMessage: 'The server did not respond. Please try again.',
    actionable: true,
  },

  // Deployment Errors
  DEPLOYMENT_BLOCKED: {
    code: 'DEPLOYMENT_BLOCKED',
    category: 'Deployment',
    statusCode: 403,
    message: 'Deployment blocked',
    description: 'The deployment was blocked, possibly due to security or policy restrictions.',
    userMessage: 'This deployment is currently unavailable. Please contact support.',
    actionable: false,
  },
  DEPLOYMENT_DELETED: {
    code: 'DEPLOYMENT_DELETED',
    category: 'Deployment',
    statusCode: 410,
    message: 'Deployment deleted',
    description: 'The requested deployment has been deleted.',
    userMessage: 'This deployment no longer exists.',
    actionable: false,
  },
  DEPLOYMENT_DISABLED: {
    code: 'DEPLOYMENT_DISABLED',
    category: 'Deployment',
    statusCode: 402,
    message: 'Deployment disabled',
    description: 'The deployment has been disabled, possibly due to billing issues.',
    userMessage: 'This deployment is currently disabled. Please check your account status.',
    actionable: false,
  },
  DEPLOYMENT_NOT_FOUND: {
    code: 'DEPLOYMENT_NOT_FOUND',
    category: 'Deployment',
    statusCode: 404,
    message: 'Deployment not found',
    description: 'The requested deployment could not be found.',
    userMessage: 'The requested page or resource could not be found.',
    actionable: true,
  },
  DEPLOYMENT_NOT_READY_REDIRECTING: {
    code: 'DEPLOYMENT_NOT_READY_REDIRECTING',
    category: 'Deployment',
    statusCode: 303,
    message: 'Deployment not ready, redirecting',
    description: 'The deployment is not ready yet and is redirecting to a ready version.',
    userMessage: 'Redirecting to the latest version...',
    actionable: false,
  },
  DEPLOYMENT_PAUSED: {
    code: 'DEPLOYMENT_PAUSED',
    category: 'Deployment',
    statusCode: 503,
    message: 'Deployment paused',
    description: 'The deployment has been paused.',
    userMessage: 'This deployment is currently paused. Please check your dashboard.',
    actionable: false,
  },

  // DNS Errors
  DNS_HOSTNAME_EMPTY: {
    code: 'DNS_HOSTNAME_EMPTY',
    category: 'DNS',
    statusCode: 502,
    message: 'DNS hostname is empty',
    description: 'The DNS hostname configuration is empty or invalid.',
    userMessage: 'DNS configuration error. Please contact support.',
    actionable: false,
  },
  DNS_HOSTNAME_NOT_FOUND: {
    code: 'DNS_HOSTNAME_NOT_FOUND',
    category: 'DNS',
    statusCode: 502,
    message: 'DNS hostname not found',
    description: 'The DNS hostname could not be resolved.',
    userMessage: 'Domain configuration error. Please check your DNS settings.',
    actionable: false,
  },
  DNS_HOSTNAME_RESOLVE_FAILED: {
    code: 'DNS_HOSTNAME_RESOLVE_FAILED',
    category: 'DNS',
    statusCode: 502,
    message: 'DNS resolution failed',
    description: 'Failed to resolve the DNS hostname.',
    userMessage: 'Unable to resolve domain. Please check your DNS configuration.',
    actionable: false,
  },
  DNS_HOSTNAME_RESOLVED_PRIVATE: {
    code: 'DNS_HOSTNAME_RESOLVED_PRIVATE',
    category: 'DNS',
    statusCode: 404,
    message: 'DNS resolved to private IP',
    description: 'The DNS hostname resolved to a private IP address, which is not allowed.',
    userMessage: 'Invalid domain configuration. Private IP addresses are not allowed.',
    actionable: false,
  },
  DNS_HOSTNAME_SERVER_ERROR: {
    code: 'DNS_HOSTNAME_SERVER_ERROR',
    category: 'DNS',
    statusCode: 502,
    message: 'DNS server error',
    description: 'An error occurred with the DNS server.',
    userMessage: 'DNS server error. Please try again later.',
    actionable: true,
  },

  // Cache Errors
  FALLBACK_BODY_TOO_LARGE: {
    code: 'FALLBACK_BODY_TOO_LARGE',
    category: 'Cache',
    statusCode: 502,
    message: 'Fallback response too large',
    description: 'The fallback response exceeds the maximum allowed size.',
    userMessage: 'The response is too large. Please try again.',
    actionable: true,
  },

  // Runtime Errors
  INFINITE_LOOP_DETECTED: {
    code: 'INFINITE_LOOP_DETECTED',
    category: 'Runtime',
    statusCode: 508,
    message: 'Infinite loop detected',
    description: 'An infinite loop was detected in the code execution.',
    userMessage: 'A processing error occurred. Please refresh the page.',
    actionable: true,
  },

  // Image Errors
  INVALID_IMAGE_OPTIMIZE_REQUEST: {
    code: 'INVALID_IMAGE_OPTIMIZE_REQUEST',
    category: 'Image',
    statusCode: 400,
    message: 'Invalid image optimization request',
    description: 'The image optimization request is invalid.',
    userMessage: 'Invalid image request. Please check the image URL.',
    actionable: true,
  },
  OPTIMIZED_EXTERNAL_IMAGE_REQUEST_FAILED: {
    code: 'OPTIMIZED_EXTERNAL_IMAGE_REQUEST_FAILED',
    category: 'Image',
    statusCode: 502,
    message: 'External image optimization failed',
    description: 'Failed to fetch or optimize an external image.',
    userMessage: 'Unable to load the image. Please try again.',
    actionable: true,
  },
  OPTIMIZED_EXTERNAL_IMAGE_REQUEST_INVALID: {
    code: 'OPTIMIZED_EXTERNAL_IMAGE_REQUEST_INVALID',
    category: 'Image',
    statusCode: 502,
    message: 'Invalid external image request',
    description: 'The external image request is invalid.',
    userMessage: 'Invalid image URL. Please check the image source.',
    actionable: true,
  },
  OPTIMIZED_EXTERNAL_IMAGE_REQUEST_UNAUTHORIZED: {
    code: 'OPTIMIZED_EXTERNAL_IMAGE_REQUEST_UNAUTHORIZED',
    category: 'Image',
    statusCode: 502,
    message: 'Unauthorized external image request',
    description: 'The external image request is not authorized.',
    userMessage: 'Unable to access the image. Access may be restricted.',
    actionable: false,
  },
  OPTIMIZED_EXTERNAL_IMAGE_TOO_MANY_REDIRECTS: {
    code: 'OPTIMIZED_EXTERNAL_IMAGE_TOO_MANY_REDIRECTS',
    category: 'Image',
    statusCode: 502,
    message: 'Too many redirects for external image',
    description: 'The external image URL resulted in too many redirects.',
    userMessage: 'Image URL has too many redirects. Please check the image source.',
    actionable: true,
  },

  // Request Errors
  INVALID_REQUEST_METHOD: {
    code: 'INVALID_REQUEST_METHOD',
    category: 'Request',
    statusCode: 405,
    message: 'Invalid request method',
    description: 'The HTTP method used is not allowed for this endpoint.',
    userMessage: 'Invalid request method. Please try a different action.',
    actionable: true,
  },
  MALFORMED_REQUEST_HEADER: {
    code: 'MALFORMED_REQUEST_HEADER',
    category: 'Request',
    statusCode: 400,
    message: 'Malformed request header',
    description: 'One or more request headers are malformed.',
    userMessage: 'Invalid request. Please refresh the page and try again.',
    actionable: true,
  },
  REQUEST_HEADER_TOO_LARGE: {
    code: 'REQUEST_HEADER_TOO_LARGE',
    category: 'Request',
    statusCode: 431,
    message: 'Request header too large',
    description: 'The request headers exceed the maximum allowed size.',
    userMessage: 'Request is too large. Please clear your browser cache and try again.',
    actionable: true,
  },
  URL_TOO_LONG: {
    code: 'URL_TOO_LONG',
    category: 'Request',
    statusCode: 414,
    message: 'URL too long',
    description: 'The request URL exceeds the maximum allowed length.',
    userMessage: 'The URL is too long. Please use a shorter URL or different method.',
    actionable: true,
  },

  // Range Request Errors
  RANGE_END_NOT_VALID: {
    code: 'RANGE_END_NOT_VALID',
    category: 'Request',
    statusCode: 416,
    message: 'Invalid range end value',
    description: 'The Range header end value is invalid.',
    userMessage: 'Invalid request range. Please try again.',
    actionable: true,
  },
  RANGE_GROUP_NOT_VALID: {
    code: 'RANGE_GROUP_NOT_VALID',
    category: 'Request',
    statusCode: 416,
    message: 'Invalid range group',
    description: 'The Range header group is invalid.',
    userMessage: 'Invalid request range. Please try again.',
    actionable: true,
  },
  RANGE_MISSING_UNIT: {
    code: 'RANGE_MISSING_UNIT',
    category: 'Request',
    statusCode: 416,
    message: 'Range header missing unit',
    description: 'The Range header is missing the unit specification.',
    userMessage: 'Invalid request range. Please try again.',
    actionable: true,
  },
  RANGE_START_NOT_VALID: {
    code: 'RANGE_START_NOT_VALID',
    category: 'Request',
    statusCode: 416,
    message: 'Invalid range start value',
    description: 'The Range header start value is invalid.',
    userMessage: 'Invalid request range. Please try again.',
    actionable: true,
  },
  RANGE_UNIT_NOT_SUPPORTED: {
    code: 'RANGE_UNIT_NOT_SUPPORTED',
    category: 'Request',
    statusCode: 416,
    message: 'Range unit not supported',
    description: 'The Range header unit is not supported.',
    userMessage: 'Invalid request range. Please try again.',
    actionable: true,
  },
  TOO_MANY_RANGES: {
    code: 'TOO_MANY_RANGES',
    category: 'Request',
    statusCode: 416,
    message: 'Too many range requests',
    description: 'The request contains too many range specifications.',
    userMessage: 'Too many range requests. Please simplify your request.',
    actionable: true,
  },

  // Middleware Errors
  MIDDLEWARE_INVOCATION_FAILED: {
    code: 'MIDDLEWARE_INVOCATION_FAILED',
    category: 'Function',
    statusCode: 500,
    message: 'Middleware invocation failed',
    description: 'The middleware function failed to execute.',
    userMessage: 'A server error occurred. Please try again later.',
    actionable: true,
  },
  MIDDLEWARE_INVOCATION_TIMEOUT: {
    code: 'MIDDLEWARE_INVOCATION_TIMEOUT',
    category: 'Function',
    statusCode: 504,
    message: 'Middleware execution timed out',
    description: 'The middleware function took too long to execute.',
    userMessage: 'The request took too long. Please try again.',
    actionable: true,
  },
  MIDDLEWARE_RUNTIME_DEPRECATED: {
    code: 'MIDDLEWARE_RUNTIME_DEPRECATED',
    category: 'Runtime',
    statusCode: 503,
    message: 'Middleware runtime deprecated',
    description: 'The middleware runtime version is deprecated.',
    userMessage: 'Service temporarily unavailable. Please try again later.',
    actionable: false,
  },
  MICROFRONTENDS_MIDDLEWARE_ERROR: {
    code: 'MICROFRONTENDS_MIDDLEWARE_ERROR',
    category: 'Function',
    statusCode: 500,
    message: 'Microfrontends middleware error',
    description: 'An error occurred in the microfrontends middleware.',
    userMessage: 'A server error occurred. Please try again later.',
    actionable: true,
  },
  MICROFRONTENDS_MISSING_FALLBACK_ERROR: {
    code: 'MICROFRONTENDS_MISSING_FALLBACK_ERROR',
    category: 'Function',
    statusCode: 400,
    message: 'Microfrontends missing fallback',
    description: 'The microfrontends configuration is missing a required fallback.',
    userMessage: 'Configuration error. Please contact support.',
    actionable: false,
  },

  // Routing Errors
  ROUTER_CANNOT_MATCH: {
    code: 'ROUTER_CANNOT_MATCH',
    category: 'Routing',
    statusCode: 502,
    message: 'Router cannot match route',
    description: 'The router could not match the requested route.',
    userMessage: 'Unable to process the request. Please try again.',
    actionable: true,
  },
  ROUTER_EXTERNAL_TARGET_CONNECTION_ERROR: {
    code: 'ROUTER_EXTERNAL_TARGET_CONNECTION_ERROR',
    category: 'Routing',
    statusCode: 502,
    message: 'External target connection error',
    description: 'Failed to connect to the external routing target.',
    userMessage: 'Connection error. Please try again later.',
    actionable: true,
  },
  ROUTER_EXTERNAL_TARGET_ERROR: {
    code: 'ROUTER_EXTERNAL_TARGET_ERROR',
    category: 'Routing',
    statusCode: 502,
    message: 'External target error',
    description: 'An error occurred with the external routing target.',
    userMessage: 'External service error. Please try again later.',
    actionable: true,
  },
  ROUTER_EXTERNAL_TARGET_HANDSHAKE_ERROR: {
    code: 'ROUTER_EXTERNAL_TARGET_HANDSHAKE_ERROR',
    category: 'Routing',
    statusCode: 502,
    message: 'External target handshake error',
    description: 'Failed to establish connection with external routing target.',
    userMessage: 'Connection error. Please try again later.',
    actionable: true,
  },
  ROUTER_TOO_MANY_HAS_SELECTIONS: {
    code: 'ROUTER_TOO_MANY_HAS_SELECTIONS',
    category: 'Routing',
    statusCode: 502,
    message: 'Too many route has selections',
    description: 'The route configuration has too many has selections.',
    userMessage: 'Configuration error. Please contact support.',
    actionable: false,
  },
  TOO_MANY_FILESYSTEM_CHECKS: {
    code: 'TOO_MANY_FILESYSTEM_CHECKS',
    category: 'Routing',
    statusCode: 502,
    message: 'Too many filesystem checks',
    description: 'Too many filesystem checks were performed during routing.',
    userMessage: 'Routing error. Please try again.',
    actionable: true,
  },
  TOO_MANY_FORKS: {
    code: 'TOO_MANY_FORKS',
    category: 'Routing',
    statusCode: 502,
    message: 'Too many route forks',
    description: 'The routing configuration has too many forks.',
    userMessage: 'Configuration error. Please contact support.',
    actionable: false,
  },

  // Sandbox Errors
  SANDBOX_NOT_FOUND: {
    code: 'SANDBOX_NOT_FOUND',
    category: 'Sandbox',
    statusCode: 404,
    message: 'Sandbox not found',
    description: 'The requested sandbox environment could not be found.',
    userMessage: 'Development environment not found.',
    actionable: false,
  },
  SANDBOX_NOT_LISTENING: {
    code: 'SANDBOX_NOT_LISTENING',
    category: 'Sandbox',
    statusCode: 502,
    message: 'Sandbox not listening',
    description: 'The sandbox environment is not listening for requests.',
    userMessage: 'Development environment is not available.',
    actionable: false,
  },
  SANDBOX_STOPPED: {
    code: 'SANDBOX_STOPPED',
    category: 'Sandbox',
    statusCode: 410,
    message: 'Sandbox stopped',
    description: 'The sandbox environment has been stopped.',
    userMessage: 'Development environment has been stopped.',
    actionable: false,
  },

  // General Errors
  NOT_FOUND: {
    code: 'NOT_FOUND',
    category: 'Deployment',
    statusCode: 404,
    message: 'Resource not found',
    description: 'The requested resource could not be found.',
    userMessage: 'The page you\'re looking for doesn\'t exist.',
    actionable: true,
  },
  RESOURCE_NOT_FOUND: {
    code: 'RESOURCE_NOT_FOUND',
    category: 'Request',
    statusCode: 404,
    message: 'Resource not found',
    description: 'The requested resource could not be found.',
    userMessage: 'The requested resource could not be found.',
    actionable: true,
  },
};

// Platform Errors (Internal - should contact Vercel support)
export const PLATFORM_ERRORS = {
  FUNCTION_THROTTLED: {
    code: 'FUNCTION_THROTTLED',
    category: 'Internal',
    statusCode: 500,
    message: 'Function throttled (internal)',
    description: 'Internal function throttling error. Contact Vercel support.',
    userMessage: 'Service temporarily unavailable. Please try again later or contact support.',
    actionable: false,
    contactSupport: true,
  },
  INTERNAL_CACHE_ERROR: {
    code: 'INTERNAL_CACHE_ERROR',
    category: 'Internal',
    statusCode: 500,
    message: 'Internal cache error',
    description: 'An internal cache error occurred. Contact Vercel support.',
    userMessage: 'A server error occurred. Please try again later or contact support.',
    actionable: false,
    contactSupport: true,
  },
  INTERNAL_CACHE_KEY_TOO_LONG: {
    code: 'INTERNAL_CACHE_KEY_TOO_LONG',
    category: 'Internal',
    statusCode: 500,
    message: 'Internal cache key too long',
    description: 'The cache key exceeds the maximum length. Contact Vercel support.',
    userMessage: 'A server error occurred. Please contact support.',
    actionable: false,
    contactSupport: true,
  },
  INTERNAL_CACHE_LOCK_FULL: {
    code: 'INTERNAL_CACHE_LOCK_FULL',
    category: 'Internal',
    statusCode: 500,
    message: 'Internal cache lock full',
    description: 'The cache lock is full. Contact Vercel support.',
    userMessage: 'Service temporarily unavailable. Please try again later or contact support.',
    actionable: false,
    contactSupport: true,
  },
  INTERNAL_CACHE_LOCK_TIMEOUT: {
    code: 'INTERNAL_CACHE_LOCK_TIMEOUT',
    category: 'Internal',
    statusCode: 500,
    message: 'Internal cache lock timeout',
    description: 'The cache lock operation timed out. Contact Vercel support.',
    userMessage: 'Service temporarily unavailable. Please try again later or contact support.',
    actionable: false,
    contactSupport: true,
  },
  INTERNAL_DEPLOYMENT_FETCH_FAILED: {
    code: 'INTERNAL_DEPLOYMENT_FETCH_FAILED',
    category: 'Internal',
    statusCode: 500,
    message: 'Internal deployment fetch failed',
    description: 'Failed to fetch deployment internally. Contact Vercel support.',
    userMessage: 'A server error occurred. Please contact support.',
    actionable: false,
    contactSupport: true,
  },
  INTERNAL_EDGE_FUNCTION_INVOCATION_FAILED: {
    code: 'INTERNAL_EDGE_FUNCTION_INVOCATION_FAILED',
    category: 'Internal',
    statusCode: 500,
    message: 'Internal edge function invocation failed',
    description: 'Internal edge function error. Contact Vercel support.',
    userMessage: 'A server error occurred. Please contact support.',
    actionable: false,
    contactSupport: true,
  },
  INTERNAL_EDGE_FUNCTION_INVOCATION_TIMEOUT: {
    code: 'INTERNAL_EDGE_FUNCTION_INVOCATION_TIMEOUT',
    category: 'Internal',
    statusCode: 500,
    message: 'Internal edge function invocation timeout',
    description: 'Internal edge function timeout. Contact Vercel support.',
    userMessage: 'A server error occurred. Please contact support.',
    actionable: false,
    contactSupport: true,
  },
  INTERNAL_FUNCTION_INVOCATION_FAILED: {
    code: 'INTERNAL_FUNCTION_INVOCATION_FAILED',
    category: 'Internal',
    statusCode: 500,
    message: 'Internal function invocation failed',
    description: 'Internal function error. Contact Vercel support.',
    userMessage: 'A server error occurred. Please contact support.',
    actionable: false,
    contactSupport: true,
  },
  INTERNAL_FUNCTION_INVOCATION_TIMEOUT: {
    code: 'INTERNAL_FUNCTION_INVOCATION_TIMEOUT',
    category: 'Internal',
    statusCode: 500,
    message: 'Internal function invocation timeout',
    description: 'Internal function timeout. Contact Vercel support.',
    userMessage: 'A server error occurred. Please contact support.',
    actionable: false,
    contactSupport: true,
  },
  INTERNAL_FUNCTION_NOT_FOUND: {
    code: 'INTERNAL_FUNCTION_NOT_FOUND',
    category: 'Internal',
    statusCode: 500,
    message: 'Internal function not found',
    description: 'Internal function could not be found. Contact Vercel support.',
    userMessage: 'A server error occurred. Please contact support.',
    actionable: false,
    contactSupport: true,
  },
  INTERNAL_FUNCTION_NOT_READY: {
    code: 'INTERNAL_FUNCTION_NOT_READY',
    category: 'Internal',
    statusCode: 500,
    message: 'Internal function not ready',
    description: 'Internal function is not ready. Contact Vercel support.',
    userMessage: 'Service temporarily unavailable. Please try again later or contact support.',
    actionable: false,
    contactSupport: true,
  },
  INTERNAL_FUNCTION_SERVICE_UNAVAILABLE: {
    code: 'INTERNAL_FUNCTION_SERVICE_UNAVAILABLE',
    category: 'Internal',
    statusCode: 500,
    message: 'Internal function service unavailable',
    description: 'Internal function service is unavailable. Contact Vercel support.',
    userMessage: 'Service temporarily unavailable. Please try again later or contact support.',
    actionable: false,
    contactSupport: true,
  },
  INTERNAL_MICROFRONTENDS_BUILD_ERROR: {
    code: 'INTERNAL_MICROFRONTENDS_BUILD_ERROR',
    category: 'Internal',
    statusCode: 500,
    message: 'Internal microfrontends build error',
    description: 'Internal microfrontends build error. Contact Vercel support.',
    userMessage: 'A server error occurred. Please contact support.',
    actionable: false,
    contactSupport: true,
  },
  INTERNAL_MICROFRONTENDS_INVALID_CONFIGURATION_ERROR: {
    code: 'INTERNAL_MICROFRONTENDS_INVALID_CONFIGURATION_ERROR',
    category: 'Internal',
    statusCode: 500,
    message: 'Internal microfrontends configuration error',
    description: 'Internal microfrontends configuration error. Contact Vercel support.',
    userMessage: 'A server error occurred. Please contact support.',
    actionable: false,
    contactSupport: true,
  },
  INTERNAL_MICROFRONTENDS_UNEXPECTED_ERROR: {
    code: 'INTERNAL_MICROFRONTENDS_UNEXPECTED_ERROR',
    category: 'Internal',
    statusCode: 500,
    message: 'Internal microfrontends unexpected error',
    description: 'Unexpected internal microfrontends error. Contact Vercel support.',
    userMessage: 'A server error occurred. Please contact support.',
    actionable: false,
    contactSupport: true,
  },
  INTERNAL_MISSING_RESPONSE_FROM_CACHE: {
    code: 'INTERNAL_MISSING_RESPONSE_FROM_CACHE',
    category: 'Internal',
    statusCode: 500,
    message: 'Internal missing response from cache',
    description: 'Internal cache response missing. Contact Vercel support.',
    userMessage: 'A server error occurred. Please contact support.',
    actionable: false,
    contactSupport: true,
  },
  INTERNAL_OPTIMIZED_IMAGE_REQUEST_FAILED: {
    code: 'INTERNAL_OPTIMIZED_IMAGE_REQUEST_FAILED',
    category: 'Internal',
    statusCode: 500,
    message: 'Internal optimized image request failed',
    description: 'Internal image optimization error. Contact Vercel support.',
    userMessage: 'A server error occurred. Please contact support.',
    actionable: false,
    contactSupport: true,
  },
  INTERNAL_ROUTER_CANNOT_PARSE_PATH: {
    code: 'INTERNAL_ROUTER_CANNOT_PARSE_PATH',
    category: 'Internal',
    statusCode: 500,
    message: 'Internal router cannot parse path',
    description: 'Internal routing error. Contact Vercel support.',
    userMessage: 'A server error occurred. Please contact support.',
    actionable: false,
    contactSupport: true,
  },
  INTERNAL_STATIC_REQUEST_FAILED: {
    code: 'INTERNAL_STATIC_REQUEST_FAILED',
    category: 'Internal',
    statusCode: 500,
    message: 'Internal static request failed',
    description: 'Internal static file serving error. Contact Vercel support.',
    userMessage: 'A server error occurred. Please contact support.',
    actionable: false,
    contactSupport: true,
  },
  INTERNAL_UNARCHIVE_FAILED: {
    code: 'INTERNAL_UNARCHIVE_FAILED',
    category: 'Internal',
    statusCode: 500,
    message: 'Internal unarchive failed',
    description: 'Internal archive extraction error. Contact Vercel support.',
    userMessage: 'A server error occurred. Please contact support.',
    actionable: false,
    contactSupport: true,
  },
  INTERNAL_UNEXPECTED_ERROR: {
    code: 'INTERNAL_UNEXPECTED_ERROR',
    category: 'Internal',
    statusCode: 500,
    message: 'Internal unexpected error',
    description: 'An unexpected internal error occurred. Contact Vercel support.',
    userMessage: 'An unexpected error occurred. Please contact support.',
    actionable: false,
    contactSupport: true,
  },
};

// Combine all errors
export const ALL_VERCEL_ERRORS = {
  ...APPLICATION_ERRORS,
  ...PLATFORM_ERRORS,
};

/**
 * Get error information by code
 * @param {string} errorCode - The Vercel error code
 * @returns {Object|null} Error information or null if not found
 */
export function getErrorByCode(errorCode) {
  return ALL_VERCEL_ERRORS[errorCode] || null;
}

/**
 * Get user-friendly error message
 * @param {string} errorCode - The Vercel error code
 * @param {string} fallbackMessage - Fallback message if error code not found
 * @returns {string} User-friendly error message
 */
export function getUserFriendlyMessage(errorCode, fallbackMessage = 'An error occurred. Please try again.') {
  const error = getErrorByCode(errorCode);
  return error ? error.userMessage : fallbackMessage;
}

/**
 * Check if error requires contacting support
 * @param {string} errorCode - The Vercel error code
 * @returns {boolean} True if support should be contacted
 */
export function shouldContactSupport(errorCode) {
  const error = getErrorByCode(errorCode);
  return error ? (error.contactSupport === true) : false;
}

/**
 * Check if error is actionable by user
 * @param {string} errorCode - The Vercel error code
 * @returns {boolean} True if user can take action
 */
export function isActionable(errorCode) {
  const error = getErrorByCode(errorCode);
  return error ? (error.actionable !== false) : true;
}

/**
 * Get error category
 * @param {string} errorCode - The Vercel error code
 * @returns {string} Error category
 */
export function getErrorCategory(errorCode) {
  const error = getErrorByCode(errorCode);
  return error ? error.category : 'Unknown';
}

/**
 * Get HTTP status code for error
 * @param {string} errorCode - The Vercel error code
 * @returns {number} HTTP status code
 */
export function getErrorStatusCode(errorCode) {
  const error = getErrorByCode(errorCode);
  return error ? error.statusCode : 500;
}

