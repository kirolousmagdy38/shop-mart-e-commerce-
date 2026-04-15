
import { getAllCategories } from "@/services/categoriesApi";
import { getProducts } from "@/services/productsApi";
import { getAllBrands } from "@/services/brandApi";
import HeroSlider from "@/components/home/HeroSlider";
import FeaturesBar from "@/components/home/Featurebar";
import CategoriesSection from "@/components/home/Categoriessection";
import FeaturedProducts from "@/components/home/Featuredproducts";
import NewsletterSection from "@/components/home/Newslettersection";


export default async function HomePage() {
  const [categories, products, brands] = await Promise.all([
    getAllCategories(),
    getProducts({}),
    getAllBrands(),
  ]);

  return (
    <div className="min-h-screen bg-gray-50 font-sans">
      <HeroSlider />
      <FeaturesBar />
      <CategoriesSection categories={categories} />
      <FeaturedProducts products={products.slice(0, 10)} />
      <NewsletterSection />
    </div>
  );
}
