import Logo from "../../assets/logo-cineexplorer-mobile.png"; 
import { GithubIcon , LinkedinIcon } from "lucide-react";

export const Footer = () => {

    const currentYear = new Date().getFullYear();

    return (

        <footer className="w-full bg-slate-950 text-slate-100 pt-2">
            <div className="container mx-auto px-12 py-8">

                <div className="flex flex-col md:flex-row items-center justify-between gap-6">

                    <div className="md: w-1/3 flex justify-center md:justify-start">
                        <img
                            src={Logo}
                            alt="CineExplorer Logo"
                            className="h-[70px]"
                        />
                    </div>

                    <div className="w-full md:w-1/3 text-center text-md flex-col">
                        <p className="font-bold">
                            Desenvolvido
                            por Bruno Macedo
                        </p>
                        <p className="mt-1 italic"> &copy; {currentYear} Todos os direitos reservados</p>
                    </div>


                    <div className="w-1/3 flex items-center justify-center md:justify-end gap-4">
                        <a
                            href="https://github.com/brunom-dev"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="hover:bg-[#4586ff] rounded-full bg-[#4586ff] md:bg-transparent p-3 transition-all duration-300"
                        >
                            <GithubIcon size={24} />
                        </a>
                        <a
                            href="https://www.linkedin.com/in/bruno-macedo-dev/"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="hover:bg-[#4586ff] rounded-full bg-[#4586ff] md:bg-transparent p-3 transition-all duration-300"
                        >
                            <LinkedinIcon size={24} />
                        </a>
                    </div>
                </div>


                <div className="text-center text-xs mt-8 pt-6 border-t border-slate-700 text-slate-500">
                    <p>
                        Este produto usa a API TMDb, mas não é endossado ou
                        certificado por TMDb.
                    </p>
                </div>
            </div>
        </footer>
    );
};
