import {User} from '@prisma/client';
import {OrganizationMembershipStatusDto} from '@/backend/services/organizations/dtos/OrganizationMembershipStatusDto';
import {StatusDataContainer} from '@/backend/common/use-cases/status-data-container/dtos/StatusDataContainer';
import {ErrorDto} from '@/backend/common/use-cases/errors/dtos/ErrorDto';

/**
 * Type for the service function which approves a request to join an organization.
 */
export type ApproveRequestToJoinOrganizationFunction = (
    requestingUser: User,
    organizationMembershipRequestId: string,
) => Promise<StatusDataContainer<OrganizationMembershipStatusDto | ErrorDto>>;
