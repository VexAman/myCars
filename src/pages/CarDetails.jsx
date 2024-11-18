import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { APIURL } from "../constants/APIURL";

const CarDetails = () => {
  const { carId } = useParams();
  const navigate = useNavigate();
  const [car, setCar] = useState(null);

  useEffect(() => {
    const fetchCar = async () => {
      try {
        const response = await axios.get(`${APIURL}/api/cars/${carId}`);
        const data = response.data.data;
        setCar(data);
      } catch (error) {
        console.error("Error fetching car details:", error);
      }
    };
    fetchCar();
  }, [carId]);

  const handleDelete = async () => {
    try {
      await axios.delete(`${APIURL}/api/cars/${carId}`);
      navigate("/app/home");
    } catch (error) {
      console.error("Error deleting car:", error);
    }
  };

  if (!car) return <div>Loading...</div>;

  return (
    <div className="2xl:container 2xl:mx-auto lg:py-16 lg:px-20 md:py-12 md:px-6 py-9 px-4">
      {/* Main Content */}
      <div className="flex flex-col lg:flex-row justify-between gap-8">
        {/* Car Images Section */}
        <div className="lg:w-6/12 w-full">
          <div className="bg-gray-100 flex justify-center items-center rounded-lg overflow-hidden">
            <img
              src={car.image1}
              alt={car.title}
              className="object-cover w-full h-[400px]"
            />
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
            {car.images?.map((image, index) => (
              <div
                key={index}
                className="bg-gray-100 flex justify-center items-center p-2 rounded-lg"
              >
                <img
                  src={image}
                  alt={`Preview ${index}`}
                  className="w-full h-20 object-cover rounded-lg"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Car Details Section */}
        <div className="lg:w-6/12 w-full">
          <p className="text-sm font-normal text-gray-600 mb-2">
            Home / Cars / {car.title}
          </p>
          <h1 className="text-3xl font-semibold text-gray-800">{car.title}</h1>
          <div className="flex items-center mt-4">
            <img
              src="https://tuk-cdn.s3.amazonaws.com/can-uploader/productDetail4-svg1.svg"
              alt="Stars"
              className="mr-2"
            />
            <p className="text-base text-gray-700 hover:underline cursor-pointer">
              22 reviews
            </p>
          </div>
          <p className="text-base text-gray-600 mt-6">{car.description}</p>

          <div className="mt-6 space-y-4">
            <p className="text-base text-gray-600">
              <strong>Brand:</strong> {car.brand}
            </p>
            <p className="text-base text-gray-600">
              <strong>Car Type:</strong> {car.car_type}
            </p>
            <p className="text-base text-gray-600">
              <strong>Tags:</strong> {car.tags}
            </p>
          </div>

          {/* Actions */}
          <div className="mt-8 flex gap-4">
            <button
              className="w-full lg:w-auto px-6 py-3 bg-blue-600 text-white rounded-lg text-base font-medium hover:bg-blue-700"
              onClick={() => navigate(`/app/update-car/${carId}`)}
            >
              Edit
            </button>
            <button
              className="w-full lg:w-auto px-6 py-3 bg-red-600 text-white rounded-lg text-base font-medium hover:bg-red-700"
              onClick={handleDelete}
            >
              Delete
            </button>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="mt-12 grid lg:grid-cols-4 sm:grid-cols-2 gap-8">
        {[
          {
            title: "Great for long drives",
            description:
              "Experience the smoothest drives with enhanced stability and comfort.",
            icon: "https://tuk-cdn.s3.amazonaws.com/can-uploader/productDetail4-svg2.svg",
          },
          {
            title: "Durable build",
            description:
              "Built to last with premium materials and state-of-the-art engineering.",
            icon: "https://tuk-cdn.s3.amazonaws.com/can-uploader/productDetail4-svg3.svg",
          },
          {
            title: "Eco-friendly",
            description:
              "Designed with sustainability in mind for an eco-friendly experience.",
            icon: "https://tuk-cdn.s3.amazonaws.com/can-uploader/productDetail4-svg5.svg",
          },
          {
            title: "Minimal Design",
            description:
              "Clean, minimal design for a sleek, sophisticated appearance.",
            icon: "https://tuk-cdn.s3.amazonaws.com/can-uploader/productDetail4-svg6.svg",
          },
        ].map((feature, index) => (
          <div key={index} className="text-center">
            <img
              src={feature.icon}
              alt={feature.title}
              className="mx-auto mb-4"
            />
            <h3 className="text-xl font-semibold text-gray-800">
              {feature.title}
            </h3>
            <p className="text-base text-gray-600 mt-2">{feature.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CarDetails;
