import { useState } from "react";
import type { CreateUserProps } from "../../types/User/UserProps";

import { Link, useNavigate } from "react-router-dom";
import Logo from "../../assets/logo-cineexplorer-desktop.png";

import { registerUserAuth } from "../../services/firebase/auth";
import { registerUserDb } from "../../services/firebase/user";

import { toast } from "sonner";
import { getFirebaseErrorMessage } from "../../utils/getFirebaseErrorMessage";


export function RegisterPage() {
    const navigate = useNavigate();

    const [userName, setUserName] = useState<string>("");
    const [userEmail, setUserEmail] = useState<string>("");
    const [userPassword, setUserPassword] = useState<string>("");
    const [userPasswordConfirm, setUserPasswordConfirm] = useState<string>("");

    const [nameError, setNameError] = useState<string>("");
    const [emailError, setEmailError] = useState<string>("");
    const [passwordError, setPasswordError] = useState<string>("");
    const [passwordConfirmError, setPasswordConfirmError] =
        useState<string>("");

    const [loading, setLoading] = useState<boolean>(false);

    function validationEmail(email: string) {
        const regex = new RegExp(
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        );
        return regex.test(String(email).toLowerCase());
    }

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();

        setNameError("");
        setEmailError("");
        setPasswordError("");
        setPasswordConfirmError("");
        let isValid: boolean = true;

        if (!userName) {
            setNameError("*Campo obrigatório.");
            isValid = false;
        }

        else if (userName.length < 3) {
            setNameError("O nome deve ter no minimo 3 caracteres.");
            isValid = false;
        }

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

        if (!userPasswordConfirm) {
            setPasswordConfirmError("*Campo obrigatório.");
            isValid = false;
        }

        if (
            userPassword &&
            userPasswordConfirm &&
            userPasswordConfirm != userPassword
        ) {
            setPasswordError("As senhas não correspondem.");
            setPasswordConfirmError("As senhas não correspondem.");
            isValid = false;
        }

        if (!isValid) {
            console.log("Formulário com erros, não será enviado.");
            return;
        }

        const user: CreateUserProps = {
            name: userName,
            email: userEmail,
            password: userPassword,
        };

        setLoading(true);

        try {
            const createdUser = await registerUserAuth(user);

            await registerUserDb(createdUser.uid, userName, userEmail);

            toast.success(<span className="font-bold text-[16px]">Cadastro realizado com sucesso!</span>, {
                description: 'Bem-vindo ao CineExplorer! Você será redirecionado.',
                duration: 3000,
            });
            
            setTimeout(() => {
                navigate("/"); 
            }, 1000);

            setUserEmail("");
            setUserPassword("");
            setUserPasswordConfirm("");
        } catch (error: any) {
            const errorMessage = getFirebaseErrorMessage(error.code);
            toast.error(<span className="font-bold text-[16px]">Falha no Cadastro</span>, {
                description: errorMessage,
            });
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="flex justify-center items-center px-3 min-h-screen">
            <div className="flex flex-col bg-slate-900 justify-center items-center px-8 pt-3 pb-8 rounded-xl md:max-w-[450px] max-w-10/12 w-full ">
                <img
                    src={Logo}
                    alt="Logo cine explorer"
                    className="w-40 my-3"
                />
                <h1 className="text-white text-2xl font-bold mb-4">Cadastro</h1>
                <form
                    className="flex flex-col gap-3 w-full"
                    onSubmit={handleSubmit}
                >
                    <div className="text-white flex flex-col">
                        <label htmlFor="name" className="mb-1">
                            Nome<span className="text-red-600">*</span>
                        </label>
                        <input
                            type="text"
                            name="name"
                            id="name"
                            required
                            className={`text-md py-2 px-1.5 bg-slate-800 text-slate-300 rounded-md focus:outline-none ${
                                nameError
                                    ? "ring-red-500 ring-2"
                                    : "focus:ring-sky-600 focus:ring-2"
                            }`}
                            autoComplete="username"
                            value={userName}
                            onChange={(e) => {
                                setUserName(e.target.value);
                                if (e.target.value.length > 0) {
                                    setNameError("");
                                }
                            }}
                        />
                        <span className="text-red-500 text-[13px] mt-0.5">
                            {nameError}
                        </span>
                    </div>

                    <div className="text-white flex flex-col">
                        <label htmlFor="email" className="mb-1">
                            Email<span className="text-red-600">*</span>
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
                            Senha<span className="text-red-600">*</span>
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

                    <div className="text-white flex flex-col">
                        <label htmlFor="password" className="mb-1">
                            Confirmar Senha
                            <span className="text-red-600">*</span>
                        </label>
                        <input
                            type="password"
                            name="passwordConfirm"
                            id="passwordConfirm"
                            className={`text-md py-2 px-1.5 bg-slate-800 text-slate-300 rounded-md focus:outline-none ${
                                passwordConfirmError
                                    ? "ring-red-500 ring-2"
                                    : "focus:ring-sky-600 focus:ring-2"
                            }`}
                            autoComplete="new-password"
                            value={userPasswordConfirm}
                            onChange={(e) => {
                                setUserPasswordConfirm(e.target.value);

                                if (e.target.value.length > 0) {
                                    setPasswordConfirmError("");
                                }
                            }}
                        />
                        <span className="text-red-500 text-[13px] mt-0.5">
                            {passwordConfirmError}
                        </span>
                    </div>

                    <button
                        className="cursor-pointer rounded-md md:hover:bg-sky-800 active:hover:bg-sky-80 active:scale-95 w-full text-white font-semibold bg-sky-600 py-2 mt-3 transition-all"
                        type="submit"
                        onClick={handleSubmit}
                    >
                        {loading ? "Castrando..." : "Criar conta"}
                    </button>

                    <div className="text-sky-600 mt-2 ml-1 text-center">
                        <span className="text-slate-300">Possui conta?</span>{" "}
                        <Link to={"/login"}>Fazer login</Link>
                    </div>
                </form>
            </div>
        </div>
    );
}
