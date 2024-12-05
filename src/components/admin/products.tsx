import React from 'react';
import {
  ArrayInput,
  BooleanField,
  BooleanInput,
  Create,
  Datagrid,
  DateField,
  Edit,
  EditButton,
  Filter,
  FunctionField,
  ImageField,
  ImageInput,
  List,
  NumberInput,
  ReferenceField,
  ReferenceManyField,
  SelectInput,
  Show,
  SimpleForm,
  SimpleFormIterator,
  SimpleShowLayout,
  TextField,
  TextInput,
  useRecordContext
} from 'react-admin';
import { Box, Typography } from '@mui/material';
import AutoUploadImageInput from '@cps/components/admin/inputs/image';

const ProductFilter = (props: any) => (
  <Filter {...props}>
    <TextInput label="Search by Name" source="name" alwaysOn />
    <SelectInput
      label="Status"
      source="status"
      choices={[
        { id: 'DRAFT', name: 'Draft' },
        { id: 'PUBLISHED', name: 'Published' }
      ]}
    />
    <SelectInput
      label="Digital Product"
      source="isDigital"
      choices={[
        { id: true, name: 'Yes' },
        { id: false, name: 'No' }
      ]}
    />
  </Filter>
);

export const ProductList = (props: any) => (
  <List filters={<ProductFilter />} {...props}>
    <Datagrid rowClick="edit">
      {/* Thumbnail Image */}
      <ImageField source="thumbnail.url" label="Thumbnail" />

      {/* Product Basic Fields */}
      <TextField source="name" label="Product Name" />
      <TextField source="description" label="Description" />
      <BooleanField source="isDigital" label="Digital" />
      <TextField source="status" label="Status" />

      {/* Display Price (Assuming first price entry) */}
      <FunctionField
        label="Price"
        render={(record) =>
          record.prices && record.prices.length > 0
            ? `${record.prices[0].price} ${record.prices[0].currency}`
            : 'N/A'
        }
      />

      {/* Display Stock (Assuming total stock) */}
      <FunctionField
        label="Stock"
        render={(record: any) =>
          record.stocks && record.stocks.length > 0
            ? record.stocks.reduce((total: any, stock: any) => total + stock.stock, 0)
            : 'N/A'
        }
      />

      <DateField source="createdAt" label="Created At" />
      <EditButton />
    </Datagrid>
  </List>
);


const ProductTitle = () => {
  const record = useRecordContext();
  return <span>Product {record ? `"${record.name}"` : ''}</span>;
};

// Common form component for creating and editing a product
const ProductForm = () => (
  <SimpleForm>
    {/* Product Basic Fields */}
    <TextInput source="name" label="Product Name" fullWidth />
    <TextInput source="description" label="Description" multiline fullWidth />
    <BooleanInput source="isDigital" label="Digital Product" />
    <SelectInput
      source="status"
      label="Status"
      choices={[
        { id: 'DRAFT', name: 'Draft' },
        { id: 'PUBLISHED', name: 'Published' }
      ]}
    />

    {/* Product Thumbnail */}
    <AutoUploadImageInput source="thumbnail.create" label="Thumbnail"
                          accept={{ 'image/*': ['.png', '.jpg'] }}>
      <ImageField source="url" title="title" />
    </AutoUploadImageInput>

    {/* Additional Product Images */}
    <AutoUploadImageInput isRequired source="images.create" label="Additional Images"
                          accept={{ 'image/*': ['.png', '.jpg'] }} multiple>
      <ImageField source="url" title="title" />
    </AutoUploadImageInput>

    {/* Product Prices */}
    <ArrayInput source="prices.create" label="Prices">
      <SimpleFormIterator>
        <NumberInput required source="price" label="Price" />
        <SelectInput
          required
          source="currency"
          label="Currency"
          choices={[
            { id: 'XAF', name: 'XAF' },
            { id: 'USD', name: 'USD' }
          ]}
        />
      </SimpleFormIterator>
    </ArrayInput>

    {/* Product Stocks */}
    <ArrayInput source="stocks.create" label="Stock Levels">
      <SimpleFormIterator>
        <NumberInput source="stock" label="Stock Quantity" />
      </SimpleFormIterator>
    </ArrayInput>

    {/* Product Variants */}
    <ArrayInput source="variants.create" label="Variants">
      <SimpleFormIterator>
        <TextInput source="name" label="Variant Name" />
        <TextInput source="description" label="Variant Description" />

        {/* Variant Prices */}
        <ArrayInput source="prices.create" label="Variant Prices">
          <SimpleFormIterator>
            <NumberInput source="price" label="Price" />
            <TextInput source="currency" label="Currency" />
          </SimpleFormIterator>
        </ArrayInput>

        {/* Variant Stock */}
        <ArrayInput source="stocks.create" label="Variant Stock Levels">
          <SimpleFormIterator>
            <NumberInput source="stock" label="Stock Quantity" />
          </SimpleFormIterator>
        </ArrayInput>

        {/* Variant Thumbnail */}
        <ImageInput source="thumbnail" label="Variant Thumbnail" accept={{ 'image/*': ['.png', '.jpg'] }}>
          <ImageField source="src" title="title" />
        </ImageInput>

        {/* Additional Variant Images */}
        <ImageInput source="images.create" label="Variant Images" accept={{ 'image/*': ['.png', '.jpg'] }} multiple>
          <ImageField source="src" title="title" />
        </ImageInput>
      </SimpleFormIterator>
    </ArrayInput>
  </SimpleForm>
);

const Aside = () => (
  <Box sx={{ width: '200px', margin: '1em' }}>
    <Typography variant="h6">Instructions</Typography>
    <Typography variant="body2">
      Posts will only be published once an editor approves them
    </Typography>
  </Box>
);

const ShowAside = () => (
  <Box sx={{ display: 'flex', flexDirection: 'column' }}>
    <Typography variant="h6">
      <TextField source="id" />
    </Typography>

    <TextField source="status" />
    <BooleanField source="isDigital" />

    <DateField source="createdAt" />
    <DateField source="updatedAt" />
  </Box>
);

// Edit Component
export const ProductEdit = () => (
  <Edit title={<ProductTitle />} aside={<Aside />}>
    <ProductForm />
  </Edit>
);

// Create Component
export const ProductCreate = () => (
  <Create title="Create a Product" aside={<Aside />}>
    <ProductForm />
  </Create>
);

export const ProductShow = () => (
  <Show aside={<ShowAside />}>
    <SimpleShowLayout>
      <TextField source="name" />
      <TextField source="description" />

      <ReferenceField label="Thumbnail" reference="Image" source="thumbnailId" link={false}>
        <ImageField source="url" title="title" />
      </ReferenceField>

      <ReferenceManyField label="Images" reference="Image" target="productId">
        <Datagrid rowClick={false} title="Images" hover={false} isRowSelectable={() => false} bulkActionButtons={false}>
          <ImageField source="url" title="title" />
        </Datagrid>
      </ReferenceManyField>

    </SimpleShowLayout>
  </Show>
);