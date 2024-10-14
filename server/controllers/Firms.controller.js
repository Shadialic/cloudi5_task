import FirmMaster from "../models/Firm.model.js";

const createFirms = async (req, res) => {
  try {
    const { name } = req.body;
    if (!name || name.trim() === "") {
      return res.status(400).json({ message: "FirmMaster name is required." });
    }
    const firmMaster = new FirmMaster(req.body);
    await firmMaster.save();
    res.status(201).json(firmMaster);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Server error" });
  }
};

const getFirms = async (req, res) => {
  try {
    const firms = await FirmMaster.find().populate(
      "country state district taluk"
    );
    res.status(200).json(firms);
  } catch (error) {
    console.error("Error fetching firms:", error);
    res.status(500).json({ message: "Failed to fetch firms" });
  }
};

const deleteFirms = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedFirm = await FirmMaster.findByIdAndDelete(id);
    if (!deletedFirm) {
      return res.status(404).json({ message: "Firm not found" });
    }
    res.status(200).json({ message: "Firm deleted successfully" });
  } catch (error) {
    console.error("Error deleting firm:", error);
    res.status(500).json({ message: "Failed to delete firm" });
  }
};
const updateFirms = async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = req.body;
    const updateFirm = await FirmMaster.findByIdAndUpdate(id, updateData, {
      new: true,
    });
    if (!updateFirm) {
      return res.status(404).json({ message: "Firm not found" });
    }
    res.status(200).json({
      message: "Firm updated successfully",
      firm: updateFirm,
    });
  } catch (error) {
    console.error("Error updating firm:", error);
    res.status(500).json({ message: "Failed to update firm" });
  }
};

export { createFirms, getFirms, deleteFirms, updateFirms };
