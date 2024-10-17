import { useEffect, useState } from "react";
import axios from "axios";
import Link from "next/link";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBowlRice, faCookieBite, faCoffee } from '@fortawesome/free-solid-svg-icons';

interface FoodCategory {
  idCategory: string;
  strCategory: string;
  strCategoryThumb: string;
}

function HomeProduct() {
  const [foodCategory, setFoodCategory] = useState<FoodCategory[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    const foodData = async () => {
      const response = await axios.get(`https://www.themealdb.com/api/json/v1/1/categories.php`);
      const data = response.data.categories;
      setFoodCategory(data);
      setLoading(false);
    };
    foodData();
  }, []);

  if (loading) {
    return <div className="flex justify-center items-center h-screen">Loading...</div>;
  }

  return (
    <div className="container max-w-full max-h-full">
      <div className="bg-gray-100 h-72 mb-10 pt-20">
        <div className="flex justify-center mb-4">
          <FontAwesomeIcon icon={faCoffee} className="text-8 mx-4 text-red-600" />
          <FontAwesomeIcon icon={faBowlRice} className="text-8 mx-4 text-red-600" />
          <FontAwesomeIcon icon={faCookieBite} className="text-8 mx-4 text-red-600" />
        </div>
        <h1 className="text-4 text-center mb-8">mealapp API website</h1>
        <h1 className="text-4xl font-bold text-center mb-12">See All The Delicious Foods</h1>
      </div>
      <div className="flex justify-center">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl px-6 py-6">
          {foodCategory.map((category) => (
            <Link key={category.idCategory} href={`/category/${category.strCategory}`} className="group">
              <div className="relative rounded-lg overflow-hidden shadow-md">
                <img
                  src={category.strCategoryThumb}
                  alt={category.strCategory}
                  className="w-full h-40 object-cover transition-transform duration-300 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
                  <p className="text-white text-center text-lg font-semibold">{category.strCategory}</p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

export default HomeProduct;