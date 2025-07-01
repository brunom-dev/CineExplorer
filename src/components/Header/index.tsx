import { useEffect, useState } from "react";
import Logo from "../../assets/logo-cineexplorer-desktop.png";
import { Link } from "react-router-dom";
import { SearchIcon, MenuIcon, XIcon } from "lucide-react";

export const Header = () => {
    const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
    const [isScrolled, setIsScrolled] = useState<boolean>(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 80);
        };
        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, [window.scrollY]);

    return (
        <>
            <header className={`w-full fixed top-0 left-0 z-50 transition-all duration-300 ease-in-out ${isScrolled ? 'bg-slate-900 shadow-lg' : 'bg-transparent'}`}>
                <nav className="container mx-auto py-5 px-6 flex items-center justify-between">
                    <Link to="/">
                        <img
                            src={Logo}
                            className="h-20"
                            alt="CineExplorer Logo"
                        />
                    </Link>

                    <ul className="hidden md:flex items-center gap-10 font-bold text-xl">
                        <li>
                            <Link
                                to={"/"}
                                className="text-slate-100 hover:text-sky-600 transition-colors"
                            >
                                Início
                            </Link>
                        </li>
                        <li>
                            <Link
                                to={"#movies"}
                                className="text-slate-100 hover:text-sky-600 transition-colors"
                            >
                                Filmes
                            </Link>
                        </li>
                        <li>
                            <Link
                                to={"#series"}
                                className="text-slate-100 hover:text-sky-600 transition-colors"
                            >
                                Séries
                            </Link>
                        </li>
                    </ul>

                    <div className="flex items-center gap-4">
                        <div className="hidden lg:flex items-center gap-2">
                            <SearchIcon className="text-slate-400" />
                            <input
                                type="text"
                                placeholder="Buscar filmes..."
                                className="bg-slate-800 text-slate-100 px-3 py-1 rounded-md text-sm w-48 placeholder:text-slate-500"
                            />
                        </div>
                        <button
                            className="p-2 md:hidden"
                            onClick={() => setIsMenuOpen(true)}
                        >
                            <MenuIcon className="text-slate-100" />
                        </button>
                    </div>
                </nav>
            </header>


            {isMenuOpen && (
                <div
                    className="fixed inset-0 bg-black/60 z-40 cursor-pointer"
                    onClick={() => setIsMenuOpen(false)}
                ></div>
            )}


            <div
                className={`
                    fixed top-0 right-0 h-full w-4/5 max-w-sm bg-slate-900 shadow-xl z-50 p-6 flex flex-col
                    transform transition-transform duration-300 ease-in-out
                    ${isMenuOpen ? "translate-x-0" : "translate-x-full"}
                `}
            >
                <div className="flex items-center justify-between mb-10">
                    <h2 className="text-xl text-sky-600 font-bold">Menu</h2>
                    <button onClick={() => setIsMenuOpen(false)}>
                        <XIcon className="text-slate-100" />
                    </button>
                </div>


                <div className="flex flex-col gap-8">

                    <div className="flex items-center gap-2 border-b border-slate-700 pb-4">
                        <SearchIcon className="text-slate-400" />
                        <input
                            type="text"
                            placeholder="Buscar filmes..."
                            className="bg-transparent text-slate-100 w-full focus:outline-none"
                        />
                    </div>

                    <ul className="flex flex-col gap-6 font-bold text-xl">
                        <li>
                            <Link
                                to={"/"}
                                className="text-slate-100 hover:text-sky-600"
                                onClick={() => setIsMenuOpen(false)}
                            >
                                Início
                            </Link>
                        </li>
                        <li>
                            <Link
                                to={"#movies"}
                                className="text-slate-100 hover:text-sky-600"
                                onClick={() => setIsMenuOpen(false)}
                            >
                                Filmes
                            </Link>
                        </li>
                        <li>
                            <Link
                                to={"#series"}
                                className="text-slate-100 hover:text-sky-600"
                                onClick={() => setIsMenuOpen(false)}
                            >
                                Séries
                            </Link>
                        </li>
                    </ul>
                </div>
            </div>
        </>
    );
};
