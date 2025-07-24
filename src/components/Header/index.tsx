import { useState, useEffect } from "react";
import { Link, NavLink } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { useDebounce } from "../../hook/useDebounce";
import { getMediaSearch } from "../../services/tmdb/tmdb";
import type { MediaItemProps } from "../../types/Media/MediaItemProps";
import { SearchIcon, MenuIcon, XIcon, CircleUserRoundIcon } from "lucide-react";
import Logo from "../../assets/logo-cineexplorer-desktop.png";
import { logoutUserAuth } from "../../services/firebase/auth";

export const Header = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");
    const [searchResults, setSearchResults] = useState<MediaItemProps[]>([]);

    const { currentUser } = useAuth(); // Usando o contexto de autenticação
    const debouncedSearchTerm = useDebounce(searchTerm, 500);

    // Efeito para o scroll do header
    useEffect(() => {
        const handleScroll = () => setIsScrolled(window.scrollY > 10);
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    useEffect(() => {
        if (debouncedSearchTerm.trim().length > 2) {
            const doSearch = async () =>
                setSearchResults(await getMediaSearch(debouncedSearchTerm));
            doSearch();
        } else {
            setSearchResults([]);
        }
    }, [debouncedSearchTerm]);

    useEffect(() => {
        if (isMenuOpen) {
            document.body.classList.add("overflow-hidden");
        }
        return () => {
            document.body.classList.remove("overflow-hidden");
        };
    }, [isMenuOpen]);

    const handleCloseMenu = () => {
        setIsMenuOpen(false);
        setSearchTerm("");
    };

    return (
        <>
            <header
                className={`w-full fixed top-0 left-0 z-30 transition-all duration-300 ease-in-out ${
                    isScrolled ? "bg-slate-900 shadow-lg" : "bg-transparent"
                }`}
            >
                <nav className="container mx-auto py-6 px-6 flex items-center justify-between">
                    <div className="flex items-center md:gap-8 gap-5">
                        <button
                            onClick={() => setIsMenuOpen(true)}
                            className="p-2 cursor-pointer"
                        >
                            <MenuIcon className="text-slate-100 hover:bg-slate-500 hover:rounded-full" />
                        </button>
                        <Link to="/" onClick={handleCloseMenu}>
                            <img
                                src={Logo}
                                className="md:h-16 h-14"
                                alt="CineExplorer Logo"
                            />
                        </Link>
                    </div>

                    <div className="hidden md:flex relative items-center gap-2">
                        <SearchIcon className="text-slate-400" />
                        <input
                            type="text"
                            placeholder="Buscar por um filme ou série..."
                            className="bg-transparent text-slate-100 focus:outline-none w-64"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                        {searchTerm && searchResults.length > 0 && (
                            <div className="absolute top-full right-2 pr-4 mt-2 w-80 max-h-96 overflow-y-auto bg-slate-800 rounded-lg shadow-xl">
                                <ul>
                                    {searchResults.map((item) => (
                                        <li key={item.id}>
                                            <Link
                                                to={`/${item.media_type}/${item.id}`}
                                                className="flex items-center gap-4 p-3 hover:bg-slate-700 transition-colors"
                                            >
                                                <img
                                                    src={`https://image.tmdb.org/t/p/w200${item.poster_path}`}
                                                    alt=""
                                                    className="w-10 h-14 object-cover rounded"
                                                />
                                                <div>
                                                    <p className="font-bold text-slate-100">
                                                        {item.title ||
                                                            item.name}
                                                    </p>
                                                    <p className="text-sm text-slate-400">
                                                        {item.media_type ===
                                                        "movie"
                                                            ? "Filme"
                                                            : "Série"}
                                                    </p>
                                                </div>
                                            </Link>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        )}
                    </div>

                    <div className="flex items-center md:mr-4">
                        {currentUser ? (
                            <div className="flex md:flex-row gap-2 items-center justify-center py-2">
                                <CircleUserRoundIcon color="white" size={25} />
                                <p className="text-white font-bold text-md">
                                    {currentUser.name}
                                </p>
                            </div>
                        ) : (
                            <Link
                                to="/login"
                                className="bg-sky-600 text-white font-bold px-4 py-2 rounded-lg hover:bg-sky-700 transition-colors"
                            >
                                Entrar
                            </Link>
                        )}
                    </div>
                </nav>
            </header>

            {isMenuOpen && (
                <div
                    className="fixed inset-0 bg-black/60 z-40"
                    onClick={handleCloseMenu}
                ></div>
            )}

            <div
                className={`
          fixed top-0 left-0 h-full w-4/5 max-w-xs bg-slate-900 shadow-xl z-50 p-6 flex flex-col
          transform transition-transform duration-300 ease-in-out
          ${isMenuOpen ? "translate-x-0" : "-translate-x-full"}
      `}
            >
                <div className="flex items-center justify-between pb-6 border-b border-slate-700">
                    <h2 className="text-xl text-sky-600 font-bold">
                        Navegação
                    </h2>
                    <button onClick={handleCloseMenu}>
                        <XIcon className="text-slate-100 cursor-pointer hover:text-sky-500 transition-all" />
                    </button>
                </div>

                <div className="flex items-center gap-2 border border-slate-700 rounded-lg p-2 my-6">
                    <SearchIcon className="text-slate-400" />
                    <input
                        type="text"
                        placeholder="Buscar..."
                        className="bg-transparent text-slate-100 w-full focus:outline-none"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>

                <div className="flex-1 overflow-y-auto custom-scrollbar">
                    {searchResults.length > 0 ? (
                        <ul className="overflow-y-auto custom-scrollbar">
                            {searchResults.map((item) => (
                                <li key={item.id}>
                                    <Link
                                        to={`/${item.media_type}/${item.id}`}
                                        onClick={handleCloseMenu}
                                        className="flex items-center gap-4 p-3 hover:bg-slate-700 transition-colors rounded-lg"
                                    >
                                        <img
                                            src={`https://image.tmdb.org/t/p/w200${item.poster_path}`}
                                            alt=""
                                            className="w-12 h-16 object-cover rounded"
                                        />
                                        <div>
                                            <p className="font-bold text-slate-100">
                                                {item.title || item.name}
                                            </p>
                                            <p className="text-sm text-slate-400">
                                                {item.media_type === "movie"
                                                    ? "Filme"
                                                    : "Série"}
                                            </p>
                                        </div>
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <ul className="flex flex-col gap-2 font-bold text-xl pt-8 flex-1">
                            <li>
                                <NavLink
                                    to={"/"}
                                    className={({ isActive }) =>
                                        `block p-4 rounded-lg ${
                                            isActive
                                                ? "bg-sky-600 text-white"
                                                : "text-slate-100 hover:bg-slate-700"
                                        }`
                                    }
                                    onClick={handleCloseMenu}
                                >
                                    Início
                                </NavLink>
                            </li>
                            <li>
                                <a
                                    href={"/#movies"}
                                    className="block p-4 rounded-lg text-slate-100 hover:bg-slate-700"
                                    onClick={handleCloseMenu}
                                >
                                    Filmes
                                </a>
                            </li>
                            <li>
                                <a
                                    href={"/#series"}
                                    className="block p-4 rounded-lg text-slate-100 hover:bg-slate-700"
                                    onClick={handleCloseMenu}
                                >
                                    Séries
                                </a>
                            </li>
                            {/* Futuramente: <li><NavLink to={"/minha-lista"} ...>Minha Lista</NavLink></li> */}
                        </ul>
                    )}
                </div>

                {currentUser && (
                    <div className="mt-auto pt-6 border-t border-slate-700">
                        <button
                            className="w-full cursor-pointer text-left p-4 rounded-lg text-slate-100 hover:bg-slate-700"
                            onClick={logoutUserAuth}
                        >
                            Sair
                        </button>
                    </div>
                )}
            </div>
        </>
    );
};
