import Taluk from "../models/Taluk.model.js";

const createTaluk = async (req, res) => {
  try {
    console.log(req.body);
    const { name } = req.body;
    if (!name || name.trim() === "") {
      return res.status(400).json({ message: "Taluk name is required." });
    }
    const exist = await Taluk.findOne({ name });
    if (exist) {
      return res.status(400).json({ message: "Country already exists" });
    }
    if (exist) {
      return res.json({ message: "Taluk already exists" });
    }
    const taluk = new Taluk(req.body);
    await taluk.save();
    res.status(201).json(taluk);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Server error" });
  }
};

const getTaluk = async (req, res) => {
  try {
    const { district } = req.query;
    let taluk;
    if (district) {
      taluk = await Taluk.find({ district });
    } else {
      taluk = await Taluk.find();
    }
    res.status(200).json(taluk);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to fetch countries" });
  }
};
const deleteTaluk = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedTaluk = await Taluk.findByIdAndDelete(id);
    if (!deletedTaluk) {
      return res.status(404).json({ message: "Taluk not found" });
    }
    res.status(200).json({ message: "Taluk deleted successfully" });
  } catch (error) {
    console.error("Error deleting Taluk:", error);
    res.status(500).json({ message: "Failed to delete Taluk" });
  }
};

const updateTaluk = async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = req.body;
    const updateTaluk = await Taluk.findByIdAndUpdate(id, updateData, {
      new: true,
    });
    if (!updateTaluk) {
      return res.status(404).json({ message: "Taluk not found" });
    }
    res.status(200).json({
      message: "Taluk updated successfully",
      Taluk: updateTaluk,
    });
  } catch (error) {
    console.error("Error updating Taluk:", error);
    res.status(500).json({ message: "Failed to update Taluk" });
  }
};

export { createTaluk, getTaluk, deleteTaluk, updateTaluk };
