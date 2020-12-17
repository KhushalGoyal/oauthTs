import { Schema, Types, model } from "mongoose";

const userSchema = new Schema({
  username: String,
  password: String,
  client: { type: Types.ObjectId, ref: "Client", required: true },
  loginEnabled: Boolean,
});

export const userModel = model("User", userSchema);
