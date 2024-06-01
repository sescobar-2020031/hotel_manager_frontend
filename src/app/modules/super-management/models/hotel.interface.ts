import { Action } from "../../../shared/pipes/get-title-edit-delete-component.pipe"

export interface HotelListResponse {
    statusCode: number
    message: string
    hotels: Hotel[]
}

export interface Hotel {
    hotel_ID: number
    name: string
    address: string
    phone: string
    email: string
}

export interface CreateHotelRequest {
    name: string
    address: string
    phone: string
    email: string
}

export interface EditDeleteHotelData {
    action: Action;
    hotel: Hotel;
}

export interface EditHotelRequest {
    hotel_ID: number
    name: string
    address: string
    phone: string
    email: string
}

export interface HotelWithExtras extends Hotel {
    image: string;
    score: number;
}