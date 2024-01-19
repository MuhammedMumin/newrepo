import { organisation } from '@prisma/client';
import { PaystackWebhook } from '../dtos/paystack/index.dto';
import { FlutterWebhook } from '../dtos/flutterwave/index.dto';

export abstract class PaymentProcessor {
  abstract createPlan(organisation: organisation, interval: 'monthly' | 'annually', amount: number): any;
  abstract createSubscription(planId: string): any;
  abstract hooks(data: PaystackWebhook<any> | FlutterWebhook<any>): any;
  abstract initTransaction(amount: number, email: string, reference: string): any;
}
