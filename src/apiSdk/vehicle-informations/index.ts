import queryString from 'query-string';
import { VehicleInformationInterface, VehicleInformationGetQueryInterface } from 'interfaces/vehicle-information';
import { fetcher } from 'lib/api-fetcher';
import { GetQueryInterface, PaginatedInterface } from '../../interfaces';

export const getVehicleInformations = async (
  query?: VehicleInformationGetQueryInterface,
): Promise<PaginatedInterface<VehicleInformationInterface>> => {
  return fetcher('/api/vehicle-informations', {}, query);
};

export const createVehicleInformation = async (vehicleInformation: VehicleInformationInterface) => {
  return fetcher('/api/vehicle-informations', { method: 'POST', body: JSON.stringify(vehicleInformation) });
};

export const updateVehicleInformationById = async (id: string, vehicleInformation: VehicleInformationInterface) => {
  return fetcher(`/api/vehicle-informations/${id}`, { method: 'PUT', body: JSON.stringify(vehicleInformation) });
};

export const getVehicleInformationById = async (id: string, query?: GetQueryInterface) => {
  return fetcher(`/api/vehicle-informations/${id}${query ? `?${queryString.stringify(query)}` : ''}`, {});
};

export const deleteVehicleInformationById = async (id: string) => {
  return fetcher(`/api/vehicle-informations/${id}`, { method: 'DELETE' });
};
