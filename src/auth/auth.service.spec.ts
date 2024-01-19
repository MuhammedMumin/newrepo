import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { PrismaService } from '../prisma/prisma.service';
import { JwtService } from '@nestjs/jwt';
import { BadRequestException, HttpStatus } from '@nestjs/common';
import { AuthController } from './auth.controller';
import * as bcrypt from 'bcryptjs';
import { ResponseBuilder } from '../utils';

describe('AuthService', () => {
  let service: AuthService;
  let prismaServiceMock: jest.Mocked<PrismaService>;
  let jwtServiceMock: jest.Mocked<JwtService>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [
        AuthService,
        {
          provide: PrismaService,
          useValue: {
            credential: {
              findUnique: jest.fn(),
            },
          },
        },
        {
          provide: JwtService,
          useValue: {
            sign: jest.fn(),
          },
        },
      ],
    }).compile();;

    service = module.get<AuthService>(AuthService);
    prismaServiceMock = module.get(PrismaService);
    jwtServiceMock = module.get(JwtService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should throw BadRequestException for invalid username or password', async () => {
    // Mock the prismaService.credential.findUnique method to return null
    // This simulates an invalid username or password being passed to the login method
    jest.spyOn(prismaServiceMock.credential, 'findUnique').mockReturnValueOnce(null);

    // Call the login method with invalid credentials
    await expect(service.login({ email: 'invalid@example.com', password: 'password123' }))
      .rejects.toThrowError(BadRequestException);
  });


  it('should throw BadRequestException for invalid password', async () => {

    const validCredential = {
      id: BigInt(1),
      email: 'valid@example.com',
      password: 'correctpasswordhash',
      isVerified: true,
      createdAt: new Date(),
      updatedAt: new Date(),
      deletedAt: null
    };

    // Mock the prismaService.credential.findUnique method to return a credential with a different password
    jest.spyOn(prismaServiceMock.credential, 'findUnique').mockResolvedValueOnce({
      ...validCredential,
      password: 'differentpasswordhash',
    })
    jest.spyOn(bcrypt, 'compareSync').mockReturnValueOnce(false);

    // Call the login method with invalid password
    await expect(service.login({ email: 'valid@example.com', password: 'password123' }))
      .rejects.toThrowError(BadRequestException);
  });

  it('should return user and token for valid credentials', async () => {
    // Mock the prismaService.credential.findUnique method to return a valid credential
    const validCredential = {
      id: BigInt(1),
      email: 'valid@example.com',
      password: 'correctpasswordhash',
      isVerified: true,
      createdAt: new Date(),
      updatedAt: new Date(),
      deletedAt: null,
      user: {}
    };

    jest.spyOn(prismaServiceMock.credential, 'findUnique').mockResolvedValueOnce(validCredential)
    jest.spyOn(bcrypt, 'compareSync').mockReturnValueOnce(true);

    // Mock the jwtService.sign method to return a token
    const validToken = 'valid.token.string';
    jwtServiceMock.sign.mockReturnValueOnce(validToken);

    // Call the login method with valid credentials
    const result = await service.login({ email: 'valid@example.com', password: 'correctpassword' });

    // Assert that the result contains the expected user and token
    await expect(result).toEqual(ResponseBuilder(HttpStatus.OK, { user: validCredential.user, token: validToken }, 'success'));
  });
});
