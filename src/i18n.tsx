import i18n from 'i18next';
import {initReactI18next} from 'react-i18next';
import Backend, {type HttpBackendOptions} from 'i18next-http-backend';

// Done accoring to the documentation of react-i18next: https://react.i18next.com/guides/quick-start

i18n
  .use(initReactI18next) // passes i18n down to react-i18next
  .use(Backend)
  .init<HttpBackendOptions>({
    lng: 'fi', // language to use, more information here: https://www.i18next.com/overview/configuration-options#languages-namespaces-resources
    // you can use the i18n.changeLanguage function to change the language manually: https://www.i18next.com/overview/api#changelanguage
    // if you're using a language detector, do not define the lng option

    interpolation: {
      escapeValue: false, // react already safes from xss
    },
    backend: {
      // for all available options read the backend's repository readme file
      loadPath: '/locales/{{lng}}/{{ns}}.json',
    },
  });

export default i18n;
