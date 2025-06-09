import { PrismaClient, Users } from '@prisma/client';
import bcrypt from 'bcryptjs';
import { CreateUserDTO, UpdateUserDTO, UserResponseDTO } from './user.interface';

const prisma = new PrismaClient();

export class UserService {
  async createUser(data: CreateUserDTO): Promise<UserResponseDTO> {
    const hashedPassword = await bcrypt.hash(data.password, 10);

    const user = await prisma.users.create({
      data: {
        email: data.email,
        password: hashedPassword,
        user_name: data.user_name,
        first_name: data.first_name ?? null,
        last_name: data.last_name ?? null,
        phone: data.phone ?? null,
        gender: data.gender ?? null,
        birthday: data.birthday ? new Date(data.birthday) : null,
        is_active: true,
      },
    });

    return this.toUserResponseDTO(user);
  }

  async getAllUsers(): Promise<UserResponseDTO[]> {
    const users = await prisma.users.findMany();
    return users.map(u => this.toUserResponseDTO(u));
  }

  async getUserById(user_id: number): Promise<UserResponseDTO | null> {
    const user = await prisma.users.findUnique({ where: { user_id } });
    if (!user) return null;
    return this.toUserResponseDTO(user);
  }

  async updateUser(user_id: number, data: UpdateUserDTO): Promise<UserResponseDTO | null> {
    const updated = await prisma.users.update({
      where: { user_id },
      data: {
        first_name: data.first_name ?? null,
        last_name: data.last_name ?? null,
        phone: data.phone ?? null,
        gender: data.gender ?? null,
        birthday: data.birthday ? new Date(data.birthday) : null,
        updated_at: new Date(),
      },
    });

    return this.toUserResponseDTO(updated);
  }

  async deleteUser(user_id: number): Promise<void> {
    await prisma.users.update({
      where: { user_id },
      data: { is_active: false }, // Soft delete
    });
  }

  // ✅ แปลงข้อมูลสำหรับ response
  private toUserResponseDTO(user: Users): UserResponseDTO {
    return {
      user_id: user.user_id,
      email: user.email,
      user_name: user.user_name,
      first_name: user.first_name ?? undefined,
      last_name: user.last_name ?? undefined,
      phone: user.phone ?? undefined,
      gender: user.gender ?? undefined,
      birthday: user.birthday?.toISOString(),
      is_active: user.is_active,
      created_at: user.created_at.toISOString(),
      updated_at: user.updated_at.toISOString(),
    };
  }

  // ✅ ใช้ในการเก็บ refresh_token (เช่นหลัง login)
  async updateRefreshToken(user_id: number, refresh_token: string): Promise<void> {
    await prisma.users.update({
      where: { user_id },
      data: { refresh_token },
    });
  }

  async findUserByEmail(email: string): Promise<Users | null> {
    return prisma.users.findUnique({ where: { email } });
  }
}
