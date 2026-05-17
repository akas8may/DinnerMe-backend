import {I18n,I18nContext } from 'nestjs-i18n';

export function convertToLocale(
  data: any, i18n: I18nContext
): any {
  if (Array.isArray(data)) {
    return data.map(item =>
      convertToLocale(item, i18n),
    );
  }

  if (
    data &&
    typeof data === 'object'
  ) {

    const newObj: any = {};

    for (const key in data) {

      if (
        key === 'message' &&
        typeof data[key] === 'string'
      ) {

        newObj[key] =
          i18n.t(data[key]);

      } else {

        newObj[key] =
          convertToLocale(
            data[key],
            i18n,
          );
      }
    }

    return newObj;
  }

  return data;
}