import { FlutterWave } from './flutterwave';
import { PaymentProcessor } from './payment-processor';
import { Paystack } from './paystack';

//Payment processor class factory
export class PaymentProcessorFactory {
  static getPaymentProcessor(processor: 'PAYSTACK' | 'FLUTTERWAVE'): PaymentProcessor {
    switch (processor) {
      case 'PAYSTACK':
        return new Paystack();
      case 'FLUTTERWAVE':
        return new FlutterWave();
      default:
        throw new Error('Invalid payment processor');
    }
  }
}
