import { useState, useEffect } from "react";
import { Amplify } from "aws-amplify";
import { Authenticator } from "@aws-amplify/ui-react";
import outputs from "../../../amplify_outputs.json";
import { fetchUserAttributes } from "aws-amplify/auth";
import { fetchAuthSession } from "aws-amplify/auth";
import type { Schema } from "../../../amplify/data/resource";
import { generateClient } from "aws-amplify/data";

import styled from 'styled-components';
import "@aws-amplify/ui-react/styles.css";
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

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
const Container = styled.div`
  display: grid;
  grid-template-columns: 300px 1fr 300px;
  gap: 20px;
  padding: 20px;
  min-height: 600px;

  @media (max-width: 1024px) {
    grid-template-columns: 1fr;
    padding: 10px;
  }
`;

const UserListContainer = styled.div`
  border-right: 1px solid #eee;
  max-height: 600px;
  overflow-y: auto;
  scrollbar-width: thin;
  
  @media (max-width: 768px) {
    border-right: none;
    border-bottom: 1px solid #eee;
    max-height: 300px;
  }

  &::-webkit-scrollbar {
    width: 6px;
  }
  
  &::-webkit-scrollbar-track {
    background: #f1f1f1;
  }
  
  &::-webkit-scrollbar-thumb {
    background: #888;
    border-radius: 3px;
  }
`;

const UserItem = styled.li<{ isSelected?: boolean }>`
  padding: 15px;
  border-bottom: 1px solid #eee;
  cursor: pointer;
  transition: background-color 0.2s;
  
  &:hover {
    background-color: #f5f5f5;
  }
  
  ${props => props.isSelected && `
    background-color: #e3f2fd;
  `}
`;

const ProfileContainer = styled.div`
  padding: 30px;
  background: white;
  border-radius: 12px;
  box-shadow: 0 4px 6px rgba(0,0,0,0.1);
  max-height: 600px;
  overflow-y: auto;

  @media (max-width: 768px) {
    padding: 15px;
    max-height: none;
  }
`;

const ProfileHeader = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 30px;
  padding-bottom: 20px;
  border-bottom: 2px solid #f0f0f0;

  h2 {
    margin: 0;
    font-size: 24px;
    color: #2c3e50;
  }
`;

const ProfileInfo = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 20px;
  margin-bottom: 30px;

  @media (max-width: 576px) {
    grid-template-columns: 1fr;
    gap: 15px;
  }

  .info-item {
    background: #f8f9fa;
    padding: 15px;
    border-radius: 8px;
    
    @media (max-width: 576px) {
      padding: 12px;
    }
  }
`;



const UserList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
`;

const client = generateClient<Schema>();
Amplify.configure(outputs);

const HeaderSection = styled.div`
  margin-bottom: 20px;

  @media (max-width: 768px) {
    h1 {
      font-size: 1.5rem;
      margin: 10px 0;
    }
  }

  .controls {
    display: flex;
    gap: 10px;
    flex-wrap: wrap;
    margin-top: 15px;

    @media (max-width: 576px) {
      flex-direction: column;
    }

    input {
      padding: 8px;
      border-radius: 4px;
      border: 1px solid #ddd;
      
      @media (max-width: 576px) {
        width: 100%;
      }
    }

    button {
      padding: 8px 16px;
      border-radius: 4px;
      border: none;
      background: #1976d2;
      color: white;
      cursor: pointer;

      &:hover {
        background: #1565c0;
      }

      @media (max-width: 576px) {
        width: 100%;
      }
    }
  }
`;

const GroupsListContainer = styled.div`
  border-left: 1px solid #eee;
  max-height: 600px;
  overflow-y: auto;
  padding: 20px;
  
  @media (max-width: 1024px) {
    border-left: none;
    border-top: 1px solid #eee;
    max-height: 300px;
  }

  h3 {
    margin-bottom: 15px;
    color: #2c3e50;
  }
`;



const DraggableGroupItem = styled.div`
  padding: 12px;
  margin-bottom: 8px;
  background: #f8f9fa;
  border-radius: 8px;
  cursor: grab;
  
  &:active {
    cursor: grabbing;
  }

  .group-name {
    font-weight: bold;
    color: #1976d2;
  }
  
  .group-desc {
    font-size: 0.9em;
    color: #666;
    margin-top: 5px;
  }
