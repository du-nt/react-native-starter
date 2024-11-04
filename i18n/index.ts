export type Translations = {
  en: TextDefinition;
  ja: TextDefinition;
};

type DotNotation<T, Prefix extends string = ""> = {
  [K in Extract<keyof T, string>]: T[K] extends object
    ? DotNotation<T[K], `${Prefix}${K}.`>
    : `${Prefix}${K}`;
}[Extract<keyof T, string>];

export type TranslationKeys = DotNotation<TextDefinition> | string | undefined;

export type TextDefinition = {
  common: {
    save: string;
    selectDate: string;
    hello: string;
  };
  validator: {
    emptyEmail: string;
    invalidEmailFormat: string;
    maxLengthEmail: string;
    emptyPassword: string;
    maxLengthPassword: string;
  };
};

const translations: Translations = {
  ja,
  en,
};

import { getLocales } from "expo-localization";
import { I18n, TranslateOptions } from "i18n-js";
import { ja } from "./ja";
import { en } from "./en";

export const i18n = new I18n();
export const deviceLanguage: string | null = getLocales()[0].languageCode;

const fallbackLanguage: string = "ja";

i18n.locale = deviceLanguage ?? fallbackLanguage;
i18n.translations = translations;

export function t(key: TranslationKeys, options?: TranslateOptions): string {
  if (!key) return "";

  return i18n.translate(key, options);
}
