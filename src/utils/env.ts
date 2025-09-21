// Environment configuration utility

export const isDevelopment = () => {
  if (typeof window === 'undefined') return false;
  
  // Check if we're in development based on hostname
  const hostname = window.location.hostname;
  return (
    hostname === 'localhost' ||
    hostname === '127.0.0.1' ||
    hostname.includes('figma.com') ||
    hostname.includes('dev') ||
    hostname.includes('staging')
  );
};

export const isProduction = () => !isDevelopment();

// Get environment-specific configuration
export const getConfig = () => {
  const dev = isDevelopment();
  
  return {
    isDevelopment: dev,
    isProduction: !dev,
    showDebugTools: dev,
    apiUrl: dev ? 'http://localhost:8000' : 'https://api.glowup.app',
    enableLogging: dev,
  };
};