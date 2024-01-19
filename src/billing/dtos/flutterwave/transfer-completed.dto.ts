import { FLTStatus } from './index.dto';

export type TransferCompleted = {
  id: number;
  account_number: string;
  bank_name: string;
  bank_code: string;
  fullname: string;
  created_at: Date;
  currency: string;
  debit_currency: string;
  amount: number;
  fee: number;
  status: FLTStatus;
  reference: string;
  meta: null;
  narration: string;
  approver: null;
  complete_message: string;
  requires_approval: number;
  is_approved: number;
};
