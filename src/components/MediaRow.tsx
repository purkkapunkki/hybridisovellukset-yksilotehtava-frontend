import {Link} from 'react-router';
import type {MediaItemWithOwner} from 'hybrid-types/DBTypes';
import {useTagsByMedia} from '../hooks/apiHooks';
import {useUserContext} from '../hooks/ContextHooks';
import {Button} from './ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from './ui/card';
import Likes from './Likes';
import {MessageCircle} from 'lucide-react';
import DeletePost from './DeletePost';
import {useTranslation} from 'react-i18next';

interface MediaRowProps {
  item: MediaItemWithOwner;
  setSelectedItem: (item: MediaItemWithOwner | undefined) => void;
  setMediaArray: React.Dispatch<React.SetStateAction<MediaItemWithOwner[]>>;
}

const MediaRow = (props: MediaRowProps) => {
  const {t} = useTranslation();
  const {item, setSelectedItem, setMediaArray} = props;
  const {user} = useUserContext();

  const {
    tags,
    error: tagError,
    loading: tagsLoading,
  } = useTagsByMedia(item.media_id);

  return (
    <Card className="mb-5 w-full overflow-hidden">
      <div className="relative p-4">
        <div className="absolute inset-0 bg-black/20 transition-colors hover:bg-black/0" />
        <h1 className="font-bold">
          {t("user's post", {username: item.username})}
        </h1>
        <p>
          {t('created at')}: {new Date(item.created_at).toLocaleString('fi-FI')}
        </p>
        <img
          className="h-72 w-full rounded-md object-cover"
          src={item.thumbnail}
          alt={item.title}
        />
      </div>
      <CardHeader>
        <CardTitle className="scroll-m-20 text-2xl font-semibold tracking-tight">
          {item.title}
        </CardTitle>
        <CardDescription className="max-w-full overflow-hidden text-nowrap text-ellipsis">
          {item.description}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="border-input text-muted-foreground rounded-md border p-2 text-sm">
          <Likes item={item} />

          <Button
            variant="ghost"
            onClick={() => {
              setSelectedItem(item);
            }}
            className="gap-x[0.5rem] cursor-pointer"
          >
            <MessageCircle />
            <span>{t('add message')}</span>
          </Button>

          {/* User exists and owns the media item or is an admin */}
          {user &&
            (user.user_id === item.user_id || user?.level_name === 'Admin') && (
              <DeletePost
                mediaId={item.media_id}
                setMediaArray={setMediaArray}
              />
            )}

          <p>
            {t('search terms list')}:{' '}
            {tagsLoading ? (
              <span>Loading tags...</span>
            ) : tagError ? (
              <span className="text-sm text-red-300">{tagError}</span>
            ) : (
              <span>
                {tags.map((tag, i) => [
                  i > 0 && ', ',
                  <Link
                    key={tag.tag_id}
                    to={`/tag/${tag.tag_name}`}
                    className="underline"
                  >
                    {tag.tag_name}
                  </Link>,
                ])}
              </span>
            )}
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default MediaRow;
