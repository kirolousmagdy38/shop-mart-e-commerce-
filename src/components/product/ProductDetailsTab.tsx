import { Box, Star, Truck, Check } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Product } from "@/types/product";
import ReviewsSummary from "../reviews/Reviewssummary";
import ShippingReturns from "../shipping&returns/Shippingreturns";

interface ProductDetailTabsProps {
  product: Product;
}

const keyFeatures = [
  "Premium Quality Product",
  "100% Authentic Guarantee",
  "Fast & Secure Packaging",
  "Quality Tested",
];

export default function ProductDetailTabs({ product }: ProductDetailTabsProps) {
  const productInfo = [
    { label: "Category", value: product?.category.name },
    { label: "Subcategory", value: product?.subcategory[0]?.name ?? "—" },
    { label: "Brand", value: product?.brand.name },
    {
      label: "Items Sold",
      value: product?.sold
        ? product.sold <= 10000
          ? `${product.sold}+ sold`
          : `+10000 sold`
        : "—",
    },
  ];

  return (
    <section className="py-8">
      <div className="container mx-auto px-4">
        <div className="bg-white rounded-lg shadow-sm overflow-hidden">
          <Tabs defaultValue="details">
            {/* Tab List */}
            <TabsList className="w-full justify-start rounded-none border-b border-gray-200 bg-transparent h-auto p-0 gap-0">
              <TabsTrigger
                value="details"
                className="flex items-center gap-2 cursor-pointer px-6 py-4 font-bold rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:text-primary data-[state=active]:bg-primary/5 data-[state=active]:shadow-none text-gray-600 hover:text-primary hover:bg-gray-50 transition-all"
              >
                <Box className="w-4 h-4" />
                Product Details
              </TabsTrigger>
              <TabsTrigger
                value="reviews"
                className="flex items-center gap-2 px-6 py-4  cursor-pointer font-bold rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:text-primary data-[state=active]:bg-primary/5 data-[state=active]:shadow-none text-gray-600 hover:text-primary hover:bg-gray-50 transition-all"
              >
                <Star className="w-4 h-4" />
                Reviews ({product?.ratingsQuantity})
              </TabsTrigger>
              <TabsTrigger
                value="shipping"
                className="flex items-center gap-2 px-6 py-4 cursor-pointer font-bold rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:text-primary data-[state=active]:bg-primary/5 data-[state=active]:shadow-none text-gray-600 hover:text-primary hover:bg-gray-50 transition-all"
              >
                <Truck className="w-4 h-4" />
                Shipping &amp; Returns
              </TabsTrigger>
            </TabsList>

            {/* Product Details Tab */}
            <TabsContent value="details" className="p-6 mt-0">
              <div className="space-y-6">
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">
                    About this Product
                  </h3>
                  <p className="text-muted-foreground leading-relaxed text-md ">
                    {product?.description}
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Product Info */}
                  <div className="bg-muted/50 rounded-lg p-4">
                    <h4 className="font-semibold text-[16px] text-gray-900 mb-3">
                      Product Information
                    </h4>
                    <ul className="space-y-2">
                      {productInfo.map(({ label, value }) => (
                        <li
                          key={label}
                          className="flex justify-between text-md"
                        >
                          <span className="text-muted-foreground">{label}</span>
                          <span className="text-gray-900 font-medium">
                            {value}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Key Features */}
                  <div className="bg-muted/50 rounded-lg p-4">
                    <h4 className="font-medium text-gray-900 mb-3">
                      Key Features
                    </h4>
                    <ul className="space-y-2">
                      {keyFeatures.map((feature) => (
                        <li
                          key={feature}
                          className="flex items-center text-sm text-muted-foreground font-medium"
                        >
                          <Check className="w-4 h-4 text-primary mr-2 shrink-0 " />
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </TabsContent>

            {/* Reviews Tab */}
            <TabsContent value="reviews" className="p-6 mt-0 mx-auto">
              <ReviewsSummary
                productId={product?._id}
                average={product?.ratingsAverage}
                total={product?.ratingsQuantity}
              />
            </TabsContent>

            {/* Shipping Tab */}
            <TabsContent value="shipping" className="p-6 mt-0">
              <p className="text-muted-foreground">
                <ShippingReturns />
              </p>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </section>
  );
}
