import UserModel from "../../models/user";

const loginService = async (email: string, password: string) => {

  const user = await UserModel.findOne({ email });
  if (user && (user.matchPassword(password))) {
    const { _id, email, name } = user
        return { id: _id, email, name };;
  }
  return null;
};

export default loginService;
