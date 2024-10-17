import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import Link from "next/link";
import { AiFillHome } from "react-icons/ai";
import { FiChevronRight } from "react-icons/fi";

interface FoodItem {
  idMeal: string;
  strMeal: string;
  strMealThumb: string;
}

function CategoryDetailProduct() {
  const [foodDetail, setFoodDetail] = useState<FoodItem[]>([]);
  const router = useRouter();
  const { categoryName } = router.query;
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (categoryName) {
      setLoading(true);
      const foodData = async () => {
        try {
          const response = await axios.get(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${categoryName}`);
          const data = response.data.meals;
          setFoodDetail(data);
        } catch (error) {
          console.error("Error fetching food details:", error);
        } finally {
          setLoading(false);
        }
      };
      foodData();
    }
  }, [categoryName]);

  if (loading) {
    return <div className="flex justify-center items-center h-screen">Loading...</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-3xl">
      <div className="flex items-center text-sm mb-4">
        <AiFillHome className="mr-2" />
        <Link href="/" className="hover:text-gray-600">Home</Link>
        <FiChevronRight className="mx-2" />
        <Link href="/" className="hover:text-gray-600">Foods</Link>
        <FiChevronRight className="mx-2" />
        <span className="text-gray-500">{categoryName}</span>
      </div>

      <h1 className="text-3xl font-bold mb-8">{categoryName} Meals</h1>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {foodDetail.map((food) => (
          <Link key={food.idMeal} href={`/meal/${food.idMeal}`} className="group">
            <div className="relative rounded-lg overflow-hidden shadow-md">
              <img
                src={food.strMealThumb}
                alt={food.strMeal}
                className="w-full h-40 object-cover transition-transform duration-300 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
                <p className="text-white text-center text-lg font-semibold">{food.strMeal}</p> 
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default CategoryDetailProduct;