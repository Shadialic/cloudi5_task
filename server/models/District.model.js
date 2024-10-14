import mongoose from "mongoose";
const { Schema } = mongoose;

const districtSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    state: {
      type: Schema.Types.ObjectId,
      ref: "State",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const District = mongoose.model("District", districtSchema);

export default District;
