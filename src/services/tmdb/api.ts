import axios from "axios";

const apiKey = import.meta.env.VITE_TMDB_API;

export const api = axios.create({
    baseURL: "https://api.themoviedb.org/3",
    params: {
        api_key: apiKey,
        language: "pt-br",
    },
});
