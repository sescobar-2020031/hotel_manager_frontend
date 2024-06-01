export interface UserLogged {
    statusCode: number
    message: string
    token: string
    dataUser: DataUser
}

export interface DataUser {
    user_id: number
    username: string
    password: any
    role: string
    email: string
}


export interface ResponseDefault {
    statusCode: number;
    message: string;
}