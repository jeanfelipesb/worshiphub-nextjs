"use client";

import api from '@/lib/axios';
import { useEffect, useState } from 'react';
import { AxiosError } from 'axios'; 

const TestApi = () => {
  const [data, setData] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await api.get('/users'); 
        setData(response.data); 
        console.log(response.data); 
      } catch (err) {
        const error = err as AxiosError; 
        if (error && error.message) {
          setError(error.message); 
        } 
      }
    };

    fetchData();
  }, []);

  if (error) return <p>Erro: {error}</p>;
  if (!data) return <p>Carregando...</p>;

  return (
    <div>
      <h1>Dados da API:</h1>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </div>
  );
};

export default TestApi;
