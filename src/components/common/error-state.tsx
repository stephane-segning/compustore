import React from "react";

interface ErrorStateProps {
    message: string;
}

const ErrorState: React.FC<ErrorStateProps> = ({ message }) => (
    <div className="flex justify-center items-center h-screen">
        <p className="text-danger-light text-xl">{message}</p>
    </div>
);

export default ErrorState;