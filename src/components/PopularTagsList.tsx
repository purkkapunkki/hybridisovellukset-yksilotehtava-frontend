import {Link} from 'react-router';

const FollowedList = () => {
  return (
    <article className="from-midpurple to-darkermidpurple flex flex-col items-center rounded-md bg-linear-to-br p-2">
      <h1>Popular tags:</h1>
      <li>
        <Link
            className="block rounded px-3 py-2 text-center transition-all duration-500 ease-in-out hover:bg-white hover:text-black"
            to="/tagsearch"
        >
          #Popular tag here
        </Link>
      </li>
    </article>
  );
};

export default FollowedList;
