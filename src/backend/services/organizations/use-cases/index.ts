import {prismaClient} from '@/backend/lib/db';
import {returnForbidden, returnNotFound} from '@/backend/common/use-cases/status-data-container';
import {makeGetOrganizationById} from '@/backend/services/organizations/use-cases/get-organization-by-id';
import {makeCreateOrganization} from '@/backend/services/organizations/use-cases/create-organization';

export const getOrganizationById = makeGetOrganizationById(
    prismaClient,
    returnNotFound,
    returnForbidden,
);

export const createOrganization = makeCreateOrganization(
    returnForbidden,
    prismaClient,
);
