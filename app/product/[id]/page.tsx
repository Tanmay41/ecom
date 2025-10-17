import ProductClient from "./ProductClient";
import products from "../../../public/products.json";

// ✅ generateStaticParams is allowed here (server file)
export async function generateStaticParams() {
  return products.map((product) => ({
    id: product.id.toString(),
  }));
}

// ✅ This file is now a server component, safe for static export
export default function Page() {
  return <ProductClient />;
}
