import {
  useDeleteSavedPost,
  useGetCurrentUser,
  useLikePost,
  useSavePost,
} from '@/lib/react-query/queriesAndMutations';
import { checkIsLiked } from '@/lib/utils';
import { Models } from 'appwrite';
import { useEffect, useState } from 'react';
import Loader from './Loader';

type PostStatsProps = {
  post?: Models.Document;
  userId: string;
};
const PostStats = ({ post, userId }: PostStatsProps) => {
  const likesList = post?.likes.map((user: Models.Document) => user.$id);

  const [likes, setLikes] = useState(likesList);
  const [isSaved, setIsSaved] = useState(false);

  // mutation abstractions for like and save
  const { mutate: likePost } = useLikePost();
  const { mutate: savePost, isPending: isSavingPost } = useSavePost();
  const { mutate: deletedSavedPost, isPending: isDeletingSavedPost } =
    useDeleteSavedPost();

  const { data: currentUser } = useGetCurrentUser();
  const savedPostRecord = currentUser?.save.find(
    (record: Models.Document) => record.post.$id === post?.$id
  );
  // to check for saved
  useEffect(() => {
    setIsSaved(!!savedPostRecord);
  }, [currentUser, savedPostRecord]);

  const handleLikePost = (e: React.MouseEvent) => {
    e.stopPropagation();
    let newLikes = [...likes];
    if (newLikes.includes(userId)) {
      newLikes = newLikes.filter((id) => id !== userId);
    } else {
      newLikes.push(userId);
    }
    setLikes(newLikes);
    likePost({ postId: post?.$id || '', likesArray: newLikes });
    console.log(newLikes);
  };

  const handleSavedPost = (e: React.MouseEvent) => {
    e.stopPropagation();

    // deletes the saved post if it gets clicked again
    if (savedPostRecord) {
      setIsSaved(false);
      deletedSavedPost(savedPostRecord.$id);
      return;
    }
    savePost({ postId: post?.$id || '', userId });
    setIsSaved(true);
  };

  return (
    <div className="flex justify-between items-center z-20">
      <div className="flex gap-2 mr-5">
        <img
          onClick={handleLikePost}
          className="cursor-pointer"
          src={
            checkIsLiked(likes, userId)
              ? '/assets/icons/liked.svg'
              : '/assets/icons/like.svg'
          }
          alt="heart"
          width={20}
          height={20}
        />

        <p className="small-medium lg:base-medium">{likes.length}</p>
      </div>
      <div className="flex gap-2 ">
        {isSavingPost || isDeletingSavedPost ? (
          <Loader />
        ) : (
          <img
            onClick={handleSavedPost}
            className="cursor-pointer"
            src={isSaved ? '/assets/icons/saved.svg' : '/assets/icons/save.svg'}
            alt="heart"
            width={20}
            height={20}
          />
        )}
      </div>
    </div>
  );
};

export default PostStats;
