import { useState, useEffect } from "react";
import { Amplify } from "aws-amplify";
import { Authenticator } from "@aws-amplify/ui-react";
import outputs from "../../../amplify_outputs.json";
import { fetchUserAttributes } from "aws-amplify/auth";
import { fetchAuthSession } from "aws-amplify/auth";
import type { Schema } from "../../../amplify/data/resource";
import { generateClient } from "aws-amplify/data";
import { deleteUser } from 'aws-amplify/auth';

import "@aws-amplify/ui-react/styles.css";
export interface Root {
  $metadata: Metadata
  Users: User[]
}

export interface Metadata {
  httpStatusCode: number
  requestId: string
  attempts: number
  totalRetryDelay: number
}

export interface User {
  Attributes: Attribute[]
  Enabled: boolean
  UserCreateDate: string
  UserLastModifiedDate: string
  UserStatus: string
  Username: string
}

export interface Attribute {
  Name: string
  Value: string
}


const client = generateClient<Schema>();
Amplify.configure(outputs);

const Admin_panel = () => {
  const [name, setName] = useState<string | undefined>();
  const [group, setGroup] = useState<string[] | undefined>();
  const [groupName, setGroupName] = useState<string>(""); // Название группы для добавления
  const [userList, setUserList] = useState<{ Users: User[] }>({ Users: [] });


  const fetchUserGroups = async () => {
    try {
      const { tokens } = await fetchAuthSession({ forceRefresh: true });
      const groups = tokens?.accessToken.payload["cognito:groups"] as string[];
      setGroup(groups);
      console.log(groups.includes('admins'));
    } catch (error) {
      console.error("Error fetching user groups:", error);
    }
  };
  async function handleDeleteUser() {
    try {
      await deleteUser();
      alert("User delete");
    } catch (error) {
      console.log(error);
    }
  }
  

  const fetchAttributesAndGroups = async () => {
    try {
      const userAttributes = await fetchUserAttributes();
      const preferredName = userAttributes["preferred_username"];
      setName(preferredName);


      await fetchUserGroups();

    } catch (error) {
      console.error("Error fetching user attributes or groups:", error);
    }
  };

  useEffect(() => {
    fetchAttributesAndGroups();
    fetchUserList();
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
      await fetchUserGroups(); // Обновляем список групп
    } catch (error) {
      console.error("Error adding user to group:", error);
      alert("Check console for errors.");
    }
  };

  const handleRemoveUserFromGroup = async (userId: string) => {
    if (!groupName.trim()) {
      alert("Please provide a group name.");
      return;
    } else if (groupName == "admins") {
      alert("you can not delete yourself from ADMINS")
      return;
    }

    try {
      await client.mutations.removeUserFromGroup({
        groupName,
        userId,
      });
      alert(`User with ID ${userId} successfully removed from group ${groupName}!`);
      await fetchUserGroups(); // Обновляем список групп
    } catch (error) {
      console.error("Error removing user from group:", error);
      alert("Check console for errors.");
    }
  };
  
  const fetchUserList = async () => {
  try {
    const response = await client.mutations.listUsers({ attributes: 'preferred_username' });
    console.log(response.data)

    if (response.data) {
      const parse = JSON.parse(response.data)
      console.log("its parse: ", parse)
      setUserList(parse);
      console.log(userList);
    } else {
      console.log("null list");
    }
  } catch (error) {
    console.log("error:", error);
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

          <button
            onClick={() => {
              if (user?.username) {
                handleRemoveUserFromGroup(user.username);
              } else {
                alert("User ID is not available.");
              }
            }}
          >
            Remove user from group
          </button>
          <button
            onClick={() => {handleDeleteUser}}
          >
            Delete user
          </button>
          {userList && userList.Users && userList.Users.length > 0 ? (
      <ul>
        {userList.Users.map((user) => (
          <li key={user.Username}>

            your Name: {user.Attributes.find(attr => attr.Name === 'preferred_username')?.Value || 'Unknown'},
            your Id: {user.Attributes.find(attr => attr.Name === 'sub')?.Value || 'Unknown'}
          </li>
        ))}
      </ul>
    ) : (
      <p>Unknown users.</p>
    )}
        </div>
      )}
    </Authenticator>
  );
};

export default Admin_panel;

