import * as yup from 'yup';

export const vehicleValidationSchema = yup.object().shape({
  make: yup.string().required(),
  model: yup.string().required(),
  year: yup.number().integer().required(),
  color: yup.string().required(),
  mileage: yup.number().integer().required(),
  vehicle_condition: yup.string().nullable(),
  registration_number: yup.string().required(),
  fuel_type: yup.string().nullable(),
  owner_id: yup.number().integer().nullable(),
});
