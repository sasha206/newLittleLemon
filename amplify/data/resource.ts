import { a, defineData, type ClientSchema } from '@aws-amplify/backend';
import { addUserToGroup } from './add-user-to-group/resource';
import { removeUserFromGroup } from './remove-user-from-group/resource';
import { listUsers } from './list-users/resource';

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
      // Allow signed-in user to create, read, update,
      // and delete their __OWN__ posts.
      allow.owner(),
    ]),
  Category1: a.model({
      categoryName1: a.string(),

  })
    .authorization(allow => [
      // Allow anyone auth'd with an API key to read everyone's posts.
      allow.publicApiKey().to(['read']),
      // Allow signed-in user to create, read, update,
      // and delete their __OWN__ posts.
      allow.group("admins"),
    ]),
  Category2: a.model({
      categoryName2: a.string(),
  })
    .authorization(allow => [
      // Allow anyone auth'd with an API key to read everyone's posts.
      allow.publicApiKey().to(['read']),
      // Allow signed-in user to create, read, update,
      // and delete their __OWN__ posts.
      allow.owner(),
    ]),
  addUserToGroup: a
    .mutation().arguments({
      userId: a.string().required(),
      groupName: a.string().required(),
    })
    .authorization((allow) => [allow.group("users"),])
    .handler(a.handler.function(addUserToGroup))
    .returns(a.json()),
  removeUserFromGroup: a
    .mutation().arguments({
      userId: a.string().required(),
      groupName: a.string().required(),
    })
    .authorization((allow) => [allow.group("users")])
    .handler(a.handler.function(removeUserFromGroup))
    .returns(a.json()),
  listUsers: a
    .mutation().arguments({
      attributes: a.string().required()
    })
    .authorization((allow) => [allow.group("users")])
    .handler(a.handler.function(listUsers))
    .returns(a.json())
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