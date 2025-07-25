import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { Spinner } from "../Spinner";
import { toast } from "sonner";

export const ProtectedRoute = () => {
    const { currentUser, isLoading } = useAuth();

    if (isLoading) {
        return (
            <div className="bg-slate-950 min-h-screen flex items-center justify-center">
                <Spinner />
            </div>
        );
    }

    if (!currentUser) {
        toast.info(<span className="font-bold text-[16px]">Login Necessário</span>, {
            description: "Você precisa estar logado para acessar esta página.",
        });
        return <Navigate to={"/login"} replace />;
    }

    return <Outlet />;
};
