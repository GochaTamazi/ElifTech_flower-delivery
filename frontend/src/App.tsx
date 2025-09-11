import React, { useEffect, useState } from 'react';
import logo from './logo.svg';
import './App.css';
import { apiService } from './api/apiService';

interface ApiData {
  message?: string;
  // Add other expected properties from your API
}

function App() {
  const [data, setData] = useState<ApiData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Example API call - replace '/api/endpoint' with your actual API endpoint
        const response = await apiService.get<ApiData>('/api/endpoint');
        if (response.error) {
          setError(response.error);
        } else {
          setData(response.data);
        }
      } catch (err) {
        setError('Failed to fetch data from the server');
        console.error('API Error:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <h1>Flower Delivery App</h1>
        {loading ? (
          <p>Loading data from API...</p>
        ) : error ? (
          <p className="error">Error: {error}</p>
        ) : (
          <div className="api-response">
            <h3>API Response:</h3>
            <pre>{JSON.stringify(data, null, 2)}</pre>
          </div>
        )}
      </header>
    </div>
  );
}

export default App;
