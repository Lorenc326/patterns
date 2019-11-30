import 'react-virtualized/styles.css'
import React, { useEffect } from "react";
import { List } from "react-virtualized";

import { Permissions, User } from "./model";
import { HttpClient } from "./mock"

type State = {
  cache: {
    [key: string]: Permissions[];
  };
  users: User[];
}

export const UsersList: React.FC = () => {
  const [{ users = [] } = {}, setState] = React.useState<State>();

  useEffect(() => {
    HttpClient.getUsers().then(d => setState({ cache: {}, users: d }))
  }, [setState])

  return !!users.length ?  (
    <List
      height={600}
      rowHeight={40}
      rowCount={users.length}
      width={1000}
      rowRenderer={({ index, key, style }) => {
        const user = users[index];
        return (
        <div key={key} style={{ height: 40, padding: 10, ...style }}>
          <b>{`${user.firstName} ${user.lastName} `}</b>
          <i>allowed: {user.permissions.toString()}</i>
        </div>
      )}}
    />
  ) : null;
}