import { useMutation } from '@tanstack/react-query';
import { createUserAcount, signOutAccount } from '../appwrite/api';
import { INewUser } from '@/types';
import { signInAccount } from '../appwrite/api';

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
