import { clientModel } from "../../schemas";
import OAuthClient from "../../interfaces/client.interface";
import { v4 as uuidV4 } from "uuid";

class ClientModel {
  public async createStaticClient(): Promise<OAuthClient> {
    return clientModel.create({
      name: "Management Portal",
      clientId: "MANAGEMENT_PORTAL",
      clientSecret: uuidV4(),
      grants: [
        "authorization_code",
        "refresh_token",
        "password",
        "client_credentials",
      ],
      redirectUris: ["http://localhost:9000"],
      scope: ["add", "edit", "delete"],
    });
  }

  public async getClinetByClientId(clientId: string): Promise<OAuthClient> {
    return (clientModel
      .findOne({
        clientId,
      })
      .lean() as any) as OAuthClient;
  }
}

export const clientModelImp = new ClientModel();
