import { useMemo } from "react";
import { useTranslation } from "react-i18next";

export default function useTranslate<T>(content: T): T {
  
  const { t } = useTranslation();

  const trans = useMemo(() => {
    if (!['string', 'number'].includes(typeof content)) {
      return content;
    }

    return t(`${content}`);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ content ]);

  return trans as T;
}