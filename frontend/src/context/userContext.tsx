import React, { createContext, useState } from 'react';
import { IContext } from '../types/context';
import { IUser } from '../types/user';

const UserContext = createContext<IContext>(null!);

const UserProvider = ({ children }: { children: React.ReactNode }) => {
    const [isLogged, setIsLogged] = useState<boolean>(false);
  const [user, setUser] = useState<IUser | null>(null);
  
  const updateUser = (userData: IUser | null) => {
    setUser(() => userData);
  };

  return (
    <UserContext.Provider value={{user, updateUser, isLogged, setIsLogged}}>{children}</UserContext.Provider>
  );
};

export { UserContext, UserProvider };
