import {useUserContext} from '../hooks/ContextHooks';
import useForm from '../hooks/formHooks';
import {useCommentStore} from '../stores/commentStore';

const Comments = ({mediaId}: {mediaId: number}) => {
  const {comments, addComment} = useCommentStore();
  const {user} = useUserContext();

  const initValues = {comment_text: ''};
  const doComment = async () => {
    if (!user) return;
    // eslint-disable-next-line react-hooks/immutability
    console.log('adding comment:', inputs.comment_text);
    addComment({
      user_id: user.user_id,
      username: user.username,
      comment_text: inputs.comment_text,
      media_id: mediaId,
    });
    //console.log('comments in zustand store:', comments);
  };

  const {handleInputChange, handleSubmit, inputs, setInputs} = useForm(
    doComment,
    initValues,
  );

  return (
    <>
      <h3>Comments for {mediaId}</h3>

      {user && (
        <form
          onSubmit={handleSubmit}
          className="mx-auto mt-4 flex w-full max-w-2xl flex-col gap-4 rounded-md bg-stone-600 p-6 text-stone-50 shadow"
        >
          <div className="flex flex-col gap-1">
            <label className="text-sm font-semibold" htmlFor="title">
              Write comment
            </label>
            <input
              className="rounded-md border border-stone-400 bg-stone-700/60 px-3 py-2 text-stone-50 transition outline-none focus:border-stone-200 focus:ring-2 focus:ring-stone-300/40"
              name="comment_text"
              type="text"
              id="comment_text"
              onChange={handleInputChange}
            />
          </div>
          <button
            className="w-full rounded-md bg-stone-500 px-4 py-2 font-semibold transition hover:bg-stone-700 disabled:cursor-not-allowed disabled:opacity-60"
            type="submit"
            disabled={inputs.comment_text.length > 3 ? false : true}
          >
            Add comment
          </button>
        </form>
      )}
    </>
  );
};

export default Comments;
