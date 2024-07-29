import { Schema, model } from "mongoose";
const mannouncementSchema = new Schema({
  text: {
    type: String,
    required: true,
  },
  createdDate: { type: Date, default: Date.now },
  updateDate: { type: Date, default: Date.now },
});

const Mannouncement = model("Mannouncement", mannouncementSchema);

export default Mannouncement;
