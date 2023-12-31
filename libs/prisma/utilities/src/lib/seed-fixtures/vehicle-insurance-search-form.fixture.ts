import { FormQuestionInputTypeEnum, FormType } from '@flow-recruitment/forms/constants';
import { FormConfig } from './fixtures.types';
import { YesNoOptions } from './fixtures.utiity';

const VehicleInsuranceSearchConfig: FormConfig = {
  type: FormType.SEARCH,
  questions: [
    {
      inputType: FormQuestionInputTypeEnum.TEXT,
      title: "It's a VehicleInsuranceSearch Form? :)",
    },
    {
      inputType: FormQuestionInputTypeEnum.TEXT,
      title: 'When would you like your new policy to be in effect?',
    },
    { inputType: FormQuestionInputTypeEnum.TEXT, title: 'What type of vehicle are you insuring?' },
    { inputType: FormQuestionInputTypeEnum.TEXT, title: 'What is the production year of your vehicle?' },
    { inputType: FormQuestionInputTypeEnum.TEXT, title: 'What is the brand of your vehicle?' },
    {
      inputType: FormQuestionInputTypeEnum.MULTIPLE_CHOICE,
      title: 'What type of fuel does your vehicle use?',
      choiceOptions: ['Diesel', 'Petrol', 'Electric', 'Hybrid'],
      anchor: 'fuel-type',
    },
    {
      inputType: FormQuestionInputTypeEnum.TEXT,
      title: "[1] Hooray! It's a question with conditonal visibility rule based on Diesel and Petrol :)",
      visibilityRules: [{ dependOnAnchor: 'fuel-type', requiredValueArrayString: ['Diesel', 'Petrol'] }],
    },
    {
      inputType: FormQuestionInputTypeEnum.TEXT,
      title: 'What is the engine cap of your vehicle?',
    },
    {
      inputType: FormQuestionInputTypeEnum.SINGLE_CHOICE,
      title: 'How many doors does your vehicle have?',
      choiceOptions: ['2', '4', '5'],
    },
    {
      inputType: FormQuestionInputTypeEnum.SINGLE_CHOICE,
      title: 'Where is the steering wheel location in your vehicle?',
      choiceOptions: ['Left', 'Right'],
    },
    {
      inputType: FormQuestionInputTypeEnum.SINGLE_CHOICE,
      title: 'Is your vehicle leased?',
      choiceOptions: YesNoOptions,
      anchor: 'is-leased',
    },
    {
      inputType: FormQuestionInputTypeEnum.TEXT,
      title: "[2] Hooray! It's a question with conditonal visibility rule :)",
      visibilityRules: [{ dependOnAnchor: 'is-leased', requiredValueString: 'Yes' }],
    },
    {
      inputType: FormQuestionInputTypeEnum.SINGLE_CHOICE,
      title: 'How many co-owners does the vehicle have?',
      choiceOptions: ['0', '1', '2'],
    },
  ],
};

export { VehicleInsuranceSearchConfig };
