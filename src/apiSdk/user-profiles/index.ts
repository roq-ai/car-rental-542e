import queryString from 'query-string';
import { UserProfilesInterface, UserProfilesGetQueryInterface } from 'interfaces/user-profiles';
import { fetcher } from 'lib/api-fetcher';
import { GetQueryInterface, PaginatedInterface } from '../../interfaces';

export const getUserProfiles = async (
  query?: UserProfilesGetQueryInterface,
): Promise<PaginatedInterface<UserProfilesInterface>> => {
  return fetcher('/api/user-profiles', {}, query);
};

export const createUserProfiles = async (userProfiles: UserProfilesInterface) => {
  return fetcher('/api/user-profiles', { method: 'POST', body: JSON.stringify(userProfiles) });
};

export const updateUserProfilesById = async (id: string, userProfiles: UserProfilesInterface) => {
  return fetcher(`/api/user-profiles/${id}`, { method: 'PUT', body: JSON.stringify(userProfiles) });
};

export const getUserProfilesById = async (id: string, query?: GetQueryInterface) => {
  return fetcher(`/api/user-profiles/${id}${query ? `?${queryString.stringify(query)}` : ''}`, {});
};

export const deleteUserProfilesById = async (id: string) => {
  return fetcher(`/api/user-profiles/${id}`, { method: 'DELETE' });
};
