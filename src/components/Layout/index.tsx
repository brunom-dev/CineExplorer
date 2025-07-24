import { Header } from "../Header";
import { Outlet } from "react-router-dom";
import { Footer } from "../Footer/index";
import { ScrollToTop } from "../ScrollToTop";

export function Layout() {
    return (
        <>
            <ScrollToTop />
            <Header />
            <main className="mv-">
                <Outlet />
            </main>
            <Footer />
        </>
    );
}
