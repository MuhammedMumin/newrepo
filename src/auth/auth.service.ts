import { BadRequestException, HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from '../prisma/prisma.service';
import { AccountRegisterationDTO, LoginDto } from './dto/auth.interface';
import * as bcrypt from 'bcryptjs';
import { JwtPayload } from '../jwt/jwt-payload.dto';
import { ResponseBuilder, generateRandomPassword } from '../utils';
import { v4 as uuid } from 'uuid';
import { MailService } from 'src/mailing-service/mail.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly jwtService: JwtService,
    private readonly mailService: MailService,
  ) {}

  async registerAccount(data: AccountRegisterationDTO) {
    const token = uuid();
    const expiresAt = new Date();
    expiresAt.setDate(expiresAt.getDate() + 7);

    const credential = await this.prisma.credential.create({
      data: {
        email: data.email,
        password: bcrypt.hashSync(data.password, 10),
        credentialVerification: {
          create: {
            token,
            expiresAt,
          },
        },
      },
    });

    this.mailService.send({
      subject: 'Email Confirmation',
      to: credential.email,
      template: 'ess-institutional-rejection-letter',
      'h:X-Mailgun-Variables': JSON.stringify({ name: credential.email, url: 'http://localhost:3000' }),
    });

    let { password, ...withoutEmail } = credential;

    return ResponseBuilder(HttpStatus.OK, { credential: withoutEmail });
  }

  async verifyAccount(id: number) {
    const credential = await this.prisma.credential.update({ where: { id: id }, data: { isVerified: true } });

    return ResponseBuilder(HttpStatus.OK, {}, 'success');
  }
  async login(data: LoginDto) {
    let credential = await this.prisma.credential.findUnique({
      where: { email: data.email },
      include: { user: true },
    });

    if (!credential) {
      throw new BadRequestException('Invalid username or password');
    }
    if (!bcrypt.compareSync(data.password, credential.password)) {
      throw new BadRequestException('Invalid username or password');
    }
    const token = this.jwtService.sign({ id: credential.id, sub: credential.id, username: credential.email });

    return ResponseBuilder(HttpStatus.OK, { user: credential.user, token }, 'success');
  }

  async validateUser(payload: JwtPayload) {
    let user = this.prisma.user.findUnique({
      where: {
        id: payload.sub,
      },
    });

    return user;
  }

  async googleLogin(req: any) {
    if (!req.user) {
      return ResponseBuilder(HttpStatus.BAD_REQUEST, 'Login unsuccessful');
    }

    const credential = await this.prisma.credential.findFirst({ where: { email: req.user.email }, include: { user: true } });

    const payload = {
      id: credential.user.id,
      sub: credential.user.id,
      username: credential.email,
    };

    const jwt = this.jwtService.sign(payload);
    return ResponseBuilder(HttpStatus.OK, { user: credential.user, jwt }, 'success');
  }

  async validateGoogleUser(profile: any) {
    const { name, emails, photos } = profile;

    let existingCredential = await this.prisma.credential.findFirst({ where: { email: emails[0].value }, include: { user: true } });
    if (!existingCredential) {
      let credential = await this.prisma.credential.create({
        data: {
          email: emails[0].value,
          password: bcrypt.hashSync(generateRandomPassword(8), 10),
        },
      });
      const payload = {
        id: credential.id,
        sub: credential.id,
        username: credential.email,
      };
      const jwt = this.jwtService.sign(payload);
      return { user: existingCredential, jwt };
    }
    const payload = {
      id: existingCredential.id,
      sub: existingCredential.id,
      username: existingCredential.email,
    };
    const jwt = this.jwtService.sign(payload);
    return { user: existingCredential, jwt };
  }
}
