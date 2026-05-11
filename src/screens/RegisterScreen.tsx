import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity } from "react-native";
import { AppInput, AppButton, DeleteButton } from "../components/CustomElements";

import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";

import { globalStyles } from "../styles/globalStyles";
import { toast_success, toast_error } from "../services/toastService";
import { sendOTP, verifyOTP, registerUser } from "../services/authService";
import { isEmpty, isValidEmail, isValidMobile, validateWives } from "../helpers/validators";


export default function RegisterScreen() {
  const navigation: any = useNavigation();

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [mobile, setMobile] = useState("");
  const [wives, setWives] = useState([{ name: "", email: "" }]);

  const [otp, setOtp] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [otpVerified, setOtpVerified] = useState(false);

  const addWife = () => {
    setWives([...wives, { name: "", email: "" }]);
  };

  const deleteWife = (index: number) => {
    const updated = wives.filter((_, i) => i !== index);
    setWives(updated);
  };

  const updateWife = (index: number, field: string, value: string) => {
    const updated = [...wives];
    updated[index] = { ...updated[index], [field]: value };
    setWives(updated);
  };

  const handleSendOTP = async () => {
     if (!isValidEmail(email)) return toast_error("Valid Email required");
    const res = await sendOTP(email);
    if (res) {
      toast_success("OTP sent to email");
      setOtpSent(true);
    } else {
      toast_error("Failed to send OTP");
    }
  };

const handleVerifyOTP = async () => {
  const ok = await verifyOTP(otp);

  if (ok) {
    toast_success("OTP Verified!");
    setOtpVerified(true);
  } else {
    toast_error("Wrong OTP");
  }
 };

  const handleRegister = async () => {
    if (isEmpty(firstName)) return toast_error("First Name required");
    if (isEmpty(lastName)) return toast_error("Last Name required");
    if (!isValidEmail(email)) return toast_error("Valid Email required");
    if (!isValidMobile(mobile)) return toast_error("Valid Mobile Number required");

    const wifeError = validateWives(wives);
    if (wifeError) return toast_error(wifeError);

    if (!otpVerified) {
      toast_error("Verify OTP first");
      return;
    }

    const res = await registerUser({
        firstName,
        lastName,
        email,
        mobile,
        wives
      }
    );
    if (res.success) {
      toast_success("Registration Successful");
      navigation.navigate("Login");
    } else {
      toast_error("Registration Failed");
    }
  };

  return (
    <SafeAreaView style={globalStyles.container}>
      <View style={globalStyles.card}>
        <Text style={globalStyles.title}>Husband Details</Text>
        <AppInput label="First Name *" placeholder="Enter First Name" value={firstName} onChange={setFirstName} type="text" />
        <AppInput label="Last Name *" placeholder="Enter Last Name" value={lastName} onChange={setLastName} type="text" />
        <AppInput label="Email *" placeholder="Enter Email" value={email} onChange={setEmail} type="email" />
        <AppInput label="Mobile Number *" placeholder="Enter Mobile Number" value={mobile} onChange={setMobile} type="mobile" />
       
        {!otpSent && (
          <TouchableOpacity style={globalStyles.button} onPress={handleSendOTP}>
            <Text style={globalStyles.buttonText}>Send OTP</Text>
          </TouchableOpacity>
        )}

        {otpSent && !otpVerified && (
          <>
            <AppInput label="OTP" placeholder="Enter OTP" value={otp} onChange={setOtp} type="number" />
             <TouchableOpacity style={globalStyles.button} onPress={handleVerifyOTP}>
              <Text style={globalStyles.buttonText}>Verify OTP</Text>
            </TouchableOpacity>
          </>
        )}

        {otpVerified && (
          <>
            <Text style={{ marginTop: 10, fontWeight: "bold" }}>Wife Details</Text>

            {wives.map((wife, index) => (
              <View key={index}>
                <AppInput label={`Wife ${index + 1} Name *`} placeholder="Enter Wife Name" value={wife.name} onChange={(v) => updateWife(index, "name", v)} type="text" />
                <AppInput label={`Wife ${index + 1} Email *`} placeholder="Enter Wife Email" value={wife.email} onChange={(v) => updateWife(index, "email", v)} type="email" />
              
                {index > 0 && (
                    <DeleteButton label={`Delete Wife ${index + 1}`} onPress={() => deleteWife(index)} />
                )}
              </View>
            ))}

            <TouchableOpacity style={globalStyles.buttonSecondary} onPress={addWife}>
              <Text style={{ fontWeight: "bold" }}>+ Add Wife</Text>
            </TouchableOpacity>

            <AppButton title="Register" onPress={handleRegister} />
          </>
        )}
      </View>
    </SafeAreaView>
  );
}
           