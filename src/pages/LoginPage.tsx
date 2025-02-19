import { useState, useEffect } from "react";
import "./css/LoginPage.css";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const {login, user} = useAuth();
    const navigate = useNavigate();

    //kontrollera användare och redirect om finns
    useEffect(() => {
        if(user) {
            navigate("/manageproducts");
        }
    }, [user])

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setError("");

        try {

            await login({email, password});
            navigate("/manageproducts")
            
        } catch (error) {
            setError("Inloggning misslyckades. Kontrollera e-post och lösenord.")
        }
    };


    return (
        <div className="loginContainer">
            <div className="loginBox">

                <h1>Logga in</h1>
                <form onSubmit={handleSubmit}>
                    <div className="errorMessage">{error && <p>{error}</p>}</div>

                    <label htmlFor="email">E-postadress:</label>
                    <br/>
                    <input id="email" type="email" required value={email} onChange={(e) => setEmail(e.target.value)} />
                    <br />
                    <label htmlFor="password">Lösenord:</label>
                    <br />
                    <input id="password" type="password" required value={password} onChange={(e) => setPassword(e.target.value)}/>

                    <br />
                    <button type="submit">Logga in</button>
                </form>
            </div>
        </div>
    )
}

export default LoginPage