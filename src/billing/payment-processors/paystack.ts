import { $Enums, Prisma, organisation } from '@prisma/client';
import { PaymentProcessor } from './payment-processor';
import axios from 'axios';
import { paystackConstants } from 'src/utils/contants';
import { PaystackHookTypes, PaystackWebhook } from '../dtos/paystack/index.dto';

export class Paystack implements PaymentProcessor {
  initTransaction(amount: number, email: string, reference: string) {
    throw new Error('Method not implemented.');
  }
  hooks(data: PaystackWebhook<PaystackHookTypes>) {}
  async createPlan(organisation: organisation, interval: 'monthly' | 'annually', amount: number) {
    const planName = `${organisation.name.toLowerCase().trim().split(' ').join('-')}-${interval}-plan`;
    const data = {
      name: planName,
      amount: amount * 100,
      interval: interval,
    };
    let result = await axios.post(`${paystackConstants.baseUrl}/plan`, data, {
      headers: {
        Authorization: `Bearer ${paystackConstants.secretKey}`,
      },
    });
  }

  createSubscription(planId: string) {
    throw new Error('Method not implemented.');
  }
}
