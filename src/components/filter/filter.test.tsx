import '@testing-library/jest-dom';
import { fireEvent, render, screen } from '@testing-library/react';
import Filter from './filter';

describe('Filter Component', () => {
  test('renders the dropdown button', () => {
    render(<Filter />);
    const dropdownButton = screen.getByRole('button', {
      name: /filter by category/i,
    });
    expect(dropdownButton).toBeInTheDocument();
  });

  test('dropdown content is hidden by default', () => {
    render(<Filter />);
    const dropdownContent = screen.queryByText(/electronics/i);
    expect(dropdownContent).not.toBeInTheDocument();
  });

  test('dropdown toggles visibility on click', () => {
    render(<Filter />);
    const dropdownButton = screen.getByRole('button', {
      name: /filter by category/i,
    });

    // Open the dropdown
    fireEvent.click(dropdownButton);
    const electronicsOption = screen.getByText(/electronics/i);
    expect(electronicsOption).toBeInTheDocument();

    // Close the dropdown
    fireEvent.click(dropdownButton);
    expect(screen.queryByText(/electronics/i)).not.toBeInTheDocument();
  });

  test('displays all categories in vertical order when dropdown is open', () => {
    render(<Filter />);
    const dropdownButton = screen.getByRole('button', {
      name: /filter by category/i,
    });

    // Open the dropdown
    fireEvent.click(dropdownButton);
    const categoryOptions = screen.getAllByRole('checkbox');

    expect(categoryOptions.length).toBe(3); // Ensure all categories are rendered
    expect(categoryOptions[0]).toHaveAccessibleName('Electronics');
    expect(categoryOptions[1]).toHaveAccessibleName('Hardware');
    expect(categoryOptions[2]).toHaveAccessibleName('Software');
  });

  test('checks and unchecks a category', () => {
    render(<Filter />);
    const dropdownButton = screen.getByRole('button', {
      name: /filter by category/i,
    });

    // Open the dropdown
    fireEvent.click(dropdownButton);

    // Select "Electronics"
    const electronicsCheckbox = screen.getByLabelText(/electronics/i);
    expect(electronicsCheckbox).not.toBeChecked();
    fireEvent.click(electronicsCheckbox);
    expect(electronicsCheckbox).toBeChecked();

    // Unselect "Electronics"
    fireEvent.click(electronicsCheckbox);
    expect(electronicsCheckbox).not.toBeChecked();
  });

  test('maintains state of selected categories when toggling dropdown visibility', () => {
    render(<Filter />);
    const dropdownButton = screen.getByRole('button', {
      name: /filter by category/i,
    });

    // Open the dropdown and select a category
    fireEvent.click(dropdownButton);
    const electronicsCheckbox = screen.getByLabelText(/electronics/i);
    fireEvent.click(electronicsCheckbox);
    expect(electronicsCheckbox).toBeChecked();

    // Close the dropdown and reopen
    fireEvent.click(dropdownButton);
    fireEvent.click(dropdownButton);
    const reopenedCheckbox = screen.getByLabelText(/electronics/i);
    expect(reopenedCheckbox).toBeChecked();
  });
});
