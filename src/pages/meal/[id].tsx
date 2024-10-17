import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import Link from "next/link";
import { AiFillHome } from "react-icons/ai";
import { FiChevronRight } from "react-icons/fi";

function MealDetailProduct() {
  const [mealDetail, setMealDetail] = useState<any>(null);
  const router = useRouter();
  const { id } = router.query;
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (id) {
      setLoading(true);
      const foodData = async () => {
        try {
          const response = await axios.get(
            `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`
          );
          const data = response.data.meals[0];
          setMealDetail(data);
        } catch (error) {
          console.error("Error fetching meal details:", error);
        } finally {
          setLoading(false);
        }
      };
      foodData();
    }
  }, [id]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <span className="text-xl">Loading...</span>
      </div>
    );
  }

  if (!mealDetail) {
    return <div className="text-center text-gray-600">Meal details not available</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <div className="flex items-center text-sm mb-6 text-gray-700">
        <AiFillHome className="mr-2 text-gray-500" />
        <Link href="/" className="hover:text-gray-600">
          Home
        </Link>
        <FiChevronRight className="mx-2" />
        <Link href="/" className="hover:text-gray-600">
          Foods
        </Link>
        <FiChevronRight className="mx-2" />
        <Link href={`/category/${mealDetail.strCategory}`} className="hover:text-gray-600">
          {mealDetail.strCategory}
        </Link>
        <FiChevronRight className="mx-2" />
        <span className="text-gray-500">{mealDetail.strMeal}</span>
      </div>

      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold text-gray-800 mb-2">{mealDetail.strMeal}</h1>
        <p className="text-red-500 mb-4">{mealDetail.strArea} Culinary</p>
        <img
          className="rounded-lg shadow-lg w-full max-w-xl mx-auto mb-6"
          src={mealDetail.strMealThumb}
          alt="Meal Thumbnail"
        />
      </div>
      
      <section className="mb-12">
        <h2 className="text-2xl font-semibold text-gray-800 text-center mb-4">Instructions</h2>
        <p className="text-justify leading-relaxed text-gray-700">
          {mealDetail.strInstructions}
        </p>
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-semibold text-gray-800 text-center mb-4">Ingredients</h2>
        <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
          {[...Array(20)].map((_, i) => {
            const ingredient = mealDetail[`strIngredient${i + 1}`];
            const measure = mealDetail[`strMeasure${i + 1}`];
            if (ingredient && ingredient.trim() !== "") {
              return (
                <div
                  key={i}
                  className="text-center bg-gray-50 p-2 rounded-md shadow-sm border"
                >
                  {`${measure} ${ingredient}`}
                </div>
              );
            }
            return null;
          })}
        </div>
      </section>
      
      {mealDetail.strYoutube && (
    <section className="mb-12">
        <h2 className="text-2xl font-semibold text-gray-800 text-center mb-4">Tutorials</h2>
        <div className="mb-8">
      <iframe
        className="w-full h-64 md:h-96 rounded-lg shadow-lg"
        src={mealDetail.strYoutube.replace("watch?v=", "embed/")}
        title="YouTube Tutorial"
        allowFullScreen
      ></iframe>
     </div>
  </section>
)}
    </div>
  );
}

export default MealDetailProduct;