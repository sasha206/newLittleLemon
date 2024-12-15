import { Authenticator } from '@aws-amplify/ui-react';

const Admin_panel = () => {
    return(
<Authenticator>
      {({ signOut, user }) => (
        <main>
          <h1>Hello {user?.username}</h1>
          <button onClick={signOut}>Sign out</button>
        </main>
      )}
    </Authenticator>
    )
}
export default Admin_panel;
