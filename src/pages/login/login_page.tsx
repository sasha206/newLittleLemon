import '@aws-amplify/ui-react/styles.css';
import { Amplify } from "aws-amplify";
import outputs from "../../../amplify_outputs.json";
import { Authenticator } from '@aws-amplify/ui-react';
import { fetchUserAttributes } from 'aws-amplify/auth';

Amplify.configure(outputs);
const userAttributes = await fetchUserAttributes();
const name = userAttributes["preferred_username"];

const Login = () => {
  console.log(name)


  return (
    <Authenticator>
      {({user }) => (
        <div>
          <h1>Welcome, {name}</h1>
          <h1>It's your ID account: {user?.username}</h1>
        </div>
      )}
    </Authenticator>
  );
};

export default Login;
