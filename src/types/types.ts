export interface UserModel {
    id: string,
    name: string,
    email: string,
    password: string,
    planId: string | null,
    plan_start_date: Date | null,
    plan_end_date: Date | null
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
    no_of_comments: number,
    UserId: string | null
}
