export interface CreateUserDTO {
    email: string;
    password: string;
    user_name: string;
    first_name?: string;
    last_name?: string;
    phone?: string;
    gender?: string;
    birthday?: string;
  }
  
  export interface UpdateUserDTO {
    first_name?: string;
    last_name?: string;
    phone?: string;
    gender?: string;
    birthday?: string;
  }
  
  export interface UserResponseDTO {
    user_id: number;
    email: string;
    user_name: string;
    first_name?: string;
    last_name?: string;
    phone?: string;
    gender?: string;
    birthday?: string;
    is_active: boolean;
    created_at: string;
    updated_at: string;
  }
  