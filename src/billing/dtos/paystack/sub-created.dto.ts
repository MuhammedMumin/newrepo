export type SubscriptionCreated = {
  domain: string;
  status: string;
  subscription_code: string;
  amount: number;
  cron_expression: string;
  next_payment_date: Date;
  open_invoice: null;
  createdAt: Date;
  plan: Plan;
  authorization: Authorization;
  customer: Customer;
  created_at: Date;
};

export type Authorization = {
  authorization_code: string;
  bin: string;
  last4: string;
  exp_month: string;
  exp_year: string;
  card_type: string;
  bank: string;
  country_code: string;
  brand: string;
  account_name: string;
};

export type Customer = {
  first_name: string;
  last_name: string;
  email: string;
  customer_code: string;
  phone: string;
  metadata: Metadata;
  risk_action: string;
};

export type Metadata = {};

export type Plan = {
  name: string;
  plan_code: string;
  description: null;
  amount: number;
  interval: string;
  send_invoices: boolean;
  send_sms: boolean;
  currency: string;
};
