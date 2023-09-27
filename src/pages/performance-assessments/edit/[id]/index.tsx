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
  Center,
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
import { FunctionComponent, useState, useRef } from 'react';
import * as yup from 'yup';
import useSWR from 'swr';
import { AccessOperationEnum, AccessServiceEnum, requireNextAuth, withAuthorization } from '@roq/nextjs';
import { compose } from 'lib/compose';
import { ImagePicker } from 'components/image-file-picker';
import { getPerformanceAssessmentById, updatePerformanceAssessmentById } from 'apiSdk/performance-assessments';
import { performanceAssessmentValidationSchema } from 'validationSchema/performance-assessments';
import { PerformanceAssessmentInterface } from 'interfaces/performance-assessment';
import { VehicleInterface } from 'interfaces/vehicle';
import { getVehicles } from 'apiSdk/vehicles';

function PerformanceAssessmentEditPage() {
  const router = useRouter();
  const id = router.query.id as string;

  const { data, error, isLoading, mutate } = useSWR<PerformanceAssessmentInterface>(
    () => (id ? `/performance-assessments/${id}` : null),
    () => getPerformanceAssessmentById(id),
  );
  const [formError, setFormError] = useState(null);

  const handleSubmit = async (values: PerformanceAssessmentInterface, { resetForm }: FormikHelpers<any>) => {
    setFormError(null);
    try {
      const updated = await updatePerformanceAssessmentById(id, values);
      mutate(updated);
      resetForm();
      router.push('/performance-assessments');
    } catch (error: any) {
      if (error?.response.status === 403) {
        setFormError({ message: "You don't have permisisons to update this resource" });
      } else {
        setFormError(error);
      }
    }
  };

  const formik = useFormik<PerformanceAssessmentInterface>({
    initialValues: data,
    validationSchema: performanceAssessmentValidationSchema,
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
              label: 'Performance Assessments',
              link: '/performance-assessments',
            },
            {
              label: 'Update Performance Assessment',
              isCurrent: true,
            },
          ]}
        />
      }
    >
      <Box rounded="md">
        <Box mb={4}>
          <Text as="h1" fontSize={{ base: '1.5rem', md: '1.875rem' }} fontWeight="bold" color="base.content">
            Update Performance Assessment
          </Text>
        </Box>
        {(error || formError) && (
          <Box mb={4}>
            <Error error={error || formError} />
          </Box>
        )}

        <FormWrapper onSubmit={formik.handleSubmit}>
          <FormControl id="assessment_date" mb="4">
            <FormLabel fontSize="1rem" fontWeight={600}>
              Assessment Date
            </FormLabel>
            <DatePicker
              selected={formik.values?.assessment_date ? new Date(formik.values?.assessment_date) : null}
              onChange={(value: Date) => formik.setFieldValue('assessment_date', value)}
            />
          </FormControl>

          <NumberInput
            label="Usage Frequency"
            formControlProps={{
              id: 'usage_frequency',
              isInvalid: !!formik.errors?.usage_frequency,
            }}
            name="usage_frequency"
            error={formik.errors?.usage_frequency}
            value={formik.values?.usage_frequency}
            onChange={(valueString, valueNumber) =>
              formik.setFieldValue('usage_frequency', Number.isNaN(valueNumber) ? 0 : valueNumber)
            }
          />

          <NumberInput
            label="Average Duration"
            formControlProps={{
              id: 'average_duration',
              isInvalid: !!formik.errors?.average_duration,
            }}
            name="average_duration"
            error={formik.errors?.average_duration}
            value={formik.values?.average_duration}
            onChange={(valueString, valueNumber) =>
              formik.setFieldValue('average_duration', Number.isNaN(valueNumber) ? 0 : valueNumber)
            }
          />

          <NumberInput
            label="Average Distance"
            formControlProps={{
              id: 'average_distance',
              isInvalid: !!formik.errors?.average_distance,
            }}
            name="average_distance"
            error={formik.errors?.average_distance}
            value={formik.values?.average_distance}
            onChange={(valueString, valueNumber) =>
              formik.setFieldValue('average_distance', Number.isNaN(valueNumber) ? 0 : valueNumber)
            }
          />

          <NumberInput
            label="Total Revenue"
            formControlProps={{
              id: 'total_revenue',
              isInvalid: !!formik.errors?.total_revenue,
            }}
            name="total_revenue"
            error={formik.errors?.total_revenue}
            value={formik.values?.total_revenue}
            onChange={(valueString, valueNumber) =>
              formik.setFieldValue('total_revenue', Number.isNaN(valueNumber) ? 0 : valueNumber)
            }
          />

          <FormControl id="peak_usage_time" mb="4">
            <FormLabel fontSize="1rem" fontWeight={600}>
              Peak Usage Time
            </FormLabel>
            <DatePicker
              selected={formik.values?.peak_usage_time ? new Date(formik.values?.peak_usage_time) : null}
              onChange={(value: Date) => formik.setFieldValue('peak_usage_time', value)}
            />
          </FormControl>
          <AsyncSelect<VehicleInterface>
            formik={formik}
            name={'vehicle_id'}
            label={'Select Vehicle'}
            placeholder={'Select Vehicle'}
            fetcher={getVehicles}
            labelField={'make'}
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
              onClick={() => router.push('/performance-assessments')}
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
    entity: 'performance_assessment',
    operation: AccessOperationEnum.UPDATE,
  }),
)(PerformanceAssessmentEditPage);
