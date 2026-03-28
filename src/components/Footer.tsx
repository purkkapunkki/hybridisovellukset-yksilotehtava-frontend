import {Link} from 'react-router';

const Footer = () => {
  return (
    <>
      <div className="from-midpurple to-darkermidpurple mt-5 mr-20 mb-5 ml-20 flex flex-row items-center rounded-md bg-linear-to-br pt-5 pr-10 pb-5 pl-10 text-white">
        <section className="flex flex-col">
          <h1 className="font-extrabold">Tietoa (Tähän sivun nimi)sta</h1>
          <Link to="/">Käyttöohjeet</Link>
          <Link to="/">Lista yhteisöistä</Link>
          <Link to="/">Tekninen tuki</Link>

          <h2 className="font-bold">
            Kysy isännöitsijältäsi yhteisösi nimi ja salasana.
          </h2>

          <p>ehkä vaa kasa linkkejä jotka aukee dialogiks?</p>
          <h3>
            <span className="font-bold">Huom!</span> (Tähän sivun nimi) ei ole
            nettikauppa! pist tää käyttöohjeisii yms
          </h3>
        </section>
        <section>
          <p>&#169;Taloyhtiön/huoltoyhtiön logo</p>
        </section>
      </div>
    </>
  );
};

export default Footer;
