import { Schema, model } from "mongoose";
const announcementSchema = new Schema({
  imgcover: {
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

const Announcement = model("Announcement", announcementSchema);

export default Announcement;
