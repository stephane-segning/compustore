"use client";

import { Admin, Resource, ListGuesser, EditGuesser } from "react-admin";
import { dataProvider } from "ra-data-simple-prisma";

const AdminApp = () => (
  <Admin dataProvider={dataProvider("/api/admin")}>
    <Resource
      name="Product"
      list={ListGuesser}
      edit={EditGuesser}
      create={EditGuesser}
      recordRepresentation="email"
    />
    <Resource name="Session" list={ListGuesser} edit={EditGuesser} />
  </Admin>
);

export default AdminApp;
