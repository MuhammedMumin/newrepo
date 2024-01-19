import { CompanySize, OrganisationAccountType, organisation } from "@prisma/client";
import { JsonObject } from "@prisma/client/runtime/library";
import { Transform } from "class-transformer";
import { IsEmail, IsEnum, IsInt, IsNotEmpty, IsOptional, IsString, Min } from "class-validator";



export class CreateUserDTO {
    @IsNotEmpty()
    @IsString()
    firstName: string;

    @IsNotEmpty()
    @IsString()
    lastName: string;

    @IsNotEmpty()
    @IsEmail()
    email: string;

    @IsNotEmpty()
    @IsString()
    phone: string;

    @IsNotEmpty()
    @IsInt()
    @Min(0)
    credentialId: number;

    @IsNotEmpty()
    @IsInt()
    @Min(0)
    organisationId: number;
}

export class CreateOrganisationDTO {
    @IsNotEmpty()
    @IsString()
    name: string;

    @IsNotEmpty()
    @IsEnum(OrganisationAccountType)
    @Transform(({ value }) => OrganisationAccountType[value])
    accountType: OrganisationAccountType;

    @IsNotEmpty()
    @IsString()
    address: string;

    @IsNotEmpty()
    @IsEnum(CompanySize)
    @Transform(({ value }) => CompanySize[value])
    companySize: CompanySize;

    @IsNotEmpty()
    @IsInt()
    @Min(1)
    customerSize: number;

    @IsNotEmpty()
    @IsInt()
    @Min(0)
    numberOfTransactions: number;

    transactionTypes: JsonObject;

    @IsNotEmpty()
    @IsInt()
    @Min(0)
    numberOfVendors: number;

    @IsNotEmpty()
    @IsInt()
    @Min(0)
    inventorySize: number;

    @IsNotEmpty()
    @IsInt()
    @Min(0)
    defaultCurrencyId: number;

    @IsNotEmpty()
    @IsString()
    state: string;

    @IsOptional()
    @IsString()
    country?: string;

    @IsNotEmpty()
    @IsInt()
    @Min(0)
    sectorId: number;
}