export declare class RegisterDto {
    name: string;
    email: string;
    password: string;
    role?: 'ADMIN' | 'STAFF' | 'OWNER';
}
export declare class LoginDto {
    email: string;
    password: string;
}
