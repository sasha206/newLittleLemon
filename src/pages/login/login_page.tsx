import '@aws-amplify/ui-react/styles.css';
import { Amplify } from "aws-amplify";
import outputs from "../../../amplify_outputs.json";
import { Authenticator } from '@aws-amplify/ui-react';

Amplify.configure(outputs);

const Login = () => {

  return (
    <Authenticator>
      {({user }) => (
        <div>
          <h1>Welcome, {user?.username}</h1>
          <h1>Welcome, {user?.userId}</h1>

        </div>
      )}
    </Authenticator>
  );
};

export default Login;
