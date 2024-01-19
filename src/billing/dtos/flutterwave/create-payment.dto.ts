export type CreatePaymentDTO = {
  tx_ref: string;
  amount: string;
  currency: string;
  redirect_url: string;
  meta: Meta;
  customer: Customer;
  customizations: Customizations;
};

export type Customer = {
  email: string;
  phonenumber: string;
  name: string;
};

export type Customizations = {
  title: string;
  logo: string;
};

export type Meta = {
  client_id: string;
  plan_id: string;
  subscription_id: number;
};
