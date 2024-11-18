import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { APIURL } from "../constants/APIURL";

const CreateCar = () => {
  const [carData, setCarData] = useState({
    title: "",
    description: "",
    tags: "",
    brand: "",
    car_type: "",
    images: [],
  });
  const [loading, setLoading] = useState(false); // Loading state
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCarData({ ...carData, [name]: value });
  };

  const handleFileChange = (e) => {
    const newFiles = Array.from(e.target.files); // Convert FileList to an array
    setCarData((prevData) => {
      const combinedFiles = [...prevData.images, ...newFiles]; // Combine existing and new files
      const uniqueFiles = Array.from(new Set(combinedFiles)); // Ensure uniqueness
      return {
        ...prevData,
        images: uniqueFiles.slice(0, 10), // Limit to 10 files
      };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); // Set loading to true
    const formData = new FormData();
    formData.append("title", carData.title);
    formData.append("description", carData.description);
    formData.append("tags", carData.tags);
    formData.append("brand", carData.brand);
    formData.append("car_type", carData.car_type);
    for (let i = 0; i < carData.images.length; i++) {
      formData.append("images", carData.images[i]);
    }

    try {
      await axios.post(`${APIURL}/api/cars/create`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      });
      navigate("/app/home"); // Redirect after successful creation
    } catch (error) {
      console.error("Error creating car:", error);
    } finally {
      setLoading(false); // Set loading to false
    }
  };

  return (
    <div className="flex items-center h-[100vh]">
        <div className="container flex justify-center mx-auto">
      <div className="lg:w-[35vw] bg-white shadow-md rounded-md overflow-hidden">
        <form onSubmit={handleSubmit} className="p-4">
          <h1 className="text-xl font-bold text-gray-800 mb-4">
            Create Car Listing
          </h1>
          <div className="mb-4">
            <label className="block text-sm text-gray-700">Title</label>
            <input
              type="text"
              name="title"
              value={carData.title}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm text-gray-700">Description</label>
            <textarea
              name="description"
              value={carData.description}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm text-gray-700">Tags</label>
            <input
              type="text"
              name="tags"
              value={carData.tags}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm text-gray-700">Brand</label>
            <input
              type="text"
              name="brand"
              value={carData.brand}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm text-gray-700">Car Type</label>
            <input
              type="text"
              name="car_type"
              value={carData.car_type}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm text-gray-700">Images</label>
            <input
              type="file"
              multiple
              onChange={handleFileChange}
              className="w-full p-2 border border-gray-300 rounded"
            />
          </div>
          <div className="mb-4">
            <div className="grid grid-cols-2 gap-4 mt-4">
              {carData.images.map((file, index) => (
                <div key={index} className="relative">
                  <img
                    src={URL.createObjectURL(file)}
                    alt={`Preview ${index}`}
                    className="w-full h-32 object-cover rounded"
                  />
                  <button
                    type="button"
                    onClick={() =>
                      setCarData((prevData) => ({
                        ...prevData,
                        images: prevData.images.filter((_, i) => i !== index),
                      }))
                    }
                    className="absolute top-1 right-1 bg-red-500 text-white p-1 rounded-full"
                  >
                    ×
                  </button>
                </div>
              ))}
            </div>
            
            <button
              type="submit"
              className={`w-full py-2 rounded ${
                loading ? "bg-gray-400 cursor-not-allowed" : "bg-blue-700"
              } text-white`}
              disabled={loading} // Disable button while loading
            >
              {loading ? "Creating..." : "Create Car Listing"}
            </button>
          </div>
          {loading && (
            <div className="flex justify-center mt-4">
              <div className="loader border-t-4 border-blue-600 border-solid rounded-full w-6 h-6 animate-spin"></div>
            </div>
          )}
        </form>
      </div>
    </div>
    </div>
  );
};

export default CreateCar;
