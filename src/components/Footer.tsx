import {Link} from 'react-router';
import {useTranslation} from 'react-i18next';
import KorpiLogo from '../images/Korven-huolto-logo.png';

const Footer = () => {
  const {t} = useTranslation();
  return (
    <>
      <div className="from-midgreen to-darkermidgreen mt-5 mr-20 mb-5 ml-20 flex flex-row items-center rounded-md bg-linear-to-br pt-5 pr-10 pb-5 pl-10 text-white">
        <section className="flex flex-col">
          <h1 className="text-2xl font-bold">{t('about the application')}</h1>
          <h2 className="font-bold">{t('contact administrator')}</h2>
          <Link to="/userinstructions">{t('user instructions')}</Link>
          <Link to="/contactinfo">{t('contact info')}</Link>
          <Link to="/technicalsupport">{t('technical support')}</Link>
        </section>
        <section>
          <img src={KorpiLogo} alt="Logo" className="w-50" />
        </section>
      </div>
    </>
  );
};

export default Footer;
