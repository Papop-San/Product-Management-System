import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { JwtUtil } from "../../../utils/jwt";
import { RegisterUserDTO, LoginUserDTO, LoginResponseDTO, RegisterResponseDTO } from './auth.interface';

const prisma = new PrismaClient();

export class AuthService {
  private prisma = prisma;
  private jwtUtil = new JwtUtil();

  private ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET;
  private REFRESH_TOKEN_SECRET = process.env.REFRESH_TOKEN_SECRET;

  async registerUser(data: RegisterUserDTO): Promise<RegisterResponseDTO> {
    const hashedPassword = await bcrypt.hash(data.password, 10);

    const user = await this.prisma.users.create({
      data: {
        email: data.email,
        password: hashedPassword,
        user_name: data.user_name,
        first_name: data.first_name,
        last_name: data.last_name,
        phone: data.phone,
        gender: data.gender,
        birthday: data.birthday ? new Date(data.birthday) : undefined,
        is_active: data.is_active ?? true,
      },
    });

    return { message: 'User registered', user_id: user.user_id };
  }

  async loginUser(data: LoginUserDTO): Promise<LoginResponseDTO> {
    const user = await this.prisma.users.findFirst({
      where: {
        OR: [
          { email: data.emailOrUser },
          { user_name: data.emailOrUser },
        ],
      },
    });

    if (!user) throw new Error('Invalid credentials');

    const valid = await bcrypt.compare(data.password, user.password);
    if (!valid) throw new Error('Invalid credentials');

    const accessToken = this.jwtUtil.generateAccessToken({ user_id: user.user_id });
    const refreshToken = this.jwtUtil.generateRefreshToken({ user_id: user.user_id });

    await this.prisma.users.update({
      where: { user_id: user.user_id },
      data: { refresh_token: refreshToken },
    });

    return { access_token: accessToken, refresh_token: refreshToken };
  }

  async refreshAccessTokenDirectJwt(token: string): Promise<{ access_token: string }> {
    try {
      const payload = jwt.verify(token, this.REFRESH_TOKEN_SECRET!) as any;

      const user = await this.prisma.users.findUnique({ where: { user_id: payload.user_id } });
      if (!user || user.refresh_token !== token) throw new Error('Invalid refresh token');

      const newAccessToken = jwt.sign({ user_id: user.user_id }, this.ACCESS_TOKEN_SECRET!, { expiresIn: '15m' });
      return { access_token: newAccessToken };

    } catch (error) {
      throw new Error('Invalid refresh token');
    }
  }

  async logoutUser(user_id: number): Promise<void> {
    await this.prisma.users.update({
      where: { user_id },
      data: { refresh_token: null },
    });
  }
}
