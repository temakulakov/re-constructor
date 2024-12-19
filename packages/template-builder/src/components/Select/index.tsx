import { useMemo } from 'react';
import { Select as BaseSelect, SelectProps } from 'react-hook-form-mantine';
import { useQuery } from '@tanstack/react-query';

import { getJsonData } from '~model/services';

type SelectControlProps = SelectProps;

export const ManualSelect = ({
  options = [],
  ...props
}: SelectControlProps) => {
  return <BaseSelect checkIconPosition="right" {...props} />;
};

export const MappedSelect = ({ url, name, ...props }: SelectControlProps) => {
  const { data } = useQuery({
    queryKey: ['fieldData', name],
    queryFn: () => getJsonData({ url: url }),
    enabled: !!url,
  });

  const options = useMemo(() => {
    if (data) {
      return data?.map((item) => {
        return {
          value: item.value || item.id,
          label: item.label || item.value || item.name,
        };
      }) as { value: string; label: string }[];
    }

    return [];
  }, [data]);

  return (
    <Select checkIconPosition="right" name={name} data={options} {...props} />
  );
};

export const Select = ({ mode, ...props }: SelectControlProps) => {
  if (mode) {
    if (mode === 'mapped') {
      return <MappedSelect {...props} />;
    }

    if (mode === 'manual') {
      return <ManualSelect {...props} />;
    }
  }

  return <ManualSelect {...props} />;
};
