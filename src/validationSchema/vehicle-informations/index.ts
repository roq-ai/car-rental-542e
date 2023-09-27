import * as yup from 'yup';

export const vehicleInformationValidationSchema = yup.object().shape({
  maintenance_history: yup.string().nullable(),
  vehicle_color: yup.string().nullable(),
  model: yup.string().nullable(),
});
