export interface UserModel {
    id: string,
    userName: string,
    email: string,
    password: string,
    name: string,
    bio: string | null,
    location: string,
    website: string | null,
    profileImage: string | null,
    meta: object | null
}

export interface PlanModel {
    id: string,
    name: string,
    description: string,
    prive: number,
    duration_months: number
}

export interface TweetModel {
    id: string,
    content: string,
    likes: number,
    noOfComments: number,
    isReply: boolean,
    TweetId: string | null,
    UserId: string | null
}

export interface LikeModel {
    id: string,
    UserId: string,
    TweetId: string
}
