import axios, { AxiosInstance } from 'axios';

export const customAxios = () => {
    const token = sessionStorage.getItem('token');
    const rtoken = sessionStorage.getItem('rtoken');
    const baseAxios: AxiosInstance = axios.create({
        baseURL: process.env.REACT_APP_API_URL,
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
        },
        withCredentials: true,
    })
    return baseAxios;
}