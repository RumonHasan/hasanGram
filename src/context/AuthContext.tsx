import { createContext, useContext, useEffect, useState } from 'react';
import { IContextType, IUser } from '@/types';
import { getCurrentUser } from '@/lib/appwrite/api';
import { useNavigate } from 'react-router-dom';

const INITIAL_USER = {
  id: '',
  name: '',
  username: '',
  email: '',
  imageUrl: '',
  bio: '',
};

const INITIAL_STATE = {
  user: INITIAL_USER,
  isLoading: false,
  isAuthenticated: false,
  setUser: () => {},
  setIsAuthenticated: () => {},
  checkAuthUser: async () => false as boolean,
};

const AuthContext = createContext<IContextType>(INITIAL_STATE);

const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<IUser>(INITIAL_USER);
  const [isLoading, setIsLoading] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    if (
      // if there is no current session then fall back to sign in page
      localStorage.getItem('cookieFallback') === null ||
      localStorage.getItem('cookieFallback') === '[]'
    ) {
      navigate('/sign-in');
    }
    // assigns the current session user to the user so it can be injected into the context
    checkAuthUser();
  }, []);

  const checkAuthUser = async () => {
    try {
      const currentAccount = await getCurrentUser();
      if (currentAccount) {
        setUser({
          id: currentAccount.$id,
          username: currentAccount.username,
          name: currentAccount.name,
          email: currentAccount.email,
          imageUrl: currentAccount.imageUrl,
          bio: currentAccount.bio,
        });
        setIsAuthenticated(true);
        return true;
      }
      return false;
    } catch (error) {
      console.log(error);
      return false;
    } finally {
      setIsLoading(false);
    }
  };
  const value = {
    user,
    setUser,
    isLoading,
    isAuthenticated,
    setIsAuthenticated,
    checkAuthUser,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthProvider;
// eslint-disable-next-line react-refresh/only-export-components
export const useUserContext = () => useContext(AuthContext);
