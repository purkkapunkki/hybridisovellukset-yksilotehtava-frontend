import {Link} from 'react-router';
import Footer from '../components/Footer';
import {useTranslation, Trans} from 'react-i18next';

const UserInstructions = () => {
  const {t} = useTranslation();

  return (
    <>
      <div className="from-midgreen to-darkermidgreen mr-5 ml-5 flex flex-col items-center rounded-md bg-linear-to-br pt-5 pr-10 pb-5 pl-10 text-white">
        <section className="flex-1">
          <h1 className="font-bold">{t('user instructions')}</h1>
          <p>
            <Trans i18nKey="user instructions description 1">
              Kirva is an app provided to your housing company by Korpi's
              maintenance company that lets residents sell, exchange, or give
              away clothes. Please note that buyers and sellers are fully
              responsible for negotiating, arranging, and completing any
              exchanges or sales; the app only facilitates listings and does not
              act as an intermediary or guarantee transactions.
            </Trans>
          </p>
          <br />
          <p>
            <Trans i18nKey="user instructions description 2">
              First contact your property manager to get a username and password
              — you can do this by clicking{' '}
              <Link to="/contactinfo" className="underline">
                here
              </Link>
              . After that, you can log in to the app and create a listing for
              your garment. Do this as follows:
            </Trans>
          </p>
          <br />
          <ol className="list-inside list-decimal">
            <Trans i18nKey="user instructions description 3">
              <li>Click the "Add post" button at the top of the page.</li>
              <li>Fill in the title, description, and keywords.</li>
              <li>
                Click the "Choose file" button and select a photo of the garment
                from your computer.
              </li>
              <li>Click the "Add post" button at the bottom of the page.</li>
            </Trans>
          </ol>
          <p>
            <Trans i18nKey="user instructions description 4">
              Your listing will appear on the front page, where other users can
              contact you in the listing's comment field if they are interested
              in your item.
            </Trans>
          </p>
          <br />
          <p>
            <Trans i18nKey="user instructions description 5">
              Use the search field in the top bar to look for garments using
              keywords, or click keywords shown under listings or on the left
              side of the page.
            </Trans>
          </p>
        </section>
      </div>
      <Footer />
    </>
  );
};

export default UserInstructions;
