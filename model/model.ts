import { Schema, model } from "mongoose";

const dataScheme = new Schema({
  name: {
    type: String,
    required: true
  },
  age: {
    required: true,
    type: Number
  }
});

export default model("Data", dataScheme);
