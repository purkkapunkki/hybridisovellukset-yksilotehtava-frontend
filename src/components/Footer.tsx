import {Link} from 'react-router';
import {useTranslation} from 'react-i18next';
import KorpiLogo from '../images/Korven-huolto-logo.png';

const Footer = () => {
  const {t} = useTranslation();
  return (
    <>
      <div className="from-midpurple to-darkermidpurple mt-5 mr-20 mb-5 ml-20 flex flex-row items-center rounded-md bg-linear-to-br pt-5 pr-10 pb-5 pl-10 text-white">
        <section className="flex flex-col">
          <h1 className="text-2xl font-bold">{t('about the application')}</h1>
          <h2 className="font-bold">{t('contact administrator')}</h2>
          <Link to="/">{t('user instructions')}</Link>
          <Link to="/">{t('contact info')}</Link>
          <Link to="/">{t('technical support')}</Link>
        </section>
        <section>
          <img src={KorpiLogo} alt="Logo" className="ml-100 h-20 w-50" />
        </section>
      </div>
    </>
  );
};

export default Footer;
