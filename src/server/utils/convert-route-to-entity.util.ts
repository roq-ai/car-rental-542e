const mapping: Record<string, string> = {
  organizations: 'organization',
  'performance-assessments': 'performance_assessment',
  reservations: 'reservation',
  reservations: 'reservations',
  'usage-trackings': 'usage_tracking',
  users: 'user',
  'user-profiles': 'user_profiles',
  vehicles: 'vehicle',
  'vehicle-informations': 'vehicle_information',
};

export function convertRouteToEntityUtil(route: string) {
  return mapping[route] || route;
}
