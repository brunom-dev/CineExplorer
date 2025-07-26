import { useEffect } from "react";
import { Header } from "../Header";
import { Outlet } from "react-router-dom";
import { Footer } from "../Footer/index";
import { ScrollToTop } from "../ScrollToTop";
import AOS from "aos";
import "aos/dist/aos.css";

export function Layout() {
    useEffect(() => {
        AOS.init({
            duration: 800,
            once: true,
        });
    }, []);

    return (
        <>
            <ScrollToTop />
            <Header />
            <main>
                <Outlet />
            </main>
            <Footer />
        </>
    );
}
