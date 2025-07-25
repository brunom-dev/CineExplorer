// src/pages/ForgotPasswordPage.tsx
import { useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "sonner";
import { sendPasswordReset } from "../../services/firebase/auth";
import Logo from "../../assets/logo-cineexplorer-desktop.png";
import { MailCheckIcon } from "lucide-react";

export function ForgotPasswordPage() {
    const [email, setEmail] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const [successMessage, setSuccessMessage] = useState("");

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!email) {
            toast.error("Por favor, digite seu e-mail.");
            return;
        }

        setIsLoading(true);
        try {
            await sendPasswordReset(email);
            setSuccessMessage(
                "Se uma conta estiver associada a este e-mail, um link para redefinição de senha foi enviado. Por favor, verifique sua caixa de entrada e a pasta de spam."
            );
        } catch (error: any) {
            setSuccessMessage(
                "Se uma conta estiver associada a este e-mail, um link para redefinição de senha foi enviado. Por favor, verifique sua caixa de entrada e a pasta de spam."
            );
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="flex justify-center items-center px-3 min-h-screen">
            <div className="flex flex-col bg-slate-900 justify-center items-center px-8 pt-3 pb-8 rounded-xl md:max-w-[450px] w-full">
                <img
                    src={Logo}
                    alt="Logo Cine Explorer"
                    className="w-40 my-5"
                />

                {successMessage ? (
                    <div className="text-center">
                        <MailCheckIcon className="h-20 w-20 mx-auto text-sky-500" />
                        <h1 className="text-sky-500 text-2xl font-bold mb-4">
                            Verifique seu E-mail
                        </h1>
                        <p className="text-slate-300">{successMessage}</p>
                        <Link
                            to="/login"
                            className="block mt-6 text-sky-500 hover:underline"
                        >
                            Voltar para o Login
                        </Link>
                    </div>
                ) : (
                    <>
                        <h1 className="text-white text-2xl font-bold mb-4">
                            Redefinir Senha
                        </h1>
                        <p className="text-slate-400 text-center mb-6 text-sm">
                            Digite seu e-mail e enviaremos um link para você
                            voltar a acessar sua conta.
                        </p>
                        <form
                            className="flex flex-col gap-3 w-full"
                            onSubmit={handleSubmit}
                        >
                            <input
                                type="email"
                                placeholder="ex: seuemail@dominio.com"
                                className="text-md py-2 px-3 bg-slate-800 text-slate-300 rounded-md focus:outline-none focus:ring-sky-600 focus:ring-2"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                            <button
                                className="cursor-pointer rounded-md md:hover:bg-sky-800 active:scale-95 w-full text-white font-semibold bg-sky-600 py-2 mt-3 transition-all disabled:bg-slate-700"
                                type="submit"
                                disabled={isLoading}
                            >
                                {isLoading
                                    ? "Enviando..."
                                    : "Enviar Link de Redefinição"}
                            </button>

                            <div className="text-sky-600 mt-1 ml-1 text-center">
                                <span className="text-slate-300">
                                    Lembrou a senha? {" "}
                                </span>
                                <Link
                                    to="/login"
                                    className=""
                                >
                                    Voltar para o Login
                                </Link>
                            </div>
                        </form>
                    </>
                )}
            </div>
        </div>
    );
}
