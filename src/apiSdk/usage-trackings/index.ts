import queryString from 'query-string';
import { UsageTrackingInterface, UsageTrackingGetQueryInterface } from 'interfaces/usage-tracking';
import { fetcher } from 'lib/api-fetcher';
import { GetQueryInterface, PaginatedInterface } from '../../interfaces';

export const getUsageTrackings = async (
  query?: UsageTrackingGetQueryInterface,
): Promise<PaginatedInterface<UsageTrackingInterface>> => {
  return fetcher('/api/usage-trackings', {}, query);
};

export const createUsageTracking = async (usageTracking: UsageTrackingInterface) => {
  return fetcher('/api/usage-trackings', { method: 'POST', body: JSON.stringify(usageTracking) });
};

export const updateUsageTrackingById = async (id: string, usageTracking: UsageTrackingInterface) => {
  return fetcher(`/api/usage-trackings/${id}`, { method: 'PUT', body: JSON.stringify(usageTracking) });
};

export const getUsageTrackingById = async (id: string, query?: GetQueryInterface) => {
  return fetcher(`/api/usage-trackings/${id}${query ? `?${queryString.stringify(query)}` : ''}`, {});
};

export const deleteUsageTrackingById = async (id: string) => {
  return fetcher(`/api/usage-trackings/${id}`, { method: 'DELETE' });
};
