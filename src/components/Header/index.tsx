import { useEffect, useState } from "react";
import Logo from "../../assets/logo-cineexplorer-desktop.png";
import { Link } from "react-router-dom";
import { SearchIcon, MenuIcon, XIcon } from "lucide-react";

import type { MediaItemProps } from "../../types/MediaItemProps";

import { getMediaSearch } from "../../services/utils";
import { useDebounce } from "../../hook/useDebounce";

export const Header = () => {
    const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
    const [isScrolled, setIsScrolled] = useState<boolean>(false);

    const [searchText, setSearchText] = useState<string>("");
    const [searchResults, setSearchResults] = useState<MediaItemProps[]>([]);
    const [isSearchActive, setIsSearchActive] = useState<boolean>(false);

    const debouncedSearchTerm = useDebounce(searchText, 500);

    useEffect(() => {
        if (debouncedSearchTerm) {
            const fetchSearch = async () => {
                const results = await getMediaSearch(debouncedSearchTerm);
                setSearchResults(results);
                console.log("Resultados da busca:", results);
            };

            fetchSearch();
        } else {
            setSearchResults([]);
        }
    }, [debouncedSearchTerm]);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 100);
        };
        window.addEventListener("scroll", handleScroll);
        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);

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
        setSearchText("");
    };

    return (
        <>
            <header
                className={`w-full fixed top-0 left-0 z-50 transition-all duration-300 ease-in-out ${
                    isScrolled ? "bg-slate-900 shadow-lg" : "bg-transparent"
                }`}
            >
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
                        <div className="hidden lg:flex items-center gap-2 w-full">
                            <SearchIcon className="text-slate-400" />
                            <input
                                type="text"
                                placeholder="Encontre filmes, series, ..."
                                className="bg-slate-800 text-slate-100 px-3 py-2 rounded-md text-sm w-full placeholder:text-slate-500"
                                value={searchText}
                                onChange={(e) => setSearchText(e.target.value)}
                                onFocus={() => setIsSearchActive(true)}
                                onBlur={() => {
                                    setTimeout(() => {
                                        setIsSearchActive(false);
                                    }, 200);
                                }}
                            />

                            {isSearchActive && searchResults.length > 0 && (
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
                        <button
                            className="p-2 md:hidden cursor-pointer"
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
                className={`overflow-y-auto fixed top-0 right-0 h-full w-4/5 max-w-sm bg-slate-900 shadow-xl z-50 p-6 flex flex-col transform transition-transform duration-300 ease-in-out ${
                    isMenuOpen ? "translate-x-0" : "translate-x-full"
                }
                `}
            >
                <div className="flex items-center justify-between mb-10">
                    <h2 className="text-xl text-sky-600 font-bold">Menu</h2>
                    <button onClick={() => handleCloseMenu()}>
                        <XIcon className="text-slate-100 cursor-pointer" />
                    </button>
                </div>

                <div className="flex flex-col gap-8">
                    <div className="flex items-center gap-2 border-b border-slate-700 pb-2 pt-2 mt-3">
                        <SearchIcon className="text-slate-400" />
                        <input
                            type="text"
                            placeholder="Buscar..."
                            className="bg-transparent text-slate-100 w-full focus:outline-none"
                            value={searchText}
                            onChange={(e) => setSearchText(e.target.value)}
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
                            <ul className="flex flex-col gap-8 font-bold text-xl pt-4">
                                <li>
                                    <Link
                                        to={"/"}
                                        className="text-slate-100 activw:text-sky-600"
                                        onClick={handleCloseMenu}
                                    >
                                        Início
                                    </Link>
                                </li>
                                <li className="w-full">
                                    <Link
                                        to={"#movies"}
                                        className="text-slate-100 active:text-sky-600"
                                        onClick={handleCloseMenu}
                                    >
                                        Filmes
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        to={"#series"}
                                        className="text-slate-100 activw:text-sky-600"
                                        onClick={handleCloseMenu}
                                    >
                                        Séries
                                    </Link>
                                </li>
                            </ul>
                        )}
                    </div>
                </div>
            </div>
        </>
    );
};
