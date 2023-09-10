import * as yup from 'yup';

export const taskSchema = yup.object().shape({
  name: yup.string().required('Name is required'),
  description: yup.string().required('Description is required'),
  priority: yup.string().required('Priority is required'),
});
