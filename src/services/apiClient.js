import axios from "axios";

export const axiosClient = axios.create({
    baseURL: import.meta.env.VITE_APP_API_URL,
    headers: {
        "Accept": "*",
        "Authorization": `Bearer ${localStorage.getItem('token')}`,
        "Content-Type": "application/json"
    }
});