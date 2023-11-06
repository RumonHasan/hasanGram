import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../ui/button';
import { useSignOutAccount } from '@/lib/react-query/queriesAndMutations';
import { useNavigate } from 'react-router-dom';
import { useUserContext } from '@/context/AuthContext';

const Navbar = () => {
  const { mutate: signOut, isSuccess } = useSignOutAccount();
  const navigate = useNavigate();
  const { user } = useUserContext();

  // if signout is successful then jumps back to home page
  useEffect(() => {
    if (isSuccess) {
      navigate(0);
    }
  }, [isSuccess, navigate]);

  return (
    <section className="topbar">
      <div className="flex-between py-4 px-5">
        <Link to="/" className="flex gap-3 items-center">
          Jump Here
        </Link>
        <div className="flex gap-4">
          <Button
            variant="ghost"
            className="shad-button_ghost"
            onClick={() => signOut()}
          >
            <img src="/assets/icons/logout.svg" alt="logout" />
          </Button>
          <Link to={`/profile/${user.id}`} className="flex-center gap-3">
            <img
              src={user.imageUrl || '/assets/images/profile-placeholder.svg'}
              height={40}
              width={40}
              className="rounded-full"
            />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Navbar;
