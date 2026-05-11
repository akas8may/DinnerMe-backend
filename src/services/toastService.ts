import Toast from 'react-native-toast-message';

type ToastType = 'success' | 'error' | 'info';

const showToast = (type: ToastType, message: string, title?: string) => {
  try {
    Toast.show({
      type,
      text1: title || type.toUpperCase(),
      text2: message,
      position: 'top',
    });
  } catch (error) {
    console.log("Toast Error:", error);
  }
};

// ✅ Success
export const toast_success = (message: string, title?: string) => {
  showToast('success', message, title);
};

// ❌ Error
export const toast_error = (message: string, title?: string) => {
  showToast('error', message, title || 'Error');
};

// ℹ️ Info
export const toast_info = (message: string, title?: string) => {
  showToast('info', message, title || 'Info');
};