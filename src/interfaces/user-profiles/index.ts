import { GetQueryInterface } from 'interfaces';

export interface UserProfilesInterface {
  id?: string;
  created_at?: any;
  updated_at?: any;
  driver_license_expiration_date: any;
  driver_license_number: string;

  _count?: {};
}

export interface UserProfilesGetQueryInterface extends GetQueryInterface {
  id?: string;
  driver_license_number?: string;
}
