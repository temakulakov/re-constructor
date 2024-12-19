import { useMemo } from 'react';
import { AnyZodObject, z } from 'zod';
import cx from 'clsx';

import { useForm } from '@finch-cloud/common';
import { Typography } from '~features/ui/components/Typography';
import typographyClasses from '~features/ui/components/Typography/Typography.module.css';
import { Button } from '~features/ui/components/Button';
import { FormConfigType } from './types';
import classes from './Customer.module.css';

export type { FormConfigType } from './types';

type CustomerFormProps = {
  title?: string;
  text?: string;
  config: FormConfigType;
  fields: (keyof FormConfigType['fields'])[];
  telegramLinkShown?: boolean;
  isLoading?: boolean;
  validationSchema?: AnyZodObject;
};

const schema = z.object({
  business: z.string().trim(),
  task: z.string().trim(),
  contacts: z.string().email('email or phone'),
});

const getFormFields = (
  fields: FormConfigType['fields'],
  availableFields: (keyof FormConfigType['fields'])[]
) => {
  return Object.entries(fields).reduce<Record<string, string>>(
    (fieldObject, [configPropertyKey, configPropertyValue]) => {
      if (
        availableFields.includes(
          configPropertyKey as keyof FormConfigType['fields']
        )
      ) {
        fieldObject[configPropertyKey] = configPropertyValue;
      }

      return fieldObject;
    },
    {}
  );
};

export const CustomerForm = ({
  title,
  text,
  config,
  fields: availableFields,
  telegramLinkShown,
  isLoading,
  validationSchema,
}: CustomerFormProps) => {
  const formValidationSchema = useMemo(
    () => (validationSchema ? schema.merge(validationSchema) : schema),
    [validationSchema]
  );

  const {
    handleSubmit,
    register,
    formState: { isSubmitSuccessful, errors },
  } = useForm({ schema: formValidationSchema });

  const {
    message: successfullSubmitText,
    buttonText,
    tgcontact,
    fields,
  } = config || {};

  const formFields = getFormFields(fields, availableFields);

  const onSubmit = handleSubmit(async (data) => {
    try {
      // await sendFormData({
      //   variables: { data },
      // });
    } catch (e) {
      console.log(e);
    }
  });

  return (
    <div className={classes.block}>
      {!isSubmitSuccessful && (
        <>
          {title && (
            <Typography variant="h3" className={classes.title}>
              {title}
            </Typography>
          )}
          {text && (
            <div
              className={cx(
                typographyClasses.p1,
                typographyClasses['nested-text']
              )}
              dangerouslySetInnerHTML={{ __html: text }}
            />
          )}
          <form className={classes.form} onSubmit={onSubmit}>
            {Object.entries(formFields).map(
              ([formFieldKey, formFieldValue]) => (
                <input
                  key={formFieldKey}
                  className={cx(classes.input, typographyClasses.p2)}
                  type="text"
                  placeholder={formFieldValue}
                  {...register(formFieldKey)}
                />
              )
            )}
            <div className={classes.buttons}>
              <Button
                className={classes.button}
                type="submit"
                disabled={isLoading || isSubmitSuccessful}
              >
                {buttonText || 'Отправить'}
              </Button>
              {telegramLinkShown && (
                <Button
                  variant="secondary"
                  className={classes.link}
                  route={tgcontact}
                >
                  Написать в телеграм
                </Button>
              )}
            </div>
          </form>
        </>
      )}
      {isSubmitSuccessful && (
        <Typography variant="h3" className={classes.title}>
          {successfullSubmitText}
        </Typography>
      )}
      {Object.keys(errors).length ? (
        <Typography variant="p2" className={classes.error}>
          Правильно заполните поля
        </Typography>
      ) : null}
    </div>
  );
};
