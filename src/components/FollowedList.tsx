import {Link} from 'react-router';

const FollowedList = () => {
  return (
    <article className="from-midpurple to-darkermidpurple flex flex-col items-center rounded-md bg-linear-to-br p-2 font-bold text-white">
      <h1 className="font-vcr">People you follow:</h1>
      <ul className="list-none">
        <li>
          <Link
            className="block rounded px-3 py-2 text-center transition-all duration-500 ease-in-out hover:bg-white hover:text-black"
            to="/"
          >
            Followed username here plus avatar
          </Link>
        </li>
      </ul>
    </article>
  );
};

export default FollowedList;
