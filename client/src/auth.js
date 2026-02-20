import axios from "axios";

const refreshAccessToken = async () => {
    try {
        const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/auth/token`, {}, { 
        withCredentials: true // Envía automáticamente el refresh token en la cookie
        });
        if (response.data && response.data.accessToken) {
            // Actualiza el localStorage con el nuevo access token
            localStorage.setItem('accessToken', response.data.accessToken);
            return response.data.accessToken;
        }
        console.log('Se ha guardado correctamente el nuevo access token')
    } catch (error) {
        console.error("Refresh Token Error:", error);
        return null;
    }
};
  
export {
    refreshAccessToken
};