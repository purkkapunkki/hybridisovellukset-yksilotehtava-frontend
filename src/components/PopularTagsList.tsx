import {useTags} from '../hooks/apiHooks';

const PopularTagsList = () => {
  const {tags, error} = useTags();

  return (
    <article className="from-midpurple to-darkermidpurple flex flex-col items-center rounded-md bg-linear-to-br p-2 font-bold text-white">
      <h1 className="font-vcr">Popular tags:</h1>
      {error ? (
        <p className="text-sm text-red-300">{error}</p>
      ) : (
        <ul className="list-none">
          {tags.map((tag) => (
            <li key={tag.tag_id}>
              <span className="block rounded px-3 py-2 text-center">
                {tag.tag_name}
              </span>
            </li>
          ))}
        </ul>
      )}
    </article>
  );
};

export default PopularTagsList;
