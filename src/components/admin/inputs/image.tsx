import React from 'react';
import { FileInput, type FileInputProps } from 'react-admin';
import { useController } from 'react-hook-form';
import { uploadFile } from '../upload';
import { Image } from '@prisma/client';

export default function AutoUploadImageInput({
                                               source,
                                               ...props
                                             }: FileInputProps) {
  const { field } = useController({ name: source });
  const { mutate } = uploadFile();

  const handleFileChange = async (fileOrFiles: any) => {
    if (!fileOrFiles) return;
    if (fileOrFiles instanceof File) {
      const file = fileOrFiles as File;

      try {
        const { publicUrl } = await mutate(file);
        field.onChange({
          ...(field.value || {}),
          url: publicUrl,
          title: file.name
        } as Image);
      } catch (error) {
        console.error('Error uploading file:', error);
      }

    } else if (fileOrFiles instanceof Array) {
      const files = fileOrFiles as File[];

      const promises = files.map(async (file, idx) => {
        const { publicUrl } = await mutate(file);
        return ({
          ...(field.value?.[idx] || {}),
          url: publicUrl,
          title: file.name
        } as Image);
      });

      const results = await Promise.all(promises);
      field.onChange(results);
    } else {
      console.warn('Invalid file type:', fileOrFiles);
    }
  };

  return (
    <FileInput
      {...props}
      onChange={handleFileChange}
      source={source}
      labelMultiple="ra.input.image.upload_several"
      labelSingle="ra.input.image.upload_single"
    />
  );
};