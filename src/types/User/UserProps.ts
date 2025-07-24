
export type UserProps = {
    uid: string;
    name: string;
    email: string;
    createAt: Date;
    myFavoriteList: [
        {
            id: number,
            media_type: 'movie' | 'tv'
            addAt: Date;
        }
    ]
} 

export type CreateUserProps = {
    name?: string;
    email: string;
    password: string;
}