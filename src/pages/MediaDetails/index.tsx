import { useEffect, useState } from "react";
import { useParams, useLocation } from "react-router-dom";

import type { MediaItemProps } from "../../types/MediaItemProps";
import type {
    MediaDetailsProps,
    Genre,
    Credits,
} from "../../types/MediaDetailsProps";

import { MediaCard } from "../../components/MediaCard/index";
import { ModalTrailer } from "../../components/ModalTrailer";
import { Spinner } from "../../components/Spinner";
import { CastCard } from "../../components/CastCard";

import {
    getMediaDetails,
    getMediaTrailer,
    findBestTrailer,
    getMediaCredits,
    getMediaRecommendations,
} from "../../services/utils";

export const MediaDetails = () => {
    const location = useLocation();
    const { id } = useParams();

    const mediaType = location.pathname.startsWith("/movie") ? "movie" : "tv";

    const [details, setDetails] = useState<MediaDetailsProps | null>(null);
    const [credits, setCredits] = useState<Credits | null>(null);
    const [recommendations, setRecommendations] = useState<MediaItemProps[]>(
        []
    );
    const [trailerKey, setTrailerKey] = useState<string | null>(null);

    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [isModalOpen, setIsModalOpen] = useState(false);

    useEffect(() => {
        const fetchDetails = async () => {
            if (id) {
                const movieId = parseInt(id, 10);
                setDetails(null);
                setTrailerKey(null);
                setCredits(null);
                setIsLoading(true);

                const [
                    detailsResponse,
                    videosResponse,
                    creditsResponse,
                    recommendationsResponse,
                ] = await Promise.all([
                    getMediaDetails(movieId, mediaType),
                    getMediaTrailer(movieId, mediaType),
                    getMediaCredits(movieId, mediaType),
                    getMediaRecommendations(movieId, mediaType),
                ]);

                setDetails(detailsResponse);
                setCredits(creditsResponse);
                setRecommendations(recommendationsResponse);

                const bestTrailer = findBestTrailer(videosResponse, mediaType);
                if (bestTrailer) {
                    setTrailerKey(bestTrailer.key);
                }

                setIsLoading(false);
            }
        };

        fetchDetails();
    }, [id, mediaType]);

    if (!details) {
        return (
            <div className="min-h-screen flex justify-center items-center text-white text-3xl">
                {isLoading ? <Spinner /> : "Filme ou Serie não encontrado."}
            </div>
        );
    }

    const backdropUrl = `https://image.tmdb.org/t/p/original${details.backdrop_path}`;
    const posterUrl = `https://image.tmdb.org/t/p/w500${details.poster_path}`;

    const releaseDate =
        "release_date" in details
            ? details.release_date
            : details.first_air_date;
    console.log(details);

    const year = releaseDate ? new Date(releaseDate).getFullYear() : "N/A";

    const formattedRuntime =
        "runtime" in details && details.runtime > 0
            ? `${Math.floor(details.runtime / 60)}h ${details.runtime % 60}m`
            : null;

    return (
        <div className="min-h-[90vh] text-white">
            <section className="relative w-full pt-20">
                <div
                    className="absolute inset-0 bg-cover bg-center opacity-40"
                    style={{ backgroundImage: `url(${backdropUrl})` }}
                ></div>

                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/80 to-slate-950/50"></div>

                <div className="container mx-auto px-10 py-24 relative z-10 flex flex-col md:flex-row items-center gap-10">
                    <figure className="w-full md:w-1/4 flex-shrink-0">
                        <img
                            src={posterUrl}
                            alt={`Pôster de ${details.title}`}
                            className="rounded-xl shadow-2xl w-full"
                        />
                    </figure>

                    <div className="w-full md:w-2/3 text-center md:text-left text-slate-100">
                        <h1 className="text-4xl lg:text-5xl font-bold">
                            {mediaType === "movie"
                                ? details.title
                                : details.name}{" "}
                            ({year})
                        </h1>

                        {details.tagline && (
                            <p className="text-slate-300 italic mt-2 text-lg">
                                "{details.tagline}"
                            </p>
                        )}

                        <div className="flex items-center justify-center md:justify-start flex-wrap gap-x-4 gap-y-2 mt-4 text-sm text-slate-300">

                            {"runtime" in details && details.runtime > 0 && (
                                <>
                                    <span>{formattedRuntime}</span>
                                </>
                            )}

                            {"number_of_seasons" in details && (
                                <>
                                    <span>
                                        {details.number_of_seasons} Temporada(s)
                                    </span>
                                </>
                            )}

                            {details.genres.length > 0 && <span>•</span>}
                            <div className="flex gap-2 flex-wrap justify-center">
                                {details.genres.map((genre: Genre) => (
                                    <span
                                        key={genre.id}
                                        className="bg-slate-700 px-3 py-1 rounded-full"
                                    >
                                        {genre.name}
                                    </span>
                                ))}
                            </div>
                        </div>
                        <div className="mt-6">
                            <h3 className="text-xl font-bold text-sky-500">
                                Sinopse
                            </h3>
                            <p className="text-slate-200 mt-2">
                                {details.overview}
                            </p>
                        </div>

                        <div className="mt-8">
                            <button
                                className="bg-sky-600 hover:bg-sky-700 text-white font-bold py-3 px-8 rounded-lg transition-colors text-lg disabled:bg-slate-700 disabled:cursor-not-allowed cursor-pointer"
                                onClick={() => setIsModalOpen(true)}
                                disabled={!trailerKey}
                            >
                                ▶{" "}
                                {trailerKey
                                    ? "Assistir Trailer"
                                    : "Trailer Indisponível"}
                            </button>
                        </div>
                    </div>
                </div>
            </section>

            {credits && credits.cast.length > 0 && (
                <section className="mt-5 mb-10 px-10">
                    <h2 className="text-2xl md:text-3xl text-slate-100 font-bold mb-3">
                        Elenco Principal
                    </h2>

                    <div className="flex overflow-x-auto gap-4 py-4">
                        {credits.cast.slice(0, 15).map((member) => (
                            <CastCard key={member.id} member={member} />
                        ))}
                    </div>
                </section>
            )}

            {recommendations && recommendations.length > 0 && (
                <section className="mt-16 px-10">
                    <h2 className="text-2xl md:text-3xl text-slate-100 font-bold mb-6">
                        Você também pode gostar
                    </h2>

                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6 mb-16">
                        {recommendations.map((movie) => (
                            <MediaCard
                                key={movie.id}
                                {...movie}
                                media_type={mediaType}
                            />
                        ))}
                    </div>
                </section>
            )}

            <ModalTrailer
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                videoKey={trailerKey}
            />
        </div>
    );
};
