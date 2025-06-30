export type Genre = {
    id: number;
    name: string;
};

export type CastMember = {
    id: number;
    name: string;
    character: string;
    profile_path: string | null;
};

export type Credits = {
    id: number;
    cast: CastMember[];
};

export type MediaDetailsProps = {
    id: number;
    title?: string;
    name?: string;
    overview: string;
    poster_path: string;
    backdrop_path: string;
    release_date: string;
    runtime: number;
    genres: Genre[];
    vote_average: number;
    tagline: string;
};