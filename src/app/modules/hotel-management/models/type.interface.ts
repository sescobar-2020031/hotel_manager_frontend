import { Action } from '../../../shared/pipes/get-title-edit-delete-component.pipe';

export interface TypesResponse {
  statusCode: number;
  message: string;
  data: Types[];
}

export interface Types {
  type_ID: number;
  description: string;
  capacity: number;
  price_Per_Night: number;
}

export interface CreateTypeRequest {
  description: string;
  capacity: number;
  Price_Per_Night: number;
}

export interface EditDeleteTypeData {
  action: Action;
  type: Types;
}

export interface EditTypeRequest {
  type_ID: number;
  description: string;
  capacity: number;
  Price_Per_Night: number;
}
