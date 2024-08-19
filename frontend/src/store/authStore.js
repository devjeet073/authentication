import { create } from 'zustand';
import axios from 'axios';

const API_URL = "http://localhost:5000/api/auth";

axios.defaults.withCredentials = true;

export const useAuthStore = create((set) => ({
    user: null,
    isAuthenticated: false,
    isLoading: false,
    error: null,
    isCheckingAuth: true,

    signup: async (email, password, name) => {
        set({ isLoading: true, error: null });
        try {
            const response = await axios.post(`${API_URL}/signup`, { email, password, name });
            set({ user: response.data.user, isAuthenticated: true, isLoading: false, error: null });
        } catch (error) {
            set({ error: error.response.data.message, isLoading: false });
            console.log(error);
            throw error;
        }
    },
    login: async (email, password) => {
        set({ isLoading: true, error:null});

        try {
            const response = await axios.post(`${API_URL}/login`, { email, password });
            set({ user: response.data.user, isAuthenticated: true, isLoading: false, error: null });
        } catch (error) {
            set({ error: error.response.data.message, isLoading: false });
            console.log(error);
            throw error;
        }

    },
    logout: async () => {
        set({ isLoading: true, error:null});

        try {
            const response = await axios.post(`${API_URL}/logout`);
            set({ user: null, isAuthenticated: false, isLoading: false, error: null});
        } catch (error) {
            set({ error: "Error logged out", isLoading: false});
            throw error;
        }

    },
    verifyEmail: async (token) => {
        set({ isLoading: true, error: null });
        try {
            const response = await axios.post(`${API_URL}/verify-email`, { code : token });
            set({ user: response.data, isAuthenticated: true, isLoading: false, error: null });
            return response.data;
        } catch (error) {
            set({ error: error.response.data.message, isLoading: false });
            console.log(error);
            throw error;
        }
    },
    checkAuth: async () => {
        set({ isCheckingAuth: true, error: null });
        try {
            const response = await axios.get(`${API_URL}/check-auth`);
            set({ user: response.data.user, isAuthenticated: true, isCheckingAuth: false, error: null });
        } catch (error) {
            set({ error: error.response.data.message, isCheckingAuth: false, isAuthenticated: false });
            console.log(error);
            throw error;
        }
    },
    forgotpasword: async (email) => {
        set({ isLoading: true, error: null });
        try{
            const response = await axios.post(`${API_URL}/forgot-password`,{email});
            set({ message:response.data.message,isLoading:false });
        }
        catch(error) {
            set({
                isLoading: false,
            });
            throw error;
        }
    },
    resetPassword: async(token,password) => {
        set({ isLoading: true, error: null });
        try {
            const response = await axios.post(`${API_URL}/reset-password/${token}`,{password});
            set({ message:response.data.message,isLoading:false });
        }
        catch(error) {
            set({
                isLoading: false,
            });
            throw error;
        }
    }
}));
