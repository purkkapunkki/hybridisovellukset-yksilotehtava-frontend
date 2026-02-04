import type {MediaItemWithOwner} from 'hybrid-types/DBTypes';
// import {Link} from 'react-router';
//import {useState} from 'react';

const MediaRow = (props: {
  item: MediaItemWithOwner;
  setSelectedItem: (item: MediaItemWithOwner | undefined) => void;
}) => {
  const {item, setSelectedItem} = props;
  //const [dummyLikes, setDummyLikes] = useState(0);
  // Sama:
  //const dummyLikesState = useState(0);
  //const dummyLikes = dummyLikesState[0];
  //const setDummyLikes = dummyLikesState[1];

  return (
    <article className="w-full rounded-md bg-stone-600">
      <img
        className="h-72 w-full rounded-t-md object-cover"
        src={item.thumbnail}
        alt={item.title}
      />
      <div className="p-4">
        <h3 className="text-center text-2xl">{item.title}</h3>
        <p className="max-w-full overflow-clip font-bold text-nowrap text-ellipsis text-stone-300">
          {item.description}
        </p>
        <div className="my-2 rounded-md border-1 border-stone-400 p-2">
          <p>
            Created at: <br />{' '}
            {new Date(item.created_at).toLocaleString('fi-FI')}
          </p>
          <p>Filesize: {(item.filesize / 1024 / 1024).toFixed(2)} MB</p>
          <p>Mime-type: {item.media_type}</p>
          <p>Owner: {item.username}</p>
        </div>
        <p>
          <button
            className="block w-full bg-stone-500 p-2 text-center transition-all duration-500 ease-in-out hover:bg-stone-700"
            onClick={() => {
              setSelectedItem(item);
            }}
          >
            View
          </button>
        </p>
      </div>
      <>
        {/* <Link to="/single" state={{item}}>
          Show
        </Link> */}
        {/*   <td>Likes: {dummyLikes}
        <button onClick={() => {
          console.log('add like to', item.title);
          setDummyLikes(dummyLikes + 1);
        }} >Add like</button>
      </td> */}
      </>
    </article>
  );
};

export default MediaRow;
