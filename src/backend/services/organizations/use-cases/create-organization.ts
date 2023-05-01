import {PrismaClient, User} from '@prisma/client';
import {CreateOrganizationFunction} from '@/backend/services/organizations/types/create-organization';
import {ReturnForbiddenFunction} from '@/backend/common/use-cases/status-data-container/types/return-forbidden';

/**
 * Closure for the service function which creates an organization.
 * @param {ReturnForbiddenFunction} returnForbidden function to return forbidden status data container
 * @param {PrismaClient} prismaClient used to access the database
 * @return {CreateOrganizationFunction} service function which creates an organization
 */
export const makeCreateOrganization = (
    returnForbidden: ReturnForbiddenFunction,
    prismaClient: PrismaClient,
): CreateOrganizationFunction => {
  /**
     * Service function which creates an organization.
     * @param {User} requestingUser user making the request
     * @param {string} name name of the organization to create
     * @return {Promise<StatusDataContainer<OrganizationDto>>} newly created organization DTO
     */
  return async function createOrganization(
      requestingUser: User,
      name: string,
  ) {
    if (!requestingUser || !requestingUser.email) {
      return returnForbidden();
    }
    const organization = await prismaClient.organization.create({
      data: {
        name,
        administrators: {
          connect: {
            id: requestingUser.id,
            email: requestingUser.email,
          },
        },
      },
      include: {
        administrators: true,
      },
    });

    return {
      status: 201,
      data: organization,
    };
  };
};
