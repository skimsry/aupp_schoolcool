import { Schema, model } from "mongoose";
const textslideshowSchema = new Schema({
  infrontStext: {
    type: String,
    required: true,
  },
  infronttext: {
    type: String,
    required: true,
  },
  slogantext: {
    type: String,
    required: true,
  },
  artistprofile: {
    type: String,
    required: false,
  },
  name: {
    type: String,
    required: true,
  },
  position: {
    type: String,
    required: true,
  },
  createdDate: { type: Date, default: Date.now },
  updateDate: { type: Date, default: Date.now },
});

const Textslideshow = model("Textslideshwo", textslideshowSchema);

export default Textslideshow;
