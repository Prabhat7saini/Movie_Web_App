import * as yup from 'yup';

export const schema = yup.object().shape({
  searchTerm: yup.string().required('Search term is required'),
});



