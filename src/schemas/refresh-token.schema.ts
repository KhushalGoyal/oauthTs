import { Schema, Types, model } from "mongoose";

const refreshTokenSchema = new Schema({
  refreshToken: String,
  refreshTokenExpiresAt: Date,
  scope: Array,
  client: { type: Types.ObjectId, ref: "Client", required: true },
  user: { type: Types.ObjectId, ref: "User", required: true },
});

export const refreshTokenModel = model("RefreshToken", refreshTokenSchema);
