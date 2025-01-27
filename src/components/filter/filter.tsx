'use client';

import React, { useState } from 'react';
import './filter.scss';
import Button from '@cps/components/button';
import { useAllProducts } from '@cps/trpc/hooks/use-product';

const initialCategories = [
  { label: 'Electronics', checked: false },
  { label: 'Hardware', checked: false },
  { label: 'Software', checked: false },
];

const Filter: React.FC = () => {
  const [categories, setCategories] = useState(initialCategories);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  // Get the selected categories as a list of strings
  const selectedCategories = categories
    .filter((category) => category.checked)
    .map((category) => category.label);

  const { data: products, isLoading, error } = useAllProducts({
    category: selectedCategories, // Pass selected categories 
  });

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const toggleCategory = (label: string) => {
    setCategories((prevCategories) =>
      prevCategories.map((category) =>
        category.label === label
          ? { ...category, checked: !category.checked }
          : category
      )
    );
  };

  return (
    <div className="filter-component">
      <h2>What are you looking for?</h2>
      <div className="dropdown">
        <Button
          shape="rounded"
          color="primary"
          size="md"
          onClick={toggleDropdown}
        >
          Filter by Category {isDropdownOpen ? '▲' : '▼'}
        </Button>
        {isDropdownOpen && (
          <div className="filter-container">
            {categories.map((category) => (
              <label key={category.label} className="filter-option">
                <input
                  type="checkbox"
                  checked={category.checked}
                  onChange={() => toggleCategory(category.label)}
                />
                {category.label}
              </label>
            ))}
          </div>
        )}
      </div>

      {isLoading ? (
        <p>Loading...</p>
      ) : error ? (
        <p className='error'> Failed to load products. Please try again later.</p>
      ) : (
        <div className="products-list">
          {products?.products.map((product) => (
            <div key={product.id} className="product-card">
              <h3>{product.name}</h3>
              <p>{product.description}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Filter;