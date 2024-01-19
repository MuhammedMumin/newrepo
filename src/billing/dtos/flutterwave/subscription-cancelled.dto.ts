export type SubscriptionCancelled = {
  status: string;
  currency: string;
  amount: number;
  customer: Customer;
  plan: Plan;
};

export type Customer = {
  email: string;
  full_name: string;
};

export type Plan = {
  id: number;
  name: string;
  amount: number;
  currency: string;
  interval: string;
  duration: number;
  status: string;
  date_created: Date;
};
