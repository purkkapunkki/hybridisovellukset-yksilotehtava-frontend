import Logo from '../images/RETROWAVELOGO.png';
import Footer from '../components/Footer';

const TagsSearch = () => {
  return (
    <>
      <div className="from-midpurple to-darkermidpurple mt-20 mr-20 mb-20 ml-20 flex flex-col items-center rounded-md bg-linear-to-br p-2 text-white">
        <section>
          <img src={Logo} alt="RetroWaveLogo" className="h-20 w-100" />
          <h2 className="font-vcr">
            Sorry, no matching tags, please try another search!
          </h2>
        </section>
      </div>
      <Footer />
    </>
  );
};

export default TagsSearch;
