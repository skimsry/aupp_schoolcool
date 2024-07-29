import { Schema, model } from "mongoose";
const secondcontactSchema = new Schema({
  fullname: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  subject: {
    type: String,
    required: true,
  },
  message: {
    type: String,
    required: true,
  },
  createdDate: { type: Date, default: Date.now },
  updateDate: { type: Date, default: Date.now },
});

const Secondcontact = model("Secondcontact", secondcontactSchema);

export default Secondcontact;
