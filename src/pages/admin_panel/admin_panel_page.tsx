import '@aws-amplify/ui-react/styles.css';
import { Amplify } from "aws-amplify";
import outputs from "../../../amplify_outputs.json";
import { Authenticator } from '@aws-amplify/ui-react';
import { fetchUserAttributes } from 'aws-amplify/auth';
import { useState } from 'react';
import { useEffect } from 'react';
import { fetchAuthSession } from 'aws-amplify/auth';
import type { Schema } from "../../../amplify/data/resource"
import { generateClient } from "aws-amplify/data"

const client = generateClient<Schema>()

Amplify.configure(outputs);
const Admin_panel = () => {
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
        const groups = tokens?.accessToken.payload["cognito:groups"] as string[];
        if (Array.isArray(groups)) {
            setGroup(groups as string[]);
        }
      } catch (error) {
        console.error("error:", error);
      }
    }
    fetchAttributesAndSetName();
  }, []);
  useEffect(() => {
    console.log("Group change:", group);
  }, [group]);

  const handleAddUserToGroup = async () => {
    try {
      await client.mutations.addUserToGroup({
        groupName: "managers",
        userId: "a0dcc9fc-5061-7035-ffeb-b5a7c5cf23e6",
      });
      alert("user successfully added!");
    } catch (error) {
      console.error("error adding user to group:", error);
      alert("Check console on errors.");
    }
  };

  return (
    <Authenticator>
      {({ user }) => (
        <div>
          <h1>Welcome, {name || "loading..."}</h1>
          <h1>It's your ID account: {user?.username}</h1>
          <h1>It's your group, {group || "loading..."}</h1>
          <button onClick={handleAddUserToGroup}>Add user to group</button>
        </div>


      )}
    </Authenticator>
  );
};
export default Admin_panel;
