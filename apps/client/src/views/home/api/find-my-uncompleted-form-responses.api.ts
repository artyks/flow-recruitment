import { FindMyUncompletedFormResponsesResult } from '@flow-recruitment/forms/types';
import { axios } from '../../../common/utility/axios';
import {
  ENDPOINT_FORM_RESPONSES_SLUG,
  FIND_MY_UNCOMPLETED_FORM_RESPONSES_SLUG,
} from '@flow-recruitment/forms/constants';

const findMyUncompletedFormResponses = async () => {
  const endpoint = `${ENDPOINT_FORM_RESPONSES_SLUG}/${FIND_MY_UNCOMPLETED_FORM_RESPONSES_SLUG}`;
  const { data } = await axios.get<FindMyUncompletedFormResponsesResult>(endpoint);
  return data;
};

export { findMyUncompletedFormResponses };
