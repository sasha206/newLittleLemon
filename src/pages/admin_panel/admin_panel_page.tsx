import '@aws-amplify/ui-react/styles.css';
import { Amplify } from "aws-amplify";
import outputs from "../../../amplify_outputs.json";
import { Authenticator } from '@aws-amplify/ui-react';
import { fetchUserAttributes } from 'aws-amplify/auth';
import { useState, useEffect } from 'react';
import { fetchAuthSession } from 'aws-amplify/auth';
import type { Schema } from "../../../amplify/data/resource";
import { generateClient } from "aws-amplify/data";

const client = generateClient<Schema>();

Amplify.configure(outputs);

const session = await fetchAuthSession();

console.log("id token", session.tokens?.idToken)
console.log("access token", session.tokens?.accessToken)
console.log("groups: ", session.tokens?.accessToken.payload["cognito:groups"])

const Admin_panel = () => {
  const [name, setName] = useState<string | undefined>();
  const [group, setGroup] = useState<string[] | undefined>();
  const [groupName, setGroupName] = useState<string>(""); // Название группы для добавления

  useEffect(() => {
    async function fetchAttributesAndSetName() {
      try {
        const userAttributes = await fetchUserAttributes();
        const preferredName = userAttributes["preferred_username"];
        setName(preferredName);
        console.log("User name:", preferredName);

        const { tokens } = await fetchAuthSession();
        const groups = tokens?.accessToken.payload["cognito:groups"] as string[];
        if (Array.isArray(groups)) {
          setGroup(groups);
        }
      } catch (error) {
        console.error("Error fetching attributes or session:", error);
      }
    }
    fetchAttributesAndSetName();
  }, []);

  const handleAddUserToGroup = async (userId: string) => {
    if (!groupName.trim()) {
      alert("Please provide a group name.");
      return;
    }

    try {
      await client.mutations.addUserToGroup({
        groupName,
        userId,
      });
      alert(`User with ID ${userId} successfully added to group ${groupName}!`);
      console.log("Adding user to group with data:", {
        groupName,
        userId,
      });
      
    } catch (error) {
      console.error("Error adding user to group:", error);
      alert("Check console for errors.");
    }
  };

  return (
    <Authenticator>
      {({ user }) => (
        <div>
          <h1>Welcome, {name || "loading..."}</h1>
          <h1>Your account ID-username: {user?.username}</h1>
          <h1>Your account ID: {user?.userId}</h1>
          <h1>Your groups: {group?.join(", ") || "loading..."}</h1>

          <div>
            <label htmlFor="groupName">Group Name:</label>
            <input
              id="groupName"
              type="text"
              value={groupName}
              onChange={(e) => setGroupName(e.target.value)}
              placeholder="Enter group name"
            />
          </div>

          <button
            onClick={() => {
              if (user?.username) {
                handleAddUserToGroup(user.username);
              } else {
                alert("User ID is not available.");
              }
            }}
          >
            Add user to group
          </button>
        </div>
      )}
    </Authenticator>
  );
};

export default Admin_panel;