`;

const DropZone = styled.div<{ isDraggingOver: boolean }>`
  padding: 20px;
  border: 2px dashed ${props => props.isDraggingOver ? '#1976d2' : '#ddd'};
  border-radius: 8px;
  margin: 10px 0;
  transition: all 0.2s ease;
  background: ${props => props.isDraggingOver ? 'rgba(25, 118, 210, 0.1)' : 'transparent'};
  
  @media (max-width: 768px) {
    padding: 15px;
  }
`;

const Admin_panel = () => {
  const [name, setName] = useState<string | undefined>();
  const [group, setGroup] = useState<string[] | undefined>();

  const [userList, setUserList] = useState<User[]>([]);
  const [groupList, setGroupList] = useState<Groups[]>([]);
  const [userGroups, setUserGroups] = useState<{ [key: string]: Groups[] }>({});
  const [selectedUser, setSelectedUser] = useState<User | null>(null);

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
    fetchGroupsList(); // Add this line
  }, []);

  const handleAddUserToGroup = async (userId: string, groupToAdd: string) => {
    try {
      await client.mutations.addUserToGroup({
        groupName: groupToAdd,
        userId,
      });
      await fetchUserGroups();
    } catch (error) {
      console.error("Error adding user to group:", error);
      alert("Check console for errors.");
    }
  };

  const handleRemoveUserFromGroup = async (userId: string, groupToRemove: string) => {
    if (groupToRemove === "admins") {
      alert("You cannot delete yourself from ADMINS");
      return;
    }

    try {
      await client.mutations.removeUserFromGroup({
        groupName: groupToRemove,
        userId,
      });
      await fetchUserGroups();
    } catch (error) {
      console.error("Error removing user from group:", error);
      alert("Check console for errors.");
    }
  };

  const fetchUserListGroups = async (sub: string) => {

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
      console.log("User groups:", userGroups);
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
  const fetchGroupsList = async () => {
    try {
      const response = await client.mutations.listGroups();
      if (response.data) {
        const parsedResponse: Root = JSON.parse(response.data as string);
        // Фильтруем группы 'users' и 'admins' из списка
        const filteredGroups = parsedResponse.Groups.filter(group => 
          !['users', 'admins'].includes(group.GroupName)
        );
        setGroupList(filteredGroups);
      } else {
        console.log('null list');
      }
    } catch (error) {
      console.log('error:', error);
    }
  };

  const handleDragEnd = async (result: any) => {
    if (!result.destination || !selectedUser) return;

    console.log('Drag result:', result); // Добавляем для отладки

    // Извлекаем имя группы, убирая префикс
    const groupName = result.draggableId.replace('available-', '').replace('user-', '');
    console.log('Group name:', groupName); // Добавляем для отладки
    
    if (result.source.droppableId === 'availableGroups' && 
        result.destination.droppableId === 'userGroups') {
      // Добавляем группу

      await handleAddUserToGroup(selectedUser.Username, groupName);
      await fetchUserListGroups(selectedUser.Attributes.find(attr => attr.Name === "sub")?.Value || '');
    } else if (result.source.droppableId === 'userGroups' && 
               result.destination.droppableId === 'removeZone' &&
               !['users', 'admins'].includes(groupName)) {
      // Удаляем группу
      await handleRemoveUserFromGroup(selectedUser.Username, groupName);
      await fetchUserListGroups(selectedUser.Attributes.find(attr => attr.Name === "sub")?.Value || '');
    }
  };

  return (
    <Authenticator>
      {({ user }) => (
        <DragDropContext onDragEnd={handleDragEnd}>
          <div>
            <HeaderSection>
              <h1>Welcome, {name || "loading..."}</h1>
              <h1>Your account ID-username: {user?.username}</h1>
              <h1>Your account ID: {user?.userId}</h1>
              <h1>Your groups: {group?.join(", ") || "loading..."}</h1>

            </HeaderSection>

            <Container>
              <UserListContainer>
                {userList.length > 0 ? (
                  <UserList>
                    {userList.map((user) => {
                      const preferredUsername = user.Attributes.find(attr => attr.Name === "preferred_username")?.Value;
                      const sub = user.Attributes.find(attr => attr.Name === "sub")?.Value;
                      return (
                        <UserItem 
                          key={user.Username}
                          isSelected={selectedUser?.Username === user.Username}
                          onClick={() => {setSelectedUser(user), fetchUserListGroups(sub || '')}}
                        >
                          {preferredUsername || "Имя не указано"}
                        </UserItem>
                      );
                    })}
                  </UserList>
                ) : (
                  <p>Загрузка пользователей...</p>
                )}
              </UserListContainer>

              <ProfileSection>
                {selectedUser ? (
                  <UserProfile 
                    user={selectedUser} 
                    userGroups={userGroups}
                    groupList={groupList}
                  />
                ) : (
                  <p>Chooose user for bio</p>
                )}
              </ProfileSection>

              <GroupsListContainer>
                <h3>Available Groups</h3>
                <Droppable droppableId="availableGroups">
                  {(provided, snapshot) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.droppableProps}
                      style={{ 
                        minHeight: '50px',
                        background: snapshot.isDraggingOver ? 'rgba(25, 118, 210, 0.1)' : 'transparent',
                        padding: '10px',
                        borderRadius: '8px',
                        border: '2px dashed #ddd'
                      }}
                    >
                      {groupList.map((group, index) => (
                        <Draggable
                          key={`available-${group.GroupName}`}
                          draggableId={`available-${group.GroupName}`}
                          index={index}
                        >
                          {(provided, snapshot) => (
                            <DraggableGroupItem
                              ref={provided.innerRef}
                              {...provided.draggableProps}
                              {...provided.dragHandleProps}
                              style={{
                                ...provided.draggableProps.style,
                                opacity: snapshot.isDragging ? 0.7 : 1
                              }}
                            >
                              <div className="group-name">{group.GroupName}</div>
                              <div className="group-desc">{group.Description}</div>
                            </DraggableGroupItem>
                          )}
                        </Draggable>
                      ))}
                      {provided.placeholder}
                    </div>
                  )}
                </Droppable>
              </GroupsListContainer>
            </Container>
          </div>
        </DragDropContext>
      )}
    </Authenticator>
  );
};

const ProfileSection = styled.div`
  height: 100%;
