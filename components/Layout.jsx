import React from "react";
import Navbar from "./Layout/Navbar/Navbar";
import { Footer } from "./Layout/Footer/Footer";
const Layout = ({ children }) => {
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
