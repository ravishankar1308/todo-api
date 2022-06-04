import Mongoose from "mongoose";

const TodoSchema = new Mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      default: "CREATED",
      required: true,
    },
    Author: {
      type: Mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
);

export const Todo: any = Mongoose.model("Todo", TodoSchema);
