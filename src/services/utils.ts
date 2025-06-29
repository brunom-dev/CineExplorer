import { api } from "./api";

import type { MediaItemProps } from "../types/MediaItemProps";
import type { MovieDetailsProps } from "../types/MediaDetailsProps";
import type { Credits } from "../types/MediaDetailsProps";
import type { VideoProps } from "../types/VideoProps";

export const getTrendingMovies = async (): Promise<MediaItemProps[]> => {
    try {
        const response = await api.get("/trending/movie/week");

        return response.data.results;
    } catch (error) {
        console.error("Erro ao buscar os filmes em alta: ", error);
        return [];
    }
};

export const getPopularSeries = async (): Promise<MediaItemProps[]> => {
    try {
        const response = await api.get("/tv/popular");

        return response.data.results;
    } catch (error) {
        console.error("Erro ao buscar as medias populares: ", error);
        return [];
    }
};

export const getMovieTrailer = async (
    movieId: number
): Promise<VideoProps[]> => {
    try {
        const response = await api.get(`/movie/${movieId}/videos`);
        return response.data.results;
    } catch (error) {
        console.error(`Erro ao buscar vídeos para o filme ${movieId}:`, error);
        return [];
    }
};

export function findBestTrailer(videos: VideoProps[]): VideoProps | null {
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

    const anyOfficialTrailer = youtubeTrailers.find((video) => video.official);

    if (anyOfficialTrailer) return anyOfficialTrailer;
    return youtubeTrailers.length > 0 ? youtubeTrailers[0] : null;
}

export const getMediaDetails = async (
    mediaId: number
): Promise<MovieDetailsProps | null> => {
    try {
        const response = await api.get(`/movie/${mediaId}`);
        return response.data;
    } catch (error) {
        console.error(`Erro ao busca detalhes da midia ${mediaId}: ${error}`);
        return null;
    }
};

export const getMovieCredits = async (
    movieId: number
): Promise<Credits | null> => {
    try {
        const response = await api.get(`/movie/${movieId}/credits`);
        return response.data;
    } catch (error) {
        console.error(
            `Erro ao buscar os creditos dos filme ${movieId}: ${error}`
        );
        return null;
    }
};

export const getMovieRecommendations = async (
    movieId: number
): Promise<MediaItemProps[]> => {
    try {
        const response = await api.get(`/movie/${movieId}/recommendations`);
        return response.data.results.slice(0, 10);
    } catch (error) {
        console.error(
            `Erro ao buscar recomendações para o filme ${movieId}:`,
            error
        );
        return [];
    }
};
