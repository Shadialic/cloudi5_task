import React, { useState, useEffect } from "react";
import axiosInstance from "../api/AxiosInstance";

function ManagerDashboard() {
  const [firms, setFirms] = useState([]);
  const [countries, setCountries] = useState([]);
  const [states, setStates] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [taluks, setTaluks] = useState([]);
  const [editingFirmId, setEditingFirmId] = useState(null);
  const [editFirm, setEditFirm] = useState({
    name: "",
    country: "",
    state: "",
    district: "",
    taluk: "",
  });

  useEffect(() => {
    fetchFirms();
    fetchAllData();
  }, []);

  const fetchFirms = async () => {
    try {
      const response = await axiosInstance.get("/firms");
      setFirms(response.data);
    } catch (error) {
      toast.error(error);
    }
  };

  const fetchAllData = async () => {
    try {
      const [countriesRes, statesRes, districtsRes, taluksRes] = await Promise.all([
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
      toast.error(error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditFirm((prevFirm) => ({ ...prevFirm, [name]: value }));
  };

  const handleSelectChange = (e) => {
    const { name, value } = e.target;
    setEditFirm((prevFirm) => ({ ...prevFirm, [name]: value }));
  };

  const handleEdit = (firm) => {
    setEditingFirmId(firm._id);
    setEditFirm({
      name: firm.name,
      country: firm.country?._id || "",
      state: firm.state?._id || "",
      district: firm.district?._id || "",
      taluk: firm.taluk?._id || "",
    });
  };

  const handleSubmit = async (firmId) => {
    try {
      await axiosInstance.put(`/firms/${firmId}`, editFirm);
      setEditingFirmId(null);
      fetchFirms(); 
    } catch (error) {
      toast.error(error);
    }
  };

  return (
    <div className="bg-white p-6 shadow-lg rounded-lg">
      <h2 className="text-xl font-semibold mb-4">Manager Dashboard</h2>
      <table className="w-full table-auto border-collapse">
        <thead>
          <tr className="bg-gray-100">
            <th className="border px-4 py-2">No</th>
            <th className="border px-4 py-2">Name</th>
            <th className="border px-4 py-2">Country</th>
            <th className="border px-4 py-2">State</th>
            <th className="border px-4 py-2">District</th>
            <th className="border px-4 py-2">Taluk</th>
            <th className="border px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {firms.map((firm, i) => (
            <tr key={firm._id} className="text-center">
              {editingFirmId === firm._id ? (
                <>
                  <td className="border px-4 py-2">{i + 1}</td>
                  <td className="border px-4 py-2">
                    <input
                      type="text"
                      name="name"
                      value={editFirm.name}
                      onChange={handleInputChange}
                      className="border p-1 w-full"
                    />
                  </td>
                  <td className="border px-4 py-2">
                    <select
                      name="country"
                      value={editFirm.country}
                      onChange={handleSelectChange}
                      className="border p-1 w-full"
                    >
                      <option value="">Select Country</option>
                      {countries.map((country) => (
                        <option key={country._id} value={country._id}>
                          {country.name}
                        </option>
                      ))}
                    </select>
                  </td>
                  <td className="border px-4 py-2">
                    <select
                      name="state"
                      value={editFirm.state}
                      onChange={handleSelectChange}
                      className="border p-1 w-full"
                    >
                      <option value="">Select State</option>
                      {states.map((state) => (
                        <option key={state._id} value={state._id}>
                          {state.name}
                        </option>
                      ))}
                    </select>
                  </td>
                  <td className="border px-4 py-2">
                    <select
                      name="district"
                      value={editFirm.district}
                      onChange={handleSelectChange}
                      className="border p-1 w-full"
                    >
                      <option value="">Select District</option>
                      {districts.map((district) => (
                        <option key={district._id} value={district._id}>
                          {district.name}
                        </option>
                      ))}
                    </select>
                  </td>
                  <td className="border px-4 py-2">
                    <select
                      name="taluk"
                      value={editFirm.taluk}
                      onChange={handleSelectChange}
                      className="border p-1 w-full"
                    >
                      <option value="">Select Taluk</option>
                      {taluks.map((taluk) => (
                        <option key={taluk._id} value={taluk._id}>
                          {taluk.name}
                        </option>
                      ))}
                    </select>
                  </td>
                  <td className="border px-4 py-2">
                    <button
                      onClick={() => handleSubmit(firm._id)}
                      className="bg-green-500 text-white px-4 py-2 rounded-md"
                    >
                      Save
                    </button>
                    <button
                      onClick={() => setEditingFirmId(null)}
                      className="bg-red-500 text-white px-4 py-2 rounded-md ml-2"
                    >
                      Cancel
                    </button>
                  </td>
                </>
              ) : (
                <>
                  <td className="border px-4 py-2">{i + 1}</td>
                  <td className="border px-4 py-2">{firm?.name}</td>
                  <td className="border px-4 py-2">{firm?.country?.name || "N/A"}</td>
                  <td className="border px-4 py-2">{firm?.state?.name || "N/A"}</td>
                  <td className="border px-4 py-2">{firm?.district?.name || "N/A"}</td>
                  <td className="border px-4 py-2">{firm?.taluk?.name || "N/A"}</td>
                  <td className="border px-4 py-2">
                    <button
                      onClick={() => handleEdit(firm)}
                      className="bg-blue-500 text-white px-4 py-2 rounded-md"
                    >
                      Edit
                    </button>
                  </td>
                </>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ManagerDashboard;
