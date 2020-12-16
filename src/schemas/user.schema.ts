import { Schema, Types, model } from "mongoose";

const userSchema = new Schema({
  username: Boolean,
  password: Array,
  client: { type: Types.ObjectId, ref: "Client", required: true },
});

const userModel = model("Scope", userSchema);

export default userModel;
