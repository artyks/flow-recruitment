import { axios } from '../../../common/utility/axios';
import { FindManyProductCategoriesResult } from '@flow-recruitment/product-categories/types';
import { ENDPOINT_PRODUCT_CATEGORIES_SLUG } from '@flow-recruitment/product-categories/constants';

const findAllProductCategories = async () => {
  const { data } = await axios.get<FindManyProductCategoriesResult>(ENDPOINT_PRODUCT_CATEGORIES_SLUG);
  return data;
};

export { findAllProductCategories };
