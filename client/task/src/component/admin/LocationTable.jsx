import React, { useState } from "react";
import axiosInstance from "../../api/AxiosInstance";
import toast, { Toaster } from "react-hot-toast";

const LocationTable = ({ data, endpoint, handleDelete, fetchAllData }) => {
  const [editingId, setEditingId] = useState(null);
  const [editingName, setEditingName] = useState("");

  const handleEdit = (item) => {
    setEditingId(item._id);
    setEditingName(item.name);
  };

  const handleUpdate = async (id) => {
    try {
      await axiosInstance.put(`/${endpoint}/${id}`, { name: editingName });
      setEditingId(null);
      fetchAllData();
    } catch (error) {
      toast.error(error);
    }
  };

  if (!Array.isArray(data)) {
    return <p>No data available for {endpoint}</p>;
  }

  return (
    <table className=" w-[50%] m-auto  text-left border border-gray-200 mt-4">
      <thead className="bg-gray-100">
        <tr>
          <th className="py-2 px-4 border-b">Name</th>
          <th className="text-end pr-10 border-b">Actions</th>
        </tr>
      </thead>
      <tbody>
        {data.length > 0 ? (
          data.map((item) => (
            <tr key={item._id}>
              <td className="py-2 px-4 border-b">
                {editingId === item._id ? (
                  <input
                    type="text"
                    value={editingName}
                    onChange={(e) => setEditingName(e.target.value)}
                    className="border border-gray-300 rounded px-2 py-1"
                  />
                ) : (
                  item.name
                )}
              </td>
              <td className="text-end border-b">
                {editingId === item._id ? (
                  <>
                    <button
                      className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600"
                      onClick={() => handleUpdate(item._id)}
                    >
                      Save
                    </button>
                    <button
                      className="bg-red-500 text-white px-3 py-1 ml-2 rounded hover:bg-red-600"
                      onClick={() => setEditingId(null)}
                    >
                      Cancel
                    </button>
                  </>
                ) : (
                  <>
                    <button
                      className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
                      onClick={() => handleEdit(item)}
                    >
                      Edit
                    </button>
                    <button
                      className="bg-red-500 text-white px-3 py-1 ml-2 rounded hover:bg-red-600"
                      onClick={() => handleDelete(item._id, endpoint)}
                    >
                      Delete
                    </button>
                  </>
                )}
              </td>
            </tr>
          ))
        ) : (
          <tr>
            <td colSpan="2" className="py-2 px-4 border-b text-center">
              No items found
            </td>
          </tr>
        )}
      </tbody>
      <Toaster />
    </table>
  );
};

export default LocationTable;
