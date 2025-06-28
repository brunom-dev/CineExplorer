import { useEffect, useState } from "react";
import type { MediaItemProps } from "../../types/MediaItemProps";
import type { VideoProps } from "../../types/VideoProps";

import {
    getTrendingMovies,
    getPopularSeries,
    getMovieTrailer,
} from "../../services/api";

import { PlayCircleIcon } from "lucide-react";
import { MovieCard } from "../../components/MovieCard";
import { ModalTrailer } from "../../components/ModalTrailer";
import { Spinner } from "../../components/Spinner";

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

    function findBestTrailer(videos: VideoProps[]): VideoProps | null {
        const youtubeTrailers = videos.filter(
            (video) => video.site === "YouTube" && video.type === "Trailer"
        );

        const dubbedTrailer = youtubeTrailers.find(
            (video) =>
                video.official && video.name.toLowerCase().includes("dublado")
        );

        if (dubbedTrailer) return dubbedTrailer;

        const officialPtTrailer = youtubeTrailers.find(
            (video) => video.official && video.iso_639_1 === "pt"
        );

        if (officialPtTrailer) return officialPtTrailer;

        const anyOfficialTrailer = youtubeTrailers.find(
            (video) => video.official
        );

        if (anyOfficialTrailer) return anyOfficialTrailer;
        return youtubeTrailers.length > 0 ? youtubeTrailers[0] : null;
    }

    useEffect(() => {
        if (heroMovie) {
            const fetchTrailer = async () => {
                const videos = await getMovieTrailer(heroMovie.id);
                const bestTrailer = findBestTrailer(videos);
                if (bestTrailer) {
                    setTrailerKey(bestTrailer.key);
                }
            };
            fetchTrailer();
        }
    }, [heroMovie]);

    if (isLoading) {
        return (
            <div className="bg-slate-950 flex items-center justify-center min-h-screen">
                <Spinner />
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
                <h2 className="text-3xl md:text-4xl text-slate-100 font-bold mb-10">
                    Filmes em Alta
                </h2>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
                    {movies.map((movie) => (
                        <MovieCard key={movie.id} {...movie} />
                    ))}
                </div>
            </section>

            <section className="container mx-auto p-6 bg-slate-900">
                <h2 className="text-3xl md:text-4xl text-slate-100 font-bold mb-10 mt-5">
                    Séries Populares
                </h2>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
                    
                    {series.map((series) => (
                        <MovieCard key={series.id} {...series} />
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
