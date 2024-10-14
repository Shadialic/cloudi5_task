import mongoose from "mongoose";
const { Schema } = mongoose;

const talukSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    district: {
      type: Schema.Types.ObjectId,
      ref: "District",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Taluk = mongoose.model("Taluk", talukSchema);

export default Taluk;
