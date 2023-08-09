import React from "react";
import Navbar from "./Layout/Navbar/Navbar";
import { Footer } from "./Layout/Footer/Footer";
import { useRouter } from "next/router";
const Layout = ({ children }) => {
  const router = useRouter();
  if (router.pathname == "/dashboard") {
    return <>{children}</>;
  }
  return (
    <>
      <Navbar />
      {children}
      <Footer />
    </>
  );
};

export default Layout;

if (module.hot) {
  module.hot.accept();
}
