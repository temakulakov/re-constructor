'use client';

import { useState, useMemo, forwardRef } from 'react';
import { JSONObject } from '@finch-cloud/common';
import { Accordion, Button, Code, Flex, Stack, Title } from '@mantine/core';
import { useMutation, useQuery } from '@tanstack/react-query';
import isEmpty from 'lodash/isEmpty';
import { useRouter } from 'next/navigation';

import { useEditorStore } from '~features/editor/model/edtiorSlice';
import { useDebounce } from '~hooks/useDebounce';
import { Pane } from '~features/editor/components/Pane';
import {
  getFormSchema,
  getProcessState,
} from '~features/editor/model/services';
import { TemplateFormRenderer } from '../../TemplateFormRenderer';
import classes from './TemplateRenderer.module.css';

type TemplateRendererProps = {
  formId: string;
};

export const TemplateRenderer = forwardRef<
  HTMLDivElement,
  TemplateRendererProps
>(({ formId }, ref) => {
  const [isRefreshing, setIsRefreshing] = useState(false);
  const router = useRouter();
  const { builderData, businessKey, setBusinessKey } = useEditorStore();
  const debouncedData = useDebounce(builderData);

  const getProcessStateMutation = useMutation({
    mutationFn: getProcessState,
    onSuccess: (response) => {
      if (response) {
        if (response?.form && response.form.type === 'SUBMIT') {
          router.push(`/forms/${response?.form.formId}`);
          setIsRefreshing(false);
        }
      }
    },
  });

  const { data } = useQuery({
    queryKey: ['formSchemas', formId, debouncedData],
    queryFn: () => getFormSchema(debouncedData),
    enabled: !!formId && !isEmpty(debouncedData),
  });
  const [context, setContext] = useState<JSONObject>();
  const { schema, uiSchema, submitUrl } = useMemo(() => {
    return data ?? { schema: null, uiSchema: {}, submitUrl: '' };
  }, [data]);

  const onSubmit = async (response: {
    businessKey?: string;
    context?: JSONObject;
    form?: { type: 'SUBMIT' | 'REFRESH'; formId: string };
  }) => {
    if (response.businessKey) {
      setBusinessKey(response.businessKey);
    }

    if (response.context) {
      setContext(response.context);
    }

    if (response?.form && response.form.type === 'SUBMIT') {
      router.push(`/forms/${response?.form.formId}`);
      setIsRefreshing(false);
    }

    if (response?.form && response.form.type === 'REFRESH') {
      setIsRefreshing(true);
    }
  };

  const initialData = useMemo(() => {
    if (context && schema) {
      return Object.entries(context).reduce<JSONObject>((acc, [key, value]) => {
        if (schema.properties?.[key]) {
          acc[key] = value;
        }

        return acc;
      }, {});
    }

    return undefined;
  }, [context, schema]);

  const onRefreshButtonClick = () => {
    getProcessStateMutation.mutate({ businessKey, formId });
  };

  return (
    <Pane
      preferredSize="20%"
      title="Form renderer"
      // toolbar={
      //   formId ? (
      //     <Link href={`/forms/preview/${formId}`}>
      //       <ActionIcon component="span">
      //         <WindowOpenIcon />
      //       </ActionIcon>
      //     </Link>
      //   ) : null
      // }
      ref={ref}
    >
      <div className={classes.wrapper}>
        {schema && (
          <TemplateFormRenderer
            schema={schema}
            uiSchema={uiSchema}
            submitUrl={submitUrl}
            formId={formId}
            businessKey={businessKey}
            onSubmit={onSubmit}
            initialData={initialData}
            readonly={isRefreshing}
          />
        )}
        {isRefreshing && (
          <Flex maw={400} w="100%" pt={12} justify="flex-end">
            <Button
              onClick={onRefreshButtonClick}
              loading={getProcessStateMutation.isLoading}
            >
              Refresh
            </Button>
          </Flex>
        )}
        <br />
        <Accordion>
          <Accordion.Item value="debug">
            <Accordion.Control> Debug Info:</Accordion.Control>
            <Accordion.Panel>
              <Stack>
                <Title size={16}>Schema:</Title>
                <pre>
                  <Code>{JSON.stringify(schema, null, 2)}</Code>
                </pre>
                <Title size={16}>UI Schema:</Title>
                <pre>
                  <Code>{JSON.stringify(uiSchema, null, 2)}</Code>
                </pre>
              </Stack>
            </Accordion.Panel>
          </Accordion.Item>
        </Accordion>
        {/* {currentView === 'iframe' && <div />} */}
        {/* {currentView === 'json' && (
                <Box p={16}>
                  <pre>
                    <code>{JSON.stringify(editorStore.data, null, 2)}</code>
                  </pre>
                </Box>
              )} */}
      </div>
    </Pane>
  );
});

TemplateRenderer.displayName = 'Allotment.Pane';
