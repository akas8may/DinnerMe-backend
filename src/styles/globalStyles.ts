import { StyleSheet } from 'react-native';

export const globalStyles = StyleSheet.create({
  // container: {
  //   flex: 1,
  //   backgroundColor: '#f5f6fa',
  //   justifyContent: 'center',
  //   alignItems: 'center',
  // },

  // card: {
  //   width: '90%',
  //   backgroundColor: '#fff',
  //   padding: 20,
  //   borderRadius: 12,
  //   elevation: 5,
  // },

  // title: {
  //   fontSize: 22,
  //   fontWeight: 'bold',
  //   textAlign: 'center',
  //   marginBottom: 10,
  // },

  subtitle: {
    textAlign: 'center',
    marginBottom: 20,
    color: '#666',
  },

  // input: {
  //   borderWidth: 1,
  //   borderColor: '#ddd',
  //   borderRadius: 8,
  //   padding: 12,
  //   marginBottom: 15,
  // },

  // button: {
  //   backgroundColor: '#4CAF50',
  //   padding: 14,
  //   borderRadius: 8,
  //   alignItems: 'center',
  // },

  // buttonText: {
  //   color: '#fff',
  //   fontWeight: 'bold',
  // },

  // registerText: {
  //   marginTop: 15,
  //   textAlign: 'center',
  // },

  // link: {
  //   color: '#4CAF50',
  //   fontWeight: 'bold',
  // },
  label: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 5,
  },

  // buttonSecondary: {
  //   backgroundColor: '#e0e0e0',
  //   padding: 12,
  //   borderRadius: 8,
  //   alignItems: 'center',
  //   marginBottom: 15,
  // },


  // buttonDelete: {
  //   backgroundColor: '#ffdddd',
  //   padding: 10,
  //   borderRadius: 8,
  //   marginTop: 10,
  // },

  // buttonDeleteText: {
  //   color: '#b00000',
  //   fontWeight: '700',
  //   textAlign: 'center',
  // },
  container: {
    flex: 1,
    backgroundColor: '#f5f6fa',
    // ❌ REMOVE THESE
    // justifyContent: 'center',
    // alignItems: 'center',
  },

  card: {
    width: '100%', // 🔥 90% se 100% kar diya
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 12,
    elevation: 5,
  },

  title: {
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 15,
  },

  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 12,
    marginBottom: 15,
    backgroundColor: '#fff', // 🔥 important for placeholder visibility
  },

  button: {
    backgroundColor: '#4CAF50',
    padding: 14,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 10,
  },

  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },

  registerText: {
    marginTop: 15,
    textAlign: 'center',
  },

  link: {
    color: '#4CAF50',
    fontWeight: 'bold',
  },

  buttonSecondary: {
    backgroundColor: '#e0e0e0',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 15,
  },

  buttonDelete: {
    backgroundColor: '#ffdddd',
    padding: 10,
    borderRadius: 8,
    marginTop: 10,
  },

  buttonDeleteText: {
    color: '#b00000',
    fontWeight: '700',
    textAlign: 'center',
  },

  PHTextColor: {
    color: '#f03737',
  },
});