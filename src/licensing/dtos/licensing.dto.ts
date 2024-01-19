import { IsArray, IsNumber, IsString } from 'class-validator';

export class SubscribeToPlanDto {
  @IsNumber()
  planId: number;

  @IsString()
  paymentMethodId: string;

  @IsArray({ each: true })
  @IsNumber({}, { each: true })
  addOns: number[];
}
