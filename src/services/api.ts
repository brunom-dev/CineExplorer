import axios from 'axios';

const apiKey = import.meta.env.VITE_TMDB_API;


const api = axios.create({
    baseURL: 'https://api.themoviedb.org/3',
    params: {
        api_key: apiKey,
        language: 'pt-br'
    }
})


export const getTrendingMovies = async () => {
    try {
        const response = await api.get('/trending/movie/week');

        return response.data.results;
    }

    catch (error) {
        console.error("Erro ao buscar os filmes em alta: ", error);
        return [];
    }
}

export { api }