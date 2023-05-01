import {PrismaClient} from '@prisma/client';
import {
  ApproveRequestToJoinOrganizationFunction,
} from '@/backend/services/organizations/types/approve-request-to-join-organization';
import {ReturnNotFoundFunction} from '@/backend/common/use-cases/status-data-container/types/return-not-found';
import {ErrorMessageToDtoFunction} from '@/backend/common/use-cases/errors/types/error-message-to-dto';
import {ReturnForbiddenFunction} from '@/backend/common/use-cases/status-data-container/types/return-forbidden';
import {OrganizationMembershipStatus} from '@/backend/services/organizations/enums/OrganizationMembershipStatus';

/**
 * Closure for the service function which approves a request to join an organization.
 * @return {ApproveRequestToJoinOrganizationFunction} service function which approves a request to join an organization
 */
export const makeApproveRequestToJoinOrganization = (
    prismaClient: PrismaClient,
    returnNotFound: ReturnNotFoundFunction,
    returnForbidden: ReturnForbiddenFunction,
    errorMessageToDto: ErrorMessageToDtoFunction,
): ApproveRequestToJoinOrganizationFunction => {
  /**
     * Service function which approves a request to join an organization.
     * @param {User} requestingUser user making the request
     * @param {string} organizationMembershipRequestId ID of the organization membership request being approved
     * @return {Promise<StatusDataContainer<OrganizationMembershipStatusDto | ErrorDto>>} membership status DTO or error DTO for bad requests
     */
  return async function approveRequestToJoinOrganization(
      requestingUser,
      organizationMembershipRequestId,
  ) {
    const organizationMembershipRequest = await prismaClient.organizationMembershipRequest.findUnique({
      where: {
        id: organizationMembershipRequestId,
      },
    });
    if (!organizationMembershipRequest) {
      return returnNotFound();
    }
    const organization = await prismaClient.organization.findUnique({
      where: {
        id: organizationMembershipRequest.organizationId,
      },
      include: {
        administrators: true,
        members: true,
      },
    });
    if (!organization) {
      return {
        status: 400,
        data: errorMessageToDto(`Organization with ID: ${organizationMembershipRequest.organizationId} does not exist`),
      };
    }
    if (!organization.administrators.includes(requestingUser)) {
      return returnForbidden();
    }
    if (!organizationMembershipRequest.requestingUserId) {
      return {
        status: 400,
        data: errorMessageToDto(''),
      };
    }
    const organizationMembershipRequestUser = await prismaClient.user.findUnique({
      where: {
        id: organizationMembershipRequest.requestingUserId,
      },
    });
    if (!organizationMembershipRequestUser) {
      return {
        status: 400,
        data: errorMessageToDto(''),
      };
    }
    if (organization.members.includes(organizationMembershipRequestUser)) {
      return {
        status: 400,
        data: {
          status: OrganizationMembershipStatus[OrganizationMembershipStatus.USER_ALREADY_MEMBER],
        },
      };
    }
    await prismaClient.organization.update({
      where: {
        id: organizationMembershipRequest.organizationId,
      },
      data: {
        members: {
          connect: {id: organizationMembershipRequestUser.id},
        },
      },
    });
    await prismaClient.organizationMembershipRequest.update({
      where: {
        id: organizationMembershipRequestId,
      },
      data: {
        isApproved: true,
        approvingAdministratorId: requestingUser.id,
      },
    });
    return {
      status: 200,
      data: {
        status: OrganizationMembershipStatus[OrganizationMembershipStatus.SUCCESS],
      },
    };
  };
};
