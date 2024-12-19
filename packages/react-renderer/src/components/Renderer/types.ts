import React from 'react';
import { InitialData } from '@finch-cloud/common';

export type RendererProps = {
  data: InitialData;
  components?: Record<string, React.FC>;
};

export type ComponentRendererProps = {
  children: InitialData;
  $type: string;
  $id?: number;
} & Pick<RendererProps, 'components'>;

export type ComponentWrapperProps = Pick<ComponentRendererProps, '$id'> & {
  component: React.FC<React.AllHTMLAttributes<Record<string, unknown>>>;
  children?: React.ReactNode;
};
