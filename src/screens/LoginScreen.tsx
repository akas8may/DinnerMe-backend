import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';

import { globalStyles } from '../styles/globalStyles';
import { toast_error, toast_success } from '../services/toastService';
import { sendOTP, verifyOTP } from '../services/authService';
import { isValidEmail } from '../helpers/validators';
import { AppInput } from '../components/CustomElements';

export default function LoginScreen() {
  const [email, setEmail] = useState('');
  const navigation: any = useNavigation();
  const [otp, setOtp] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [otpVerified, setOtpVerified] = useState(false);
  

const handleLogin = async () => {
  if (!isValidEmail(email)) {
    toast_error("Enter valid email");
    return;
  }

  const sent = await sendOTP(email);
  if (sent) {
    setOtpSent(true);
    toast_success("OTP Sent!");
  } else {
    toast_error("Failed to send OTP");
  }
};


const handleVerifyOTP = async () => {
  const ok = await verifyOTP(otp);
  if (ok) {
    toast_success("OTP Verified!");
    navigation.navigate("Home");
  } else {
    toast_error("Wrong OTP");
  }
 };

  return (
    <SafeAreaView style={[globalStyles.container, { justifyContent: 'center', alignItems: 'center' }]}>
      <View style={globalStyles.card}>
        <Text style={globalStyles.title}>
          <Image
            source={require(`../assets/dinner.png`)
            }
            style={{ width: 50, height: 50 }}
          />
          {/* <img src="/src/assets/dinner.png" alt="Dinner App" />  */}
          🍽️ Dinner App</Text>
        <Text style={globalStyles.subtitle}>Login with Email</Text>
        <AppInput label="Email *" placeholder="Enter Email" value={email} onChange={setEmail} type="email" />
              
          {otpSent && !otpVerified && (
            <>
              <AppInput label="OTP" placeholder="Enter OTP" value={otp} onChange={setOtp} type="number" />
                <TouchableOpacity style={globalStyles.button} onPress={handleVerifyOTP}>
                <Text style={globalStyles.buttonText}>Verify OTP</Text>
              </TouchableOpacity>
            </>
          )}

        <TouchableOpacity style={globalStyles.button} onPress={handleLogin}>
          <Text style={globalStyles.buttonText}>Send OTP</Text>
        </TouchableOpacity>

        <Text style={globalStyles.registerText}>
          New user?{' '}
          <Text
            style={globalStyles.link}
            onPress={() => navigation.navigate('Register')}
          >
            Register
          </Text>
        </Text>
      </View>
    </SafeAreaView>
  );
}