import React, { forwardRef, useMemo } from 'react';
import { Text as MText, TextProps as MTextProps } from '@mantine/core';
import { useTranslation } from 'react-i18next';
import ucfirst from 'utils/ucfirst';
import capitalize from 'utils/capitalize';

export interface TextProps extends MTextProps {
  textTransform?: 'upper' | 'lower' | 'ucfirst' | 'capitalize';
}

const Text = forwardRef<HTMLDivElement, TextProps>(
  function Text(props, ref) {

    const { children, textTransform, ...rest } = props;
    const { t } = useTranslation();

    const str = useMemo(() => {
      if (!['string', 'number'].includes(typeof children)) {
        return children;
      }

      let txt = t(`${ children }`);

      switch (textTransform) {
        case 'upper':
          txt = txt.toUpperCase();
          break;
        case 'lower':
          txt = txt.toLowerCase();
          break;
        case 'ucfirst':
          txt = ucfirst(txt);
          break;
        case 'capitalize':
          txt = capitalize(txt);
          break;
      }

      return txt;
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [ children, textTransform ]);

    return (
      <MText {...rest} ref={ref}>
        { str }
      </MText>
    )
  }
);

Text.displayName = 'Text';
export default Text;
