import 'react-virtualized/styles.css'
import React, { useEffect } from "react";
import { sizeof } from "sizeof";
import { List } from "react-virtualized";

import { FlyweightState } from "./model";
import { HttpClient } from "./mock"
import { normalize } from "./normalize"

export const UsersList: React.FC = () => {
  const [{ users = [] } = {}, setState] = React.useState<FlyweightState>();

  useEffect(() => {
    HttpClient.getUsers().then(data => {
      const flyweightData = normalize(data);
      console.log(`Cached with proto version: ${sizeof(flyweightData, true)} for ${data.length} records`);
      console.log(`Not cached version: ${sizeof(data, true)}B for ${data.length} records`);
      setState(flyweightData);
    });
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