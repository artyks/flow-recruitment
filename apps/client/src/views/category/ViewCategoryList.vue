<template>
  <div v-if="productCategory" class="category-container">
    <h1>{{ `List of ${productCategory.name}` }}</h1>

    <div class="offers-container">
      <button v-for="offer in offers" :key="offer" @click="handleOrder">
        Order this offer now and get 40% discount!
      </button>
    </div>
  </div>

  <div v-else class="loading-message">Loading category list... please wait :)</div>
</template>

<script lang="ts">
import { defineComponent, onMounted, reactive, toRefs } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { ROUTE_CATEGORY_FORM_NAME, ROUTE_HOME_NAME } from '../../common/router/router.constants';
import { handleError } from '../../common/utility/error-handler.utility';
import { findProductCategoryById } from './api/find-product-category-by-id.api';
import { FindOneProductCategoryResult } from '@flow-recruitment/product-categories/types';
import { FormType } from '@flow-recruitment/forms/constants';

type State = {
  productCategory: FindOneProductCategoryResult | null;
  offers: number[];
};

export default defineComponent({
  setup() {
    const state = reactive<State>({
      productCategory: null,
      offers: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11],
    });

    const router = useRouter();
    const route = useRoute();

    onMounted(() => {
      initData();
    });

    const initData = async () => {
      try {
        if (!('categoryId' in route.params) || typeof route.params.categoryId !== 'string') {
          return router.push({ name: ROUTE_HOME_NAME });
        }
        state.productCategory = await findProductCategoryById(route.params.categoryId);
      } catch (error) {
        handleError(error);
      }
    };

    const handleOrder = async () => {
      try {
        if (!state.productCategory) {
          return;
        }
        const category = state.productCategory;
        await router.push({
          name: ROUTE_CATEGORY_FORM_NAME,
          params: { categoryId: category.id, formId: category.formPurchaseId, formType: FormType.PURCHASE },
        });
      } catch (error) {
        handleError(error);
      }
    };

    return {
      ...toRefs(state),
      handleOrder,
    };
  },
});
</script>

<style lang="scss" scoped>
.category-container {
  width: 100%;
  margin-bottom: 100px;
  display: flex;
  flex-flow: column;
  align-items: center;
  row-gap: 50px;

  .offers-container {
    width: 100%;
    display: flex;
    flex-flow: column;
    align-items: center;
    row-gap: 60px;
  }
}
.loading-message {
  width: 100vw;
  height: calc(100vh - 80px);
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 40px;
  font-weight: 500;
}
</style>
