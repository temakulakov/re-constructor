import { Checkbox } from '@mantine/core';
import merge from 'lodash/merge';

import {
  isBooleanControl,
  RankedTester,
  rankWith,
  ControlProps,
  isDescriptionHidden,
} from '@jsonforms/core';
import { withJsonFormsControlProps } from '@jsonforms/react';
import { ChangeEvent } from 'react';

export const BooleanControl = withJsonFormsControlProps(
  ({
    data,
    visible,
    label,
    id,
    enabled,
    uischema,
    handleChange,
    errors,
    path,
    config,
    description,
  }: ControlProps) => {
    const isValid = errors.length === 0;
    const appliedUiSchemaOptions = merge({}, config, uischema.options);

    const showDescription = !isDescriptionHidden(
      visible,
      description,
      // Checkboxes do not receive focus until they are used, so
      // we cannot rely on focus as criteria for showing descriptions.
      // So we pass "false" to treat it as unfocused.
      false,
      appliedUiSchemaOptions.showUnfocusedDescription
    );

    const showTooltip =
      !showDescription &&
      !isDescriptionHidden(
        visible,
        description,
        // Tooltips have their own focus handlers, so we do not need to rely
        // on focus state here. So we pass 'true' to treat it as focused.
        true,
        // We also pass true here for showUnfocusedDescription since it should
        // render regardless of that setting.
        true
      );

    const firstFormHelperText = showDescription
      ? description
      : !isValid
      ? errors
      : null;
    const secondFormHelperText = showDescription && !isValid ? errors : null;

    const descriptionIds = [];
    const tooltipId = `${id}-tip`;
    const helpId1 = `${id}-help1`;
    const helpId2 = `${id}-help2`;

    if (showTooltip) {
      descriptionIds.push(tooltipId);
    }

    if (firstFormHelperText) {
      descriptionIds.push(helpId1);
    }

    if (secondFormHelperText) {
      descriptionIds.push(helpId2);
    }

    const ariaDescribedBy = descriptionIds.join(' ');

    const onChange = (ev: ChangeEvent<HTMLInputElement>) => {
      handleChange(path, ev.currentTarget.checked);
    };

    return (
      <Checkbox
        id={`${id}-input`}
        checked={Boolean(data)}
        disabled={!enabled || appliedUiSchemaOptions.readOnly}
        onChange={onChange}
        error={errors}
        label={label}
        aria-describedby={ariaDescribedBy}
      />
    );
  }
);

export const booleanControlTester: RankedTester = rankWith(2, isBooleanControl);
