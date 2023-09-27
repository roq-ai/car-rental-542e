import queryString from 'query-string';
import { OrganizationInterface, OrganizationGetQueryInterface } from 'interfaces/organization';
import { fetcher } from 'lib/api-fetcher';
import { GetQueryInterface, PaginatedInterface } from '../../interfaces';

export const getOrganizations = async (
  query?: OrganizationGetQueryInterface,
): Promise<PaginatedInterface<OrganizationInterface>> => {
  return fetcher('/api/organizations', {}, query);
};

export const createOrganization = async (organization: OrganizationInterface) => {
  return fetcher('/api/organizations', { method: 'POST', body: JSON.stringify(organization) });
};

export const updateOrganizationById = async (id: string, organization: OrganizationInterface) => {
  return fetcher(`/api/organizations/${id}`, { method: 'PUT', body: JSON.stringify(organization) });
};

export const getOrganizationById = async (id: string, query?: GetQueryInterface) => {
  return fetcher(`/api/organizations/${id}${query ? `?${queryString.stringify(query)}` : ''}`, {});
};

export const deleteOrganizationById = async (id: string) => {
  return fetcher(`/api/organizations/${id}`, { method: 'DELETE' });
};
