import { FormQuestionInputTypeEnum } from '@flow-recruitment/forms/constants';
import { CreateFormQuestionDto } from '@flow-recruitment/forms/dtos';

const CarDealPurchaseConfig: CreateFormQuestionDto[] = [
  { inputType: FormQuestionInputTypeEnum.TEXT, title: 'When would you like your new policy to be in effect?' },
  { inputType: FormQuestionInputTypeEnum.TEXT, title: 'What type of vehicle are you insuring?' },
  { inputType: FormQuestionInputTypeEnum.TEXT, title: 'What is the production year of your vehicle?' },
  { inputType: FormQuestionInputTypeEnum.TEXT, title: 'What is the brand of your vehicle?' },
  { inputType: FormQuestionInputTypeEnum.SINGLE_CHOICE, title: 'What type of fuel does your vehicle use?' },
  { inputType: FormQuestionInputTypeEnum.SINGLE_CHOICE, title: 'What is the engine cap of your vehicle?' },
  { inputType: FormQuestionInputTypeEnum.SINGLE_CHOICE, title: 'How many doors does your vehicle have?' },
  {
    inputType: FormQuestionInputTypeEnum.SINGLE_CHOICE,
    title: 'Where is the steering wheel location in your vehicle?',
  },
  { inputType: FormQuestionInputTypeEnum.SINGLE_CHOICE, title: 'Is your vehicle leased?' },
  { inputType: FormQuestionInputTypeEnum.SINGLE_CHOICE, title: 'How many co-owners does the vehicle have?' },
];

export { CarDealPurchaseConfig };
