// src/components/ListItemCard.tsx

import { Link } from "react-router-dom";
import type { MediaItemProps } from "../../types/Media/MediaItemProps";
import { FavoriteButton } from "../FavoriteButton";

export const ListItemCard = (item: MediaItemProps) => {
    const releaseDate =
        "release_date" in item ? item.release_date : item.first_air_date;
    const year = releaseDate ? new Date(releaseDate).getFullYear() : "N/A";
    const displayName = item.title || item.name;

    return (
        <Link to={`/${item.media_type}/${item.id}`}>
        <div className="flex bg-slate-800 rounded-lg overflow-hidden shadow-lg hover:bg-slate-700 transition-colors group">
            {/* Coluna da Imagem */}
            <div className="w-24 hidden md:flex flex-shrink-0">
                <img
                    src={
                        item.poster_path
                            ? `https://image.tmdb.org/t/p/w200${item.poster_path}`
                            : "https://via.placeholder.com/100x150?text=Capa"
                    }
                    alt={`Póster de ${displayName}`}
                    className="w-full h-full object-cover"
                    loading="lazy"
                />
            </div>

            <div className="p-4 flex flex-col flex-1 relative">
                <div className="flex items-start justify-between">
                    <div>
                        <Link to={`/${item.media_type}/${item.id}`}>
                            <h3 className="text-xl font-bold text-slate-100 group-hover:text-sky-400">
                                {displayName}
                            </h3>
                        </Link>
                        <p className="text-sm text-slate-400">
                            {year} •{" "}
                            {item.media_type === "movie" ? "Filme" : "Série"}
                        </p>
                    </div>
                    <div className="absolute top-1 right-0">
                        <FavoriteButton mediaItem={item} absoluteProp={true} />
                    </div>
                </div>

                <p className="md:flex hidden text-sm text-slate-300 mt-2 flex-1">
                    {item.overview.substring(0, 200)}...
                </p>

                <p className="md:hidden flex text-sm text-slate-300 mt-2 flex-1">
                    {item.overview.substring(0, 80)}...
                </p>
            </div>
        </div>
        </Link>
    );
};
