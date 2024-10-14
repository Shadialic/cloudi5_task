import React, { useState, useEffect } from "react";
import axiosInstance from "../../api/AxiosInstance";
import toast, { Toaster } from "react-hot-toast";

export default function ManageFirm({
  fetchAllData,
  countries,
  taluks,
  districts,
  states,
}) {
  const [firms, setFirms] = useState([]);
  const [newFirm, setNewFirm] = useState({
    name: "",
    country: "",
    state: "",
    district: "",
    taluk: "",
  });
  const [editFirmId, setEditFirmId] = useState(null);
  const [editableFirm, setEditableFirm] = useState(null); 

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

  const handleInputChange = (e, firmId) => {
    const { name, value } = e.target;
    if (firmId !== null) {
      setEditableFirm({ ...editableFirm, [name]: value });
    } else {
      setNewFirm({ ...newFirm, [name]: value });
    }
  };

  const handleSelectChange = (name, value, firmId) => {
    if (firmId !== null) {
      setEditableFirm({ ...editableFirm, [name]: value });
    } else {
      setNewFirm({ ...newFirm, [name]: value });
    }
  };

  const handleSave = async (firmId) => {
    try {
      if (firmId !== null) {
        await axiosInstance.put(`/firms/${firmId}`, editableFirm);
      } else {
        await axiosInstance.post("/firms", newFirm);
        setNewFirm({ name: "", country: "", state: "", district: "", taluk: "" });
      }
      fetchFirms();
      setEditFirmId(null);
      setEditableFirm(null);
    } catch (error) {
      toast.error(error);
    }
  };

  const handleEdit = (firm) => {
    setEditFirmId(firm._id);
    setEditableFirm({
      name: firm.name,
      country: firm.country?._id || "",
      state: firm.state?._id || "",
      district: firm.district?._id || "",
      taluk: firm.taluk?._id || "",
    });
  };

  const handleDelete = async (id) => {
    try {
      await axiosInstance.delete(`/firms/${id}`);
      fetchFirms();
    } catch (error) {
      toast.error(error);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Manage Firms</h1>

      <div className="bg-white p-6 shadow-lg rounded-lg">
        <h2 className="text-xl font-semibold mb-4">Firm List</h2>
        <table className="w-full table-auto border-collapse">
          <thead>
            <tr className="bg-gray-100">
              <th className="border px-4 py-2">Name</th>
              <th className="border px-4 py-2">Country</th>
              <th className="border px-4 py-2">State</th>
              <th className="border px-4 py-2">District</th>
              <th className="border px-4 py-2">Taluk</th>
              <th className="border px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="border px-4 py-2">
                <input
                  type="text"
                  name="name"
                  value={newFirm.name}
                  onChange={(e) => handleInputChange(e, null)}
                  placeholder="Firm Name"
                  className="block w-full p-2 border border-gray-300 rounded-md"
                  required
                />
              </td>
              <td className="border px-4 py-2">
                <select
                  value={newFirm.country}
                  onChange={(e) => handleSelectChange("country", e.target.value, null)}
                  className="block w-full p-2 border border-gray-300 rounded-md"
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
                  value={newFirm.state}
                  onChange={(e) => handleSelectChange("state", e.target.value, null)}
                  className="block w-full p-2 border border-gray-300 rounded-md"
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
                  value={newFirm.district}
                  onChange={(e) => handleSelectChange("district", e.target.value, null)}
                  className="block w-full p-2 border border-gray-300 rounded-md"
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
                  value={newFirm.taluk}
                  onChange={(e) => handleSelectChange("taluk", e.target.value, null)}
                  className="block w-full p-2 border border-gray-300 rounded-md"
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
                  onClick={() => handleSave(null)}
                  className="bg-green-500 text-white px-4 py-2 rounded-md"
                >
                  Add
                </button>
              </td>
            </tr>
            {firms.map((firm) => (
              <tr key={firm._id} className="text-center">
                <td className="border px-4 py-2">
                  {editFirmId === firm._id ? (
                    <input
                      type="text"
                      name="name"
                      value={editableFirm?.name || ""}
                      onChange={(e) => handleInputChange(e, firm._id)}
                      className="block w-full p-2 border border-gray-300 rounded-md"
                    />
                  ) : (
                    firm?.name
                  )}
                </td>
                <td className="border px-4 py-2">
                  {editFirmId === firm._id ? (
                    <select
                      value={editableFirm?.country || ""}
                      onChange={(e) =>
                        handleSelectChange("country", e.target.value, firm._id)
                      }
                      className="block w-full p-2 border border-gray-300 rounded-md"
                    >
                      <option value="">Select Country</option>
                      {countries.map((country) => (
                        <option key={country._id} value={country._id}>
                          {country.name}
                        </option>
                      ))}
                    </select>
                  ) : (
                    firm?.country?.name || "N/A"
                  )}
                </td>
                <td className="border px-4 py-2">
                  {editFirmId === firm._id ? (
                    <select
                      value={editableFirm?.state || ""}
                      onChange={(e) =>
                        handleSelectChange("state", e.target.value, firm._id)
                      }
                      className="block w-full p-2 border border-gray-300 rounded-md"
                    >
                      <option value="">Select State</option>
                      {states.map((state) => (
                        <option key={state._id} value={state._id}>
                          {state.name}
                        </option>
                      ))}
                    </select>
                  ) : (
                    firm?.state?.name || "N/A"
                  )}
                </td>
                <td className="border px-4 py-2">
                  {editFirmId === firm._id ? (
                    <select
                      value={editableFirm?.district || ""}
                      onChange={(e) =>
                        handleSelectChange("district", e.target.value, firm._id)
                      }
                      className="block w-full p-2 border border-gray-300 rounded-md"
                    >
                      <option value="">Select District</option>
                      {districts.map((district) => (
                        <option key={district._id} value={district._id}>
                          {district.name}
                        </option>
                      ))}
                    </select>
                  ) : (
                    firm?.district?.name || "N/A"
                  )}
                </td>
                <td className="border px-4 py-2">
                  {editFirmId === firm._id ? (
                    <select
                      value={editableFirm?.taluk || ""}
                      onChange={(e) =>
                        handleSelectChange("taluk", e.target.value, firm._id)
                      }
                      className="block w-full p-2 border border-gray-300 rounded-md"
                    >
                      <option value="">Select Taluk</option>
                      {taluks.map((taluk) => (
                        <option key={taluk._id} value={taluk._id}>
                          {taluk.name}
                        </option>
                      ))}
                    </select>
                  ) : (
                    firm?.taluk?.name || "N/A"
                  )}
                </td>
                <td className="border px-4 py-2">
                  {editFirmId === firm._id ? (
                    <>
                      <button
                        onClick={() => handleSave(firm._id)}
                        className="bg-blue-500 text-white px-4 py-2 rounded-md mr-2"
                      >
                        Save
                      </button>
                      <button
                        onClick={() => setEditFirmId(null)}
                        className="bg-gray-500 text-white px-4 py-2 rounded-md"
                      >
                        Cancel
                      </button>
                    </>
                  ) : (
                    <>
                      <button
                        onClick={() => handleEdit(firm)}
                        className="bg-yellow-500 text-white px-4 py-2 rounded-md mr-2"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(firm._id)}
                        className="bg-red-500 text-white px-4 py-2 rounded-md"
                      >
                        Delete
                      </button>
                    </>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <Toaster />
    </div>
  );
}
