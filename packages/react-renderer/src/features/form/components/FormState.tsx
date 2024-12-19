import { useFormStore } from '../model/formSlice';

type FormStateProps = {
  namespace: string;
};

export const FormState = ({ namespace }: FormStateProps) => {
  const formState = useFormStore((store) => store.namespaces[namespace]);

  return (
    <>
      <h2>Namespace &quot;{namespace}&quot; State debug: </h2>
      <code>{JSON.stringify(formState)}</code>
    </>
  );
};
