'use client'
import axios from "axios";
import { getSession } from "next-auth/react";

// Cria uma instância do Axios
const api = axios.create({
  baseURL: 'http://localhost:8080',  // Substitua pelo URL da sua API
});

// Configura o interceptor para adicionar o token JWT nas requisições
api.interceptors.request.use(
  async (config) => {
    const session = await getSession();

    // Verifica se há um token JWT na sessão
    if (session?.accessToken) {
      config.headers.Authorization = `Bearer ${session.accessToken}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);


// Interceptor para capturar e tratar erros globalmente
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (axios.isAxiosError(error)) {
      if (error.response) {
        if (error.response.status == 403) {
          return Promise.reject({
            status: error.response.status,
            message: error.response.data.message || 'Erro de permissão',
          });
        } else {
          return Promise.reject({
            status: error.response.status,
            message: error.response.data.message || 'Erro na resposta da API',
          });
        }
      } else if (error.request) {
        return Promise.reject({
          status: 500,
          message: 'Servidor não encontrado ou inativo',
        });
      } else {
        return Promise.reject({
          status: 500,
          message: 'Erro desconhecido na configuração da requisição',
        });
      }
    } else {
      return Promise.reject({
        status: 500,
        message: 'Erro desconhecido',
      });
    }
  }
);

export default api;
