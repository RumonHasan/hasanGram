import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import {
  createUserAcount,
  signOutAccount,
  createPost,
  getRecentPosts,
} from '../appwrite/api';
import { INewPost, INewUser } from '@/types';
import { signInAccount } from '../appwrite/api';
import { QUERY_KEYS } from './queryKeys';

// new mutation function to tell query to control user
export const useCreateUserAccount = () => {
  return useMutation({
    mutationFn: (user: INewUser) => createUserAcount(user),
  });
};

// new mutation function to sign in the account
export const useSignInAccount = () => {
  return useMutation({
    mutationFn: (user: { email: string; password: string }) =>
      signInAccount(user),
  });
};

// new mutation function to sign in the account
export const useSignOutAccount = () => {
  return useMutation({
    mutationFn: () => signOutAccount(),
  });
};

// for creating new post
export const useCreatePost = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (post: INewPost) => createPost(post),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.GET_RECENT_POSTS],
      });
    },
  });
};

// getting recent posts
export const useGetRecentPosts = () => {
  return useQuery({
    queryKey: [QUERY_KEYS.GET_RECENT_POSTS],
    queryFn: getRecentPosts,
  });
};
