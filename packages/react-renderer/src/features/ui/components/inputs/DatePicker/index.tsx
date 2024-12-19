import {
  DatePicker as BaseDatePicker,
  DatePickerInputProps,
} from '@mantine/dates';

type DatePickerProps = DatePickerInputProps & {
  value?: Date | null;
  /** Called when date changes */
  onChange?(value: Date | null): void;
  /** Default value for uncontrolled input */
  defaultValue?: Date | null;
  /** Set to false to force dropdown to stay open after date was selected */
  closeCalendarOnChange?: boolean;
  /** dayjs input format */
  inputFormat?: string;
  /** Control initial dropdown opened state */
  initiallyOpened?: boolean;
  /** Parser function for date provided by input typing */
  dateParser?: (value: string) => Date;
  /** Input name, useful for uncontrolled variant to capture data with native form */
  name?: string;
  /** Allow free input */
  allowFreeInput?: boolean;
  /** Render day based on the date */
  renderDay?(date: Date): React.ReactNode;
};

export const DatePicker = ({
  placeholder = 'Выберите дату',
  value = null,
  ...props
}: DatePickerProps) => {
  return (
    <BaseDatePicker
      value={value ? new Date(value) : null}
      placeholder={placeholder}
      {...props}
    />
  );
};
