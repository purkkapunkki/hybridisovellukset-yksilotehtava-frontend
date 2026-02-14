import type {MediaItemWithOwner} from 'hybrid-types/DBTypes';
import {useState} from 'react';
import MediaRow from '../components/MediaRow';
import SingleView from '../components/SingleView';
import FollowedList from '../components/FollowedList';
import PopularTagsList from '../components/PopularTagsList';
import {useMedia} from '../hooks/apiHooks';

const Home = () => {
  const [selectedItem, setSelectedItem] = useState<
    MediaItemWithOwner | undefined
  >(undefined);

  const {mediaArray} = useMedia();

  return (
    <>
      {/* Debug
       <p>Selected item: {selectedItem?.title}</p> */}
      {selectedItem && (
        <SingleView item={selectedItem} setSelectedItem={setSelectedItem} />
      )}
      <div className="flex space-x-4">
        <section className="flex-1">
          <PopularTagsList />
        </section>
        <section className="flex-1">
          {mediaArray.map((item) => (
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
    </>
  );
};

export default Home;
