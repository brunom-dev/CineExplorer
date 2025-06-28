import axios from "axios";
import type { MediaItemProps } from "../types/MediaItemProps";
import type { VideoProps } from "../types/VideoProps";

const apiKey = import.meta.env.VITE_TMDB_API;

export const api = axios.create({
    baseURL: "https://api.themoviedb.org/3",
    params: {
        api_key: apiKey,
        language: "pt-br",
    },
});

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

export const getMovieTrailer = async (movieId: number): Promise<VideoProps[]> => {
    try {
        const response = await api.get(`/movie/${movieId}/videos`);
        return response.data.results;
    } catch (error) {
        console.error(`Erro ao buscar vídeos para o filme ${movieId}:`, error);
        return [];
    }
};
