import mongoose from "mongoose";
const { Schema } = mongoose;
const FirmMasterSchema = new Schema({
  name: { type: String, required: true },
  country: { type: Schema.Types.ObjectId, ref: "Country", required: true },
  state: { type: Schema.Types.ObjectId, ref: "State", required: true },
  district: { type: Schema.Types.ObjectId, ref: "District", required: true },
  taluk: { type: Schema.Types.ObjectId, ref: "Taluk", required: true },
});

const FirmMaster = mongoose.model("FirmMaster", FirmMasterSchema);
export default FirmMaster;
