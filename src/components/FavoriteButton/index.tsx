// src/components/FavoriteButton.tsx
import { Heart } from "lucide-react";
import { toast } from "sonner";
import { useAuth } from "../../context/AuthContext";
import type { FavoriteItemProps } from "../../types/Media/MediaItemProps";
import { useNavigate } from "react-router-dom";

type FavoriteButtonProps = {
    mediaItem: FavoriteItemProps;
    absoluteProp: boolean;
};

export const FavoriteButton = ({ mediaItem, absoluteProp }: FavoriteButtonProps) => {
    const { currentUser, addFavorite, removeFavorite } = useAuth();
    const navigate = useNavigate()

    const isFavorite =
        currentUser?.myFavorite?.some((item) => item.id === mediaItem.id) ?? false;

    const handleToggleFavorite = async (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();

        if (!currentUser) {
            toast.error(<span className="font-bold text-[16px]">Faça login</span>, {description:"Você precisa estar logado para adicionar favoritos."});
            navigate("/login")
            return;
        }

        try {
            if (isFavorite) {
                await removeFavorite(mediaItem.id);
                toast.success(
                    `${
                        mediaItem.title || mediaItem.name
                    } removido dos favoritos.`
                );
            } else {
                await addFavorite(mediaItem);
                toast.success(
                    `${
                        mediaItem.title || mediaItem.name
                    } adicionado aos favoritos!`
                );
            }
        } catch (error) {
            toast.error("Ocorreu um erro. Tente novamente.");
            console.error(error);
        }
    };


    return (
        <button
            onClick={handleToggleFavorite}
            className={`${ absoluteProp ? "absolute" : ""} top-2 right-2 z-20 p-2 bg-slate-900/60 rounded-full hover:bg-slate-900/80 transition-colors"
            aria-label="Adicionar aos favoritos`}
        >
            <Heart
                className={`${absoluteProp ? "w-7 h-7" : "w-10 h-10 text-red-500 hover:fill-current mt-1"} transition-all hover:text-red-500 cursor-pointer  ${
                    isFavorite ? "text-red-500 fill-current" : ""
                } ${!isFavorite && absoluteProp ? "text-white" :"text-red-500" }`}
            />
        </button>
    );
};
