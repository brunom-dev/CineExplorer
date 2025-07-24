import { useState } from "react";

import { Link, useNavigate } from "react-router-dom";
import Logo from "../../assets/logo-cineexplorer-desktop.png";
import type { CreateUserProps } from "../../types/User/UserProps";
import { loginUserAuth } from "../../services/firebase/auth";
import { toast } from "sonner";
import { getFirebaseErrorMessage } from "../../utils/getFirebaseErrorMessage";

export function LoginPage() {
    const navigate = useNavigate();

    const [userEmail, setUserEmail] = useState<string>("");
    const [userPassword, setUserPassword] = useState<string>("");

    const [emailError, setEmailError] = useState<string>("");
    const [passwordError, setPasswordError] = useState<string>("");

    const [loading, setLoading] = useState<boolean>(false);

    function validationEmail(email: string) {
        const regex = new RegExp(
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        );
        return regex.test(String(email).toLowerCase());
    }

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();

        setEmailError("");
        setPasswordError("");
        let isValid: boolean = true;

        if (!userEmail) {
            setEmailError("*Campo obrigatório.");
            isValid = false;
        } else if (!validationEmail(userEmail)) {
            setEmailError("Email inválido.");
            isValid = false;
        }

        if (!userPassword) {
            setPasswordError("*Campo obrigatório.");
            isValid = false;
        } else if (userPassword.length < 8) {
            setPasswordError("A senha deve ter no mínimo 8 caracteres.");
            isValid = false;
        }

        if (!isValid) {
            console.log("Formulário com erros, não será enviado.");
            return;
        }

        const user: CreateUserProps = {
            email: userEmail,
            password: userPassword,
        };
        setLoading(true);

        try {
            await loginUserAuth(user);

            toast.success(<span className="font-bold text-[16px]">Login efetuado com sucesso!</span>, {
                description: "Bem-vindo de volta! Estamos te redirecionando.",
                duration: 2000,
            });

            setTimeout(() => {
                navigate("/");
            }, 1000);
        } catch (error: any) {
            const errorMessage = getFirebaseErrorMessage(error.code);
            toast.error(<span className="font-bold text-[16px]">Falha no Login</span>, {
                description: errorMessage,
            });
        } finally {
            setLoading(false);
        }

    }

    return (
        <div className="flex justify-center items-center px-3 min-h-screen">
            <div className="flex flex-col bg-slate-900 justify-center items-center px-8 pt-6 pb-7 rounded-xl md:max-w-[450px] max-w-10/12 w-full md:mt-10">
                <img
                    src={Logo}
                    alt="Logo cine explorer"
                    className="w-40 my-5"
                />{" "}
                {/* LOGO */}
                <h1 className="text-white text-2xl font-bold mb-4">Login</h1>
                <form className="flex flex-col gap-3 w-full">
                    {/* INPUTS */}
                    <div className="text-white flex flex-col">
                        <label htmlFor="email" className="mb-1">
                            Email
                        </label>
                        <input
                            type="email"
                            name="email"
                            id="email"
                            required
                            className={`text-md py-2 px-1.5 bg-slate-800 text-slate-300 rounded-md focus:outline-none ${
                                emailError
                                    ? "ring-red-500 ring-2"
                                    : "focus:ring-sky-600 focus:ring-2"
                            }`}
                            autoComplete="email"
                            value={userEmail}
                            onChange={(e) => {
                                setUserEmail(e.target.value);
                                if (e.target.value.length > 0) {
                                    setEmailError("");
                                }
                            }}
                        />
                        <span className="text-red-500 text-[13px] mt-0.5">
                            {emailError}
                        </span>
                    </div>

                    <div className="text-white flex flex-col">
                        <label htmlFor="password" className="mb-1">
                            Senha
                        </label>
                        <input
                            type="password"
                            name="password"
                            id="password"
                            className={`text-md py-2 px-1.5 bg-slate-800 text-slate-300 rounded-md focus:outline-none ${
                                passwordError
                                    ? "ring-red-500 ring-2"
                                    : "focus:ring-sky-600 focus:ring-2"
                            }`}
                            autoComplete="new-password"
                            value={userPassword}
                            onChange={(e) => {
                                setUserPassword(e.target.value);

                                if (e.target.value.length > 0) {
                                    setPasswordError("");
                                }
                            }}
                        />
                        <span className="text-red-500 text-[13px] mt-0.5">
                            {passwordError}
                        </span>
                    </div>

                    <div className="text-sky-600 -mt-1 ml-1">
                        <Link to={"#forgot"}>Esqueceu a senha? </Link>
                    </div>

                    <button
                        className="cursor-pointer rounded-md md:hover:bg-sky-800 active:hover:bg-sky-80 active:scale-95 w-full text-white font-semibold bg-sky-600 py-2 mt-3 transition-all"
                        type="submit"
                        onClick={handleSubmit}
                    >
                        {loading ? "Entrando..." : "Entrar"}
                    </button>

                    <div className="text-sky-600 mt-1 ml-1 text-center">
                        <span className="text-slate-300">
                            Ainda não possui conta?{" "}
                        </span>
                        <Link to={"/signup"}>Crie sua conta</Link>
                    </div>
                </form>
            </div>
        </div>
    );
}
