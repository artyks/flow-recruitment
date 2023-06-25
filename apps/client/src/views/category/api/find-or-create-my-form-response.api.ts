import { FindOrCreateMyFormResponseByFormIdResult } from '@flow-recruitment/forms/types';
import { axios } from '../../../common/utility/axios';
import { ENDPOINT_FORM_RESPONSES_SLUG, FIND_OR_CREATE_MY_FORM_RESPONSE_SLUG } from '@flow-recruitment/forms/constants';
import { FindOrCreateMyFormResponseByFormIdDto } from '@flow-recruitment/forms/dtos';

const findOrCreateMyFormResponse = async (formId: string) => {
  const endpoint = `${ENDPOINT_FORM_RESPONSES_SLUG}/${FIND_OR_CREATE_MY_FORM_RESPONSE_SLUG}`;
  const paylaod: FindOrCreateMyFormResponseByFormIdDto = {
    formId,
  };
  const { data } = await axios.post<FindOrCreateMyFormResponseByFormIdResult>(endpoint, paylaod);
  return data;
};

export { findOrCreateMyFormResponse };
