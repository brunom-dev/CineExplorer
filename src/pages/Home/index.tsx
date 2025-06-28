import { useEffect, useState } from "react";
import { getTrendingMovies } from "../../services/api";
import { MovieCard } from "../../components/MovieCard";
import type { MovieCardProps } from "../../types/MovieCardProps";

export function Home() {
    const [movies, setMovies] = useState<MovieCardProps[]>([]);

    useEffect(() => {
        const fetchMovies = async () => {
            const trendingMovies = await getTrendingMovies();

            setMovies(trendingMovies);

            console.log("Filmes recebidos da API: ", trendingMovies);
        };

        fetchMovies();
    }, []);

    const heroMovie: MovieCardProps | null = movies.length > 0 ? movies[0] : null;


    return (
        <>
            {heroMovie && (
            <section
                className="h-[60vh] md:h-[90vh] w-full bg-cover bg-center bg-fixed relative"
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
                        <button className="bg-sky-600 hover:bg-sky-700 text-white font-bold py-3 px-8 rounded-lg transition-colors text-lg">
                            ▶ Assistir Trailer
                        </button>
                    </div>
                </div>
            </section>
            )}

            <main className="container mx-auto p-6">
                <h2 className="text-2xl text-slate-100 font-bold mb-6">
                    Filmes em Alta
                </h2>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
                    {movies.map((movie) => (
                        <MovieCard key={movie.id} {...movie} />
                    ))}
                </div>
            </main>
        </>
    );
}
