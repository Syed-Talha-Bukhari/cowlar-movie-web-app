import React, { createContext, useState } from 'react';
import { IContext } from '../types/context';
import { IUser } from '../types/user';

const UserContext = createContext<IContext>(null!);

const UserProvider = ({ children }: { children: React.ReactNode }) => {
    const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [user, setUser] = useState<IUser | null>(null);
  
  const updateUser = (userData: IUser | null) => {
    setUser(() => userData);
  };

  return (
    <UserContext.Provider value={{user, updateUser, isLoggedIn, setIsLoggedIn}}>{children}</UserContext.Provider>
  );
};

export { UserContext, UserProvider };
