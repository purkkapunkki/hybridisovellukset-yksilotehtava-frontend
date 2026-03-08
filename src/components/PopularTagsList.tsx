import {useTags} from '../hooks/apiHooks';
import {useNavigate} from 'react-router';

interface PopularTagsListProps {
  currentTag?: string;
}

const PopularTagsList = ({currentTag}: PopularTagsListProps) => {
  const {tags, error} = useTags();
  const navigate = useNavigate();

  const handleTagClick = (tagName: string) => {
    navigate(`/tag/${tagName}`);
  };

  return (
    <article className="from-midpurple to-darkermidpurple flex flex-col items-center rounded-md bg-linear-to-br p-2 font-bold text-white">
      <h1 className="font-vcr">Popular tags:</h1>
      {error ? (
        <p className="text-sm text-red-300">{error}</p>
      ) : (
        <ul className="list-none">
          {tags.map((tag) => {
            const isActive = currentTag === tag.tag_name;
            return (
              <li key={tag.tag_id}>
                <button
                  onClick={() => handleTagClick(tag.tag_name)}
                  className={`block rounded px-3 py-2 text-center transition-colors ${
                    isActive
                      ? 'bg-accent text-accent-foreground'
                      : 'hover:bg-accent hover:text-accent-foreground'
                  }`}
                >
                  {tag.tag_name}
                </button>
              </li>
            );
          })}
        </ul>
      )}
    </article>
  );
};

export default PopularTagsList;
