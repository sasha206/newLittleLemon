import { type ClientSchema, a, defineData } from '@aws-amplify/backend';

const schema = a.schema({
  ItemMenu: a.model({
    tittle: a.string(),
    description: a.string(),
    price: a.float(),
    image: a.string()
  }).authorization(allow => [
    allow.guest(),
    allow.groups(['admins'])])
});



export type Schema = ClientSchema<typeof schema>;

export const data = defineData({
  schema,
  authorizationModes: {
    // This tells the data client in your app (generateClient())
    // to sign API requests with the user authentication token.
    defaultAuthorizationMode: 'userPool',
  },
});