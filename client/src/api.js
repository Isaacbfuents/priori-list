import axios from 'axios';
import { refreshAccessToken } from './auth.js'; // Importar la función de refresh

const api = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_URL,
  withCredentials: true // Enviar las cookies automáticamente
});

let isRefreshing = false;
let failedQueue = []; // Se guardan las peticiones pendientes

const processQueue = (error, token = null) => {
  failedQueue.forEach(p => { // Recorre las peticiones pendientes
    if (error) {
      p.reject(error);
    } else {
      p.resolve(token);
    }
  });
  failedQueue = [];
};


// Interceptor de respuestas
api.interceptors.response.use(
  res => res, // Si la respuesta es exitosa, la retorna
  async (error) => {
    const originalRequest = error.config; // Guardar configuracion original de la peticion que fallo

    // Token faltante o inválido (401)
    if (error.response?.status === 401 && error.response.data.message === "Acceso denegado. No cuentas con un token.") {
      console.log("Token faltante o inválido, redirigiendo...");
      window.location.href = "/login"; // Redirige a login si el token es invalido o faltante
      return Promise.reject(error); // Rechaza el promise
    }

    // Token expirado (403)
    if (error.response?.status === 403 && !originalRequest._retry) {
      originalRequest._retry = true;

      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject });
        }).then((token) => {
          originalRequest.headers['Authorization'] = `Bearer ${token}`;
          return api(originalRequest);
        }).catch((err) => Promise.reject(err));
      }

      isRefreshing = true; // Se esta realizando el refresh. Impide multiples peticiones al backend

      try {
        const newAccessToken = await refreshAccessToken(); //Hace la petición al backend y devuelve el nuevo token
        api.defaults.headers.common['Authorization'] = `Bearer ${newAccessToken}`;
        processQueue(null, newAccessToken);
        originalRequest.headers['Authorization'] = `Bearer ${newAccessToken}`;
        return api(originalRequest);
      } catch (refreshError) {
        processQueue(refreshError, null);
        window.location.href = "/login";
        return Promise.reject(refreshError);
      } finally {
        isRefreshing = false;
      }
    }

    return Promise.reject(error);
  }
);

export default api;
