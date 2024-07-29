import { Schema, model } from "mongoose";
const aboutusSchema = new Schema({
  text: {
    type: String,
    required: true,
  },
  historys: {
    type: String,
    required: true,
  },
  vision: {
    type: String,
    required: true,
  },
  mission: {
    type: String,
    required: true,
  },
  career: {
    type: String,
    required: true,
  },
  license: {
    type: String,
    required: true,
  },
  createdDate: { type: Date, default: Date.now },
  updateDate: { type: Date, default: Date.now },
});

const Aboutus = model("Aboutus", aboutusSchema);

export default Aboutus;
