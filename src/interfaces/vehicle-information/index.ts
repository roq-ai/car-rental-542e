import { VehicleInterface } from 'interfaces/vehicle';
import { GetQueryInterface } from 'interfaces';

export interface VehicleInformationInterface {
  id?: string;
  created_at?: any;
  updated_at?: any;
  maintenance_history?: string;
  vehicle_color?: string;
  model?: string;

  vehicle?: VehicleInterface;
  _count?: {};
}

export interface VehicleInformationGetQueryInterface extends GetQueryInterface {
  id?: string;
  maintenance_history?: string;
  vehicle_color?: string;
  model?: string;
}
