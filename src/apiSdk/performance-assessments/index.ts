import queryString from 'query-string';
import {
  PerformanceAssessmentInterface,
  PerformanceAssessmentGetQueryInterface,
} from 'interfaces/performance-assessment';
import { fetcher } from 'lib/api-fetcher';
import { GetQueryInterface, PaginatedInterface } from '../../interfaces';

export const getPerformanceAssessments = async (
  query?: PerformanceAssessmentGetQueryInterface,
): Promise<PaginatedInterface<PerformanceAssessmentInterface>> => {
  return fetcher('/api/performance-assessments', {}, query);
};

export const createPerformanceAssessment = async (performanceAssessment: PerformanceAssessmentInterface) => {
  return fetcher('/api/performance-assessments', { method: 'POST', body: JSON.stringify(performanceAssessment) });
};

export const updatePerformanceAssessmentById = async (
  id: string,
  performanceAssessment: PerformanceAssessmentInterface,
) => {
  return fetcher(`/api/performance-assessments/${id}`, { method: 'PUT', body: JSON.stringify(performanceAssessment) });
};

export const getPerformanceAssessmentById = async (id: string, query?: GetQueryInterface) => {
  return fetcher(`/api/performance-assessments/${id}${query ? `?${queryString.stringify(query)}` : ''}`, {});
};

export const deletePerformanceAssessmentById = async (id: string) => {
  return fetcher(`/api/performance-assessments/${id}`, { method: 'DELETE' });
};
