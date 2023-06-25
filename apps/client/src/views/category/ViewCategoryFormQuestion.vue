<template>
  <div v-show="canShowQuestion" class="question">
    <h2>{{ question.title }}</h2>

    <base-input-text
      v-if="question.inputType === InputTypeEnum.TEXT"
      :initial-value="findAnswerValue(question.id, InputTypeEnum.TEXT)"
      @update:value="(value) => handleUpdateAnswerValue(value)"
    />

    <base-input-multiple-choice
      v-else-if="question.inputType === InputTypeEnum.MULTIPLE_CHOICE && question.choiceOptions.length"
      :initial-value="findAnswerValue(question.id, InputTypeEnum.MULTIPLE_CHOICE)"
      @update:value="(value) => handleUpdateAnswerValue(value)"
      :options="question.choiceOptions"
    />

    <base-input-single-choice
      v-else-if="question.inputType === InputTypeEnum.SINGLE_CHOICE && question.choiceOptions.length"
      :initial-value="findAnswerValue(question.id, InputTypeEnum.SINGLE_CHOICE)"
      @update:value="(value) => handleUpdateAnswerValue(value)"
      :options="question.choiceOptions"
    />

    <div v-else type="text">!!! PLEASE CHECK FORM CONFIG -- WRONG INPUT TYPE OR NO OPTIONS PROVIDED !!!</div>
  </div>
</template>

<script lang="ts">
import { PropType, computed, defineComponent } from 'vue';
import { FindOneFormResult, FindOrCreateMyFormResponseByFormIdResult } from '@flow-recruitment/forms/types';
import { FormQuestionInputTypeEnum as InputTypeEnum } from '@flow-recruitment/forms/constants';
import { exhaustiveCheck } from '@flow-recruitment/common/utilities';
import BaseInputMultipleChoice from '../../common/components/BaseInputMultipleChoice.vue';
import BaseInputSingleChoice from '../../common/components/BaseInputSingleChoice.vue';
import BaseInputText from '../../common/components/BaseInputText.vue';
import { isEqual, sortBy } from 'lodash';

type Question = FindOneFormResult['questions'][0];
type Answer = FindOrCreateMyFormResponseByFormIdResult['answers'][0];

type FindAnswerValueResult<TInputType extends InputTypeEnum> = TInputType extends InputTypeEnum.MULTIPLE_CHOICE
  ? string[] | undefined
  : string | undefined;

export default defineComponent({
  components: {
    BaseInputMultipleChoice,
    BaseInputSingleChoice,
    BaseInputText,
  },
  props: {
    question: {
      type: Object as PropType<Question>,
      required: true,
    },
    answers: {
      type: Array<Answer>,
      required: true,
    },
  },
  emits: {
    'update:answer': (answerId: string, newValue: string | string[]) => {
      return !!{ answerId, newValue };
    },
  },
  setup(props, { emit }) {
    const answerId = computed(() => {
      const answer = props.answers.find((someAnswer) => someAnswer.questionId === props.question.id);
      if (!answer) {
        return null;
      }
      return answer.id;
    });

    const canShowQuestion = computed(() => {
      const visibilityRules = props.question.visibilityRules;
      if (!visibilityRules.length) {
        return true;
      }
      let canShow = false;
      visibilityRules.forEach((rule) => {
        if (!props.answers) {
          return;
        }
        const parentAnswer = props.answers.find((someAnswer) => someAnswer.questionId === rule.dependOnQuestionId);
        if (!parentAnswer) {
          return;
        }
        if (
          rule.requiredValueString &&
          parentAnswer.valueString &&
          rule.requiredValueString === parentAnswer.valueString
        ) {
          canShow = true;
        }
        if (
          rule.requiredValueArrayString.length &&
          parentAnswer.valueArrayString.length &&
          isEqual(sortBy(rule.requiredValueArrayString), sortBy(parentAnswer.valueArrayString))
        ) {
          canShow = true;
        }
      });
      return canShow;
    });

    const handleUpdateAnswerValue = (newValue: string | string[]) => {
      if (answerId.value === null) {
        return;
      }
      emit('update:answer', answerId.value, newValue);
    };

    const findAnswerValue = <TInputType extends InputTypeEnum>(
      questionId: string,
      formType: TInputType,
    ): FindAnswerValueResult<TInputType> => {
      if (!props.answers) {
        return undefined;
      }
      const answer = props.answers.find((someAnswer) => someAnswer.questionId === questionId);
      if (!answer) {
        return undefined;
      }
      switch (formType) {
        case InputTypeEnum.TEXT:
          return (answer.valueString || undefined) as FindAnswerValueResult<TInputType>;
        case InputTypeEnum.SINGLE_CHOICE:
          return (answer.valueString || undefined) as FindAnswerValueResult<TInputType>;
        case InputTypeEnum.MULTIPLE_CHOICE:
          return (answer.valueArrayString || undefined) as FindAnswerValueResult<TInputType>;
        default:
          return exhaustiveCheck(formType);
      }
    };

    return {
      findAnswerValue,
      handleUpdateAnswerValue,
      InputTypeEnum,
      canShowQuestion,
    };
  },
});
</script>

<style lang="scss" scoped>
.question {
  width: 100%;
  display: flex;
  flex-flow: column;
  align-items: center;
  row-gap: 25px;
}
</style>
