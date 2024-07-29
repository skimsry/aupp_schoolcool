import { Schema, model } from "mongoose";
const mteamSchema = new Schema({
  text: {
    type: String,
    required: true,
  },
  createdDate: { type: Date, default: Date.now },
  updateDate: { type: Date, default: Date.now },
});

const Mteam = model("Mteam", mteamSchema);

export default Mteam;
