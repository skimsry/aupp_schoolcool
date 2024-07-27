import { Schema, model } from "mongoose";
const mapSchema = new Schema({
  linkMap: {
    type: String,
    required: true,
  },
  createdDate: { type: Date, default: Date.now },
  updateDate: { type: Date, default: Date.now },
});

const Map = model("Map", mapSchema);

export default Map;
