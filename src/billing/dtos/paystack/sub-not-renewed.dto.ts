export type SubscriptionNotRenewed = {
  id: number;
  domain: string;
  status: string;
  subscription_code: string;
  email_token: string;
  amount: number;
  cron_expression: string;
  next_payment_date: null;
  open_invoice: null;
  integration: number;
  plan: Plan;
  authorization: Authorization;
  customer: Customer;
  invoices: any[];
  invoices_history: any[];
  invoice_limit: number;
  split_code: null;
  most_recent_invoice: null;
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
  account_name: null;
};

export type Customer = {
  id: number;
  first_name: null;
  last_name: null;
  email: string;
  customer_code: string;
  phone: null;
  metadata: null;
  risk_action: string;
  international_format_phone: null;
};

export type Plan = {
  id: number;
  name: string;
  plan_code: string;
  description: string;
  amount: number;
  interval: string;
  send_invoices: boolean;
  send_sms: boolean;
  currency: string;
};
