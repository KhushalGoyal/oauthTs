import { Schema, model } from "mongoose";

const clientSchema = new Schema({
  name: { type: String, required: true },
  clientId: { type: String, required: true },
  clientSecret: { type: String, required: true },
  grants: { type: String, required: true },
  refirectUris: { type: String, required: true },
  scope: { type: Array, required: true },
});

export const clientModel = model("Client", clientSchema);
