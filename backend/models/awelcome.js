import { Schema, model } from "mongoose";
const awelcomeSchema = new Schema({
  coverimg: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  createdDate: { type: Date, default: Date.now },
  updateDate: { type: Date, default: Date.now },
});

const Awelcome = model("Awelcome", awelcomeSchema);

export default Awelcome;
