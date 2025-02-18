import { createContext, useState, useContext, ReactNode } from "react";
import { User, LoginCredentials, AuthResponse, AuthContextType } from "../types/auth.types";

//skapa context, använder interface. Är null innan initieras
const AuthContext = createContext<AuthContextType | null>(null);

interface AuthProviderProps {
    children: ReactNode
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {

    const [user, setUser] = useState<User | null>(null);

    const login = async (credentials: LoginCredentials) => {
        
        try {
            const res = await fetch("http://localhost:5000/users/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(credentials),
                credentials: "include"
            })

            if(!res.ok) {
                throw new Error("Inloggning misslyckades.");
            }

            const data = await res.json() as AuthResponse;

            setUser(data.user)

        } catch (error) {
            throw error;
        }
    }

    const logout = async () => {
        try {
            const response = await fetch("http://localhost:5000/logout", {
                method: "POST",
                credentials: "include"
            });

            if(!response.ok) {
                throw new Error("Utloggning misslyckades")
            }

            //ta bort användare från staten
            setUser(null)
        } catch (error) {
            throw error;
        }
    }

    return (
        <AuthContext.Provider value={{user, login, logout}}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () : AuthContextType => {
    const context = useContext(AuthContext);

    if(!context) {
        throw new Error("useAuth måste användas inom en AuthProvider")
    }

    return context;
}
