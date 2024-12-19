import axios from 'axios';

export const sendLoginData = async ({
  login,
  password,
}: {
  login: string;
  password: string;
}) => {
  const { data } = await axios.post<unknown>('/auth/login', null, {
    params: { login, password },
  });

  return data;
};
