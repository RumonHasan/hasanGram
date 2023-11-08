import Bottombar from '@/components/shared/Bottombar';
import Navbar from '@/components/shared/Navbar';
import SidebarLeft from '@/components/shared/SidebarLeft';
import { Outlet } from 'react-router-dom';

// contains the main layout that displays based on the screen size whether its desktop or mobile
const RootLayout = () => {
  return (
    <div className="w-full md:flex">
      <Navbar />
      <SidebarLeft />
      <section className="flex flex-1 h-full">
        <Outlet />
      </section>
      <Bottombar />
    </div>
  );
};

export default RootLayout;
