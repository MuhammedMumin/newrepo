import { ChargeCompleted } from './charge-completed.dto';
import { SubscriptionCancelled } from './subscription-cancelled.dto';
import { TransferCompleted } from './transfer-completed.dto';

export type FLTEvents = 'charge.completed' | 'transfer.completed' | 'subscription.cancelled';
export type FLTStatus = 'successful' | 'failed';
export enum FLTEventType {
  CHARGE = 'Charge',
  TRANSFER = 'Transfer',
}
export type FLTHookTypes = ChargeCompleted | TransferCompleted | SubscriptionCancelled;
export type FlutterWebhook<T extends FLTHookTypes> = {
  event: FLTEvents;
  data: T;
  'event.type'?: FLTEventType;
};
