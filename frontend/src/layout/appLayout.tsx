import { FC, ReactNode } from "react";
import Navbar from "../components/navbar/navbar";

type AppLayoutProps = {
  children: ReactNode;
};

const AppLayout: FC<AppLayoutProps> = ({ children }) => {
  return (
    <>
      <Navbar />
      {children}
    </>
  );
};

export default AppLayout;
