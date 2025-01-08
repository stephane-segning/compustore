'use client';

import React, { useState } from 'react';
import './filter.scss'; 
import Button from '@cps/components/button';

type FilterOption = {
  label: string;
  checked: boolean;
};

const initialCategories: FilterOption[] = [
  { label: 'Electronics', checked: false },
  { label: 'Hardware', checked: false },
  { label: 'Software', checked: false },
];

const Filter: React.FC = () => {
  const [categories, setCategories] = useState<FilterOption[]>(initialCategories);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const toggleCategory = (label: string) => {
    setCategories((prevCategories) =>
      prevCategories.map((category) =>
        category.label === label
          ? { ...category, checked: !category.checked }
          : category
      )
    );
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  return (
    <div className="filter-component">
      <h2>What are you looking for?</h2>
      <div className="dropdown">
        <Button
          shape='rounded'
          color='primary'
          size='md'
          onClick={toggleDropdown}>
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
    </div>
  );
};

export default Filter;
