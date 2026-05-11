import AsyncStorage from "@react-native-async-storage/async-storage";
// import { db } from "../firebase/config";
import { doc, setDoc, getDoc } from "firebase/firestore";
import { sendOTPEmail } from "./emailService";
import { db } from "../config/firebaseConfig";
import { Alert } from "react-native";

export const sendOTP = async (email: string) => {
  const otp = Math.floor(100000 + Math.random() * 900000).toString();

  await AsyncStorage.setItem("otp", otp);
  await AsyncStorage.setItem("email", email);
    
  return await sendOTPEmail(email, otp);
};

export const verifyOTP = async (userOtp: string) => {
  const stored = await AsyncStorage.getItem("otp");

  return stored === userOtp;
};

export const registerUser = async (data: any) => {
  const ref = doc(db, "users", data.email);
  await setDoc(ref, data);
  return { success: true };
};