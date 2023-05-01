import {ReturnForbiddenFunction} from './types/return-forbidden';

/**
 * Helper function for returning HTTP 403 Forbidden errors.
 * @return {StatusDataContainer}returns status data container with 403 Forbidden status
 */
export const makeReturnForbidden = (): ReturnForbiddenFunction => {
  return function() {
    return {
      status: 403,
      data: undefined,
    };
  };
};
