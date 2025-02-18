import { useState } from "react";
import "./css/LoginPage.css";

const LoginPage = () => {

const [email, setEmail] = useState("");
const [password, setPassword] = useState("");
const [error, setError] = useState("");

    return (
        <>
        <h1>Logga in</h1>
        </>
    )
}

export default LoginPage