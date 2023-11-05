import {
  useQuery,
  useMutation,
  useQueryClient,
  useInfiniteQuery,
} from '@tanstack/react-query';
import { createUserAcount } from '../appwrite/api';
import { INewUser } from '@/types';

// new mutation function to tell query to control user
export const useCreateUserAccount = () => {
  return useMutation({
    mutationFn: (user: INewUser) => createUserAcount(user),
  });
};

export const useSigninAccount = () => {
  return useMutation({
    mutationFn: (user: INewUser) => createUserAcount(user),
  });
};
