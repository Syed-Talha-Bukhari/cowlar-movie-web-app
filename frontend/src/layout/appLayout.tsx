import { FC, ReactNode } from "react";
import Navbar from "../components/navbar/navbar";
import Footer from "../components/footer/footer";

type AppLayoutProps = {
  children: ReactNode;
};

const AppLayout: FC<AppLayoutProps> = ({ children }) => {
  return (
    <>
      <Navbar />
      {children}
      <Footer />
    </>
  );
};

export default AppLayout;
