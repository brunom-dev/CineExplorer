import axios from 'axios';
import type { MediaItem } from '../types/MediaItem';

const apiKey = import.meta.env.VITE_TMDB_API;


export const api = axios.create({
    baseURL: 'https://api.themoviedb.org/3',
    params: {
        api_key: apiKey,
        language: 'pt-br'
    }
})


export const getTrendingMovies = async ():Promise<MediaItem[]> => {
    try {
        const response = await api.get('/trending/movie/week');

        return response.data.results;
    }

    catch (error) {
        console.error("Erro ao buscar os filmes em alta: ", error);
        return [];
    }
}


export const getPopularSeries = async ():Promise<MediaItem[]> => {
    try {
        const response = await api.get('/tv/popular');

        return response.data.results;
    }   

    catch (error) {
        console.error("Erro ao buscar as medias populares: ", error);
        return [];
    }
}
