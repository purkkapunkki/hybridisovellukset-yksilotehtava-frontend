import Footer from '../components/Footer';
import {useTranslation} from 'react-i18next';

const ContactInfo = () => {
  const {t} = useTranslation();

  return (
    <>
      <div className="from-midgreen to-darkermidgreen mr-5 ml-5 flex flex-col items-center rounded-md bg-linear-to-br pt-5 pr-10 pb-5 pl-10 text-white">
        <section className="flex-1">
          <h1 className="font-bold">{t('contact info')}</h1>
          <p>{t('contact info description')}</p>
          <br />
          <h2>Korven huolto</h2>
          <p>info@korvenhuolto.fi</p>
          <p>050 123 4567</p>
          <br />
          <p>Korpilaakso 4 C</p>
          <p>00004 Korpela</p>
        </section>
      </div>
      <Footer />
    </>
  );
};

export default ContactInfo;
