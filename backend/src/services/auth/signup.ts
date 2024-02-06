import UserModel from "../../models/user";

const signupService = async (name: string, password: string, email: string, phoneNumber: string) => {
    const newUser = await UserModel.create({
        name, password, phoneNumber, email
    });
    return newUser;
}

export default signupService;