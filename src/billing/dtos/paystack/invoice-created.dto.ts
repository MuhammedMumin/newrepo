export type InvoiceCreated = {
  domain: string;
  invoice_code: string;
  amount: number;
  period_start: Date;
  period_end: Date;
  status: string;
  paid: boolean;
  paid_at: Date;
  description: null;
  authorization: Authorization;
  subscription: Subscription;
  customer: Customer;
  transaction: Transaction;
  created_at: Date;
};

export type Authorization = {
  authorization_code: string;
  bin: string;
  last4: string;
  exp_month: string;
  exp_year: string;
  channel: string;
  card_type: string;
  bank: string;
  country_code: string;
  brand: string;
  reusable: boolean;
  signature: string;
  account_name: string;
};

export type Customer = {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  customer_code: string;
  phone: string;
  metadata: null;
  risk_action: string;
};

export type Subscription = {
  status: string;
  subscription_code: string;
  email_token: string;
  amount: number;
  cron_expression: string;
  next_payment_date: Date;
  open_invoice: null;
};

export type Transaction = {
  reference: string;
  status: string;
  amount: number;
  currency: string;
};
