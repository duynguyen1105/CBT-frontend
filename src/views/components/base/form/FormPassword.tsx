import React, { ChangeEvent, forwardRef, useState } from 'react';
import { Box, PasswordInput, PasswordInputProps, Popover, Progress, Text } from '@mantine/core';
import { IconX, IconCheck } from '@tabler/icons-react';

import { useTranslation } from 'react-i18next';
import useTranslate from 'hooks/useTranslate';
import useInputStyle from './useInputStyle';

export interface FormPasswordProps extends PasswordInputProps {
  value?: string | number;
  disableStrength?: boolean;
}

interface RequirementProps {
  meets: boolean;
  label: string;
}

function Requirement({ meets, label }: RequirementProps) {
  return (
    <Text
      color={meets ? 'teal' : 'red'}
      sx={{ display: 'flex', alignItems: 'center' }}
      mt={7}
      size="sm"
    >
      {meets ? <IconCheck size="0.9rem" /> : <IconX size="0.9rem" />}
      <Box ml={10}>{label}</Box>
    </Text>
  );
}

const requirements = [
  { re: /[0-9]/, label: 'Includes number' },
  { re: /[a-z]/, label: 'Includes lowercase letter' },
  { re: /[A-Z]/, label: 'Includes uppercase letter' },
  { re: /[$&+,:;=?@#|'<>.^*()%!-]/, label: 'Includes special symbol' },
];

function getStrength(password: string, min?: number) {
  let multiplier = 0;

  if (min !== undefined && min > 0 && password.length <= min) {
    multiplier = 1;
  }

  requirements.forEach((requirement) => {
    if (!requirement.re.test(password)) {
      multiplier += 1;
    }
  });

  return Math.max(100 - (100 / (requirements.length + 1)) * multiplier, 10);
}

const FormPassword = forwardRef<HTMLInputElement, FormPasswordProps>(function FormPassword(
  props,
  ref
) {
  const {
    value = '',
    onChange,
    label,
    placeholder,
    minLength,
    disableStrength,
    className,
    ...rest
  } = props;

  const { t } = useTranslation();
  const { classes, cx } = useInputStyle({}, { name: 'FormInput' });

  const [popoverOpened, setPopoverOpened] = useState(false);
  const [currentValue, setCurrentValue] = useState(value.toString());

  const inputLabel = useTranslate(label);
  const inputPlaceholder = useTranslate(placeholder);

  const checks = requirements.map((requirement, index) => {
    const rlabel = t(`${requirement.label}`);

    return <Requirement key={index} label={rlabel} meets={requirement.re.test(currentValue)} />;
  });

  const strength = getStrength(currentValue, minLength);
  const color = strength === 100 ? 'teal' : strength > 50 ? 'yellow' : 'red';

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setCurrentValue(e.currentTarget.value);
    onChange?.(e);
  };

  if (disableStrength) {
    return (
      <PasswordInput
        {...rest}
        ref={ref}
        label={inputLabel}
        placeholder={inputPlaceholder}
        value={currentValue}
        onChange={handleChange}
        minLength={minLength}
        className={cx(classes.input, className)}
      />
    );
  }

  return (
    <Box maw="100%" mx="auto">
      <Popover
        opened={popoverOpened}
        position="bottom"
        width="target"
        transitionProps={{ transition: 'pop' }}
      >
        <Popover.Target>
          <Box
            onFocusCapture={() => setPopoverOpened(true)}
            onBlurCapture={() => setPopoverOpened(false)}
          >
            <PasswordInput
              {...rest}
              ref={ref}
              label={inputLabel}
              placeholder={inputPlaceholder}
              value={currentValue}
              onChange={handleChange}
              minLength={minLength}
              className={cx(classes.input, className)}
            />
          </Box>
        </Popover.Target>
        <Popover.Dropdown>
          <Progress color={color} value={strength} size={5} mb="xs" />
          {minLength !== undefined && minLength > 0 && (
            <Requirement
              label={t(`Includes at least ${minLength} characters`)}
              meets={currentValue.length > minLength}
            />
          )}
          {checks}
        </Popover.Dropdown>
      </Popover>
    </Box>
  );
});

FormPassword.displayName = 'FormPassword';
export default FormPassword;
