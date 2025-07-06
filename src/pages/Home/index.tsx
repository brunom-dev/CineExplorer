import { useEffect, useState } from "react";
import type { MediaItemProps } from "../../types/MediaItemProps";

import {
    getTrendingMovies,
    getPopularSeries,
    getMediaTrailer,
    findBestTrailer,
} from "../../services/utils";

import { PlayCircleIcon } from "lucide-react";
import { MediaCard } from "../../components/MediaCard";
import { ModalTrailer } from "../../components/ModalTrailer";
import { SkeletonCard } from "../../components/SkeletonCard";

export function Home() {
    const [movies, setMovies] = useState<MediaItemProps[]>([]);
    const [series, setSeries] = useState<MediaItemProps[]>([]);

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [trailerKey, setTrailerKey] = useState<string | null>(null);

    useEffect(() => {
        const fetchAllData = async () => {
            try {
                const [moviesResponse, seriesResponse] = await Promise.all([
                    getTrendingMovies(),
                    getPopularSeries(),
                ]);

                setMovies(moviesResponse);
                setSeries(seriesResponse);
            } catch (error) {
                console.error(
                    "Erro ao buscar dados para a página inicial:",
                    error
                );
            } finally {
                setIsLoading(false);
            }
        };

        fetchAllData();
    }, []);

    const heroMovie: MediaItemProps | null =
        movies.length > 0 ? movies[0] : null;

    useEffect(() => {
        if (heroMovie) {
            const fetchTrailer = async () => {
                const videos = await getMediaTrailer(heroMovie.id, "movie");
                const bestTrailer = findBestTrailer(videos, "movie");
                if (bestTrailer) {
                    setTrailerKey(bestTrailer.key);
                }
            };
            fetchTrailer();
        }
    }, [heroMovie]);

    if (isLoading) {
        return (
            <div className="bg-slate-950 min-h-screen">
                <section className="h-[60vh] md:h-[90vh] w-full bg-slate-800 animate-pulse">
                    <div className="container mx-auto px-6 h-full flex flex-col justify-end pb-16 md:pb-24">
                        <div className="h-12 w-3/4 max-w-lg bg-slate-700 rounded-lg mb-4"></div>

                        <div className="h-4 w-full max-w-2xl bg-slate-700 rounded-md mb-2"></div>
                        <div className="h-4 w-5/6 max-w-2xl bg-slate-700 rounded-md"></div>

                        <div className="h-12 w-48 bg-slate-700 rounded-lg mt-6"></div>
                    </div>
                </section>

                <main className="container mx-auto p-6">
                    <div className="h-8 w-72 bg-slate-700 rounded-md animate-pulse mb-8 mt-10"></div>

                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
                        {Array.from({ length: 15 }).map((_, index) => (
                            <SkeletonCard key={index} />
                        ))}
                    </div>
                </main>
            </div>
        );
    }

    return (
        <>
            {heroMovie && (
                <section
                    className="h-[70vh] md:h-[90vh] w-full bg-cover bg-center bg-fixed relative"
                    style={{
                        backgroundImage: `url(https://image.tmdb.org/t/p/original${heroMovie.backdrop_path})`,
                    }}
                >
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/70 to-transparent"></div>

                    <div className="container mx-auto px-6 h-full flex flex-col justify-end pb-16 md:pb-24 relative z-10">
                        <h1 className="text-4xl md:text-6xl font-bold text-slate-100 max-w-3xl">
                            {heroMovie.title || heroMovie.name}
                        </h1>
                        <p className="text-slate-200 mt-4 text-lg max-w-2xl hidden md:block">
                            {heroMovie.overview.substring(0, 200)}...
                        </p>
                        <div className="mt-6">
                            <button
                                className="bg-sky-600 hover:bg-sky-700 text-white font-bold py-3 px-8 rounded-lg transition-colors text-lg disabled:bg-slate-500 flex gap-2 cursor-pointer"
                                onClick={() => setIsModalOpen(true)}
                                disabled={!trailerKey}
                            >
                                <PlayCircleIcon size={30} />{" "}
                                {trailerKey
                                    ? "Assistir Trailer"
                                    : "Trailer Indisponível"}
                            </button>
                        </div>
                    </div>
                </section>
            )}

            <section className="container mx-auto p-6 bg-gradient-to-b from-slate-950 to-slate-900">
                <h2
                    className="text-3xl md:text-4xl text-slate-100 font-bold mb-10"
                    id="movies"
                >
                    Filmes em Alta
                </h2>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
                    {movies.map((movie) => (
                        <MediaCard
                            key={movie.id}
                            {...movie}
                            media_type={"movie"}
                        />
                    ))}
                </div>
            </section>

            <section className="container mx-auto p-6 bg-slate-900 pb-15">
                <h2
                    className="text-3xl md:text-4xl text-slate-100 font-bold mb-10 mt-5"
                    id="series"
                >
                    Séries Populares
                </h2>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
                    {series.map((series) => (
                        <MediaCard
                            key={series.id}
                            {...series}
                            media_type={"tv"}
                        />
                    ))}
                </div>
            </section>

            <ModalTrailer
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                videoKey={trailerKey}
            />
        </>
    );
}
