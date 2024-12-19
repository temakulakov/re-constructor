import { FormRenderer } from '~components/FormRenderer';
import { renderers } from '~components/renderers';

type FormBuilderProps = Omit<
  React.ComponentPropsWithoutRef<typeof FormRenderer>,
  'renderers'
>;

export const FormBuilder = (props: FormBuilderProps) => {
  return <FormRenderer {...props} renderers={renderers} />;
};
