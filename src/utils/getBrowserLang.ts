import { APP_LANG_DEFAULT } from "apps/constants";

export default function getBrowserLang() {
  return (
    window.localStorage.i18nextLng ??
    document.querySelector('html')?.lang ??
    APP_LANG_DEFAULT
  );
}