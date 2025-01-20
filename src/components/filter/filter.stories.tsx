import React from "react";
import { Meta, StoryFn } from "@storybook/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { createTRPCReact } from "@trpc/react-query";
import Filter from "./filter";

// Create a tRPC instance
const trpc = createTRPCReact<any>(); // Replace `any` with your actual tRPC router type

// Create a QueryClient for React Query
const queryClient = new QueryClient();

// Mock implementation for `useAllProducts`
const mockUseAllProductsData = {
  products: [
    { },
  ],
};

const mockClient = {
  query: async (queryKey: string) => {
    if (queryKey.includes("product")) {
      return mockUseAllProductsData;
    }
    return null;
  },
  mutation: async () => {},
  subscription: async () => {},
};

const MockTrpcProvider = ({ children }: { children: React.ReactNode }) => (
  <QueryClientProvider client={queryClient}>
    <trpc.Provider client={mockClient as any} queryClient={queryClient}>
      {children}
    </trpc.Provider>
  </QueryClientProvider>
);

export default {
  title: "Components/Filter",
  component: Filter,
  decorators: [(Story) => <MockTrpcProvider><Story /></MockTrpcProvider>],
} as Meta;

const Template: StoryFn = () => <Filter />;

export const Default = Template.bind({});
