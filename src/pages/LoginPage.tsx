//importerar funktionalitet
import { useState, useEffect } from "react";
import "./css/LoginPage.css";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {

    //states
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    //aktiverar navigering och hanterar inloggning
    const {login, user} = useAuth();
    const navigate = useNavigate();

    //kontrollera användare och redirect om finns
    useEffect(() => {
        if(user) {
            navigate("/manageproducts");
        }
    }, [user])

    //hanterar inloggningsformuläret. Om ok, navigerar till /manageproducts
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
                {/*handlesubmit anropas när knappen klickas på. Epost och lösenord är kopplade till email och password*/}
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
                    <button id="loginBtn" type="submit">Logga in</button>
                </form>
            </div>
        </div>
    )
}

export default LoginPage