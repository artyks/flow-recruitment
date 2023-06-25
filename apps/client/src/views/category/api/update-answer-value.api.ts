import { axios } from '../../../common/utility/axios';
import { ENDPOINT_FORM_RESPONSE_ANSWERS_SLUG } from '@flow-recruitment/forms/constants';
import { UpdateFormResponseAnswerValueDto } from '@flow-recruitment/forms/dtos';
import { UpdateFormResponseAnswerValueResult } from '@flow-recruitment/forms/types';

const updateAnswerValue = async (answerId: string, paylaod: UpdateFormResponseAnswerValueDto) => {
  const endpoint = `${ENDPOINT_FORM_RESPONSE_ANSWERS_SLUG}/${answerId}`;
  const { data } = await axios.patch<UpdateFormResponseAnswerValueResult>(endpoint, paylaod);
  return data;
};

export { updateAnswerValue };
