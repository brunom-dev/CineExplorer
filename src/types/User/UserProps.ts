import type { FavoriteItemProps } from "../Media/MediaItemProps";

export type UserProps = {
    uid: string;
    name: string;
    email: string;
    createAt: Date;
    myFavorite: FavoriteItemProps[];
} 

export type CreateUserProps = {
    name?: string;
    email: string;
    password: string;
}