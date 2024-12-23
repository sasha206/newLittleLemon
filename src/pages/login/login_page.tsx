import { Authenticator } from '@aws-amplify/ui-react';
import { Amplify } from 'aws-amplify';
import outputs from '../../../amplify_outputs.json';
import type { Schema } from '../../../amplify/data/resource'
import { generateClient } from 'aws-amplify/data'


Amplify.configure(outputs);
const client = generateClient<Schema>()


const createItemMenu = async () => {
  await client.models.ItemMenu.create({
    tittle: window.prompt("Name"),
    isDone: false
  })
}

const Login = () => {




    return(
<Authenticator>
      {({ signOut, user }) => (
        <main>

          <h1>Hello {user?.username}</h1>
          <button onClick={signOut}>Sign out</button>
          <button onClick={createItemMenu}>Add new todo</button>
        </main>
      )}
</Authenticator>
    )
}

export default Login;