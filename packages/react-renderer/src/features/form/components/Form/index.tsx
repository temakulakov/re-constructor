import { useEffect } from 'react';
import { useForm, FormProvider } from 'react-hook-form';
import { parse, stringify } from 'qs';
import pick from 'lodash/pick';

import { useFormStore } from '../../model/formSlice';

export type FieldValues = {
  [key: string]: string | number | null | string[] | number[] | FieldValues;
};

type FormProps = {
  children: React.ReactNode;
  defaultValues?: FieldValues;
  namespace: string;
};

export const Form = ({
  children,
  defaultValues = {},
  namespace,
}: FormProps) => {
  const formState = useFormStore((store) => store.namespaces[namespace]);
  const setNamespaceData = useFormStore((store) => store.setNamespaceData);
  const methods = useForm<FieldValues>({ defaultValues });

  // Init form with store values
  useEffect(() => {
    if (formState) {
      const fieldNames = Object.keys(methods.getValues());
      methods.reset(pick(formState, fieldNames) as FieldValues);
    }
  }, [formState, namespace, methods]);

  // Push each update of store values to url params
  useEffect(() => {
    if (formState) {
      const searchParams = stringify({ [namespace]: formState });
      const newRelativePathQuery = `${window.location.pathname}?${searchParams}`;
      window.history.pushState(null, '', newRelativePathQuery);
    }
  }, [formState, namespace, methods]);

  // Init store values with url params
  useEffect(() => {
    const currentParams = parse(window.location.search.substring(1)) as {
      [key: string]: { [key: string]: JSONValue };
    };

    if (Reflect.has(currentParams, namespace)) {
      setNamespaceData(namespace, currentParams[namespace]);
    }
  }, [methods, namespace, setNamespaceData]);

  const onSubmit = (data: { [key: string]: JSONValue }) => {
    if (namespace) {
      setNamespaceData(namespace, data);
    }
  };

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)}>{children}</form>
    </FormProvider>
  );
};
