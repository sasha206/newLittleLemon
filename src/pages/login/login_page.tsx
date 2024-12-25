import { Authenticator } from '@aws-amplify/ui-react';
import { Amplify } from 'aws-amplify';
import outputs from '../../../amplify_outputs.json';


Amplify.configure(outputs);

const Login = () => {
    return(
<Authenticator>
      {({ signOut, user, }) => (
        <main>
          <h1>Hello {user?.username}</h1>
          <button onClick={signOut}>Sign out</button>
        </main>
      )}
    </Authenticator>
    )
}

export default Login;