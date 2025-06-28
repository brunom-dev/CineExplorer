export type MediaItemProps = {
    id: number;
    adult: boolean;
    backdrop_path: string;
    poster_path: string;
    title?: string; // (para filmes)
    name?: string; // (para séries)
    overview: string;
    vote_average: number;
    release_date?: string; // (para filmes)
    first_air_date?: string; // (para séries)
};
