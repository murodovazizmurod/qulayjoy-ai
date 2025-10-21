import { get } from 'radash';

interface IError {
  code: string;
  message: string;
  validations: string[];
}

const getApiError = (error: any): IError => {
  const data = get(error, 'response.data') || {};

  return {
    code: get(data, 'code') || '',
    message: get(data, 'errorMessage.0') || '',
    validations: (get(data, 'errorMessage') || []) as string[]
  };
};

export default getApiError;
