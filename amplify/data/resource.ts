import { a, defineData, type ClientSchema } from '@aws-amplify/backend';
import { addUserToGroup } from './add-user-to-group/resource';
import { removeUserFromGroup } from './remove-user-from-group/resource';
import { listUsers } from './list-users/resource';
import { listGroups } from './list-groups/resource';
import { listGroupsForUser } from './list-groups-for-users/resource';

const schema = a.schema({
  ItemMenu: a.model({
      title: a.string(),
      description: a.string(),
      image: a.string(),
      price: a.string(),
      category1: a.string(),
      category2: a.string().array(),
    })
    .authorization(allow => [
      // Allow anyone auth'd with an API key to read everyone's posts.
      allow.publicApiKey().to(['read']),
      allow.owner().to(['read']),
      allow.groups(["admins", "managers"])
    ]),
  Category1: a.model({
      categoryName1: a.string(),

  })
    .authorization(allow => [
      allow.publicApiKey().to(['read']),
      allow.owner().to(['read']),
      allow.groups(["admins", "managers"])
    ]),
  Category2: a.model({
      categoryName2: a.string(),
  })
    .authorization(allow => [
      allow.publicApiKey().to(['read']),
      allow.owner().to(['read']),
      allow.groups(["admins", "managers"])
    ]),
  addUserToGroup: a
    .mutation().arguments({
      userId: a.string().required(),
      groupName: a.string().required(),
    })
    .authorization((allow) => [allow.group("admins")])
    .handler(a.handler.function(addUserToGroup))
    .returns(a.json()),
  removeUserFromGroup: a
    .mutation().arguments({
      userId: a.string().required(),
      groupName: a.string().required(),
    })
    .authorization((allow) => [allow.group("admins")])
    .handler(a.handler.function(removeUserFromGroup))
    .returns(a.json()),
  listUsers: a
    .mutation().arguments({
      attributes: a.string().required()
    })
    .authorization((allow) => [allow.authenticated()])
    .handler(a.handler.function(listUsers))
    .returns(a.json()),
  listGroups: a
    .mutation()
    .authorization((allow) => [allow.group("users"), allow.authenticated()])
    .handler(a.handler.function(listGroups))
    .returns(a.json()),
  listGroupsForUser: a
    .mutation().arguments({
      username: a.string().required()
    })
    .authorization((allow) => [allow.group("users"), allow.authenticated()])
    .handler(a.handler.function(listGroupsForUser))
    .returns(a.json()),
});

// Used for code completion / highlighting when making requests from frontend
export type Schema = ClientSchema<typeof schema>;

// defines the data resource to be deployed
export const data = defineData({
  schema,
  authorizationModes: {
    defaultAuthorizationMode: 'userPool',
    apiKeyAuthorizationMode: { expiresInDays: 30 }
  }
});