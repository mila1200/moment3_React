//importera funktionalitet
import { Navigate } from "react-router-dom";
import { ReactNode } from "react";
import { useAuth } from "../context/AuthContext";

//definierar innehållet som ska skyddas
interface ProtectedRouteProps {
    children: ReactNode
}

//tar in children och visar innehållet av dessa (komponenterna) om användrae är inloggad
const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {

    const { user } = useAuth();

    //om inte inloggad skickas användaren till /login
    if (!user) {
        return <Navigate to="/login" replace />
    }

    return (
        <>
            {children}
        </>
    )
}

export default ProtectedRoute