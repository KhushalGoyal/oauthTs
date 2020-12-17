import { Schema, Types, model } from "mongoose";

const accessTokenSchema = new Schema({
  accessToken: String,
  accessTokenExpiresAt: Date,
  refreshToken : String,
  refreshTokenExpiresAt : Date,
  scope: Array,
  client: { type: Types.ObjectId, ref: "Client", required: true },
  user: { type: Types.ObjectId, ref: "User", required: true },
});

export const accessTokenModel = model("AccessToken", accessTokenSchema);
