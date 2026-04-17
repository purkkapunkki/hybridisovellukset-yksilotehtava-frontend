import type {MediaItemWithOwner} from 'hybrid-types/DBTypes';
import {useMedia} from '../hooks/apiHooks';
import {useTranslation} from 'react-i18next';

interface NewPostsListProps {
  setSelectedItem?: (item: MediaItemWithOwner | undefined) => void;
}

const NewPostsList = ({setSelectedItem}: NewPostsListProps) => {
  const {t} = useTranslation();
  const token = localStorage.getItem('token') || '';
  const {mediaArray} = useMedia(token);

  return (
    <article className="from-midgreen to-darkermidgreen flex flex-col items-center rounded-md bg-linear-to-br p-2 font-bold text-white">
      <h1 className="text-xl">{t('newest posts')}</h1>
      <ul className="list-none">
        {mediaArray.map((item) => {
          return (
            <li key={item.media_id} className="py-1">
              {setSelectedItem ? (
                <button
                  type="button"
                  className="cursor-pointer text-left underline transition hover:text-slate-200"
                  onClick={() => setSelectedItem(item)}
                >
                  {item.title}
                </button>
              ) : (
                item.title
              )}
            </li>
          );
        })}
      </ul>
    </article>
  );
};

export default NewPostsList;
