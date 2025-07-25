import { Link } from "react-router-dom";
import { AlertTriangle } from "lucide-react"; 

export function NotFoundPage() {
    return (
        <div className="bg-slate-950 min-h-screen flex flex-col px-10">
            <main className="flex-1 flex items-center justify-center text-center">
                <div className="bg-slate-800 p-8 md:p-12 rounded-xl shadow-lg max-w-lg">
                    <AlertTriangle className="h-20 w-20 mx-auto text-sky-500" />

                    <h1 className="text-4xl md:text-5xl font-bold text-slate-100 mt-6">
                        Erro 404
                    </h1>
                    <h2 className="text-2xl font-semibold text-slate-300 mt-2">
                        Página Não Encontrada
                    </h2>
                    <p className="text-slate-400 mt-4">
                        Opa! Parece que o filme que você estava procurando não
                        está nesta fita. A página pode ter sido removida ou o
                        link está quebrado.
                    </p>

                    <div className="mt-8">
                        <Link
                            to="/"
                            className="bg-sky-600 hover:bg-sky-700 text-white font-bold py-3 px-8 rounded-lg transition-colors text-lg"
                        >
                            Voltar para o Início
                        </Link>
                    </div>
                </div>
            </main>
        </div>
    );
}
