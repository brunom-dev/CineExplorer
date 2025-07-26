import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { MediaCard } from "../../components/MediaCard";
import { useAuth } from "../../context/AuthContext";
import { getMediaDetails } from "../../services/tmdb/tmdb"; // Usaremos nossa função genérica
import type { MediaItemProps } from "../../types/Media/MediaItemProps";
import { ListPlus, LayoutGrid, List, RefreshCw } from "lucide-react";
import { ListItemCard } from "../../components/ListItemCard";

export function MyFavoritesPage() {
    const { currentUser } = useAuth();
    const [favoriteItems, setFavoriteItems] = useState<MediaItemProps[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    const [refresh, setRefresh] = useState<number>(0);
    const [loadingRefresh, setLoadingRefresh] = useState<boolean>(false);

    const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

    useEffect(() => {
        const fetchFavoriteDetails = async () => {
            if (
                currentUser &&
                currentUser.myFavorite &&
                currentUser.myFavorite.length > 0
            ) {
                setIsLoading(true);
                setLoadingRefresh(true)
                try {
                    const promises = currentUser.myFavorite.map((item) =>
                        getMediaDetails(item.id, item.media_type)
                    );

                    const results = await Promise.all(promises);

                    setFavoriteItems(
                        results.filter(
                            (item) => item !== null
                        ) as unknown as MediaItemProps[]
                    );
                } catch (error) {
                    console.error(
                        "Erro ao buscar detalhes dos favoritos:",
                        error
                    );
                    setFavoriteItems([]);
                } finally {
                    setTimeout(() => setLoadingRefresh(false), 500)
                    setIsLoading(false);
                }
            } else {
                setFavoriteItems([]);
                setIsLoading(false);
            }
        };

        fetchFavoriteDetails();
    }, [refresh]);

    return (
        <div className="bg-slate-950 min-h-screen flex flex-col mb-10">
            <main className="container mx-auto px-10 mt-36 text-slate-100 flex-1">
                <div className="flex items-center justify-between mb-8">
                    <div className="flex items-center gap-4">
                        <h1 className="text-4xl font-bold">Meus Favoritos</h1>

                        <button
                            title="Atualizar lista"
                            onClick={() =>
                                setRefresh((prev) => prev + 1)
                            } 
                            className="text-slate-400 hover:text-sky-500 transition-colors cursor-pointer mr-5 md:mr-0"
                        >
                            <RefreshCw
                                size={24}
                                className={loadingRefresh ? "animate-spin" : ""}
                            />
                        </button>
                    </div>

                    <div className="flex items-center gap-2">
                        <button
                            onClick={() => setViewMode("grid")}
                            className={`p-2 rounded-md cursor-pointer ${
                                viewMode === "grid"
                                    ? "bg-sky-600 text-white"
                                    : "bg-slate-700 text-slate-400 hover:bg-slate-600"
                            }`}
                            aria-label="Visualizar em grelha"
                        >
                            <LayoutGrid size={20} />
                        </button>
                        <button
                            onClick={() => setViewMode("list")}
                            className={`p-2 rounded-md cursor-pointer ${
                                viewMode === "list"
                                    ? "bg-sky-600 text-white"
                                    : "bg-slate-700 text-slate-400 hover:bg-slate-600"
                            }`}
                            aria-label="Visualizar em lista"
                        >
                            <List size={20} />
                        </button>
                    </div>
                </div>

                {isLoading ? (
                    // O Skeleton Loader pode continuar o mesmo por agora
                    <div className="grid grid-cols-2 ...">
                        {/* ... Skeletons ... */}
                    </div>
                ) : favoriteItems.length > 0 ? (
                    <div>
                        {viewMode === "grid" ? (
                            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
                                {favoriteItems.map((item) => (
                                    <MediaCard key={item.id} {...item} media_type={item.title ? "movie" : "tv"}/>
                                ))}
                            </div>
                        ) : (
                            <div className="flex flex-col gap-4">
                                {favoriteItems.map((item) => (
                                    <ListItemCard key={item.id} {...item} />
                                ))}
                            </div>
                        )}
                    </div>
                ) : (
                    <div className="flex flex-col items-center justify-center text-center h-full mt-16">
                        <ListPlus className="h-20 w-20 text-slate-600 mb-4" />
                        <h2 className="text-2xl font-bold text-slate-300">
                            Sua lista está vazia
                        </h2>
                        <p className="text-slate-500 mt-2 max-w-sm">
                            Explore os filmes e séries e clique no coração para
                            adicioná-los aqui!
                        </p>
                        <Link
                            to="/"
                            className="mt-6 bg-sky-600 text-white font-bold py-2 px-6 rounded-lg hover:bg-sky-700 transition-colors"
                        >
                            Explorar
                        </Link>
                    </div>
                )}
            </main>
        </div>
    );
}
