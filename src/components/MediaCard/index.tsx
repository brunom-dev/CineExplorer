import { Link } from "react-router-dom";
import type { MediaItemProps } from "../../types/MediaItemProps";



export const MediaCard = (item: MediaItemProps) => {
    const imageUrl = `https://image.tmdb.org/t/p/w500${item.poster_path}`;
    const displayName = item.title || item.name || "Titulo Indisponível";
    const formattedVote = item.vote_average.toFixed(1);

    return (
        <Link to={`/${item.media_type}/${item.id}`}>
            <div className="relative group rounded-xl overflow-hidden shadow-lg transform hover:scale-105 transition-transform duration-300 ease-in-out cursor-pointer">
                <img
                    src={imageUrl}
                    alt={`Pôster de ${displayName}`}
                    className="w-full h-full object-cover"
                />

                <div className="absolute top-2 right-2 bg-sky-600 text-slate-100 text-sm font-bold px-2 py-1 rounded-full z-10">
                    ⭐ {formattedVote}
                </div>

                <div
                    className="absolute inset-0 bg-black/70 flex items-center justify-center p-4
                            opacity-0 group-hover:opacity-100 transition-opacity duration-300 ease-in-out"
                >
                    <h3 className="text-slate-100 text-center font-bold text-lg">
                        {displayName}
                    </h3>
                </div>
            </div>
        </Link>
    );
};
