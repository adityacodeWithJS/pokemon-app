import { useState } from 'react';
import CategoryFilter from './CategoryFilter';

const Header = () => {
  const products = [
    { id: 1, name: 'Apple', category: 'Fruits' },
    { id: 2, name: 'Carrot', category: 'Vegetables' },
    { id: 3, name: 'Banana', category: 'Fruits' },
    { id: 4, name: 'Lettuce', category: 'Vegetables' },
    { id: 5, name: 'Orange', category: 'Fruits' },
  ];

  const categories = ['Fruits', 'Vegetables'];

  const [filteredProducts, setFilteredProducts] = useState(products);

  const handleFilterChange = (selectedCategories) => {
    if (selectedCategories.length > 0) {
      const filtered = products.filter((product) =>
        selectedCategories.includes(product.category)
      );
      setFilteredProducts(filtered);
    } else {
      setFilteredProducts(products); // Show all products if no category is selected
    }
  };

  return (
    <div>
      <CategoryFilter categories={categories} onFilterChange={handleFilterChange} />
      <h2>Products</h2>
      <ul>
        {filteredProducts.map((product) => (
          <li key={product.id}>{product.name} ({product.category})</li>
        ))}
      </ul>
    </div>
  );
};

export default Header;
