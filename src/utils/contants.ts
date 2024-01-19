export const allowedHeaders = process.env.ALLOWED_HEADERS?.split(',').map((x) => x.trim()) ?? [];
export const allowedOrigins = process.env.ALLOWED_ORIGINS?.split(',').map((x) => x.trim()) ?? [];

export const paystackConstants = {
  baseUrl: process.env.PAYSTACK_BASE_URL,
  secretKey: process.env.PAYSTACK_SECRET_KEY,
  publicKey: process.env.PAYSTACK_PUBLIC_KEY,
};

export const flutterwaveConstants = {
  baseUrl: process.env.FLUTTERWAVE_BASE_URL,
  secretKey: process.env.FLUTTERWAVE_SECRET_KEY,
  publicKey: process.env.FLUTTERWAVE_PUBLIC_KEY,
};
