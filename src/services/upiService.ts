import {
  Linking,
  Alert,
} from 'react-native';

type UpiPaymentProps = {

  upiId: string;

  name: string;

  amount: number;

  note?: string;

  transactionRef?: string;
};

class UpiService {

  async openUpiApp(
    data: UpiPaymentProps,
  ) {

    try {

      const {

        upiId,

        name,

        amount,

        note,

        transactionRef,

      } = data;

      const upiUrl =
        `upi://pay?` +

        `pa=${upiId}` +

        `&pn=${encodeURIComponent(name)}` +

        `&am=${amount}` +

        `&cu=INR` +

        `&tn=${encodeURIComponent(
          note || '',
        )}` +

        `&tr=${transactionRef || Date.now()}`;

      const supported =
        await Linking.canOpenURL(
          upiUrl,
        );

      if (!supported) {

        Alert.alert(
          'Error',
          'No UPI app found',
        );

        return false;
      }

      await Linking.openURL(
        upiUrl,
      );

      return true;

    } catch (error) {

      console.log(
        'UPI ERROR:',
        error,
      );

      Alert.alert(
        'Error',
        'Failed to open UPI app',
      );

      return false;
    }
  }
}

export default new UpiService();