

import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { APIURL } from "../constants/APIURL";

const UpdateCar = () => {
  const { carId } = useParams(); // Get car ID from route params
  const navigate = useNavigate();
  const [carData, setCarData] = useState({
    title: "",
    description: "",
    tags: "",
    brand: "",
    car_type: "",
    images: [],
  });
  const [loading, setLoading] = useState(false);
  const [initialImages, setInitialImages] = useState([]); // For storing preloaded images

  useEffect(() => {
    // Fetch the car details from the backend
    console.log(carId)
    const fetchCarData = async () => {
      try {
        const { data } = await axios.get(`${APIURL}/api/cars/${carId}`);
        setCarData({
          title: data.title,
          description: data.description,
          tags: data.tags,
          brand: data.brand,
          car_type: data.car_type,
          images: [],
        });
        // Populate initial images
        const images = [];
        for (let i = 1; i <= 10; i++) {
          if (data[`image${i}`]) {
            images.push(data[`image${i}`]);
          }
        }
        setInitialImages(images);
      } catch (error) {
        console.error("Error fetching car data:", error);
      }
    };

    fetchCarData();
  }, [carId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCarData({ ...carData, [name]: value });
  };

  const handleFileChange = (e) => {
    const newFiles = Array.from(e.target.files);
    setCarData((prevData) => {
      const combinedFiles = [...prevData.images, ...newFiles];
      const uniqueFiles = Array.from(new Set(combinedFiles));
      return {
        ...prevData,
        images: uniqueFiles.slice(0, 10),
      };
    });
  };

  const handleRemoveInitialImage = (index) => {
    setInitialImages((prevImages) => prevImages.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const formData = new FormData();
    formData.append("title", carData.title);
    formData.append("description", carData.description);
    formData.append("tags", carData.tags);
    formData.append("brand", carData.brand);
    formData.append("car_type", carData.car_type);

    // Add newly uploaded images
    carData.images.forEach((image) => formData.append("images", image));

    // Add retained initial images
    initialImages.forEach((image, index) =>
      formData.append(`image${index + 1}`, image)
    );

    try {
      await axios.patch(`${APIURL}/api/cars/update/${carId}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      });
      navigate("/app/home"); // Redirect to home on success
    } catch (error) {
      console.error("Error updating car:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center h-[100vh]">
      <div className="container flex justify-center mx-auto">
        <div className="lg:w-[35vw] bg-white shadow-md rounded-md overflow-hidden">
          <form onSubmit={handleSubmit} className="p-4">
            <h1 className="text-xl font-bold text-gray-800 mb-4">
              Update Car Listing
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
            <div className="grid grid-cols-2 gap-4 mt-4">
              {initialImages.map((url, index) => (
                <div key={index} className="relative">
                  <img
                    src={url}
                    alt={`Initial Preview ${index}`}
                    className="w-full h-32 object-cover rounded"
                  />
                  <button
                    type="button"
                    onClick={() => handleRemoveInitialImage(index)}
                    className="absolute top-1 right-1 bg-red-500 text-white p-1 rounded-full"
                  >
                    ×
                  </button>
                </div>
              ))}
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
              disabled={loading}
            >
              {loading ? "Updating..." : "Update Car Listing"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default UpdateCar;
