import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, TextStyle } from "react-native";
import { customStyles } from "../styles/customStyles";
import validation from "../helpers/validators";

/* **************************************
   VALIDATION FUNCTION
**************************************** */
export const validateField = (type: string, value: string) => {
  if (!value || value.trim() === "") return "This field is required";

  switch (type) {
    case "email":
        return validation.isValidEmail(value) ? "" : "Invalid email";
    case "mobile":
      return validation.isValidMobile(value) ? "" : "Invalid mobile number";
    case "number":
       return validation.onlyNubers(value) ? "" : "Only numbers allowed";
    case "text":
      return validation.onlyLetters(value) ? "" : "Only letters allowed";
    default:
      return "";
  }
};

/* **************************************
   INPUT COMPONENT
**************************************** */
export const AppInput = ({
  label,
  placeholder,
  value,
  onChange,
  type = "text",
}: {
  label: string;
  placeholder: string;
  value: string;
  type?: string;
  onChange: (val: string) => void;
}) => {
  const [error, setError] = useState("");

  const handleChange = (text: string) => {
    onChange(text);
    const err = validateField(type, text);
    setError(err);
  };

  return (
    <View style={customStyles.container}>
      <Text style={customStyles.label}>{label}</Text>

      <TextInput
        placeholder={placeholder}
        value={value}
        onChangeText={handleChange}
        style={[
          customStyles.input,
          error ? customStyles.inputError : {},
        ]}
        placeholderTextColor="#888"
      />

      {error ? <Text style={customStyles.errorText}>{error}</Text> : null}
    </View>
  );
};

/* **************************************
   TEXTAREA
**************************************** */
export const AppTextarea = ({
  label,
  placeholder,
  value,
  onChange,
}: {
  label: string;
  placeholder: string;
  value: string;
  onChange: (val: string) => void;
}) => (
  <View style={customStyles.container}>
    <Text style={customStyles.label}>{label}</Text>

    <TextInput
      placeholder={placeholder}
      value={value}
      onChangeText={onChange}
      style={customStyles.textarea}
      multiline
      placeholderTextColor="#888"
    />
  </View>
);

/* **************************************
   MAIN BUTTON
**************************************** */
export const AppButton = ({
  title,
  onPress,
}: {
  title: string;
  onPress: () => void;
}) => (
  <TouchableOpacity style={customStyles.mainBtn} onPress={onPress}>
    <Text style={customStyles.btnText}>{title}</Text>
  </TouchableOpacity>
);

/* **************************************
   DELETE BUTTON
**************************************** */
export const DeleteButton = ({
  label,
  onPress
}: {
  label: string;
  onPress: () => void;
}) => (
  <TouchableOpacity style={customStyles.pBtn} onPress={onPress}>
    <Text style={customStyles.pBtnText}>{label}</Text>
  </TouchableOpacity>
);

export const PrimaryButton = ({
  label,
  onPress
}: {
  label: string;
  onPress: () => void;
}) => (
  <TouchableOpacity style={customStyles.deleteBtn} onPress={onPress}>
    <Text style={customStyles.deleteText}>{label}</Text>
  </TouchableOpacity>
);

