import Header from "./Header"
import Footer from "./Footer"
import { Outlet } from "react-router-dom"

//bestämmer layout för komponenterna. Outlet är innehållet som förändras beroende på visad komponent
const Layout = () => {
    return (
        <>
            <Header />
            <main>
                <Outlet />
            </main>
            <Footer />
        </>
    )
}

export default Layout