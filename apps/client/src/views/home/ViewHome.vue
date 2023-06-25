<template>
  <div class="home-container">
    <h1>Home view</h1>

    <div class="box">
      <h2>Uncompleted forms</h2>

      <div class="button-group">
        <button
          v-for="response in uncompletedFormResponses"
          :key="response.id"
          @click="() => routeToForm(response.formId, response.form.type as FormType)"
        >
          {{ `Complete response on form: ${response.form.id}` }}
        </button>
      </div>
    </div>

    <div class="box">
      <h2>Product categories</h2>

      <div class="button-group">
        <button
          v-for="category in productCategories"
          :key="category.id"
          @click="() => routeToForm(category.formSearchId, FormType.SEARCH)"
        >
          {{ `Go to ${category.name} search form` }}
        </button>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, reactive, toRefs } from 'vue';
import { useRouter } from 'vue-router';
import { ROUTE_CATEGORY_FORM_NAME } from '../../common/router/router.constants';
import { FindMyUncompletedFormResponsesResult } from '@flow-recruitment/forms/types';
import { FindManyProductCategoriesResult } from '@flow-recruitment/product-categories/types';
import { handleError } from '../../common/utility/error-handler.utility';
import { FormType } from '@flow-recruitment/forms/constants';
import { findMyUncompletedFormResponses } from './api/find-my-uncompleted-form-responses.api';
import { findAllProductCategories } from './api/find-all-product-categories.api';

type State = {
  uncompletedFormResponses: FindMyUncompletedFormResponsesResult;
  productCategories: FindManyProductCategoriesResult;
};

export default defineComponent({
  setup() {
    const state = reactive<State>({
      uncompletedFormResponses: [],
      productCategories: [],
    });

    const router = useRouter();

    onMounted(() => {
      initData();
    });

    const initData = async () => {
      const uncompletedFormResponsesPromise = findMyUncompletedFormResponses();
      const productCategoriesPromise = findAllProductCategories();
      const [uncompletedFormResponses, productCategories] = await Promise.all([
        uncompletedFormResponsesPromise,
        productCategoriesPromise,
      ]);
      state.uncompletedFormResponses = uncompletedFormResponses;
      state.productCategories = productCategories;
    };

    const routeToForm = async (formId: string, formType: FormType, categoryId?: string) => {
      try {
        /**
         * Lookup for categoryId by formId
         */
        if (!categoryId) {
          const productCategory = state.productCategories.find((someCategory) => someCategory.formSearchId === formId);
          if (!productCategory) {
            throw new Error("Category doesn't exist");
          }
          categoryId = productCategory.id;
        }

        await router.push({
          name: ROUTE_CATEGORY_FORM_NAME,
          params: { categoryId, formId, formType },
        });
      } catch (error) {
        handleError(error);
      }
    };

    return {
      routeToForm,
      ...toRefs(state),
      FormType,
    };
  },
});
</script>

<style lang="scss" scoped>
.home-container {
  display: flex;
  width: 100%;
  flex-flow: column;
  row-gap: 50px;

  .box {
    width: 100%;
    display: flex;
    align-items: center;
    flex-flow: column;
    row-gap: 30px;

    .button-group {
      width: 100%;
      display: flex;
      justify-content: center;
      column-gap: 50px;
    }
  }
}
</style>
