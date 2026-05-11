import { StyleSheet } from "react-native";

export const customStyles = StyleSheet.create({
  container: {
    width: "100%",
    marginBottom: 15,
  },

  label: {
    fontSize: 14,
    fontWeight: "600",
    marginBottom: 5,
    color: "#444",
  },

  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
  },

  inputError: {
    borderColor: "red",
  },

  errorText: {
    color: "red",
    fontSize: 12,
    marginTop: 4,
  },

  selectBox: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
  },

  textarea: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 12,
    minHeight: 120,
    textAlignVertical: "top",
    fontSize: 16,
  },

  mainBtn: {
    width: "100%",
    backgroundColor: "#4CAF50",
    padding: 14,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 10,
  },

  btnText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "700",
  },
// Primary Button 
  pBtn:{
    width: "100%",
    backgroundColor: "#2196F3", 
    padding: 12,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 10,    
  },
  pBtnText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },

  deleteBtn: {
    width: "100%",
    padding: 12,
    backgroundColor: "#ffdddd",
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#b00000",
    alignItems: "center",
    marginTop: 10,
  },

  deleteText: {
    color: "#b00000",
    fontWeight: "700",
    fontSize: 16,
  },
});