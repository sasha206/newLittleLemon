import { defineStorage } from '@aws-amplify/backend';

export const storage = defineStorage({
  name: 'littlelemonStorage',
  access: (allow) => ({
    'public/*': [
      allow.guest.to(['read','write','delete',]),
      allow.authenticated.to(['read', 'write', 'delete',]),
      allow.groups(["admins"]).to(['read', 'write', 'delete',]),
      allow.groups(["workers"]).to(['read', 'write', 'delete',])      
    ]
  })
});