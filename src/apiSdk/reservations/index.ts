import queryString from 'query-string';
import { ReservationsInterface, ReservationsGetQueryInterface } from 'interfaces/reservations';
import { fetcher } from 'lib/api-fetcher';
import { GetQueryInterface, PaginatedInterface } from '../../interfaces';

export const getReservations = async (
  query?: ReservationsGetQueryInterface,
): Promise<PaginatedInterface<ReservationsInterface>> => {
  return fetcher('/api/reservations', {}, query);
};

export const createReservations = async (reservations: ReservationsInterface) => {
  return fetcher('/api/reservations', { method: 'POST', body: JSON.stringify(reservations) });
};

export const updateReservationsById = async (id: string, reservations: ReservationsInterface) => {
  return fetcher(`/api/reservations/${id}`, { method: 'PUT', body: JSON.stringify(reservations) });
};

export const getReservationsById = async (id: string, query?: GetQueryInterface) => {
  return fetcher(`/api/reservations/${id}${query ? `?${queryString.stringify(query)}` : ''}`, {});
};

export const deleteReservationsById = async (id: string) => {
  return fetcher(`/api/reservations/${id}`, { method: 'DELETE' });
};
