<template>
  <div v-if="form" class="form-container">
    <h1>{{ `Form ${form.id}` }}</h1>

    <div class="questions-container">
      <!-- eslint-disable-next-line vue/no-v-for-template-key -->
      <template v-for="question in form.questions" :key="question.id">
        <div class="question">
          <h2>{{ question.title }}</h2>
          <input
            v-if="question.inputType === FormQuestionInputTypeEnum.TEXT"
            type="text"
            :value="findAnswerValue(question.id)"
          />
          <input
            v-else-if="question.inputType === FormQuestionInputTypeEnum.MULTIPLE_CHOICE"
            type="text"
            :value="findAnswerValue(question.id)"
          />
          <input
            v-else-if="question.inputType === FormQuestionInputTypeEnum.SINGLE_CHOICE"
            type="text"
            :value="findAnswerValue(question.id)"
          />
          <div v-else type="text" :value="findAnswerValue(question.id)">
            !!! PLEASE CHECK FORM CONFIG -- WRONT INPUT TYPE !!!
          </div>
        </div>
      </template>
    </div>
  </div>

  <div v-else class="loading-message">Loading form... please wait :)</div>
</template>

<script lang="ts">
import { defineComponent, onMounted, reactive, toRefs } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { findFormById } from './api/find-form-by-id.api';
import { findOrCreateMyFormResponse } from './api/find-or-create-my-form-response.api';
import { ROUTE_HOME_NAME } from '../../common/router/router.constants';
import { FindOneFormResult, FindOrCreateMyFormResponseByFormIdResult } from '@flow-recruitment/forms/types';
import { FormQuestionInputTypeEnum } from '@flow-recruitment/forms/constants';

type State = {
  form: FindOneFormResult | null;
  formResponse: FindOrCreateMyFormResponseByFormIdResult | null;
};

export default defineComponent({
  setup() {
    const state = reactive<State>({
      form: null,
      formResponse: null,
    });

    const findAnswerValue = (questionId: string) => {
      if (!state.formResponse) {
        return null;
      }
      const answer = state.formResponse.answers.find((someAnswer) => someAnswer.questionId === questionId);
      if (!answer) {
        return null;
      }
      return answer.value;
    };

    const router = useRouter();
    const route = useRoute();

    onMounted(() => {
      initData();
    });

    const initData = async () => {
      if (!('formId' in route.params) || typeof route.params.formId !== 'string') {
        return router.push({ name: ROUTE_HOME_NAME });
      }
      const formPromise = findFormById(route.params.formId);
      const formResponsePromise = findOrCreateMyFormResponse(route.params.formId);
      const [form, formResponse] = await Promise.all([formPromise, formResponsePromise]);
      state.form = form;
      state.formResponse = formResponse;
    };

    return {
      ...toRefs(state),
      findAnswerValue,
      FormQuestionInputTypeEnum,
    };
  },
});
</script>

<style lang="scss" scoped>
.form-container {
  width: 100%;
  display: flex;
  flex-flow: column;
  row-gap: 50px;

  .questions-container {
    width: 100%;
    display: flex;
    flex-flow: column;
    row-gap: 35px;

    .question {
      width: 100%;
      display: flex;
      flex-flow: column;
      align-items: center;
      row-gap: 20px;
    }
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
