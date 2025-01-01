import { a, defineData, type ClientSchema } from '@aws-amplify/backend';

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
});

// Used for code completion / highlighting when making requests from frontend
export type Schema = ClientSchema<typeof schema>;

// defines the data resource to be deployed
export const data = defineData({
  schema,
  authorizationModes: {
    defaultAuthorizationMode: 'apiKey',
    apiKeyAuthorizationMode: { expiresInDays: 30 }
  }
});