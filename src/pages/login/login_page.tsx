import '@aws-amplify/ui-react/styles.css';
import { Amplify } from "aws-amplify";
import outputs from "../../../amplify_outputs.json";
import { Authenticator } from '@aws-amplify/ui-react';
import { fetchUserAttributes } from 'aws-amplify/auth';
import { useState } from 'react';
import { useEffect } from 'react';
import { fetchAuthSession } from 'aws-amplify/auth';


Amplify.configure(outputs);

const Login = () => {
  const [name, setName] = useState<string | undefined>();
  const [group, setGroup] = useState<any | undefined>();

  useEffect(() => {
    async function fetchAttributesAndSetName() {
      try {
        const userAttributes = await fetchUserAttributes();
        const preferredName = userAttributes["preferred_username"];
        setName(preferredName);
        console.log("name user:", preferredName);
        const { tokens } = await fetchAuthSession();
        setGroup(tokens?.accessToken.payload["cognito:groups"] ?? []);
        
        
        console.log("group user:", group);
      } catch (error) {
        console.error("error:", error);
      }
    }
    fetchAttributesAndSetName();
  }, []);

  return (
    <Authenticator>
      {({ user }) => (
        <div>
          <h1>Welcome, {name || "loading..."}</h1>
          <h1>It's your ID account: {user?.username}</h1>
          <h1>It's your group, {group || "loading..."}</h1>
        </div>
      )}
    </Authenticator>
  );
};

export default Login;