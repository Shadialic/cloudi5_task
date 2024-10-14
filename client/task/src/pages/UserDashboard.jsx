import React, { useState, useEffect } from "react";
import axiosInstance from "../api/AxiosInstance";
import toast, { Toaster } from "react-hot-toast";

export default function LocationSelector() {
  const [countries, setCountries] = useState([]);
  const [states, setStates] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [taluks, setTaluks] = useState([]);
  const [firms, setFirms] = useState([]);

  const [selectedCountry, setSelectedCountry] = useState("");
  const [selectedState, setSelectedState] = useState("");
  const [selectedDistrict, setSelectedDistrict] = useState("");
  const [selectedTaluk, setSelectedTaluk] = useState("");

  useEffect(() => {
    fetchCountries();
    fetchFirms();
  }, []);

  const fetchFirms = async () => {
    try {
      const response = await axiosInstance.get("/firms");
      setFirms(response.data);
      toast.success("Success");
    } catch (error) {
      toast.error(error);
    }
  };
  const fetchCountries = async () => {
    try {
      const response = await axiosInstance.get("/countries");
      setCountries(response.data);
      toast.success("Success");
    } catch (error) {
      toast.error(error);
    }
  };

  const fetchStates = async (countryId) => {
    try {
      const response = await axiosInstance.get(`/states?country=${countryId}`);
      setStates(response.data);
      toast.success("Success");
      setDistricts([]);
      setTaluks([]);
    } catch (error) {
      toast.error(error);
    }
  };

  const fetchDistricts = async (stateId) => {
    try {
      const response = await axiosInstance.get(`/districts?state=${stateId}`);
      setDistricts(response.data);
      toast.success("Success");
      setTaluks([]);
    } catch (error) {
      toast.error(error);
    }
  };

  const fetchTaluks = async (districtId) => {
    try {
      const response = await axiosInstance.get(
        `/taluks?district=${districtId}`
      );
      setTaluks(response.data);
      toast.success("Success");
    } catch (error) {
      toast.error(error);
    }
  };

  const handleCountryChange = (value) => {
    setSelectedCountry(value);
    setSelectedState("");
    setSelectedDistrict("");
    setSelectedTaluk("");
    fetchStates(value);
  };

  const handleStateChange = (value) => {
    setSelectedState(value);
    setSelectedDistrict("");
    setSelectedTaluk("");
    fetchDistricts(value);
  };

  const handleDistrictChange = (value) => {
    setSelectedDistrict(value);
    setSelectedTaluk("");
    fetchTaluks(value);
  };

  const handleTalukChange = (value) => {
    setSelectedTaluk(value);
  };

  return (
    <>
      <h1 className="text-2xl font-bold mb-4 p-6">User Dashboard</h1>
      <div className="max-w-4xl mx-auto p-6 space-y-6">
        <div className="bg-white shadow-lg rounded-lg p-6">
          <h2 className="text-xl font-semibold mb-4">Location Selector</h2>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
            <div className="mb-4">
              <select
                className="block w-full px-4 py-2 border border-gray-300 rounded-md"
                value={selectedCountry}
                onChange={(e) => handleCountryChange(e.target.value)}
              >
                <option value="">Select Country</option>
                {countries.map((country) => (
                  <option key={country._id} value={country._id}>
                    {country.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="mb-4">
              <select
                className="block w-full px-4 py-2 border border-gray-300 rounded-md"
                value={selectedState}
                onChange={(e) => handleStateChange(e.target.value)}
                disabled={!selectedCountry}
              >
                <option value="">Select State</option>
                {states.map((state) => (
                  <option key={state._id} value={state._id}>
                    {state.name}
                  </option>
                ))}
              </select>
            </div>
            <div className="mb-4">
              <select
                className="block w-full px-4 py-2 border border-gray-300 rounded-md"
                value={selectedDistrict}
                onChange={(e) => handleDistrictChange(e.target.value)}
                disabled={!selectedState}
              >
                <option value="">Select District</option>
                {districts.map((district) => (
                  <option key={district._id} value={district._id}>
                    {district.name}
                  </option>
                ))}
              </select>
            </div>
            <div className="mb-4">
              <select
                className="block w-full px-4 py-2 border border-gray-300 rounded-md"
                value={selectedTaluk}
                onChange={(e) => handleTalukChange(e.target.value)}
                disabled={!selectedDistrict}
              >
                <option value="">Select Taluk</option>
                {taluks.map((taluk) => (
                  <option key={taluk._id} value={taluk._id}>
                    {taluk.name}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
        <div className="bg-white p-6 shadow-lg rounded-lg">
          <h2 className="text-xl font-semibold mb-4">Firm List</h2>
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white">
              <thead className="bg-gray-100">
                <tr>
                  <th className="border px-4 py-2 text-left">No</th>
                  <th className="border px-4 py-2 text-left">Firm Name</th>
                  <th className="border px-4 py-2 text-left">Country</th>
                  <th className="border px-4 py-2 text-left">State</th>
                  <th className="border px-4 py-2 text-left">District</th>
                  <th className="border px-4 py-2 text-left">Taluk</th>
                </tr>
              </thead>
              <tbody>
                {Array.isArray(firms) &&
                  firms.map((firm,i) => (
                    <tr key={firm._id} className="border-t">
                      <td className="border px-4 py-2">{i+1}</td>
                      <td className="border px-4 py-2">{firm?.name}</td>
                      <td className="border px-4 py-2">
                        {firm?.country?.name || "N/A"}
                      </td>
                      <td className="border px-4 py-2">
                        {firm?.state?.name || "N/A"}
                      </td>
                      <td className="border px-4 py-2">
                        {firm?.district?.name || "N/A"}
                      </td>
                      <td className="border px-4 py-2">
                        {firm?.taluk?.name || "N/A"}
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <Toaster />
    </>
  );
}
