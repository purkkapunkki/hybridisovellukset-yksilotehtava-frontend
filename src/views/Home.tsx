import type {MediaItemWithOwner} from 'hybrid-types/DBTypes';
import {useState} from 'react';
import MediaRow from '../components/MediaRow';
import SingleView from '../components/SingleView';
import NewPostsList from '../components/NewPostsList';
import PopularTagsList from '../components/PopularTagsList';
import Footer from '../components/Footer';
import {useMedia} from '../hooks/apiHooks';
import {useUserContext} from '@/hooks/ContextHooks';
import {useTranslation} from 'react-i18next';

const Home = () => {
  const {t} = useTranslation();
  const token = localStorage.getItem('token') || '';
  const [selectedItem, setSelectedItem] = useState<
    MediaItemWithOwner | undefined
  >(undefined);

  const {user} = useUserContext();
  const {mediaArray, setMediaArray} = useMedia(token);

  if (user === null) {
    return '';
  }

  const ownersMedia = mediaArray.filter(
    (item) => item.user_id === user.user_id,
  );

  return (
    <>
      <p className="mb-2 ml-6 text-xl font-bold">
        {t('greeting', {
          username: user.username,
          community: user.community_name,
        })}
      </p>
      {selectedItem && (
        <SingleView item={selectedItem} setSelectedItem={setSelectedItem} />
      )}
      <div className="mr-5 ml-5 flex space-x-4 bg-white">
        <section className="flex-1">
          <PopularTagsList />
        </section>
        <section className="flex-1">
          {ownersMedia.length > 0 ? (
            ownersMedia.map((item) => (
              <MediaRow
                key={item.media_id}
                item={item}
                setSelectedItem={setSelectedItem}
                setMediaArray={setMediaArray}
              />
            ))
          ) : (
            <p className="from-midgreen to-darkermidgreen mr-5 ml-5 flex flex-col items-center rounded-md bg-linear-to-br pt-5 pr-10 pb-5 pl-10 text-white">
              {t('no user posts')}
            </p>
          )}
        </section>
        <section className="flex-1">
          <NewPostsList setSelectedItem={setSelectedItem} />
        </section>
      </div>
      <Footer />
    </>
  );
};

export default Home;
