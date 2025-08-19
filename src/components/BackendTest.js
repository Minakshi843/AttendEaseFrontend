import React, { useState, useEffect } from 'react';
import { testBackendConnection, apiService } from '../services/api';

const BackendTest = () => {
  const [connectionStatus, setConnectionStatus] = useState('testing');
  const [testResults, setTestResults] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    testConnection();
  }, []);

  const testConnection = async () => {
    setConnectionStatus('testing');
    setError(null);
    
    try {
      const result = await testBackendConnection();
      setTestResults(result);
      setConnectionStatus(result.status);
    } catch (err) {
      setError(err.message);
      setConnectionStatus('error');
    }
  };

  const testEndpoint = async (endpoint, label) => {
    try {
      console.log(`Testing ${label}...`);
      const result = await apiService.get(endpoint);
      alert(`${label} Success: ${JSON.stringify(result, null, 2)}`);
    } catch (err) {
      alert(`${label} Failed: ${err.message}`);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">🧪 Backend Connection Test</h2>
      
      {/* Connection Status */}
      <div className="mb-6 p-4 rounded-lg border">
        <h3 className="text-lg font-semibold mb-2">Connection Status</h3>
        <div className="flex items-center space-x-2">
          {connectionStatus === 'testing' && (
            <>
              <div className="w-4 h-4 bg-yellow-500 rounded-full animate-pulse"></div>
              <span className="text-yellow-600">Testing connection...</span>
            </>
          )}
          {connectionStatus === 'success' && (
            <>
              <div className="w-4 h-4 bg-green-500 rounded-full"></div>
              <span className="text-green-600">✅ Backend connected successfully!</span>
            </>
          )}
          {connectionStatus === 'error' && (
            <>
              <div className="w-4 h-4 bg-red-500 rounded-full"></div>
              <span className="text-red-600">❌ Backend connection failed</span>
            </>
          )}
        </div>
        
        <button
          onClick={testConnection}
          className="mt-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          🔄 Retry Connection
        </button>
      </div>

      {/* Test Results */}
      {testResults && (
        <div className="mb-6 p-4 rounded-lg border bg-gray-50">
          <h3 className="text-lg font-semibold mb-2">Test Results</h3>
          <pre className="text-sm bg-white p-3 rounded border overflow-auto">
            {JSON.stringify(testResults, null, 2)}
          </pre>
        </div>
      )}

      {/* Error Display */}
      {error && (
        <div className="mb-6 p-4 rounded-lg border bg-red-50 border-red-200">
          <h3 className="text-lg font-semibold mb-2 text-red-800">Error Details</h3>
          <p className="text-red-600">{error}</p>
          <div className="mt-2 text-sm text-red-500">
            <p>💡 Troubleshooting tips:</p>
            <ul className="list-disc list-inside mt-1">
              <li>Make sure your backend server is running on port 5000</li>
              <li>Check if the backend URL is correct: http://localhost:5000</li>
              <li>Verify CORS is enabled for localhost:3000</li>
              <li>Check browser console for more details</li>
            </ul>
          </div>
        </div>
      )}

      {/* Manual Test Buttons */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        <button
          onClick={() => testEndpoint('/health', 'Health Check')}
          className="p-3 bg-green-100 text-green-800 rounded hover:bg-green-200 border border-green-300"
        >
          🏥 Health Check
        </button>
        
        <button
          onClick={() => testEndpoint('/test-db', 'Database Test')}
          className="p-3 bg-blue-100 text-blue-800 rounded hover:bg-blue-200 border border-blue-300"
        >
          🗄️ Database Test
        </button>
        
        <button
          onClick={() => testEndpoint('/employees', 'Get Employees')}
          className="p-3 bg-purple-100 text-purple-800 rounded hover:bg-purple-200 border border-purple-300"
        >
          👥 Get Employees
        </button>
        
        <button
          onClick={() => testEndpoint('/attendance', 'Get Attendance')}
          className="p-3 bg-orange-100 text-orange-800 rounded hover:bg-orange-200 border border-orange-300"
        >
          📊 Get Attendance
        </button>
        
        <button
          onClick={() => {
            const newWindow = window.open('http://localhost:5000', '_blank');
            if (!newWindow) alert('Please allow popups and try again');
          }}
          className="p-3 bg-gray-100 text-gray-800 rounded hover:bg-gray-200 border border-gray-300"
        >
          🌐 Open Backend
        </button>
        
        <button
          onClick={() => {
            const newWindow = window.open('http://localhost:5000/api/health', '_blank');
            if (!newWindow) alert('Please allow popups and try again');
          }}
          className="p-3 bg-indigo-100 text-indigo-800 rounded hover:bg-indigo-200 border border-indigo-300"
        >
          🔗 API Health
        </button>
      </div>

      {/* Instructions */}
      <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
        <h3 className="text-lg font-semibold mb-2 text-blue-800">📋 Instructions</h3>
        <ol className="list-decimal list-inside text-blue-700 space-y-1">
          <li>Make sure your backend server is running: <code className="bg-blue-100 px-1 rounded">node test-server.js</code></li>
          <li>Check that the server shows: "Server running on: http://localhost:5000"</li>
          <li>Click the test buttons above to verify each endpoint</li>
          <li>If tests pass, your frontend is successfully connected to the backend!</li>
        </ol>
      </div>
    </div>
  );
};

export default BackendTest;
