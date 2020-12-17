import { Schema, Types, model } from "mongoose";

const authorizationCodeSchema = new Schema({
  authorizationCode: String,
  expiresAt: Date,
  redirectUri: String,
  scope: Array,
  client: { type: Types.ObjectId, ref: "Client", required: true },
  user: { type: Types.ObjectId, ref: "User", required: true },
});

export const authorizationCodeModel = model(
  "AuthorizationCode",
  authorizationCodeSchema
);