import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BillingModule } from './billing/billing.module';
import { AuthService } from './auth/auth.service';
import { AuthModule } from './auth/auth.module';
import { UserManagementModule } from './user-management/user-management.module';
import { ChartOfAccountsModule } from './chart-of-accounts/chart-of-accounts.module';
import { UserManagementService } from './user-management/user-management.service';
import { PrismaModule } from './prisma/prisma.module';
import { JwtAuthGuard } from './jwt/jwt-auth.guard';
import { APP_GUARD } from '@nestjs/core';
import { ConfigModule } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { OrganisationModule } from './organisation/organisation.module';
import { MailingModule } from './mailing-service/mail.module';

@Module({
  imports: [PrismaModule, AuthModule, UserManagementModule, MailingModule, ConfigModule.forRoot({ isGlobal: true }), ChartOfAccountsModule, OrganisationModule, BillingModule],
  controllers: [AppController],
  providers: [
    AppService,
    AuthService,
    UserManagementService,
    JwtService,
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
  ],
})
export class AppModule {}
