import { Schema, model } from "mongoose";
const tocSchema = new Schema({
  text: {
    type: String,
    required: true,
  },
  createdDate: { type: Date, default: Date.now },
  updateDate: { type: Date, default: Date.now },
});

const Toc = model("Toc", tocSchema);

export default Toc;
