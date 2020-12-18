import { Schema, model } from "mongoose";

const clientSchema = new Schema({
  name: { type: String, required: true },
  clientId: { type: String, required: true },
  clientSecret: { type: String, required: true },
  grants: { type: Array, required: true },
  redirectUris: { type: Array, required: true },
  scope: { type: Array, required: true },
},{ timestamps : true });

export const clientModel = model("Client", clientSchema);
