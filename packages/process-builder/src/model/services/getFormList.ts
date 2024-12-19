import axios from 'axios';

export const getFormList = async ({
  limit,
  offset,
}: Partial<{
  limit: number;
  offset: number;
}>) => {
  try {
    const { data } = await axios<{ id: string; name: string }[]>({
      url: '/api/v1/forms',
      method: 'GET',
      params: { limit, offset },
    });

    return data;
  } catch (error) {
    console.error(error);

    return null;
  }
};
