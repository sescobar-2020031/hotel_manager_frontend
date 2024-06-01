export interface CreateReservation {
    Client_ID: number
    Employee_ID: number
    Hotel_ID: number
    Check_Out_Date: Date
    Check_In_Date: Date
    Room_ID: number
}

export interface ConfirmReservation {
    Reservation_ID: number
}


export interface Reservation {
    Reservation_ID: number
}