import {
  FormControl,
  FormLabel,
  Input,
  Button,
  Text,
  Box,
  Spinner,
  FormErrorMessage,
  Switch,
  Flex,
} from '@chakra-ui/react';
import Breadcrumbs from 'components/breadcrumb';
import DatePicker from 'components/date-picker';
import { Error } from 'components/error';
import { FormWrapper } from 'components/form-wrapper';
import { NumberInput } from 'components/number-input';
import { SelectInput } from 'components/select-input';
import { AsyncSelect } from 'components/async-select';
import { TextInput } from 'components/text-input';
import AppLayout from 'layout/app-layout';
import { FormikHelpers, useFormik } from 'formik';
import { useRouter } from 'next/router';
import { FunctionComponent, useState } from 'react';
import * as yup from 'yup';
import { AccessOperationEnum, AccessServiceEnum, requireNextAuth, withAuthorization } from '@roq/nextjs';
import { compose } from 'lib/compose';

import { createUserProfiles } from 'apiSdk/user-profiles';
import { userProfilesValidationSchema } from 'validationSchema/user-profiles';
import { UserProfilesInterface } from 'interfaces/user-profiles';

function UserProfilesCreatePage() {
  const router = useRouter();
  const [error, setError] = useState(null);

  const handleSubmit = async (values: UserProfilesInterface, { resetForm }: FormikHelpers<any>) => {
    setError(null);
    try {
      await createUserProfiles(values);
      resetForm();
      router.push('/user-profiles');
    } catch (error) {
      setError(error);
    }
  };

  const formik = useFormik<UserProfilesInterface>({
    initialValues: {
      driver_license_expiration_date: new Date(new Date().toDateString()),
      driver_license_number: '',
    },
    validationSchema: userProfilesValidationSchema,
    onSubmit: handleSubmit,
    enableReinitialize: true,
    validateOnChange: false,
    validateOnBlur: false,
  });

  return (
    <AppLayout
      breadcrumbs={
        <Breadcrumbs
          items={[
            {
              label: 'User Profiles',
              link: '/user-profiles',
            },
            {
              label: 'Create User Profiles',
              isCurrent: true,
            },
          ]}
        />
      }
    >
      <Box rounded="md">
        <Box mb={4}>
          <Text as="h1" fontSize={{ base: '1.5rem', md: '1.875rem' }} fontWeight="bold" color="base.content">
            Create User Profiles
          </Text>
        </Box>
        {error && (
          <Box mb={4}>
            <Error error={error} />
          </Box>
        )}
        <FormWrapper onSubmit={formik.handleSubmit}>
          <FormControl id="driver_license_expiration_date" mb="4">
            <FormLabel fontSize="1rem" fontWeight={600}>
              Driver License Expiration Date
            </FormLabel>
            <DatePicker
              selected={
                formik.values?.driver_license_expiration_date
                  ? new Date(formik.values?.driver_license_expiration_date)
                  : null
              }
              onChange={(value: Date) => formik.setFieldValue('driver_license_expiration_date', value)}
            />
          </FormControl>

          <TextInput
            error={formik.errors.driver_license_number}
            label={'Driver License Number'}
            props={{
              name: 'driver_license_number',
              placeholder: 'Driver License Number',
              value: formik.values?.driver_license_number,
              onChange: formik.handleChange,
            }}
          />

          <Flex justifyContent={'flex-start'}>
            <Button
              isDisabled={formik?.isSubmitting}
              bg="state.info.main"
              color="base.100"
              type="submit"
              display="flex"
              height="2.5rem"
              padding="0rem 1rem"
              justifyContent="center"
              alignItems="center"
              gap="0.5rem"
              mr="4"
              _hover={{
                bg: 'state.info.main',
                color: 'base.100',
              }}
            >
              Submit
            </Button>
            <Button
              bg="neutral.transparent"
              color="neutral.main"
              type="button"
              display="flex"
              height="2.5rem"
              padding="0rem 1rem"
              justifyContent="center"
              alignItems="center"
              gap="0.5rem"
              mr="4"
              onClick={() => router.push('/user-profiles')}
              _hover={{
                bg: 'neutral.transparent',
                color: 'neutral.main',
              }}
            >
              Cancel
            </Button>
          </Flex>
        </FormWrapper>
      </Box>
    </AppLayout>
  );
}

export default compose(
  requireNextAuth({
    redirectTo: '/',
  }),
  withAuthorization({
    service: AccessServiceEnum.PROJECT,
    entity: 'user_profiles',
    operation: AccessOperationEnum.CREATE,
  }),
)(UserProfilesCreatePage);
