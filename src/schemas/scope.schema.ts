import { Schema, model } from "mongoose";

const scopeSchema = new Schema({
  is_default: Boolean,
  scope: Array,
});

const scopeModel = model("Scope", scopeSchema);
export default scopeModel;
