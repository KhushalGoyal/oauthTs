import { Schema, model } from "mongoose";

const clientSchema = new Schema({
  name: String,
  client_id: String,
  client_secret: String,
  grants: Array,
  refirectUri: Array,
  scope: Array,
});

const clientModel = model("Client", clientSchema);
export default clientModel;
