import { axios } from '../../../common/utility/axios';
import { ENDPOINT_FORMS_SLUG } from '@flow-recruitment/forms/constants';
import { FindOneFormResult } from '@flow-recruitment/forms/types';

const findFormById = async (id: string) => {
  const endpoint = `${ENDPOINT_FORMS_SLUG}/${id}`;
  const { data } = await axios.get<FindOneFormResult>(endpoint);
  return data;
};

export { findFormById };
