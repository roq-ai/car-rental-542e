import * as yup from 'yup';

export const organizationValidationSchema = yup.object().shape({
  description: yup.string().nullable(),
  name: yup.string().required(),
  address: yup.string().nullable(),
  contact_email: yup.string().nullable(),
  organization_type: yup.string().nullable(),
  user_id: yup.string().nullable().required(),
});
