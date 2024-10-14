import mongoose from "mongoose";

const { Schema } = mongoose;

const stateSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    country: {
      type: Schema.Types.ObjectId,
      ref: "Country",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const State = mongoose.model("State", stateSchema);

export default State;
