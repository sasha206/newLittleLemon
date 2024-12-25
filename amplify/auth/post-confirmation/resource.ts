import { defineFunction } from '@aws-amplify/backend';

export const postConfirmation = defineFunction({
  name: 'post-confirmation',
  // Определяем переменную окружения для имени группы
  environment: {
    GROUP_NAME: 'users',
  },
});
