import UserModel from "../../models/user";

export const deleteUserService = async (userId: string) => {
    const movie = await UserModel.findByIdAndDelete(userId);
    return movie;
}


