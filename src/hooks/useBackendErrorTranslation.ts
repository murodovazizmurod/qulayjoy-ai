import { useTranslation } from 'react-i18next';

/**
 * Maps backend error messages to frontend translation keys
 */
const BACKEND_ERROR_MAP: { [key: string]: string } = {
  'Query parameter is required': 'backend_errors.query_parameter_required',
  'Please provide a search query': 'backend_errors.please_provide_search_query',
  'AI processing failed': 'backend_errors.ai_processing_failed',
  'Failed to process search query': 'backend_errors.failed_to_process_search_query',
  'AI processing failed. Please try again.': 'backend_errors.ai_processing_failed_try_again',
};

/**
 * Hook to translate backend error messages
 */
export const useBackendErrorTranslation = () => {
  const { t } = useTranslation('home');

  const translateBackendError = (errorMessage: string): string => {
    // Check if we have a direct mapping for this error message
    const translationKey = BACKEND_ERROR_MAP[errorMessage];
    if (translationKey) {
      return t(translationKey, { defaultValue: errorMessage });
    }

    // If no direct mapping, try to find a partial match
    for (const [backendError, key] of Object.entries(BACKEND_ERROR_MAP)) {
      if (errorMessage.includes(backendError)) {
        return t(key, { defaultValue: errorMessage });
      }
    }

    // Fallback to original message if no translation found
    return errorMessage;
  };

  return { translateBackendError };
};

export default useBackendErrorTranslation;
