"use client";

import { Admin, Resource, ListGuesser, EditGuesser, ShowGuesser } from "react-admin";
import { dataProvider } from "ra-data-simple-prisma";
import { ProductCreate } from "./products";

const AdminApp = () => (
  <Admin dataProvider={dataProvider("/api/admin")}>
    <Resource
      name="Product"
      list={ListGuesser}
      edit={EditGuesser}
      create={ProductCreate}
      show={ShowGuesser}
      recordRepresentation="email"
    />
    <Resource name="Session" list={ListGuesser} edit={EditGuesser} />
  </Admin>
);

export default AdminApp;
