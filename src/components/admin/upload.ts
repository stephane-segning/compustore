import { api } from '@cps/trpc/react';
import { getApiClient } from '@cps/utils/axios';
import { useCallback } from 'react';
import { useMutation } from '@tanstack/react-query';

export type MinioUploadRequest = Record<string, string>;
export type MinioUploadResponse = Record<string, string>;

export function uploadFile() {
  const utils = api.useUtils();
  const { mutateAsync: upload, ...uploadResults } = useMutation({
    mutationFn: async ({ url, file }: { file: File, url: string }) => {
      await getApiClient().put<MinioUploadRequest, MinioUploadResponse>(url, file);
    }
  });
  const { mutateAsync: getLink, ...getLinkResults } = api.upload.getUploadUrl.useMutation({
    onSuccess: async () => {
      await utils.upload.invalidate();
    }
  });

  return {
    upload: uploadResults,
    link: getLinkResults,
    mutate: useCallback(async (file: File) => {
      const { url, publicUrl } = await getLink({
        filename: file.name
      });
      await upload({ url, file });
      return { publicUrl };
    }, [upload, getLink])
  };
}