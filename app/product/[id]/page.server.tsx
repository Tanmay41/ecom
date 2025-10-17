import products from "../../../public/products.json";

export async function generateStaticParams() {
  return products.map((product) => ({
    id: product.id.toString(),
  }));
}
