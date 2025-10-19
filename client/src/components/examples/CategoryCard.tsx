import CategoryCard from '../CategoryCard';

export default function CategoryCardExample() {
  return (
    <div className="grid gap-4 p-4">
      <CategoryCard 
        name="Helm Safety" 
        icon="🪖" 
        productCount={24}
        onClick={() => console.log('Helm Safety clicked')}
      />
      <CategoryCard 
        name="Sarung Tangan" 
        icon="🧤" 
        productCount={18}
        onClick={() => console.log('Sarung Tangan clicked')}
      />
    </div>
  );
}
