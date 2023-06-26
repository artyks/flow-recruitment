<template>
  <div v-if="form && answers" class="form-container">
    <h1>{{ `Form ${form.id}` }}</h1>

    <div class="questions-container">
      <view-category-form-question
        v-for="question in form.questions"
        :key="question.id"
        :question="question"
        :answers="answers"
        @update:answer="handleUpdateAnswerValue"
      />
    </div>

    <button @click="handleComplete" class="complete-button">Complete form</button>
  </div>

  <div v-else class="loading-message">Loading form... please wait :)</div>
</template>

<script lang="ts">
import { defineComponent, onMounted, reactive, toRefs } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { findFormById } from './api/find-form-by-id.api';
import { findOrCreateMyFormResponse } from './api/find-or-create-my-form-response.api';
import { ROUTE_CATEGORY_LIST_NAME } from '../../common/router/router.constants';
import { FindOneFormResult, FindOrCreateMyFormResponseByFormIdResult } from '@flow-recruitment/forms/types';
import { FormQuestionInputTypeEnum as InputTypeEnum } from '@flow-recruitment/forms/constants';
import { handleError } from '../../common/utility/error-handler.utility';
import ViewCategoryFormQuestion from './ViewCategoryFormQuestion.vue';
import { updateAnswerValue } from './api/update-answer-value.api';
import { UpdateFormResponseAnswerValueDto } from '@flow-recruitment/forms/dtos';

type State = {
  form: FindOneFormResult | null;
  answers: Answer[] | null;
  isCompleted: boolean;
};

type Answer = FindOrCreateMyFormResponseByFormIdResult['answers'][0];

export default defineComponent({
  components: {
    ViewCategoryFormQuestion,
  },
  setup() {
    const state = reactive<State>({
      form: null,
      answers: null,
      isCompleted: false,
    });

    const router = useRouter();
    const route = useRoute();

    onMounted(() => {
      initData();
    });

    const initData = async () => {
      try {
        if (typeof route.params.formId !== 'string') {
          throw new Error('Check route.params.formId');
        }
        const formPromise = findFormById(route.params.formId);
        const formResponsePromise = findOrCreateMyFormResponse(route.params.formId);
        const [form, formResponse] = await Promise.all([formPromise, formResponsePromise]);
        state.form = form;
        state.answers = formResponse.answers;
        state.isCompleted = formResponse.isCompleted;
      } catch (error) {
        handleError(error);
      }
    };

    const handleComplete = async () => {
      try {
        // TODO: validate form (on server as well)
        await router.push({ name: ROUTE_CATEGORY_LIST_NAME, params: { categoryId: route.params.categoryId } });
      } catch (error) {
        handleError(error);
      }
    };

    const handleUpdateAnswerValue = async (answerId: string, newValue: string | string[]) => {
      if (!state.answers) {
        return;
      }

      const isArray = Array.isArray(newValue);

      const updatedAnswers = state.answers.map((someAnswer) => {
        if (someAnswer.id !== answerId) {
          return someAnswer;
        }
        if (isArray) {
          return {
            ...someAnswer,
            valueArrayString: newValue,
          };
        } else {
          return {
            ...someAnswer,
            valueString: newValue,
          };
        }
      });

      state.answers = updatedAnswers;

      let newValueArrayString, newValueString;
      if (isArray) {
        newValueArrayString = newValue;
      } else {
        newValueString = newValue;
      }

      await tryUpdateAnswerValue(answerId, { newValueArrayString, newValueString });
    };

    const tryUpdateAnswerValue = async (answerId: string, paylaod: UpdateFormResponseAnswerValueDto) => {
      try {
        await updateAnswerValue(answerId, paylaod);
      } catch (error) {
        handleError(error);
      }
    };

    return {
      ...toRefs(state),
      handleUpdateAnswerValue,
      handleComplete,
      InputTypeEnum,
    };
  },
});
</script>

<style lang="scss" scoped>
.form-container {
  width: 100%;
  margin-bottom: 100px;
  display: flex;
  flex-flow: column;
  align-items: center;
  row-gap: 50px;

  .questions-container {
    width: 100%;
    display: flex;
    flex-flow: column;
    row-gap: 60px;

    .question {
      width: 100%;
      display: flex;
      flex-flow: column;
      align-items: center;
      row-gap: 25px;
    }
  }

  .complete-button {
    margin-top: 30px;
  }
}
.loading-message {
  width: 100%;
  height: calc(100vh - 80px);
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 40px;
  font-weight: 500;
}
</style>
