import {prismaClient} from '@/backend/lib/db';
import {returnForbidden, returnNotFound} from '@/backend/common/use-cases/status-data-container';
import {makeCreateOrganization} from './create-organization';
import {makeGetOrganizationById} from './get-organization-by-id';
import {makeRequestToJoinOrganization} from './request-to-join-organization';
import {makeGetRequestsToJoinOrganization} from './get-requests-to-join-organization';
import {makeRemoveOrganizationMember} from './remove-organization-member';
import {makeApproveRequestToJoinOrganization} from './approve-request-to-join-organization';
import {makeRemoveOrganizationAdministrator} from './remove-organization-administrator';
import {makeGetOrganizationsWhereInvolved} from './get-organizations-where-involved';
import {makeGetOrganizationSnippet} from './get-organization-snippet';
import {makeInviteToJoinOrganization} from './invite-to-join-organization';
import {makeGetOrganizationInvitationByTokenValue} from './get-organization-invitation-by-token-value';
import {makeUpdateAdministratorJoinAsMember} from './update-administrator-join-as-member';

export const getOrganizationById = makeGetOrganizationById(
    prismaClient,
    returnNotFound,
    returnForbidden,
);

export const getOrganizationSnippet = makeGetOrganizationSnippet(
);

export const getOrganizationsWhereInvolved = makeGetOrganizationsWhereInvolved(
);

export const createOrganization = makeCreateOrganization(
);

export const removeOrganizationAdministrator = makeRemoveOrganizationAdministrator(
);

export const removeOrganizationMember = makeRemoveOrganizationMember(
);

export const getRequestsToJoinOrganization = makeGetRequestsToJoinOrganization(
);

export const requestToJoinOrganization = makeRequestToJoinOrganization(
);

export const approveRequestToJoinOrganization = makeApproveRequestToJoinOrganization(
);

export const inviteToJoinOrganization = makeInviteToJoinOrganization(
);

export const getOrganizationInvitationByTokenValue = makeGetOrganizationInvitationByTokenValue(
);

export const updateAdministratorJoinAsMember = makeUpdateAdministratorJoinAsMember(
);
