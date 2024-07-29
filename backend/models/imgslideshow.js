import { Schema, model } from "mongoose";
const imgslideshowSchema = new Schema({
  imgslideshow: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  createdDate: { type: Date, default: Date.now },
  updateDate: { type: Date, default: Date.now },
});

const Imgslideshow = model("Imgslideshow", imgslideshowSchema);

export default Imgslideshow;
