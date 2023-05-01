import {makeReturnNotFound} from '@/backend/common/use-cases/status-data-container/return-not-found';
import {makeReturnForbidden} from '@/backend/common/use-cases/status-data-container/return-forbidden';
import {
  makeReturnInternalServerError,
} from '@/backend/common/use-cases/status-data-container/return-internal-server-error';

export const returnNotFound = makeReturnNotFound();

export const returnForbidden = makeReturnForbidden();

export const returnInternalServerError =
    makeReturnInternalServerError();
