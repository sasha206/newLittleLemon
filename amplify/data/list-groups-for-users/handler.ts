import type { Schema } from "../resource"
import { env } from "$amplify/env/add-user-to-group"
import {
  AdminListGroupsForUserCommand,
  CognitoIdentityProviderClient,
} from "@aws-sdk/client-cognito-identity-provider"

type Handler = Schema["listGroupsForUser"]["functionHandler"]
const client = new CognitoIdentityProviderClient()

export const handler: Handler = async (event) => {
  const { username } = event.arguments
  const command = new AdminListGroupsForUserCommand({
    Username: username,
    UserPoolId: env.AMPLIFY_AUTH_USERPOOL_ID,
  })
  const response = await client.send(command)
  return response
}