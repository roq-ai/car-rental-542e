import { PerformanceAssessmentInterface } from 'interfaces/performance-assessment';
import { ReservationInterface } from 'interfaces/reservation';
import { UsageTrackingInterface } from 'interfaces/usage-tracking';
import { VehicleInformationInterface } from 'interfaces/vehicle-information';
import { GetQueryInterface } from 'interfaces';

export interface VehicleInterface {
  id?: string;
  make: string;
  model: string;
  year: number;
  color: string;
  mileage: number;
  created_at?: any;
  updated_at?: any;
  vehicle_condition?: string;
  registration_number: string;
  fuel_type?: string;
  owner_id?: number;
  performance_assessment?: PerformanceAssessmentInterface[];
  reservation?: ReservationInterface[];
  usage_tracking?: UsageTrackingInterface[];
  vehicle_information?: VehicleInformationInterface[];

  _count?: {
    performance_assessment?: number;
    reservation?: number;
    usage_tracking?: number;
    vehicle_information?: number;
  };
}

export interface VehicleGetQueryInterface extends GetQueryInterface {
  id?: string;
  make?: string;
  model?: string;
  color?: string;
  vehicle_condition?: string;
  registration_number?: string;
  fuel_type?: string;
}
