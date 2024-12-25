import { defineStorage } from '@aws-amplify/backend';

export const storage = defineStorage({
  name: 'littlelemonStorage',
  access: (allow) => ({
    'public/*': [
      allow.guest.to(['read']),
      allow.authenticated.to(['read', 'write', 'delete', ]),
      allow.groups(['admins']).to(['read', 'delete', 'write']),
      allow.groups(['workers']).to(['read']),     
    ]
  })
});