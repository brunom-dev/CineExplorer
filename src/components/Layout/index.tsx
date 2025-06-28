import { Header } from "../Header"
import { Outlet } from "react-router-dom";
import { Footer } from '../Footer/index';



export function Layout() {
    return (
        <>
            <Header />
            <main className="mv-">
                <Outlet />
            </main>
            <Footer />
        </>
    );
}
