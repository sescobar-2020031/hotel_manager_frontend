export interface UserListResponse {
    statusCode: number
    message: string
    users: User[]
}

export interface User {
    person_ID: number
    user_ID: number
    name: string
    phone: string
    email: string
    identity_Document: string
    address: string
    role: string
    hotel_Name: any
}

export interface CreateUserRequest {
    username: string
    password: string
    role: string
    name: string
    identity_document: string
    phone: string
    email: string
    address: string
    hotel_id: string
}
