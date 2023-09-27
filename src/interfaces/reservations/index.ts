import { GetQueryInterface } from 'interfaces';

export interface ReservationsInterface {
  id?: string;
  created_at?: any;
  updated_at?: any;

  _count?: {};
}

export interface ReservationsGetQueryInterface extends GetQueryInterface {
  id?: string;
}
