import { axios } from '../utility/axios';
import { ENDPOINT_FORM_RESPONSES_SLUG } from '@flow-recruitment/forms/constants';

const deleteAllFormResponses = async () => {
  await axios.delete(ENDPOINT_FORM_RESPONSES_SLUG);
};

export { deleteAllFormResponses };
