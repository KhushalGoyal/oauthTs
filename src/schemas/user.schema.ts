import { Schema, Types, model } from "mongoose";

const userSchema = new Schema({
  username: { type : String, required : true},
  password: { type : String, required : true},
  client: { type: Types.ObjectId, ref: "Client", required: true },
  loginEnabled: { type: Boolean, default : true },
}, {timestamps : true});

export const userModel = model("User", userSchema);
