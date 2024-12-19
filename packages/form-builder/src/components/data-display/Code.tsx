import {
  and,
  ControlProps,
  optionIs,
  RankedTester,
  rankWith,
  uiTypeIs,
} from '@jsonforms/core';
import { withJsonFormsControlProps } from '@jsonforms/react';
import { Text, Code } from '@mantine/core';
import { useQuery } from '@tanstack/react-query';
import { getJsonData } from '~model/services';

type CodeDataDisplayProps = ControlProps;

export const _CodeDataDisplay = ({
  uischema: { options: { url } = {} },
}: CodeDataDisplayProps) => {
  const { data } = useQuery({
    queryKey: ['result', url],
    queryFn: () => getJsonData({ url }),
    enabled: !!url,
  });

  if (!data) {
    return <Text>No data</Text>;
  }

  return <Code>{JSON.stringify(data, null, 2).replaceAll(/\\r/g, '\n')}</Code>;
};

export const CodeDataDisplay = withJsonFormsControlProps(_CodeDataDisplay);

export const codeDataDisplayTester: RankedTester = rankWith(
  10,
  and(uiTypeIs('DataDisplay'), optionIs('element', 'Code'))
);