`;

const UserProfile: React.FC<{ 
  user: User; 
  userGroups: { [key: string]: Groups[] };
  groupList: Groups[];
}> = ({ user, userGroups }) => {
  const sub = user.Attributes.find(attr => attr.Name === "sub")?.Value;
  const preferredUsername = user.Attributes.find(attr => attr.Name === "preferred_username")?.Value;
  const email = user.Attributes.find(attr => attr.Name === "email")?.Value;
  const groups = userGroups[sub || ''] || [];

  return (
    <ProfileContainer>
      <ProfileHeader>
        <h2>{preferredUsername || "Unnamed User"}</h2>
      </ProfileHeader>

      <ProfileInfo>
        <div className="info-item">
          <div className="label">Email</div>
          <div className="value">{email || "Not provided"}</div>
        </div>
        <div className="info-item">
          <div className="label">User ID</div>
          <div className="value">{user.Username}</div>
        </div>
        <div className="info-item">
          <div className="label">Status</div>
          <div className="value">{user.UserStatus}</div>
        </div>
        <div className="info-item">
          <div className="label">Created</div>
          <div className="value">{new Date(user.UserCreateDate).toLocaleDateString()}</div>
        </div>
      </ProfileInfo>
      
      <Droppable droppableId="userGroups">
        {(provided, snapshot) => (
          <DropZone 
            isDraggingOver={snapshot.isDraggingOver}
            ref={provided.innerRef}
            {...provided.droppableProps}
          >
            <h3>User Groups</h3>
            {groups.length > 0 ? (
              <div>
                {groups.map((group, index) => (
                  <Draggable
                    key={`user-${group.GroupName}`}
                    draggableId={`user-${group.GroupName}`}
                    index={index}
                    isDragDisabled={['users', 'admins'].includes(group.GroupName)} // Блокируем перетаскивание для обеих групп
                  >
                    {(provided, ) => (
                      <DraggableGroupItem
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        style={{
                          ...provided.draggableProps.style,
                          cursor: ['users', 'admins'].includes(group.GroupName) ? 'not-allowed' : 'grab'
                        }}
                      >
                        <div className="group-name">{group.GroupName}</div>
                      </DraggableGroupItem>
                    )}
                  </Draggable>
                ))}
              </div>
            ) : (
              <p>Drop groups here to assign them to user</p>
            )}
            {provided.placeholder}
          </DropZone>
        )}
      </Droppable>

      <Droppable droppableId="removeZone">
        {(provided, snapshot) => (
          <DropZone 
            isDraggingOver={snapshot.isDraggingOver}
            ref={provided.innerRef}
            {...provided.droppableProps}
            style={{ marginTop: '20px', background: snapshot.isDraggingOver ? 'rgba(220, 53, 69, 0.1)' : 'transparent' }}
          >
            <p>Drag groups here to remove them from user</p>
            {provided.placeholder}
          </DropZone>
        )}
      </Droppable>
    </ProfileContainer>
  );
};

export default Admin_panel;