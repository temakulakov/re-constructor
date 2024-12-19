import axios from 'axios';

export const getFormById = async ({ id }: { id: string }) => {
  const { data } = await axios.get(`/api/v1/forms/${id}`);

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
        uiSchema: JSONValue;
      }
    | {
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
