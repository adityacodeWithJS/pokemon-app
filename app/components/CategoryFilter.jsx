import { useState } from 'react';

const CategoryFilter = ({ categories, onFilterChange }) => {
  const [selectedCategories, setSelectedCategories] = useState([]);

  const handleCheckboxChange = (e) => {
    const { value, checked } = e.target;

    setSelectedCategories((prevState) => {
      if (checked) {
        return [...prevState, value];
      } else {
        return prevState.filter((category) => category !== value);
      }
    });

    // Pass the selected categories to the parent component
    onFilterChange(selectedCategories);
  };

  return (
    <div>
      <h3>Filter by Category</h3>
      {categories.map((category) => (
        <div key={category}>
          <label>
            <input
              type="checkbox"
              value={category}
              onChange={handleCheckboxChange}
            />
            {category}
          </label>
        </div>
      ))}
    </div>
  );
};

export default CategoryFilter;
