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
  Groups: Groups[]
  NextToken: string
}
export interface Groups {
  CreationDate: number
  Description: string
  GroupName: string
  LastModifiedDate: number
  Precedence: number
  RoleArn: string
  UserPoolId: string
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
  const [groupName, setGroupName] = useState<string>(""); 
  const [userList, setUserList] = useState<User[]>([]);
  const [userGroups, setUserGroups] = useState<{ [key: string]: Groups[] }>({});
  const [loadingGroups, setLoadingGroups] = useState<string | null>(null);

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
      await fetchUserGroups();
    } catch (error) {
      console.error("Error adding user to group:", error);
      alert("Check console for errors.");
    }
  };

  const fetchUserListGroups = async (sub: string) => {
    setLoadingGroups(sub); // Показываем индикатор загрузки для конкретного пользователя
    try {
      const response = await client.mutations.listGroupsForUser({ username: sub });
      if (response.data) {
        const parsedData = JSON.parse(response.data as string);
        setUserGroups(prev => ({ ...prev, [sub]: parsedData.Groups || [] }));
      } else {
        setUserGroups(prev => ({ ...prev, [sub]: [] }));
      }
    } catch (error) {
      console.error("Ошибка при загрузке групп:", error);
      setUserGroups(prev => ({ ...prev, [sub]: [] }));
    } finally {
      setLoadingGroups(null); // Убираем индикатор загрузки
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
      await fetchUserGroups();
    } catch (error) {
      console.error("Error removing user from group:", error);
      alert("Check console for errors.");
    }
  };
  
  const fetchUserList = async () => {
    try {
      const response = await client.mutations.listUsers({ attributes: 'preferred_username' });
      if (response.data) {
        const parsedResponse: Root = JSON.parse(response.data as string);
        setUserList(parsedResponse.Users);
      } else {
        console.log('null list');
      }
    } catch (error) {
      console.log('error:', error);
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
          <div>
      <h1>Список пользователей</h1>
      {userList.length > 0 ? (
        <ul>
          {userList.map((user) => {
            const preferredUsername = user.Attributes.find(attr => attr.Name === "preferred_username")?.Value;
            const sub = user.Attributes.find(attr => attr.Name === "sub")?.Value;
            const groups = userGroups[sub || ''] || [];

            return (
              <li key={user.Username}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <span>{preferredUsername || "Имя не указано"}</span>
                  <button onClick={() => fetchUserListGroups(sub || '')}>
                    Показать группы
                  </button>
                </div>

                {loadingGroups === sub && <p>Загрузка групп...</p>}

                {groups.length > 0 && (
                  <ul>
                    {groups.map((group) => (
                      <li key={group.GroupName}>{group.GroupName}</li>
                    ))}
                  </ul>
                )}
              </li>
            );
          })}
        </ul>
      ) : (
        <p>Загрузка пользователей...</p>
      )}
    </div>
        </div>
      )}
    </Authenticator>
  );
};

export default Admin_panel;

