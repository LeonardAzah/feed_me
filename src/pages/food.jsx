import React, { useState, useEffect } from "react";
import axios from "axios";
import MealSkeleton from "../component/skeleton";

const URL = "https://foodish-api.com/api/";
const Food = () => {
  const [mealImage, setMealImage] = useState("");
  const [loading, setLoading] = useState(true);

  const fetchMealImage = async () => {
    try {
      setLoading(true);
      const response = await axios.get(URL);
      setMealImage(response.data.image);
    } catch (error) {
      console.error("Error fetching meal image:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMealImage();
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-[#fcfcfc]">
      <h1 className="text-[1.8em] font-bold mb-4 color-[#20292f]">Visit Us</h1>
      <div className=" relative mb-4 rounded-full shadow-xl shadow-lg h-64 w-64">
        {loading ? (
          <MealSkeleton />
        ) : (
          <img
            src={mealImage || "placeholder.png"}
            alt="Meal"
            className="absolute  rounded-full h-64  w-64 object-cover hover:object-scale-down border-8 border-white"
          />
        )}
      </div>
      <button
        onClick={fetchMealImage}
        disabled={loading}
        className={`bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline ${
          loading && "opacity-35 cursor-not-allowed"
        }`}
      >
        {loading ? "Loading..." : "Get Meal"}
      </button>
    </div>
  );
};

export default Food;
