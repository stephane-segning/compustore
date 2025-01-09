import React from "react";
import { render, screen } from "@testing-library/react";
import ErrorState from "./error-state";

describe("ErrorState", () => {
    it("renders an error message", () => {
        render(<ErrorState message="An error occurred" />);
        expect(screen.getByText("An error occurred")).toBeInTheDocument();
    });
});
