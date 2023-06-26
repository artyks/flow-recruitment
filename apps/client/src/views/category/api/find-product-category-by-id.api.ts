import { axios } from '../../../common/utility/axios';
import { ENDPOINT_PRODUCT_CATEGORIES_SLUG } from '@flow-recruitment/product-categories/constants';
import { FindOneProductCategoryResult } from '@flow-recruitment/product-categories/types';

const findProductCategoryById = async (id: string) => {
  const endpoint = `${ENDPOINT_PRODUCT_CATEGORIES_SLUG}/${id}`;
  const { data } = await axios.get<FindOneProductCategoryResult>(endpoint);
  return data;
};

export { findProductCategoryById };
