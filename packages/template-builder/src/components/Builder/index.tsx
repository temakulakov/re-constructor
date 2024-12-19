'use client';

import { useEffect, useState } from 'react';
import { useQuery } from '@tanstack/react-query';

import { widgets } from '@finch-cloud/react-renderer';
import { useBuilderStore } from '~model/builderSlice';
import { getTemplateById } from '~model/services';
import { LayoutZone } from '~components/LayoutZone';
import { SettingsTabs } from './SettingsTabs';
import classes from './Builder.module.css';

type BuilderProps = {
  templateId: string;
};

export const Builder = ({ templateId }: BuilderProps) => {
  const [isReady, setIsReady] = useState(false);
  const { initNodesFromTree, setCurrentTemplateId, setTemplateSettings } =
    useBuilderStore();

  const { data: template } = useQuery({
    queryKey: ['template', templateId],
    queryFn: () => getTemplateById({ id: templateId as string }),
    enabled: !!templateId,
  });

  useEffect(() => {
    setCurrentTemplateId(templateId);
  }, [setCurrentTemplateId, templateId]);

  useEffect(() => {
    if (!isReady && template) {
      initNodesFromTree(
        template?.data?.layout ?? {
          name: widgets.FRAGMENT.config.name,
          children: [],
        }
      );
      setTemplateSettings({
        description: template?.description,
        inputs: template?.data?.inputs ?? [],
      });

      setIsReady(true);
    }
  }, [initNodesFromTree, template, templateId, isReady, setTemplateSettings]);

  return (
    <div className={classes.wrapper}>
      <LayoutZone />
      <SettingsTabs />
    </div>
  );
};
