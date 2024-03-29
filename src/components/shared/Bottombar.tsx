import { bottombarLinks } from '@/constants';
import { INavLink } from '@/types';
import { Link, useLocation } from 'react-router-dom';

const Bottombar = () => {
  const { pathname } = useLocation();
  return (
    <section className="bottom-bar">
      {bottombarLinks.map((link: INavLink) => {
        const { route, imgURL, label } = link;
        const isActive = pathname === route;
        return (
          <Link
            to={route}
            className={`${
              isActive && 'bg-primary-500 rounded-[10px]'
            } flex-center flex-col gap-1 p-2 transition`}
            key={label}
          >
            <img
              src={imgURL}
              alt={label}
              className={` ${isActive && 'invert-white'}`}
              width={16}
              height={16}
            />
            <p className="tiny-medium text-light-2">{label}</p>
          </Link>
        );
      })}
    </section>
  );
};

export default Bottombar;
