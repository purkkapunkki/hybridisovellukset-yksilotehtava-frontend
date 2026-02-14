import {Link} from 'react-router';

const FollowedList = () => {
  return (
    <article className="flex flex-col items-center rounded-md bg-stone-600 p-2">
      <h1>People you follow:</h1>
      <li>
        <Link
          className="block rounded px-3 py-2 text-center font-bold transition-all duration-500 ease-in-out hover:bg-stone-700"
          to="/"
        >
          Followed username here plus avatar
        </Link>
      </li>
    </article>
  );
};

export default FollowedList;
