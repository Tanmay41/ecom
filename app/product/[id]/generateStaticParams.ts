import products from '../../../public/products.json';

export default function generateStaticParams() {
  return products.map((product) => ({
    id: product.id.toString(),
  }));
}
