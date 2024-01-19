import { $Enums, Prisma, organisation } from '@prisma/client';
import { PaymentProcessor } from './payment-processor';
import axios from 'axios';
import { flutterwaveConstants } from 'src/utils/contants';
import { FLTHookTypes, FlutterWebhook } from '../dtos/flutterwave/index.dto';

export class FlutterWave implements PaymentProcessor {
  initTransaction(amount: number, email: string, reference: string) {
    throw new Error('Method not implemented.');
  }
  hooks(data: FlutterWebhook<FLTHookTypes>) {}
  async createPlan(organisation: organisation, interval: 'monthly' | 'annually', amount: number) {
    const planName = `${organisation.name.toLowerCase().trim().split(' ').join('-')}-${interval}-plan`;
    const data = {
      name: planName,
      amount: amount * 100,
      interval: interval === 'monthly' ? 'monthly' : 'yearly',
      duration: 1,
    };
    let result = await axios.post(`${flutterwaveConstants.baseUrl}/payment-plans`, data, {
      headers: {
        Authorization: `Bearer ${flutterwaveConstants.secretKey}`,
      },
    });
  }
  createSubscription(planId: string) {
    throw new Error('Method not implemented.');
  }
}
