import cx from 'clsx';

import { Container } from '~features/ui/components/Container';
import { Typography } from '~features/ui/components/Typography';
import { CustomerForm, FormConfigType } from './CustomerForm';
import classes from './Feedback.module.css';

const availableFields: (keyof FormConfigType['fields'])[] = [
  'task',
  'business',
  'contacts',
];

const config = {
  buttonText: 'Отправить',
  modalTitle: 'Укажите электронную почту для доступа',
  codeEmailModalTitle: 'Для доступа необходим код',
  fields: {
    code: 'Код доступа',
    task: 'Вас зовут:',
    business: 'Ваша компания называется:',
    contacts: 'Ваш тел/мейл: *',
  },
  message: 'Спасибо! Мы свяжемся с вами в течение дня',
  codeModalTitle: 'Код доступа',
  tgcontact: 'https://t.me/dshipachev',
};

type FeedbackProps = {
  caption?: string;
  title?: string;
  text?: string;
};

export const Feedback = ({ caption, title, text }: FeedbackProps) => {
  return (
    <div className={cx(classes.wrapper, 'contacts-form')}>
      <Container hasGridLines={false}>
        <div className={classes.grid}>
          <div>
            <Typography className={classes.caption} variant="caption">
              {caption}
            </Typography>
          </div>
          <CustomerForm
            title={title}
            text={text}
            config={config}
            fields={availableFields}
            telegramLinkShown
          />
        </div>
      </Container>
    </div>
  );
};
