import mongoose from "mongoose";
const connectToDb = async () => {
  const dbname = "schoolcool";
  await mongoose.connect(
    `mongodb+srv://${process.env.atlasUser}:${process.env.atlasPassword}@cluster0.1eexyf1.mongodb.net/${dbname}?retryWrites=true&w=majority&appName=Cluster0`,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  );
};

// const connectToDb = async () => {
//   const dbname = "schoolcool";
//   await mongoose.connect(`mongodb://localhost:27017/${dbname}`, {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
//   });
// };
export default connectToDb;
