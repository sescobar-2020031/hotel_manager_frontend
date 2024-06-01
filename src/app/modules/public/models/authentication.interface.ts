export interface AuthenticationRequest {
    email: string
    password: string
}

export interface RegisterRequest {
    username: string
    password: string
    role: string
    name: string
    identity_document: string
    phone: string
    email: string
    address: string
    hotel_id?: number
}