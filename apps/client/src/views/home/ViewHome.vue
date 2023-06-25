<template>
  <div class="home">
    <div class="uncompleted-forms">
      <button
        v-for="response in uncompletedFormResponses"
        :key="response.id"
        @click="() => routeToForm(response.formId, response.form.type as FormType)"
      >
        {{ `Complete response on form: ${response.form.id}` }}
      </button>
    </div>
    <div class="product-categories">
      <button
        v-for="category in productCategories"
        :key="category.id"
        @click="() => routeToForm(category.formSearchId, FormType.SEARCH)"
      >
        {{ `Go to ${category.name} search form` }}
      </button>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { useRouter } from 'vue-router';
import { ROUTE_CATEGORY_FORM_NAME } from '../../common/router/router.constants';
import { FindMyUncompletedFormResponsesResult } from '@flow-recruitment/forms/types';
import { FindManyProductCategoriesResult } from '@flow-recruitment/product-categories/types';
import { handleError } from '../../common/utility/error-handler.utility';
import { FormType } from '@flow-recruitment/forms/constants';

export default defineComponent({
  setup() {
    const uncompletedFormResponses: FindMyUncompletedFormResponsesResult = [];
    const productCategories: FindManyProductCategoriesResult = [];
    const router = useRouter();

    const routeToForm = async (formId: string, formType: FormType, categoryId?: string) => {
      try {
        /**
         * Lookup for categoryId by formId
         */
        if (!categoryId) {
          const productCategory = productCategories.find((someCategory) => someCategory.formSearchId === formId);
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

    return { routeToForm, uncompletedFormResponses, productCategories, FormType };
  },
});
</script>

<style lang="scss" scoped>
.navigation {
  display: flex;
  height: 80px;
  width: 100%;
  justify-content: center;
  align-items: center;
  column-gap: 40px;

  .navigation__link {
    font-size: 25px;
    font-weight: 300;
    cursor: pointer;
  }

  .navigation__link:hover {
    font-weight: 500;
    text-decoration: underline;
  }
}
</style>
