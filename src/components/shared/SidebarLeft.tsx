import { useEffect } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { useUserContext } from '@/context/AuthContext';
import { Button } from '../ui/button';
import { useSignOutAccount } from '@/lib/react-query/queriesAndMutations';
import { useNavigate, useLocation } from 'react-router-dom';
import { sidebarLinks } from '@/constants';
import { INavLink } from '@/types';

const SidebarLeft = () => {
  const { user } = useUserContext();
  const { mutate: signOut, isSuccess } = useSignOutAccount();
  const navigate = useNavigate();
  const { pathname } = useLocation();

  // if signout is successful then jumps back to home page
  useEffect(() => {
    if (isSuccess) {
      navigate(0);
    }
  }, [isSuccess, navigate]);

  return (
    <nav className="leftsidebar">
      <div className="flex flex-col gap-11">
        <Link to="/" className="flex gap-3 items-center">
          Jump Here
        </Link>
        <Link to={`/profile/${user.id}`} className="flex gap-3 items-center">
          <img
            src={user.imageUrl || '/assets/icons/profile-placeholder.svg'}
            height={40}
            width={40}
            className="rounded-full"
          />
          <div className="flex flex-col">
            <p className="body-bold">{user.name}</p>
            <p className="small-regular text-light-3">@{user.username}</p>
          </div>
        </Link>
        <ul className="flex flex-col gap-6">
          {sidebarLinks.map((link: INavLink) => {
            const { route, imgURL, label } = link;
            const isActive = pathname === route;
            return (
              <li
                className={`leftsidebar-link group ${
                  isActive && 'bg-primary-500'
                }`}
                key={label}
              >
                <NavLink to={route} className="flex gap-4 items-center p-4">
                  <img
                    src={imgURL}
                    alt={label}
                    className={`group-hover:invert-white ${
                      isActive && 'invert-white'
                    }`}
                  />
                  {label}
                </NavLink>
              </li>
            );
          })}
        </ul>
      </div>
      <Button
        variant="ghost"
        className="shad-button_ghost"
        onClick={() => signOut()}
      >
        <img src="/assets/icons/logout.svg" alt="logout" />
        <p className="small-medium lg:base-medium">Logout</p>
      </Button>
    </nav>
  );
};

export default SidebarLeft;
