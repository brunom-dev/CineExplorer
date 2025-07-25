import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext"; // Usamos nosso contexto para saber quem é o usuário
import { MailCheck } from "lucide-react";
import { toast } from "sonner";

export function VerifyEmailPage() {
    const { firebaseUser } = useAuth(); 
    const navigate = useNavigate();

    useEffect(() => {    
        if (firebaseUser?.emailVerified) {
            navigate("/");
            return;
        }

        if (!(firebaseUser?.email)) {
            navigate("/");
            return;
        }


        const interval = setInterval(async () => {
            await firebaseUser?.reload();

            if (firebaseUser?.emailVerified) {
                clearInterval(interval); 
                toast.success("E-mail verificado com sucesso!");
                navigate("/"); 
            }
        }, 3000);

        return () => clearInterval(interval);
    }, [firebaseUser, navigate]);

    return (
        <div className="bg-slate-950 min-h-screen flex items-center justify-center text-center text-white p-4">
            <div className="bg-slate-800 p-8 rounded-xl shadow-lg max-w-md">
                <MailCheck className="h-20 w-20 mx-auto text-sky-500" />
                <h1 className="text-3xl font-bold mt-6">
                    Verifique seu E-mail
                </h1>
                <p className="text-slate-400 mt-2">
                    Cadastro quase completo! Enviamos um link de verificação
                    para <strong>{firebaseUser?.email}</strong>.
                </p>
                <p className="text-slate-500 mt-4 text-sm">
                    Por favor, verifique sua caixa de entrada (e a pasta de
                    spam) para ativar sua conta. Esta página será redirecionada
                    automaticamente após a verificação.
                </p>
            </div>
        </div>
    );
}
