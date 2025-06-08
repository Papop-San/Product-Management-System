import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';
import { CreateUserDTO, UpdateUserDTO, UserResponseDTO } from './user.interface';

const prisma = new PrismaClient();

export class UserService {
    private prisma = prisma;

    async createUser(data: CreateUserDTO): Promise<UserResponseDTO> {
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
                is_active: true,
            },
        });

        return this.formatUserResponse(user);
    }

    async getAllUsers(): Promise<UserResponseDTO[]> {
        const users = await this.prisma.users.findMany();
        return users.map(user => this.formatUserResponse(user));
    }

    async getUserById(user_id: number): Promise<UserResponseDTO | null> {
        const user = await this.prisma.users.findUnique({ where: { user_id } });
        if (!user) return null;
        return this.formatUserResponse(user);
    }

    async updateUser(user_id: number, data: UpdateUserDTO): Promise<UserResponseDTO | null> {
        const updatedUser = await this.prisma.users.update({
            where: { user_id },
            data: {
                first_name: data.first_name,
                last_name: data.last_name,
                phone: data.phone,
                gender: data.gender,
                birthday: data.birthday ? new Date(data.birthday) : undefined,
            },
        });
        return this.formatUserResponse(updatedUser);
    }

    async deleteUser (user_id: number): Promise<void>{
        await this.prisma.users.delete({ where: { user_id } });
    }
    
    private formatUserResponse(user: any): UserResponseDTO {
        return {
            user_id: user.user_id,
            email: user.email,
            user_name: user.user_name,
            first_name: user.first_name,
            last_name: user.last_name,
            phone: user.phone,
            gender: user.gender,
            birthday: user.birthday ? user.birthday.toISOString() : undefined,
            is_active: user.is_active,
        };
    };
};