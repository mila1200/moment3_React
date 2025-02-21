//definierar en användare
export interface User {
    id: string,
    firstname: string,
    surname: string,
    email: string,
}

//vad som behövs för att logga in
export interface LoginCredentials {
    email: string,
    password: string
}

//authsvaret
export interface AuthResponse {
    user: User,
    token: string
}

//hanterar användare, login och logout
export interface AuthContextType {
    user: User | null,
    login: (credentials: LoginCredentials) => Promise<void>;
    logout: () => void;
}