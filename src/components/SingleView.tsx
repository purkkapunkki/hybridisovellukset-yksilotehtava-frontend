import type {MediaItem} from 'hybrid-types/DBTypes';

const SingleView = (props: {
  item: MediaItem | undefined;
  setSelectedItem: (item: MediaItem | undefined) => void;
}) => {
  const {item, setSelectedItem} = props;
  return (
    // JSX for displaying a mediafile here
    // - use e.g. a <dialog> element for creating a modal
    // - use item prop to render the media item details
    // - use img tag for displaying images
    // - use video tag for displaying videos
    <dialog open>
      {item && (
        <>
          <h2>{item.title}</h2>
          {item.media_type.split('/')[0] === 'image' && (
            <img src={item.filename} alt={item.description || item.title} />
          )}
          {item.media_type.split('/')[0] === 'video' && (
            // TODO: test with real video file
            <video src={item.filename} />
          )}
          <p>{item.description}</p>
          <p>
            Uploaded at {new Date(item.created_at).toLocaleString('en-fi')} by
            user id {item.user_id}
          </p>
          <button
            onClick={() => {
              setSelectedItem(undefined);
            }}
          >
            Close
          </button>
        </>
      )}
    </dialog>
  );
};
export default SingleView;
