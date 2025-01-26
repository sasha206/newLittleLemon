import { a, defineData, type ClientSchema } from '@aws-amplify/backend';
import { addUserToGroup } from './add-user-to-group/resource';
import { removeUserFromGroup } from './remove-user-from-group/resource';

const schema = a.schema({
  ItemMenu: a.model({
      title: a.string(),
      description: a.string(),
      image: a.string(),
      price: a.string(),
      category1: a.string(),
      category2: a.string().array(),
    })
    .authorization(allow => [allow.publicApiKey()]),
  Category1: a.model({
      categoryName1: a.string(),

  })
    .authorization(allow => [allow.publicApiKey()]),
  Category2: a.model({
      categoryName2: a.string(),
  })
    .authorization(allow => [allow.publicApiKey()]),
  addUserToGroup: a
    .mutation().arguments({
      userId: a.string().required(),
      groupName: a.string().required(),
    })
    .authorization((allow) => [allow.group("users")])
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
});

// Used for code completion / highlighting when making requests from frontend
export type Schema = ClientSchema<typeof schema>;

// defines the data resource to be deployed
export const data = defineData({
  schema,
  authorizationModes: {
    defaultAuthorizationMode: 'iam',
    apiKeyAuthorizationMode: { expiresInDays: 30 }
  }
});