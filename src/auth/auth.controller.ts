import { Body, Controller, Get, HttpStatus, Post, Req, Res, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AccountRegisterationDTO, LoginDto } from './dto/auth.interface';
import { Public } from '../decorators/public.decorator';
import { GoogleAuthGuard } from '../google/google-auth.gard';
import { ResponseBuilder } from '../utils';
import { Response } from 'express';

@Controller('auth')
export class AuthController {
    constructor(private readonly service: AuthService) { }

    @Public()
    @Post('/login')
    async login(@Body() data: LoginDto) {
        return await this.service.login(data)
    }

    @Public()
    @Post('/register')
    async register(@Body() data: AccountRegisterationDTO) {
        return await this.service.registerAccount(data)
    }

    @UseGuards(GoogleAuthGuard)
    @Get('google')
    async googleLogin() { }

    @Get('google/callback')
    @UseGuards(GoogleAuthGuard)
    async googleLoginCallback(@Req() req, @Res() res: Response) {
        const { user, jwt } = req.user;
        return res.send(ResponseBuilder(HttpStatus.OK, { user: user, toke: jwt }, 'success'));
    }

}
