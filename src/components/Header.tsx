import { NavLink } from "react-router-dom"
import { useAuth } from "../context/AuthContext"
import "./css/Header.css"


const Header = () => {

  //hämtar användare och logout-funktion
  const { user, logout } = useAuth();

  //meny-länkar. om användaren är inloggad visas istället knappen för att logga ut.
  return (
    <>
      <header>
        <ul>
          <li><NavLink to="/">Start</NavLink></li>
          <li><NavLink to="/manageproducts">Hantera produkter</NavLink> </li>
          <li>
            {
              !user ? <NavLink to="login">Logga in</NavLink> : <button id="menuBtn" onClick={logout}>Logga ut</button>
            }
          </li>
        </ul>
      </header>
    </>
  )
}

export default Header