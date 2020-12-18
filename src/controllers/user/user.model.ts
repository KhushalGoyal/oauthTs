import { userModel } from "../../schemas";
import OAuthUser from "../../interfaces/user.interface";
import { PasswordHelper } from "../../helpers/passwordhelper";

class UserModel {
    public async createStaticUser() : Promise<OAuthUser>{
        return userModel.create({
            username: "khushalg123",
            password: PasswordHelper.encrypt('khushalgoyal10'),
            client: '5fdc861b9dbc986f3dbe69ac',
            loginEnabled: true,
        }) 
    }

    public async getUserByName(username : string) : Promise<OAuthUser> {
        return userModel.findOne({
            username : username
        }).lean() as any as OAuthUser;
    }
}

export const userModelImpl = new UserModel() 