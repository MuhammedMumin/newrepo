// google.strategy.ts
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, VerifyCallback } from 'passport-google-oauth20';
import { AuthService } from '../auth/auth.service'
import { credential, user } from '@prisma/client';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy, 'google') {
    constructor(private readonly authService: AuthService, config: ConfigService) {
        super({
            clientID: config.get<string>('GOOGLE_CLIENT_ID'),
            clientSecret: config.get<string>('GOOGLE_CLIENT_SECRET'),
            callbackURL: config.get<string>('GOOGLE_CALLBACK_URL'),
            passReqToCallback: true,
            scope: ['profile', 'email'],
        });
    }

    async validate(request: any, accessToken: string, refreshToken: string, profile: any, done: VerifyCallback): Promise<{ user: credential, jwt: string }> {
        try {
            // Your validation logic goes here
            const data = await this.authService.validateGoogleUser(profile);
            if (!data) {
                throw new UnauthorizedException('Invalid credentials');
            }

            return done(null, { user: data.user, jwt: data.jwt });
        } catch (err) {
            return done(err, false);
        }
    }
}
