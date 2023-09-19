import React, { forwardRef } from 'react';
import { TextInput, TextInputProps } from '@mantine/core';

import useTranslate from 'hooks/useTranslate';
import useInputStyle from './useInputStyle';

export interface FormInputProps extends TextInputProps {}

const FormInput = forwardRef<HTMLInputElement, FormInputProps>(
  function FormInput(props, ref) {

    const { label, placeholder = '', className, ...rest } = props;
    const { classes, cx } = useInputStyle({}, { name: 'FormInput' });

    const inputLabel = useTranslate(label);
    const inputPlaceholder = useTranslate(placeholder);

    return (
      <TextInput
        {...rest}
        ref={ref}
        label={inputLabel}
        placeholder={inputPlaceholder}
        className={cx(classes.input, className)}
      />
    )
  }
);

FormInput.displayName = 'FormInput';
export default FormInput;
