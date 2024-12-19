'use client';

import { Container, Title, Paper, Button } from '@mantine/core';
import { PasswordInput, TextInput } from 'react-hook-form-mantine';
import { z } from 'zod';
import { useRouter } from 'next/navigation';
import { useMutation } from '@tanstack/react-query';

import { useForm } from '@finch-cloud/common';
import { sendLoginData } from '~features/auth/model/services';

const schema = z.object({
  login: z.string().trim().min(1),
  password: z.string().trim().min(1),
});

const defaultValues = {
  login: '',
  password: '',
};

export const LoginView = () => {
  const { control, handleSubmit } = useForm({
    schema,
    defaultValues,
  });
  const router = useRouter();

  const loginMutation = useMutation({
    mutationFn: sendLoginData,
    onSuccess: () => {
      router.push('/');
    },
  });

  const onSubmit = handleSubmit((values) => {
    loginMutation.mutate(values);
  });

  return (
    <Container size={420}>
      <Title ta="center" pt={40}>
        Login
      </Title>
      <Paper withBorder shadow="md" p={30} mt={30} radius="md">
        <form onSubmit={onSubmit}>
          <TextInput
            name="login"
            label="Login"
            placeholder="Login"
            required
            control={control}
          />
          <PasswordInput
            name="password"
            label="Password"
            placeholder="Password"
            required
            mt="md"
            control={control}
          />
          <Button fullWidth mt="xl" type="submit">
            Sign in
          </Button>
        </form>
      </Paper>
    </Container>
  );
};
