import State from "../models/State.model.js";

const createState = async (req, res) => {
  try {
    const { name } = req.body;
    if (!name || name.trim() === "") {
      return res.status(400).json({ message: "State name is required." });
    }
    const exist = await State.findOne({ name: { $regex: new RegExp('^' + name + '$', 'i') } });
    if (exist) {
      return res.json({ message: "State already exists" });
    }
    const state = new State(req.body);
    await state.save();
    res.status(201).json(state);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Server error" });
  }
};

const getStates = async (req, res) => {
  try {
    const { country } = req.query;
    let states;
    if (country) {
      states = await State.find({ country });
    } else {
      states = await State.find();
    }
    res.status(200).json(states);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to fetch State" });
  }
};
const deleteStates = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedStates = await State.findByIdAndDelete(id);
    if (!deletedStates) {
      return res.status(404).json({ message: "States not found" });
    }
    res.status(200).json({ message: "States deleted successfully" });
  } catch (error) {
    console.error("Error deleting States:", error);
    res.status(500).json({ message: "Failed to delete States" });
  }
};
const updateStates = async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = req.body;
    const updateStates = await State.findByIdAndUpdate(id, updateData, {
      new: true,
    });
    if (!updateStates) {
      return res.status(404).json({ message: "State not found" });
    }
    res.status(200).json({
      message: "State updated successfully",
      States: updateStates,
    });
  } catch (error) {
    console.error("Error updating State:", error);
    res.status(500).json({ message: "Failed to update State" });
  }
};

export { createState, getStates, deleteStates, updateStates };
