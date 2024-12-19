import { notifications as _notifications } from '@mantine/notifications';
import { CheckCircleIcon } from '@finch-cloud/common';

type StatusTypes = 'error' | 'warning' | 'success';

export const notifications = {
  show: ({
    type,
    title,
    message = '',
  }: {
    type: StatusTypes;
    title: string;
    message?: string;
  }) => {
    const icon = (() => {
      if (type === 'success') {
        return <CheckCircleIcon fontSize="21px" />;
      }

      return null;
    })();

    _notifications.show({
      title,
      message,
      icon,
      styles: (theme) => ({
        title: {
          fontSize: '16px',
        },
        icon: {
          backgroundColor: 'transparent',
          color: theme.colors.blue[6],
        },
      }),
    });
  },
};
