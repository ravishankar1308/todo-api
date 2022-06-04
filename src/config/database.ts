import Mongoose from "mongoose";

export const connectDB = () => {
  if (process.env.MONGO_HOST) {
    Mongoose.connect(process.env.MONGO_HOST).then(() => {
      console.log("MongoDB Connected Successfully");
    });
  } else {
    console.debug("Please configure MongoDB credential");
  }
};

export const jwtSecret = process.env.JWT_SECRET || "KEY";
