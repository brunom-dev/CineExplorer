export const getFirebaseErrorMessage = (errorCode: string): string => {
    console.log(errorCode)

    if (errorCode == "auth/email-already-in-use") 
        return "Este endereço de e-mail já está em uso por outra conta.";
    else if (errorCode == "auth/weak-password")
        return "A senha é muito fraca. Tente uma com pelo menos 6 caracteres.";
    else if (errorCode == "auth/invalid-email")
        return "O formato do e-mail é inválido.";
    else if (errorCode == "auth/invalid-credential") // No login, os dois podem ser a mesma mensagem por segurança
        return "E-mail ou senha incorretos.";
    else if (errorCode == "auth/too-many-requests")
        return "Voce excedeu o número de tentativas. Tente novamente mais tarde."
    else
        return "Ocorreu um erro inesperado. Por favor, tente novamente.";
}
