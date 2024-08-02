import { Schema, model } from "mongoose";
const classenrollmentSchema = new Schema({
  course_id: {
    type: String,
    required: true,
  },
  course_name: {
    type: String,
  },
  student_id: {
    type: String,
    required: true,
  },
  isdelete: {
    type: Boolean,
  },

  createdDate: { type: Date, default: Date.now },
  updateDate: { type: Date, default: Date.now },
});

const ClassEnrollment = model("ClassEnrollment", classenrollmentSchema);

export default ClassEnrollment;
