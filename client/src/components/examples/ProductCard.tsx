import ProductCard from '../ProductCard';
import helmetImage from "@assets/generated_images/Red_safety_helmet_product_photo_b5570fe7.png";

export default function ProductCardExample() {
  return (
    <div className="grid gap-4 p-4 md:grid-cols-2 lg:grid-cols-3">
      <ProductCard
        id="1"
        name="Helm Safety Proyek MSA V-Gard dengan Ventilasi"
        price={125000}
        originalPrice={175000}
        imageUrl={helmetImage}
        badge="Best Seller"
        onAddToCart={(id) => console.log('Add to cart:', id)}
        onClick={() => console.log('Product clicked')}
      />
      <ProductCard
        id="2"
        name="Helm Safety Standar SNI"
        price={85000}
        imageUrl={helmetImage}
        onAddToCart={(id) => console.log('Add to cart:', id)}
        onClick={() => console.log('Product clicked')}
      />
      <ProductCard
        id="3"
        name="Helm Safety Premium"
        price={200000}
        imageUrl={helmetImage}
        inStock={false}
        onAddToCart={(id) => console.log('Add to cart:', id)}
        onClick={() => console.log('Product clicked')}
      />
    </div>
  );
}
