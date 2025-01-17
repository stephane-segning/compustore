import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import Filter from "./filter";
import { useAllProducts } from "@cps/trpc/hooks/use-product";

// Mock the `useAllProducts` hook
jest.mock("@cps/trpc/hooks/use-product", () => ({
  useAllProducts: jest.fn(() => ({
    data: {
      products: [
        { id: "1", name: "Test Product", description: "Test Description" },
      ],
    },
    isLoading: false,
    error: null,
  })),
}));

   

describe("Filter Component", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("renders the dropdown button", () => {
    render(<Filter />);
    const dropdownButton = screen.getByRole("button", {
      name: /filter by category/i,
    });
    expect(dropdownButton).toBeInTheDocument();
  });

  test("dropdown content is hidden by default", () => {
    render(<Filter />);
    const dropdownContent = screen.queryByText(/electronics/i);
    expect(dropdownContent).not.toBeInTheDocument();
  });

  test("dropdown toggles visibility on click", () => {
    render(<Filter />);
    const dropdownButton = screen.getByRole("button", {
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

  test("displays all categories in vertical order when dropdown is open", () => {
    render(<Filter />);
    const dropdownButton = screen.getByRole("button", {
      name: /filter by category/i,
    });

    // Open the dropdown
    fireEvent.click(dropdownButton);
    const categoryOptions = screen.getAllByRole("checkbox");

    expect(categoryOptions.length).toBe(3); // Ensure all categories are rendered
    expect(categoryOptions[0]).toHaveAccessibleName("Electronics");
    expect(categoryOptions[1]).toHaveAccessibleName("Hardware");
    expect(categoryOptions[2]).toHaveAccessibleName("Software");
  });

  test("checks and unchecks a category", () => {
    render(<Filter />);
    const dropdownButton = screen.getByRole("button", {
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

  test("maintains state of selected categories when toggling dropdown visibility", () => {
    render(<Filter />);
    const dropdownButton = screen.getByRole("button", {
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

  test("displays loading state when fetching products", () => {
    (useAllProducts as jest.Mock).mockReturnValue({
      data: null,
      isLoading: true,
    });

    render(<Filter />);
    expect(screen.getByText(/loading/i)).toBeInTheDocument();
  });

  test("displays products when fetched", () => {
    (useAllProducts as jest.Mock).mockReturnValue({
      data: {
        products: [
          { id: "1", name: "Product 1", description: "Description 1" },
          { id: "2", name: "Product 2", description: "Description 2" },
        ],
      },
      isLoading: false,
    });

    render(<Filter />);
    expect(screen.getByText("Product 1")).toBeInTheDocument();
    expect(screen.getByText("Product 2")).toBeInTheDocument();
  });

  test("displays error message if fetching products fails", async () => {
    (useAllProducts as jest.Mock).mockReturnValue({
      data: null,
      isLoading: false,
      error: new Error("Failed to fetch products"),
    });
  
    render(<Filter />);
  
    // Use `findByText` to handle asynchronous rendering
    expect(await screen.findByText(/failed to load products/i)).toBeInTheDocument();
  });
  
});
