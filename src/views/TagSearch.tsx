import {useParams} from 'react-router';
import type {MediaItemWithOwner} from 'hybrid-types/DBTypes';
import {useState} from 'react';
import {useTags, useMediaByTag} from '../hooks/apiHooks';
import MediaRow from '../components/MediaRow';
import SingleView from '../components/SingleView';
import FollowedList from '../components/FollowedList';
import PopularTagsList from '../components/PopularTagsList';
import Footer from '../components/Footer';

const TagSearch = () => {
  const {tagname} = useParams<{tagname: string}>();
  const [selectedItem, setSelectedItem] = useState<
    MediaItemWithOwner | undefined
  >(undefined);

  const {tags} = useTags();
  const {mediaArray, loading, error} = useMediaByTag(
    // TODO: Refactor this to use a dedicated endpoint for tag ID resolution instead of fetching all tags
    tags.find((t) => t.tag_name === tagname)?.tag_id || 0,
  );

  if (!tagname) {
    return (
      <>
        <div className="from-midpurple to-darkermidpurple mt-20 mr-20 mb-20 ml-20 flex flex-col items-center rounded-md bg-linear-to-br p-2 text-white">
          <h2>No tag selected</h2>
        </div>
        <Footer />
      </>
    );
  }

  return (
    <>
      <p className="mb-2 ml-6 text-white">Media tagged "{tagname}"</p>
      {selectedItem && (
        <SingleView item={selectedItem} setSelectedItem={setSelectedItem} />
      )}
      <div className="bg-darkpurple mr-5 ml-5 flex space-x-4">
        <section className="flex-1">
          <PopularTagsList currentTag={tagname} />
        </section>
        <section className="flex-1">
          {loading ? (
            <p className="text-white">Loading media...</p>
          ) : error ? (
            <p className="text-red-300">{error}</p>
          ) : mediaArray.length === 0 ? (
            <p className="text-white">No media found for this tag</p>
          ) : (
            mediaArray.map((item) => (
              <MediaRow
                key={item.media_id}
                item={item}
                setSelectedItem={setSelectedItem}
              />
            ))
          )}
        </section>
        <section className="flex-1">
          <FollowedList />
        </section>
      </div>
      <Footer />
    </>
  );
};

export default TagSearch;
