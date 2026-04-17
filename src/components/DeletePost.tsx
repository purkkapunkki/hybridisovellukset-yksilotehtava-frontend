import {Button} from './ui/button';
import {Trash2} from 'lucide-react';
import {useDeleteMedia} from '../hooks/apiHooks';
import {useUserContext} from '@/hooks/ContextHooks';
import type {MediaItemWithOwner} from 'hybrid-types/DBTypes';
import {useTranslation} from 'react-i18next';

interface DeletePostProps {
  mediaId: number;
  setMediaArray: React.Dispatch<React.SetStateAction<MediaItemWithOwner[]>>;
}
const DeletePost = ({mediaId, setMediaArray}: DeletePostProps) => {
  const {user} = useUserContext();
  const {deleteMedia} = useDeleteMedia();
  const {t} = useTranslation();

  const handleDelete = () => {
    const token = localStorage.getItem('token');
    if (!user || !token) {
      return;
    }
    deleteMedia(mediaId, token);
    setMediaArray((oldArray) =>
      oldArray.filter((item) => item.media_id !== mediaId),
    );
  };

  return (
    <>
      <Button variant="ghost" onClick={handleDelete} className="cursor-pointer">
        <Trash2 />
        <span>{t('delete post')}</span>
      </Button>
      <dialog>
        <p>Oletko varma että haluat poistaa tämän postin?</p>
        <Button>Kyllä</Button>
        <Button>Ei</Button>
      </dialog>
    </>
  );
};

export default DeletePost;
