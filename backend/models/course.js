import { Schema, model, mongoose } from "mongoose";
// const courseSchema = new Schema({
const courseSchema = new mongoose.Schema({
  coursename: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  sdate: {
    type: Date,
  },
  edate: {
    type: Date,
  },
  teacherid: {
    type: String,
  },
  room: {
    type: String,
  },
  status: {
    type: Boolean,
  },
  createdDate: { type: Date, default: Date.now },
  updateDate: { type: Date, default: Date.now },
});

//const Course = model("Course", courseSchema);
const Course = mongoose.model("Course", courseSchema);

export default Course;
