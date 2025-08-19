// API Service for AttendEase Frontend
import API_BASE_URL from '../config';

// Default to local backend if config is not set
const baseURL = API_BASE_URL || 'http://localhost:5000/api';

console.log('🔗 API Base URL:', baseURL);

// Generic API call function
const apiCall = async (endpoint, options = {}) => {
  const url = `${baseURL}${endpoint}`;
  
  const defaultOptions = {
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include', // Include cookies for authentication
  };

  const finalOptions = { ...defaultOptions, ...options };

  try {
    console.log(`📡 API Call: ${finalOptions.method || 'GET'} ${url}`);
    
    const response = await fetch(url, finalOptions);
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const data = await response.json();
    console.log(`✅ API Response:`, data);
    
    return data;
  } catch (error) {
    console.error(`❌ API Error for ${endpoint}:`, error);
    throw error;
  }
};

// API Service functions
export const apiService = {
  // Health check
  healthCheck: () => apiCall('/health'),
  
  // Database test
  testDatabase: () => apiCall('/test-db'),
  
  // Authentication
  login: (credentials) => apiCall('/auth/login', {
    method: 'POST',
    body: JSON.stringify(credentials),
  }),
  
  // Employees
  getEmployees: () => apiCall('/employees'),
  
  // Attendance
  getAttendance: () => apiCall('/attendance'),
  
  // Generic GET request
  get: (endpoint) => apiCall(endpoint),
  
  // Generic POST request
  post: (endpoint, data) => apiCall(endpoint, {
    method: 'POST',
    body: JSON.stringify(data),
  }),
  
  // Generic PUT request
  put: (endpoint, data) => apiCall(endpoint, {
    method: 'PUT',
    body: JSON.stringify(data),
  }),
  
  // Generic DELETE request
  delete: (endpoint) => apiCall(endpoint, {
    method: 'DELETE',
  }),
};

// Test connection function
export const testBackendConnection = async () => {
  try {
    console.log('🧪 Testing backend connection...');
    
    // Test basic connection
    const healthResponse = await apiService.healthCheck();
    console.log('✅ Health check passed:', healthResponse);
    
    // Test database connection
    const dbResponse = await apiService.testDatabase();
    console.log('✅ Database test passed:', dbResponse);
    
    return {
      status: 'success',
      message: 'Backend connection successful',
      health: healthResponse,
      database: dbResponse
    };
  } catch (error) {
    console.error('❌ Backend connection failed:', error);
    return {
      status: 'error',
      message: 'Backend connection failed',
      error: error.message
    };
  }
};

export default apiService;
