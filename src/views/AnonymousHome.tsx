import Logo from '../images/RETROWAVELOGO.png';
import Footer from '../components/Footer';
import {Link} from 'react-router';

const AnomymousHome = () => {
  return (
    <>
      <p className="font-vcr text-white">Welcome, Anonymous!</p>

      <div className="from-midpurple to-darkermidpurple mt-5 mr-20 mb-5 ml-20 rounded-md bg-linear-to-br p-2 text-white">
        <section className="flex flex-col items-center">
          <img src={Logo} alt="RetroWaveLogo" className="h-20 w-100" />
          <h2 className="font-vcr">
            Welcome to RETROWAVE, where you can post media from the 80's! Start
            rewinding your nostalgia trip by{' '}
            <Link
              className="hover:bg-accent hover:text-accent-foreground text-lightpink transition-all duration-500 ease-in-out"
              to="/login"
            >
              registering
            </Link>{' '}
            now!
          </h2>
        </section>
      </div>
      <Footer />
    </>
  );
};

export default AnomymousHome;
