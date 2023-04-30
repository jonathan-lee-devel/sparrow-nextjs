import {PrismaClient} from '@prisma/client';
import {GetOrganizationFunction} from '@/backend/services/organizations/types/get-organization';
import {ReturnNotFoundFunction} from '@/backend/common/use-cases/status-data-container/types/return-not-found';
import {ReturnForbiddenFunction} from '@/backend/common/use-cases/status-data-container/types/return-forbidden';

/**
 * Closure for the service function which gets organization data by ID.
 * @param {PrismaClient} prismaClient used to access database
 * @param {ReturnNotFoundFunction} returnNotFound function to return not found status data container
 * @param {ReturnForbiddenFunction} returnForbidden function to return forbidden status data container
 * @return {GetOrganizationFunction} service function which gets organization data by ID
 */
export const makeGetOrganizationById = (
    prismaClient: PrismaClient,
    returnNotFound: ReturnNotFoundFunction,
    returnForbidden: ReturnForbiddenFunction,
): GetOrganizationFunction => {
  /**
     * Service function which gets organization data by ID.
     * @param {User} requestingUser user making the request
     * @param {string} organizationId ID of the organization data to obtain
     * @return {Promise<StatusDataContainer<OrganizationDto>>} organization data obtained by ID
     */
  return async function getOrganizationById(
      requestingUser,
      organizationId,
  ) {
    const organization = await prismaClient.organization.findUnique({
      where: {
        id: organizationId,
      },
      include: {
        administrators: {},
        members: {},
      },
    });
    if (!organization) {
      return returnNotFound();
    }

    if (!organization.administrators.includes(requestingUser) &&
                !organization.members.includes(requestingUser)) {
      return returnForbidden();
    }

    return {
      status: 200,
      data: organization,
    };
  };
};
