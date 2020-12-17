import { Schema, model } from "mongoose";

const scopeSchema = new Schema({
  is_default: Boolean,
  scope: Array,
});

export const scopeModel = model("Scope", scopeSchema);