import { Schema, model } from "mongoose";
const attendantSchema = new Schema({
  student_id: {
    type: String,
    required: true,
  },
  studentname: {
    type: String,
  },
  course_id: {
    type: String,
    required: true,
  },
  coursename: {
    type: String,
  },

  attendantdate: {
    type: Date,
  },
  isattend: {
    type: Boolean,
  },
  createdDate: { type: Date, default: Date.now },
  updateDate: { type: Date, default: Date.now },
});

const Attendant = model("Attendant", attendantSchema);

export default Attendant;
