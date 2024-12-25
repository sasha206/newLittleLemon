import { defineStorage } from '@aws-amplify/backend';

export const storage = defineStorage({
  name: 'littlelemonStorage',
  access: (allow) => ({
    'public/*': [
      allow.guest.to(['read', 'write', 'delete', ]),
      allow.authenticated.to(['read', 'write', 'delete', ]) // additional actions such as "write" and "delete" can be specified depending on your use case
    ]
  })
});