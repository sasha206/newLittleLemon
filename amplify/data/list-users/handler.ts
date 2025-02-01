import type { Schema } from "../resource"
import { env } from "$amplify/env/add-user-to-group"
import {
  ListUsersCommand,
  CognitoIdentityProviderClient,
} from "@aws-sdk/client-cognito-identity-provider"

type Handler = Schema["listUsers"]["functionHandler"]
const client = new CognitoIdentityProviderClient()

export const handler: Handler = async () => {
  const command = new ListUsersCommand({
    AttributesToGet: [],
    UserPoolId: env.AMPLIFY_AUTH_USERPOOL_ID,
  })
  const response = await client.send(command)
  return response
}