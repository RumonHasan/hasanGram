import React from 'react';
import { Outlet, Navigate } from 'react-router-dom';
const AuthLayout = () => {
  const isAuthenticated = false;

  return (
    <React.Fragment>
      {isAuthenticated ? (
        <Navigate to="/" />
      ) : (
        <>
          <section className="flex flex-1 justify-center items-center flex-col py-10">
            {/*outlet contains the routes */}
            <Outlet />
          </section>

          <img
            src="/assets/images/side-two.svg"
            alt="logo"
            className="w-1/2 h-screen hidden xl:block object-cover bg-no-repeat"
          />
        </>
      )}
    </React.Fragment>
  );
};

export default AuthLayout;
