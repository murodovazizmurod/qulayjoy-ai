import * as yup from 'yup';

export const TranslationValidation = yup.object().shape({
  oz: yup.string().required(),
  uz: yup.string().required(),
  ru: yup.string().required()
});
