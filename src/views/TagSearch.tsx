import {useParams} from 'react-router';
import type {MediaItemWithOwner} from 'hybrid-types/DBTypes';
import {useState} from 'react';
import {useTags, useMediaByTag} from '../hooks/apiHooks';
import MediaRow from '../components/MediaRow';
import SingleView from '../components/SingleView';
import FollowedList from '../components/NewPostsList';
import PopularTagsList from '../components/PopularTagsList';
import Footer from '../components/Footer';
import {useTranslation} from 'react-i18next';

const TagSearch = () => {
  const {t} = useTranslation();
  const {tagname} = useParams<{tagname: string}>();
  const [selectedItem, setSelectedItem] = useState<
    MediaItemWithOwner | undefined
  >(undefined);

  const {tags} = useTags();
  const tagId = tags.find((t) => t.tag_name === tagname)?.tag_id;
  const {mediaArray, setMediaArray, loading, error} = useMediaByTag(tagId || 0);

  if (!tagId) {
    return (
      <>
        <div className="from-midpurple to-darkermidpurple mt-20 mr-20 mb-20 ml-20 flex flex-col items-center rounded-md bg-linear-to-br p-2 text-white">
          <h2>{t('hakuvirhe')}</h2>
        </div>
        <Footer />
      </>
    );
  }

  return (
    <>
      <p className="mb-2 ml-6 text-xl font-bold">
        {t('hakusanalla haku')} "{tagname}"
      </p>
      {selectedItem && (
        <SingleView item={selectedItem} setSelectedItem={setSelectedItem} />
      )}
      <div className="mr-5 ml-5 flex space-x-4">
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
                setMediaArray={setMediaArray}
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
