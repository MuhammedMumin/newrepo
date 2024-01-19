import { FLTStatus } from './index.dto';

export type ChargeCompleted = {
  id: number;
  tx_ref: string;
  flw_ref: string;
  device_fingerprint: string;
  amount: number;
  currency: string;
  charged_amount: number;
  app_fee: number;
  merchant_fee: number;
  processor_response: string;
  auth_model: string;
  ip: string;
  narration: string;
  status: FLTStatus;
  payment_type: string;
  created_at: Date;
  account_id: number;
  customer: Customer;
  card: Card;
};

export type Card = {
  first_6digits: string;
  last_4digits: string;
  issuer: string;
  country: string;
  type: string;
  expiry: string;
};

export type Customer = {
  id: number;
  name: string;
  phone_number: null;
  email: string;
  created_at: Date;
};
