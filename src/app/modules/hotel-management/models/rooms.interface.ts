import { Action } from '../../../shared/pipes/get-title-edit-delete-component.pipe';

export interface RoomsResponse {
  statuscode: number;
  message: string;
  data: Rooms[];
}

export interface Rooms {
  room_ID: number;
  hotel_ID: number;
  type_ID: number;
  room_Number: string;
  status: string;
  price_Per_Night: number;
  capacity: number;
}

export interface CreateRoomRequest {
  type_ID: number;
  room_Number: string;
  status: string;
}

export interface EditRoomRequest {
  room_ID: number;
  type_ID: number;
  room_Number: string;
  status: string;
}
export interface EditDeleteRoomData {
  action: Action;
  type: Rooms;
}
