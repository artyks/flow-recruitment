import { FormQuestionInputTypeEnum, FormType } from '@flow-recruitment/forms/constants';
import { FormConfig } from './fixtures.types';

const CarDealSearchConfig: FormConfig = {
  type: FormType.SEARCH,
  questions: [
    {
      inputType: FormQuestionInputTypeEnum.TEXT,
      title: "It's a CarDealSearch Form? :)",
    },
    {
      inputType: FormQuestionInputTypeEnum.TEXT,
      title: 'Which manufacturers are you interested in?',
    },
    {
      inputType: FormQuestionInputTypeEnum.TEXT,
      title: 'Which car model are you interested in?',
    },
    {
      inputType: FormQuestionInputTypeEnum.TEXT,
      title: 'Which production year are you looking for?',
    },
    {
      inputType: FormQuestionInputTypeEnum.TEXT,
      title: 'What is your budget range for purchasing the car?',
    },
    {
      inputType: FormQuestionInputTypeEnum.MULTIPLE_CHOICE,
      title: '(TRY Automatic) Do you prefer a certain type of transmission?',
      choiceOptions: ['Automatic', 'Manual'],
      anchor: 'transmission',
    },
    {
      inputType: FormQuestionInputTypeEnum.TEXT,
      title: 'What type of fuel do you prefer for your car?',
      visibilityRules: [{ dependOnAnchor: 'transmission', requiredValueArrayString: ['Automatic'] }],
    },
    {
      inputType: FormQuestionInputTypeEnum.MULTIPLE_CHOICE,
      title: 'Do you have a preferred color for your car?',
      choiceOptions: ['Black', 'White', 'Red'],
    },
    {
      inputType: FormQuestionInputTypeEnum.SINGLE_CHOICE,
      title: '(TRY 4) How many doors do you prefer your car to have?',
      choiceOptions: ['2', '4', '5'],
      anchor: 'doors',
    },
    {
      inputType: FormQuestionInputTypeEnum.SINGLE_CHOICE,
      title: 'Are you looking for a new car, a used car, or are you open to both?',
      choiceOptions: ['New', 'Used', 'Both'],
      visibilityRules: [{ dependOnAnchor: 'doors', requiredValueString: '4' }],
    },
  ],
};

export { CarDealSearchConfig };
