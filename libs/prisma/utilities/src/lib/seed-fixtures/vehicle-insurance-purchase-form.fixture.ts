import { FormQuestionInputTypeEnum, FormType } from '@flow-recruitment/forms/constants';
import { FormConfig } from './fixtures.types';

const VehicleInsurancePurchaseConfig: FormConfig = {
  type: FormType.PURCHASE,
  questions: [
    {
      inputType: FormQuestionInputTypeEnum.TEXT,
      title: "It's a VehicleInsurancePurchase Form? :)",
    },
    {
      inputType: FormQuestionInputTypeEnum.TEXT,
      title: "What's your first name?",
    },
    {
      inputType: FormQuestionInputTypeEnum.TEXT,
      title: "What's your last name?",
    },
    {
      inputType: FormQuestionInputTypeEnum.TEXT,
      title: 'Type your address',
    },
    {
      inputType: FormQuestionInputTypeEnum.SINGLE_CHOICE,
      title: '(Try USD) Choose currency',
      choiceOptions: ['PLN', 'USD'],
      anchor: 'currency',
    },
    {
      inputType: FormQuestionInputTypeEnum.SINGLE_CHOICE,
      title: 'Are you sure about USD?',
      choiceOptions: ['PLN', 'USD'],
      visibilityRules: [{ dependOnAnchor: 'currency', requiredValueString: 'USD' }],
    },
    {
      inputType: FormQuestionInputTypeEnum.MULTIPLE_CHOICE,
      title: 'Choose delivery days',
      choiceOptions: ['26.07', '28.07', '29.07'],
    },
  ],
};

export { VehicleInsurancePurchaseConfig };
