import { InvoiceCreated } from './invoice-created.dto';
import { InvoicePaymentFailed } from './invoice-failed.dto';
import { InvoiceUpdated } from './invoice-updated.dto';
import { SubscriptionCreated } from './sub-created.dto';
import { SubscriptionDisabled } from './sub-disabled.dto';
import { SubscriptionNotRenewed } from './sub-not-renewed.dto';
import { PaystackSuccess } from './success-hook.dto';

export type PaystackEvents =
  | 'invoice.create'
  | 'invoice.update'
  | 'invoice.payment_failed'
  | 'subscription.create'
  | 'subscription.disable'
  | 'subscription.enable'
  | 'subscription.not_renewed'
  | 'charge.success';
export type PaystackHookTypes = InvoiceCreated | InvoicePaymentFailed | InvoiceUpdated | SubscriptionCreated | SubscriptionDisabled | SubscriptionNotRenewed | PaystackSuccess;

export type PaystackWebhook<T extends PaystackHookTypes> = {
  event: PaystackEvents;
  data: T;
};
