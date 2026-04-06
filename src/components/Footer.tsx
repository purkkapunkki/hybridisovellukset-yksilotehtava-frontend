import {Link} from 'react-router';
import {useTranslation} from 'react-i18next';

const Footer = () => {
  const {t} = useTranslation();
  return (
    <>
      <div className="from-midpurple to-darkermidpurple mt-5 mr-20 mb-5 ml-20 flex flex-row items-center rounded-md bg-linear-to-br pt-5 pr-10 pb-5 pl-10 text-white">
        <section className="flex flex-col">
          <h1 className="text-2xl font-bold">{t('tietoa sovelluksesta')}</h1>
          <h2 className="font-bold">{t('kysy isännöitsijältä')}</h2>
          <Link to="/">{t('käyttöohjeet')}</Link>
          <Link to="/">{t('yhteystiedot')}</Link>
          <Link to="/">{t('tekninen tuki')}</Link>
        </section>
        <section>
          <p>&#169;Huoltoyhtiön logo</p>
        </section>
      </div>
    </>
  );
};

export default Footer;
