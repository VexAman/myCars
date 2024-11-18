import React from "react";

const Card = ({ car }) => {
  const tagsArray = car.tags.split(",")
  return (
    <section className="bg-white dark:bg-gray-900 rounded-lg shadow-lg ">
      <div className="container px-6 py-10 mx-auto">
        <div className="lg:-mx-6 lg:flex lg:items-center">
          <img
            className="object-cover object-center lg:w-1/2 lg:mx-6 w-full h-96 rounded-lg lg:h-[36rem]"
            src={car.image1} // Car's image
            alt={car.title}
          />

          <div className="mt-8 lg:w-1/2 lg:px-6 lg:mt-0">
            <p className="text-5xl font-semibold text-blue-500">“</p>

            <h1 className="text-2xl font-semibold text-gray-800 dark:text-white lg:text-3xl lg:w-96">
              {car.title} {/* Car title */}
            </h1>

            <p className="max-w-lg mt-6 text-gray-500 dark:text-gray-400">
              {car.description} {/* Car description */}
            </p>
            <p className="max-w-lg mt-6 text-gray-500 dark:text-gray-400">
              Car Type: {car.car_type} {/* Car description */}
            </p>
          </div>
          
        </div>
        <div className="text-white py-4 text-2xl">
            {tagsArray}
          </div>
      </div>
    </section>
  );
};

export default Card;
// import React from 'react';

// const Card = ({ image, title, description, price, rating }) => {
//   return (
//     <div className="flex max-w-md overflow-hidden bg-white rounded-lg shadow-lg dark:bg-gray-800">
//       <div
//         className="w-1/3 bg-cover"
//         style={{ backgroundImage: `url(${image})` }}
//       ></div>

//       <div className="w-2/3 p-4 md:p-4">
//         <h1 className="text-xl font-bold text-gray-800 dark:text-white">{title}</h1>

//         <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">{description}</p>

//         <div className="flex mt-2 item-center">
//           {Array.from({ length: 5 }).map((_, index) => (
//             <svg
//               key={index}
//               className={`w-5 h-5 ${index < rating ? 'text-gray-700' : 'text-gray-500'} fill-current dark:text-gray-300`}
//               viewBox="0 0 24 24"
//             >
//               <path d="M12 17.27L18.18 21L16.54 13.97L22 9.24L14.81 8.63L12 2L9.19 8.63L2 9.24L7.46 13.97L5.82 21L12 17.27Z" />
//             </svg>
//           ))}
//         </div>

//         <div className="flex justify-between mt-3 item-center">
//           <h1 className="text-lg font-bold text-gray-700 dark:text-gray-200 md:text-xl">
//             ${price}
//           </h1>
//           <button className="px-2 py-1 text-xs font-bold text-white uppercase transition-colors duration-300 transform bg-gray-800 rounded dark:bg-gray-700 hover:bg-gray-700 dark:hover:bg-gray-600 focus:outline-none focus:bg-gray-700 dark:focus:bg-gray-600">
//             Add to Cart
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Card;
