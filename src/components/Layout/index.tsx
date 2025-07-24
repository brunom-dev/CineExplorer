import { Header } from "../Header";
import { Outlet } from "react-router-dom";
import { Footer } from "../Footer/index";
import { ScrollToTop } from "../ScrollToTop";
import { Toaster } from "sonner";

export function Layout() {
    return (
        <>
            <ScrollToTop />
            <Toaster
                richColors
                position="top-right"
                theme="dark" 
                toastOptions={{
                    style: {
                        background: "#1e293b", 
                        borderColor: "#334155", 
                    },
                }}
            />
            <Header />
            <main className="mv-">
                <Outlet />
            </main>
            <Footer />
        </>
    );
}
