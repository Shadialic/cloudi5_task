import Country from "../models/Country.model.js";

const createCountry = async (req, res) => {
  try {
    const { name } = req.body;
    if (!name || name.trim() === "") {
      return res.json({ message: "Country name is required." });
    }
    const exist = await Country.findOne({ name: { $regex: new RegExp('^' + name + '$', 'i') } });
    if (exist) {
      return res.json({ message: "Country already exists" });
    }
    const country = new Country(req.body);
    await country.save();
    res.status(201).json(country);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Server error" });
  }
};

const getCountry = async (req, res) => {
  try {
    const countries = await Country.find();
    res.status(200).json(countries);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to fetch countries" });
  }
};

const deleteCountry = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedCountry = await Country.findByIdAndDelete(id);
    if (!deletedCountry) {
      return res.status(404).json({ message: "Country not found" });
    }
    res.status(200).json({ message: "Country deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to delete Country" });
  }
};
const updateCountry = async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = req.body;
    const updateCountry = await Country.findByIdAndUpdate(id, updateData, {
      new: true,
    });
    if (!updateCountry) {
      return res.status(404).json({ message: "Country not found" });
    }
    res.status(200).json({
      message: "Country updated successfully",
      Country: updateCountry,
    });
  } catch (error) {
    console.error("Error updating Country:", error);
    res.status(500).json({ message: "Failed to update Country" });
  }
};

export { createCountry, getCountry, deleteCountry, updateCountry };
