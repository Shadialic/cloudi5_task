import District from "../models/District.model.js";

const createDistrict = async (req, res) => {
  try {
    const { name } = req.body;
    if (!name || name.trim() === "") {
      return res.status(400).json({ message: "District name is required." });
    }
    const exist = await District.findOne({ name: { $regex: new RegExp('^' + name + '$', 'i') } });
    if (exist) {
      return res.json({ message: "District already exists" });
    }
    const district = new District(req.body);
    await district.save();
    res.status(201).json(district);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Server error" });
  }
};

const getDistrict = async (req, res) => {
  try {
    const { state } = req.query;
    let district;
    if (state) {
      district = await District.find({ state });
    } else {
      district = await District.find();
    }
    res.status(200).json(district);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to fetch countries" });
  }
};

const deleteDistrict = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedDistrict = await District.findByIdAndDelete(id);
    if (!deletedDistrict) {
      return res.status(404).json({ message: "District not found" });
    }
    res.status(200).json({ message: "District deleted successfully" });
  } catch (error) {
    console.error("Error deleting District:", error);
    res.status(500).json({ message: "Failed to delete District" });
  }
};
const updateDistrict = async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = req.body;
    const updateDistrict = await District.findByIdAndUpdate(id, updateData, {
      new: true,
    });
    if (!updateDistrict) {
      return res.status(404).json({ message: "District not found" });
    }
    res.status(200).json({
      message: "District updated successfully",
      District: updateDistrict,
    });
  } catch (error) {
    console.error("Error updating District:", error);
    res.status(500).json({ message: "Failed to update District" });
  }
};

export { createDistrict, getDistrict, deleteDistrict, updateDistrict };
