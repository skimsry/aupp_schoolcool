import { Schema, model } from "mongoose";
const alertSchema = new Schema({
  codeTitle: {
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
  postaudience: {
    // type: Number,
    type: String,
  },
  // toId: {
  //   type: Schema.Types.ObjectId,
  //   ref: "User",
  // },
  // courseId: {
  //   type: Schema.Types.ObjectId,
  //   ref: "Course",
  // },
  toId: {
    type: String,
  },
  courseId: {
    type: String,
  },
  filename: { type: String },
  path: { type: String },
  size: { type: Number },
  status: { type: Boolean },
  createdDate: { type: Date, default: Date.now, index: true },
  updateDate: { type: Date, default: Date.now, index: true },
});
// Middleware to update 'updateDate' before saving a document
alertSchema.pre("save", function (next) {
  if (this.isModified()) {
    this.updateDate = Date.now();
  }
  next();
});

const Alert = model("Alert", alertSchema);

export default Alert;
