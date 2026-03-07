import type {MediaItemWithOwner} from 'hybrid-types/DBTypes';
import {useState} from 'react';
import MediaRow from '../components/MediaRow';
import SingleView from '../components/SingleView';
import FollowedList from '../components/FollowedList';
import PopularTagsList from '../components/PopularTagsList';
import Footer from '../components/Footer';
import {useMedia} from '../hooks/apiHooks';
import {useUserContext} from '@/hooks/ContextHooks';

const Home = () => {
  const [selectedItem, setSelectedItem] = useState<
    MediaItemWithOwner | undefined
  >(undefined);

  const {user} = useUserContext();
  const {mediaArray} = useMedia();

  if (user === null) {
    return '';
  }

  const ownersMedia = mediaArray.filter(
    (item) => item.user_id === user.user_id,
  );

  return (
    <>
      <p className="font-vcr mb-2 ml-6 text-white">Welcome, {user.username}!</p>
      {selectedItem && (
        <SingleView item={selectedItem} setSelectedItem={setSelectedItem} />
      )}
      <div className="bg-darkpurple flex space-x-4">
        <section className="flex-1">
          <PopularTagsList />
        </section>
        <section className="flex-1">
          {ownersMedia.map((item) => (
            <MediaRow
              key={item.media_id}
              item={item}
              setSelectedItem={setSelectedItem}
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
