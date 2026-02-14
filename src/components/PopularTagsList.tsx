import {Link} from 'react-router';

const FollowedList = () => {
  return (
    <article className="flex flex-col items-center rounded-md bg-stone-600 p-2">
      <h1>Popular tags:</h1>
      <li>
        <Link
          className="block rounded px-3 py-2 text-center font-bold transition-all duration-500 ease-in-out hover:bg-stone-700"
          to="/"
        >
          #Popular tag here
        </Link>
      </li>
    </article>
  );
};

export default FollowedList;
