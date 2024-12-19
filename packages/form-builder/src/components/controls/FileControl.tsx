import { useState } from 'react';
import { AxiosError } from 'axios';
import {
  ControlProps,
  optionIs,
  RankedTester,
  rankWith,
} from '@jsonforms/core';
import { withJsonFormsControlProps } from '@jsonforms/react';
import { FileInput, Progress, Stack } from '@mantine/core';
import { useMutation } from '@tanstack/react-query';

import { UploadIcon } from '@finch-cloud/common';
import { uploadFiles } from '~model/services';

export const FileControl = withJsonFormsControlProps(
  ({
    required,
    label,
    errors,
    handleChange,
    path,
    schema,
    enabled,
    uischema: { options: { placeholder, readOnly, accept, uploadUrl } = {} },
  }: ControlProps) => {
    const [progress, setProgress] = useState(0);
    const [error, setError] = useState<string | null>(null);

    const multiple = schema.type === 'array';

    const uploadFilesMutation = useMutation<
      string[],
      AxiosError,
      { files: File[] }
    >({
      mutationFn: ({ files }) =>
        uploadFiles({
          uploadUrl,
          files,
          onProgress: (progressEvent) => {
            if (progressEvent.total) {
              setProgress(
                Math.round((progressEvent.loaded * 100) / progressEvent.total)
              );
            }
          },
        }),
      onMutate: () => {
        setError(null);
        setProgress(0);
      },
      onError: (apiError) => {
        setProgress(0);
        setError(apiError.message);
      },
      onSuccess: (response) => {
        if (response.length > 0) {
          handleChange(path, multiple ? response : response[0]);
        }
      },
    });

    const onChange = (value: File | File[] | null) => {
      if (value) {
        uploadFilesMutation.mutate({
          files: value instanceof File ? [value] : value,
        });
      }
    };

    return (
      <Stack>
        <FileInput
          leftSection={<UploadIcon />}
          label={label}
          error={errors || error}
          onChange={onChange}
          required={required}
          placeholder={placeholder || label}
          multiple={multiple}
          disabled={readOnly || !enabled}
          accept={accept?.join(',')}
        />
        <Progress
          value={progress}
          animated={uploadFilesMutation.isLoading}
          size="md"
        />
      </Stack>
    );
  }
);

export const fileControlTester: RankedTester = rankWith(
  10,
  optionIs('element', 'FileInput')
);
