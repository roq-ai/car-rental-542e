import * as yup from 'yup';

export const userProfilesValidationSchema = yup.object().shape({
  driver_license_expiration_date: yup.date().required(),
  driver_license_number: yup.string().required(),
});
