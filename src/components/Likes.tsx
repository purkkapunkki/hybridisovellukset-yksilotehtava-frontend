import Button from './Button';
import type {MediaItemWithOwner} from 'hybrid-types/DBTypes';

type LikesType = {
  item: MediaItemWithOwner | undefined;
};

const Likes = ({item}: LikesType) => {
  return (
    <>
      <Button value="Like" />
      <p>Likes: 3</p>
    </>
  );
};

export default Likes;
