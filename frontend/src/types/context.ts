import { IUser } from './user';

export interface IContext {
    user: IUser | null;
    updateUser: (userData: IUser | null) => void;
    isLogged: boolean;
    setIsLogged: (val: boolean) => void;
}
