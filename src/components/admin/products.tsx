import React from 'react';
import {
  Create,
  Edit,
  SimpleForm,
  TextInput,
  NumberInput,
  BooleanInput,
  SelectInput,
  ReferenceArrayInput,
  SelectArrayInput,
  ImageInput,
  ImageField,
  ArrayInput,
  SimpleFormIterator,
  DateInput,
} from 'react-admin';
import { useRecordContext } from 'react-admin';
import { Box, Typography } from '@mui/material';

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
        { id: 'PUBLISHED', name: 'Published' },
      ]}
    />

    {/* Product Thumbnail */}
    <ImageInput source="thumbnail" label="Thumbnail" accept={{ 'image/*': ['.png', '.jpg'] }}>
      <ImageField source="src" title="title" />
    </ImageInput>

    {/* Additional Product Images */}
    <ImageInput source="images" label="Additional Images" accept={{ 'image/*': ['.png', '.jpg'] }} multiple>
      <ImageField source="src" title="title" />
    </ImageInput>

    {/* Product Prices */}
    <ArrayInput source="prices" label="Prices">
      <SimpleFormIterator>
        <NumberInput source="price" label="Price" />
        <TextInput source="currency" label="Currency" />
      </SimpleFormIterator>
    </ArrayInput>

    {/* Product Stocks */}
    <ArrayInput source="stocks" label="Stock Levels">
      <SimpleFormIterator>
        <NumberInput source="stock" label="Stock Quantity" />
      </SimpleFormIterator>
    </ArrayInput>

    {/* Product Variants */}
    <ArrayInput source="variants" label="Variants">
      <SimpleFormIterator>
        <TextInput source="name" label="Variant Name" />
        <TextInput source="description" label="Variant Description" />

        {/* Variant Prices */}
        <ArrayInput source="prices" label="Variant Prices">
          <SimpleFormIterator>
            <NumberInput source="price" label="Price" />
            <TextInput source="currency" label="Currency" />
          </SimpleFormIterator>
        </ArrayInput>

        {/* Variant Stock */}
        <ArrayInput source="stocks" label="Variant Stock Levels">
          <SimpleFormIterator>
            <NumberInput source="stock" label="Stock Quantity" />
          </SimpleFormIterator>
        </ArrayInput>

        {/* Variant Thumbnail */}
        <ImageInput source="thumbnail" label="Variant Thumbnail" accept={{ 'image/*': ['.png', '.jpg'] }}>
          <ImageField source="src" title="title" />
        </ImageInput>

        {/* Additional Variant Images */}
        <ImageInput source="images" label="Variant Images" accept={{ 'image/*': ['.png', '.jpg'] }} multiple>
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
