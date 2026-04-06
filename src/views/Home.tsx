import type {MediaItemWithOwner} from 'hybrid-types/DBTypes';
import {useState} from 'react';
import MediaRow from '../components/MediaRow';
import SingleView from '../components/SingleView';
import FollowedList from '../components/NewPostsList';
import PopularTagsList from '../components/PopularTagsList';
import Footer from '../components/Footer';
import {useMedia} from '../hooks/apiHooks';
import {useUserContext} from '@/hooks/ContextHooks';

const Home = () => {
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
      <p className="mb-2 ml-6 font-bold">Tervetuloa, {user.username}!</p>
      {selectedItem && (
        <SingleView item={selectedItem} setSelectedItem={setSelectedItem} />
      )}
      <div className="mr-5 ml-5 flex space-x-4 bg-white">
        <section className="flex-1">
          <PopularTagsList />
        </section>
        <section className="flex-1">
          {ownersMedia.map((item) => (
            <MediaRow
              key={item.media_id}
              item={item}
              setSelectedItem={setSelectedItem}
              setMediaArray={setMediaArray}
            />
          ))}
        </section>
        <section className="flex-1">
          <FollowedList />
        </section>
      </div>
      <Footer />
    </>
  );
};

export default Home;
