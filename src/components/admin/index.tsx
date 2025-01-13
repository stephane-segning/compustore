'use client'; // Ensure that the code runs in the browser, not on the server

import { Admin, EditGuesser, ListGuesser, Resource } from 'react-admin';
import {
  ProductCreate,
  ProductEdit,
  ProductList,
  ProductShow,
} from './products';
import { dataProvider } from './provider';

const AdminApp = () => (
  <Admin dataProvider={dataProvider}>
    <Resource
      name='Product'
      list={ProductList}
      edit={ProductEdit}
      create={ProductCreate}
      show={ProductShow}
      recordRepresentation='email'
    />
    <Resource name='Image' list={ListGuesser} edit={EditGuesser} />
    <Resource name='Session' list={ListGuesser} edit={EditGuesser} />
  </Admin>
);

export default AdminApp;
