import AsyncStorage from '@react-native-async-storage/async-storage';
import { toast_success, toast_error } from "../services/toastService";

import axios from 'axios';

export const api =
axios.create({
  baseURL:
    'http://akash-ThinkPad-E15-Gen-2:3000/api/v1',
});


export const register = async (userData: any) => {
    try {
        const response = await api.post('/auth/register', userData);
        return response.data;
    } catch (error) {
       toast_error('Error during registration');
       throw error;
    }
}

export const verifyOTP = async (email: string, otp: string) => {
  try {
    const response = await api.post('/auth/verify-otp', { email, otp });
    return response.data;
  } catch (error) {
    toast_error('Error during OTP verification');
    throw error;
  }
};

export const login = async (email: string) => {
  try {
    const response = await api.post('/auth/login', { email });
    return response.data;
  } catch (error) {
    toast_error('Error during login');
    throw error;
  }
};

export const verifyLoginOTP = async (email: string, otp: string) => {
  try {
    const response = await api.post('/auth/verify-login-otp', { email, otp });
    if(response.data && response.data.token) {
      await AsyncStorage.setItem('token', response.data.token);
      return { success: true, token: response.data.user };
    }else {
      toast_error('Invalid login credentials');
    }
  } catch (error) {
    toast_error('Error during login OTP verification');
    throw error;
  }
};
