import { defineAuth } from '@aws-amplify/backend';
import { postConfirmation } from './post-confirmation/resource';
import { addUserToGroup } from "../data/add-user-to-group/resource"
import { removeUserFromGroup } from '../data/remove-user-from-group/resource';
import { listUsers } from '../data/list-users/resource';
import { listGroupsForUser } from '../data/list-groups-for-users/resource';
import { listGroups } from '../data/list-groups/resource';
/**
 * Define and configure your auth resource
 * @see https://docs.amplify.aws/gen2/build-a-backend/auth
 */
export const auth = defineAuth({
  loginWith: {
    email: true,
  },
  groups: ["admins", "workers", "users", "managers"],
  triggers: {
    postConfirmation,
  },
  access: (allow) => [
    allow.resource(postConfirmation).to(["addUserToGroup"]),
    allow.resource(addUserToGroup).to(["addUserToGroup"]),
    allow.resource(removeUserFromGroup).to(['removeUserFromGroup']),
    allow.resource(listUsers).to(['listUsers']),
    allow.resource(listGroupsForUser).to(['listGroupsForUser']),
    allow.resource(listGroups).to(['listGroups']),
  ],
  userAttributes: {
    preferredUsername: {
      mutable: true,
      required: true,
    }
  },

});
