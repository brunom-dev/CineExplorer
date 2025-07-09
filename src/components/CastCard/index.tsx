import type { CastMember } from "../../types/MediaDetailsProps";
import { UserCircle2 } from "lucide-react";

type CastCardProps = {
    member: CastMember;
};

export const CastCard = ({ member }: CastCardProps) => {
    
    const imageUrl = member.profile_path
        ? `https://image.tmdb.org/t/p/w200${member.profile_path}`
        : null;

    return (
        <div className="w-36 bg-slate-800 rounded-lg overflow-hidden text-center flex-shrink-0">
            <div className="h-44 w-full bg-slate-700 flex items-center justify-center">
                {imageUrl ? (
                    
                    <img
                        src={imageUrl}
                        alt={member.name}
                        className="w-full h-full object-cover"
                        loading="lazy"
                    />
                ) : (
                    <UserCircle2 className="w-16 h-16 text-slate-500" />
                )}
            </div>

            <div className="p-2">
                <p
                    className="font-bold text-slate-100 text-sm truncate"
                    title={member.name}
                >
                    {member.name}
                </p>
                <p
                    className="text-xs text-slate-400 truncate"
                    title={member.character}
                >
                    {member.character}
                </p>
            </div>
        </div>
    );
};
