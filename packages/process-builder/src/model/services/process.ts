import axios from 'axios';
import { Process } from '~types';

export const fetchProcessList = async ({
  limit,
  offset,
}: Partial<{
  limit: number;
  offset: number;
}>) => {
  try {
    const { data } = await axios<{ id: string; name: string }[]>({
      url: '/api/v1/process/definitions/list',
      method: 'GET',
      params: { limit, offset },
    });

    return data;
  } catch (error) {
    console.error(error);

    return null;
  }
};

export const fetchProcessData = async ({ id }: { id: Process['id'] }) => {
  try {
    const { data } = await axios<Process>({
      url: `/api/v1/process/definitions/${id}`,
      method: 'GET',
    });

    return data;
  } catch (error) {
    console.error(error);

    return null;
  }
};

// TODO should be changed after save process method gets implemented in api
export const saveProcess = async ({ schema, name, id }: Process) => {
  const formData = new FormData();
  const blob = new Blob([schema], { type: 'text/xml' });

  formData.append('schema', blob, `${name}.bpmn`);
  formData.append('id', id);

  try {
    const { data } = await axios({
      url: '/api/v1/process/deploy',
      method: 'POST',
      data: formData,
      headers: { 'Content-Type': 'multipart/form-data' },
    });

    return data;
  } catch (error) {
    console.error(error);

    return null;
  }
};

export const createProcess = async ({
  schema,
  name,
}: Pick<Process, 'schema' | 'name'>) => {
  const formData = new FormData();
  const blob = new Blob([schema], { type: 'text/xml' });

  formData.append('schema', blob, `${name}.bpmn`);

  try {
    const { data } = await axios({
      url: '/api/v1/process/deploy',
      method: 'POST',
      data: formData,
      headers: { 'Content-Type': 'multipart/form-data' },
    });

    return data;
  } catch (error) {
    console.error(error);

    return null;
  }
};

export const deleteProcess = async (id: Process['id']) => {
  try {
    const { data } = await axios({
      url: `/api/v1/process/${id}`,
      method: 'DELETE',
    });

    return data;
  } catch (error) {
    console.error(error);

    return null;
  }
};
