import Header from '../Header';

export default function HeaderExample() {
  return (
    <Header 
      cartItemCount={3}
      onCartClick={() => console.log('Cart clicked')}
      onSearch={(query) => console.log('Search:', query)}
      onCategoryClick={(category) => console.log('Category:', category)}
    />
  );
}
