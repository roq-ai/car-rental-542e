import { VehicleInterface } from 'interfaces/vehicle';
import { GetQueryInterface } from 'interfaces';

export interface PerformanceAssessmentInterface {
  id?: string;
  assessment_date: any;
  usage_frequency: number;
  average_duration: number;
  average_distance: number;
  vehicle_id: string;
  created_at?: any;
  updated_at?: any;
  total_revenue?: number;
  peak_usage_time?: any;

  vehicle?: VehicleInterface;
  _count?: {};
}

export interface PerformanceAssessmentGetQueryInterface extends GetQueryInterface {
  id?: string;
  vehicle_id?: string;
}
