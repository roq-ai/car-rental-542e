import queryString from 'query-string';
import { VehicleInterface, VehicleGetQueryInterface } from 'interfaces/vehicle';
import { fetcher } from 'lib/api-fetcher';
import { GetQueryInterface, PaginatedInterface } from '../../interfaces';

export const getVehicles = async (query?: VehicleGetQueryInterface): Promise<PaginatedInterface<VehicleInterface>> => {
  return fetcher('/api/vehicles', {}, query);
};

export const createVehicle = async (vehicle: VehicleInterface) => {
  return fetcher('/api/vehicles', { method: 'POST', body: JSON.stringify(vehicle) });
};

export const updateVehicleById = async (id: string, vehicle: VehicleInterface) => {
  return fetcher(`/api/vehicles/${id}`, { method: 'PUT', body: JSON.stringify(vehicle) });
};

export const getVehicleById = async (id: string, query?: GetQueryInterface) => {
  return fetcher(`/api/vehicles/${id}${query ? `?${queryString.stringify(query)}` : ''}`, {});
};

export const deleteVehicleById = async (id: string) => {
  return fetcher(`/api/vehicles/${id}`, { method: 'DELETE' });
};
