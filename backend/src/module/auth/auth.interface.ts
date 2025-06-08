class UserBaseDTO {
    email!: string;
    password!: string;
    user_name!: string;
    first_name?: string;
    last_name?: string;
    phone?: string;
    gender?: string;
    birthday?: Date | string;
    is_active?: boolean;
}

export class RegisterUserDTO extends UserBaseDTO {
    email!: string;
    password!: string;
    user_name!: string;
}

export class RegisterResponseDTO {
    message!: string;
    user_id!: number;
}

export class LoginUserDTO {
    emailOrUser!: string;
    password!: string;

}

export class LoginResponseDTO {
    access_token!: string;
    refresh_token!: string;
}

export class RefreshTokenDTO {
    refresh_token!: string;
}

export class LogoutDTO {
    user_id!: number;
}