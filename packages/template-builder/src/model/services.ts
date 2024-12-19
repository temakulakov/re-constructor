import axios, { AxiosProgressEvent } from 'axios';

import { JSONValue, PropInput } from '@finch-cloud/common';
import { NodeTree } from '~types';

export const uploadFiles = async ({
  files,
  onProgress,
}: {
  files: File[];
  onProgress?: (progressEvent: AxiosProgressEvent) => void;
}) => {
  const formData = new FormData();

  files.forEach((file) => {
    formData.append('files', file);
  });

  const { data } = await axios.post('/api/v1/upload', formData, {
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

export const getTemplates = async ({
  limit = 50,
  offset = 0,
}: {
  limit?: number;
  offset?: number;
}) => {
  const { data } = await axios.get<
    {
      id: string;
      createdAt: string;
      description: string;
      name: string;
      type: string;
      data: NodeTree;
    }[]
  >(`/api/v1/template`, {
    params: { published: false, limit, offset },
  });

  return data;
};

export const getTemplateById = async ({ id }: { id: string }) => {
  const { data } = await axios.get<{
    id: string;
    createdAt: string;
    description: string;
    name: string;
    type: string;
    data?: { layout: NodeTree; inputs?: PropInput[] };
  }>(`/api/v1/template/${id}`);

  return data;
};

export const deleteTemplate = async ({ id }: { id: string }) => {
  const { data } = await axios.delete(`/api/v1/template/${id}`);

  return data;
};

export const createTemplate = async ({ name }: { name: string }) => {
  const { data } = await axios.post(
    '/api/v1/template',
    { name, published: true },
    {
      headers: {
        'Content-Type': 'application/json',
      },
    }
  );

  return data;
};

export const saveTemplate = async ({
  id,
  data: templateData,
  name,
  description,
}: {
  id: string;
  data?: NodeTree;
  name: string;
  description?: string;
}) => {
  const { data } = await axios.put(
    `/api/v1/template/${id}`,
    { data: templateData, name, description },
    {
      headers: {
        'Content-Type': 'application/json',
      },
    }
  );

  return data;
};

export const templateServices = {
  getTemplateById,
  getTemplates,
  createTemplate,
  saveTemplate,
  deleteTemplate,
};
