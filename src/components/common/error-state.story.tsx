import React from "react";
import ErrorState from "./error-state";

export default {
    title: "Components/ErrorState",
    component: ErrorState,
};

export const Default = () => (
    <ErrorState message="Error loading product details. Please try again later." />
);
