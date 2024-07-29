import { Schema, model } from "mongoose";
const mactivitySchema = new Schema({
  text: {
    type: String,
    required: true,
  },
  createdDate: { type: Date, default: Date.now },
  updateDate: { type: Date, default: Date.now },
});

const Mactivity = model("Mactivity", mactivitySchema);

export default Mactivity;
