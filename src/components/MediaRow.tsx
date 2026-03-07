import type {MediaItemWithOwner} from 'hybrid-types/DBTypes';
import {useUserContext} from '../hooks/ContextHooks';
import {Button} from './ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from './ui/card';
import Likes from './Likes';

const MediaRow = (props: {
  item: MediaItemWithOwner;
  setSelectedItem: (item: MediaItemWithOwner | undefined) => void;
}) => {
  const {item, setSelectedItem} = props;
  const {user} = useUserContext();

  return (
    <Card className="mb-5 w-full overflow-hidden">
      <div className="relative p-4">
        <div className="absolute inset-0 z-10 bg-black/20 transition-colors hover:bg-black/0" />
        <img className="pl-2" src="" alt="user-avatar" />
        <h1 className="p-2 font-bold">User: {item.username}</h1>
        <p>Posted at: {new Date(item.created_at).toLocaleString('fi-FI')}</p>
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
          <p>Tags:</p>
        </div>
      </CardContent>
      <CardFooter className="flex flex-col gap-2">
        <Button
          className="w-full"
          onClick={() => {
            setSelectedItem(item);
          }}
        >
          Comment
        </Button>
        <Button
          className="w-full"
          onClick={() => {
            setSelectedItem(item);
          }}
        >
          Repost
        </Button>
        {/* User exists and owns the media item or is an admin */}
        {user &&
          (user.user_id === item.user_id || user?.level_name === 'Admin') && (
            <>
              <Button
                className="w-full"
                onClick={() => {
                  console.log('edit media item', item, 'current user', user);
                }}
              >
                Edit
              </Button>

              <Button
                variant="destructive"
                className="w-full"
                onClick={() => {
                  console.log('delete media item');
                }}
              >
                Delete
              </Button>
            </>
          )}
      </CardFooter>
    </Card>
  );
};

export default MediaRow;
