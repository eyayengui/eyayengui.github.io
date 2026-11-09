import { useTranslation } from 'react-i18next';

/** Read an array (of strings or objects) from the translation files. */
export function useTList() {
  const { t } = useTranslation();
  return function list<T = string>(key: string): T[] {
    const value: unknown = t(key, { returnObjects: true });
    return Array.isArray(value) ? (value as T[]) : [];
  };
}
