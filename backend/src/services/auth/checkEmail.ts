import UserModel from "../../models/user";

const checkEmailService = async (email: string) => {
    const existingUser = await UserModel.findOne({ email });
    return existingUser;
}

export default checkEmailService;