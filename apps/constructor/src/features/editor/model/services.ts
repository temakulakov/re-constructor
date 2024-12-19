import axios from 'axios';

import { JSONObject, JSONValue } from '@finch-cloud/common';
import { JsonSchema, UISchema } from '@finch-cloud/form-builder';

export const getForms = async ({
  limit,
  offset,
}: {
  limit: number;
  offset: number;
}) => {
  const { data } = await axios.get<
    {
      builder: JSONObject;
      createdAt: string;
      description: string;
      id: string;
      name: string;
      schema: JSONObject;
      uiSchema: JSONObject;
    }[]
  >(`/api/v1/forms`, {
    params: { limit, offset },
  });

  return data;
};

export const getFormById = async ({ id }: { id: string }) => {
  const { data } = await axios.get(`/api/v1/forms/${id}`);

  return data;
};

export const getFormSchema = async (builderData: JSONValue) => {
  const { data } = await axios.post<{
    schema: JsonSchema;
    uiSchema: UISchema;
    submitUrl: string;
  }>('/api/v1/schema', builderData, {
    headers: {
      'Content-Type': 'application/json',
    },
  });

  return data;
};

export const saveFormSchema = async (builderData: JSONValue) => {
  const { data } = await axios.post<{
    schema: JSONValue;
    uiSchema: JSONValue;
    id: string;
  }>('/api/v1/forms', builderData, {
    headers: {
      'Content-Type': 'application/json',
    },
  });

  return data;
};

export const deleteForm = async ({ id }: { id: string }) => {
  const { data } = await axios.delete(`/api/v1/forms/${id}`);

  return data;
};

export const sendFormData = async ({
  formData,
  businessKey,
  formId,
  url,
}: {
  formData: JSONValue;
  formId?: string | null;
  businessKey?: string;
  url?: string | null;
}) => {
  const { data } = await axios.post<
    | {
        type: 'RENDER_VIEW';
        uiSchema: UISchema;
      }
    | {
        type: 'NEXT_FORM'; // TODO: not real type
        businessKey?: string;
        nextFormId: string;
      }
  >(
    url ?? '/api/v1/data',
    { formData, businessKey, formId },
    {
      headers: {
        'Content-Type': 'application/json',
      },
    }
  );

  return data;
};

export const getProcessState = async ({
  businessKey,
  formId,
}: {
  businessKey: string;
  formId: string;
}) => {
  const { data } = await axios.post(
    '/api/v1/process/fetch',
    { businessKey, formId },
    {
      headers: {
        'Content-Type': 'application/json',
      },
    }
  );

  return data;
};
