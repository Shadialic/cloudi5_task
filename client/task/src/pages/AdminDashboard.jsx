import React, { useState, useEffect } from "react";
import axiosInstance from "../api/AxiosInstance";
import LocationTable from "../component/admin/LocationTable";
import ManageFirm from "../component/admin/ManageFirm";
import toast, { Toaster } from "react-hot-toast";
export default function AdminDashboard() {
  const [countries, setCountries] = useState([]);
  const [states, setStates] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [taluks, setTaluks] = useState([]);
  const [newLocation, setNewLocation] = useState({
    name: "",
    country: "",
    state: "",
    district: "",
    taluk: "",
  });
  const [activeTab, setActiveTab] = useState("countries");
  const [editingItemId, setEditingItemId] = useState(null);

  useEffect(() => {
    fetchAllData();
  }, []);

  const fetchAllData = async () => {
    try {
      const [countriesRes, statesRes, districtsRes, taluksRes] =
        await Promise.all([
          axiosInstance.get("/countries"),
          axiosInstance.get("/states"),
          axiosInstance.get("/districts"),
          axiosInstance.get("/taluks"),
        ]);
      setCountries(countriesRes.data);
      setStates(statesRes.data);
      setDistricts(districtsRes.data);
      setTaluks(taluksRes.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleInputChange = (e) => {
    setNewLocation({ ...newLocation, [e.target.name]: e.target.value });
  };

  const handleSelectChange = (name, value) => {
    setNewLocation({ ...newLocation, [name]: value });
  };

  const validateForm = () => {
    const trimmedName = newLocation.name.trim();
    if (!trimmedName) {
      toast.error("Name is required.");
      return false;
    }
    if (activeTab === "states" && !newLocation.country) {
      toast.error("Please select a country.");
      return false;
    }
    if (activeTab === "districts" && !newLocation.state) {
      toast.error("Please select a state.");
      return false;
    }
    if (activeTab === "taluks" && !newLocation.district) {
      toast.error("Please select a district.");
      return false;
    }

    setNewLocation({ ...newLocation, name: trimmedName });
    return true;
  };

  const handleSubmit = async (e, endpoint) => {
    e.preventDefault();
    if (!validateForm()) return;
  
    try {
      let res;
      if (editingItemId) {
        res = await axiosInstance.put(`/${endpoint}/${editingItemId}`, newLocation);
        toast.success(res.data.message);
        setEditingItemId(null);
      } else {
        res = await axiosInstance.post(`/${endpoint}`, newLocation);
        toast(res.data.message)
      }
      setNewLocation({
        name: "",
        country: "",
        state: "",
        district: "",
        taluk: "",
      });
      fetchAllData();
    } catch (error) {
      toast.error(error.response?.data?.message || "An error occurred");
      console.error(error);
    }
  };
  

  const handleDelete = async (id, endpoint) => {
    try {
      await axiosInstance.delete(`/${endpoint}/${id}`);
      fetchAllData();
    } catch (error) {
      toast.error(error);
    }
  };

  const handleEdit = (item) => {
    setNewLocation({
      name: item.name,
      country: item.country || "",
      state: item.state || "",
      district: item.district || "",
      taluk: item.taluk || "",
    });
    setEditingItemId(item._id);
  };
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Admin Dashboard</h1>
      <div className="tabs mb-4">
        <button
          className="mr-2 p-2 bg-gray-200"
          onClick={() => setActiveTab("countries")}
        >
          Countries
        </button>
        <button
          className="mr-2 p-2 bg-gray-200"
          onClick={() => setActiveTab("states")}
        >
          States
        </button>
        <button
          className="mr-2 p-2 bg-gray-200"
          onClick={() => setActiveTab("districts")}
        >
          Districts
        </button>
        <button
          className="mr-2 p-2 bg-gray-200"
          onClick={() => setActiveTab("taluks")}
        >
          Taluks
        </button>
        <button
          className="mr-2 p-2 bg-gray-200"
          onClick={() => setActiveTab("firms")}
        >
          Firms
        </button>
      </div>

      <div className="tab-content">
        {activeTab === "countries" && (
          <div>
            <h2 className="text-xl font-semibold mb-2">Manage Countries</h2>
            <form
              onSubmit={(e) => handleSubmit(e, "countries")}
              className="flex flex-col gap-4 m-auto w-[50%]"
            >
              <input
                type="text"
                name="name"
                value={newLocation.name}
                onChange={handleInputChange}
                placeholder="Country Name"
                required
                className="border border-gray-300 rounded px-3 py-1 mr-2"
              />
              <button
                type="submit"
                className="bg-black text-white px-3 py-1 rounded"
              >
                {editingItemId ? "Update Country" : "Add Country"}
              </button>
            </form>
            <LocationTable
              data={countries}
              endpoint="countries"
              handleEdit={handleEdit}
              handleDelete={handleDelete}
              fetchAllData={fetchAllData}
            />
          </div>
        )}

        {activeTab === "states" && (
          <div>
            <h2 className="text-xl font-semibold mb-2">Manage States</h2>
            <form
              onSubmit={(e) => handleSubmit(e, "states")}
              className="flex flex-col gap-4 m-auto w-[50%]"
            >
              <input
                type="text"
                name="name"
                value={newLocation.name}
                onChange={handleInputChange}
                placeholder="State Name"
                className="border border-gray-300 rounded px-3 py-1 mr-2"
              />
              <select
                value={newLocation.country}
                onChange={(e) => handleSelectChange("country", e.target.value)}
                className="block w-full p-2 border border-gray-300 rounded-md"
              >
                <option value="">Select Country</option>
                {countries.map((country) => (
                  <option key={country._id} value={country._id}>
                    {country.name}
                  </option>
                ))}
              </select>
              <button
                type="submit"
                className="bg-black text-white px-3 py-1 rounded"
              >
                {editingItemId ? "Update State" : "Add State"}
              </button>
            </form>
            <LocationTable
              data={states}
              endpoint="states"
              handleEdit={handleEdit}
              handleDelete={handleDelete}
              fetchAllData={fetchAllData}
            />
          </div>
        )}

        {activeTab === "districts" && (
          <div>
            <h2 className="text-xl font-semibold mb-2">Manage Districts</h2>
            <form
              onSubmit={(e) => handleSubmit(e, "districts")}
              className="flex flex-col gap-4 m-auto w-[50%]"
            >
              <input
                type="text"
                name="name"
                value={newLocation.name}
                onChange={handleInputChange}
                placeholder="District Name"
                required
                className="border border-gray-300 rounded px-3 py-1 mr-2"
              />
              <select
                value={newLocation.state}
                onChange={(e) => handleSelectChange("state", e.target.value)}
                className="block w-full p-2 border border-gray-300 rounded-md"
              >
                <option value="">Select State</option>
                {states.map((state) => (
                  <option key={state._id} value={state._id}>
                    {state.name}
                  </option>
                ))}
              </select>
              <button
                type="submit"
                className="bg-black text-white px-3 py-1 rounded"
              >
                {editingItemId ? "Update District" : "Add District"}
              </button>
            </form>
            <LocationTable
              data={districts}
              endpoint="districts"
              handleEdit={handleEdit}
              handleDelete={handleDelete}
              fetchAllData={fetchAllData}
            />
          </div>
        )}

        {activeTab === "taluks" && (
          <div>
            <h2 className="text-xl font-semibold mb-2">Manage Taluks</h2>
            <form
              onSubmit={(e) => handleSubmit(e, "taluks")}
              className="flex flex-col gap-4 m-auto w-[50%]"
            >
              <input
                type="text"
                name="name"
                value={newLocation.name}
                onChange={handleInputChange}
                placeholder="Taluk Name"
                required
                className="border border-gray-300 rounded px-3 py-1 mr-2"
              />
              <select
                value={newLocation.district}
                onChange={(e) => handleSelectChange("district", e.target.value)}
                className="block w-full p-2 border border-gray-300 rounded-md"
              >
                <option value="">Select District</option>
                {districts.map((district) => (
                  <option key={district._id} value={district._id}>
                    {district.name}
                  </option>
                ))}
              </select>
              <button
                type="submit"
                className="bg-black text-white px-3 py-1 rounded"
              >
                {editingItemId ? "Update Taluk" : "Add Taluk"}
              </button>
            </form>
            <LocationTable
              data={taluks}
              endpoint="taluks"
              handleEdit={handleEdit}
              handleDelete={handleDelete}
              fetchAllData={fetchAllData}
            />
          </div>
        )}

        {activeTab === "firms" && (
          <div>
            <ManageFirm
              fetchAllData={fetchAllData}
              countries={countries}
              districts={districts}
              states={states}
              taluks={taluks}
            />
          </div>
        )}
      </div>
      <Toaster />
    </div>
  );
}
