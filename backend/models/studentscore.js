import { Schema, model } from "mongoose";
const managescoreSchema = new Schema({
  course_id: {
    type: String,
    required: true,
  },
  coursename: {
    type: String,
  },
  student_id: {
    type: String,
    required: true,
  },
  studentname: {
    type: String,
  },
  assignment: {
    type: Number,
  },
  midterm: {
    type: Number,
  },
  final: {
    type: Number,
  },
  total: {
    type: Number,
  },
  grade: {
    type: String,
  },
  createdDate: { type: Date, default: Date.now },
  updateDate: { type: Date, default: Date.now },
});

const Managescore = model("Managescore", managescoreSchema);

export default Managescore;
