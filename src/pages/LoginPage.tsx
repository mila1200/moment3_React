import { useState } from "react";
import "./css/LoginPage.css";

const LoginPage = () => {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setError("");
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