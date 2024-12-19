import { JSONValue } from '@finch-cloud/common';
import axios, { AxiosProgressEvent } from 'axios';

export const uploadFiles = async ({
  files,
  onProgress,
  uploadUrl,
}: {
  files: File[];
  onProgress?: (progressEvent: AxiosProgressEvent) => void;
  uploadUrl?: string;
}) => {
  const formData = new FormData();

  files.forEach((file) => {
    formData.append('files', file);
  });

  const { data } = await axios.post(uploadUrl ?? '/api/v1/upload', formData, {
    headers: { 'Content-Type': 'multipart/form-data', Accept: '*/*' },
    onUploadProgress: (progressEvent) => {
      onProgress?.(progressEvent);
    },
  });

  return data;
};

export const getJsonData = async ({ url }: { url: string }) => {
  const { data } = await axios.get<JSONValue>(url, {
    headers: {
      'Content-Type': 'application/json',
    },
  });

  return data;
};
