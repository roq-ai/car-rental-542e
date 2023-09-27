import * as yup from 'yup';

export const performanceAssessmentValidationSchema = yup.object().shape({
  assessment_date: yup.date().required(),
  usage_frequency: yup.number().integer().required(),
  average_duration: yup.number().integer().required(),
  average_distance: yup.number().integer().required(),
  total_revenue: yup.number().nullable(),
  peak_usage_time: yup.date().nullable(),
  vehicle_id: yup.string().nullable().required(),
});
